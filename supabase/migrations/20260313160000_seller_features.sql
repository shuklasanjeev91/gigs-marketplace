-- ============================================================
-- SELLER FEATURES MIGRATION
-- Gig Packages (3-tier pricing), Seller Subscriptions,
-- Seller level auto-calculation
-- ============================================================

-- 1. Gig packages (Basic / Standard / Premium)
CREATE TABLE public.gig_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('basic', 'standard', 'premium')),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL CHECK (price >= 5),
  delivery_days integer NOT NULL CHECK (delivery_days >= 1),
  revisions integer NOT NULL DEFAULT 1,
  features text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (gig_id, tier)
);

ALTER TABLE public.gig_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone"
  ON public.gig_packages FOR SELECT USING (true);

CREATE POLICY "Sellers can manage own gig packages"
  ON public.gig_packages FOR INSERT TO authenticated
  WITH CHECK (
    gig_id IN (SELECT id FROM public.gigs WHERE seller_id = auth.uid())
  );

CREATE POLICY "Sellers can update own gig packages"
  ON public.gig_packages FOR UPDATE TO authenticated
  USING (
    gig_id IN (SELECT id FROM public.gigs WHERE seller_id = auth.uid())
  );

CREATE POLICY "Sellers can delete own gig packages"
  ON public.gig_packages FOR DELETE TO authenticated
  USING (
    gig_id IN (SELECT id FROM public.gigs WHERE seller_id = auth.uid())
  );

CREATE TRIGGER update_gig_packages_updated_at
  BEFORE UPDATE ON public.gig_packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Seller subscriptions (Seller Plus tiers)
CREATE TABLE public.seller_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('kickstart', 'standard', 'premium')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.seller_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON public.seller_subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own subscription"
  ON public.seller_subscriptions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own subscription"
  ON public.seller_subscriptions FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE TRIGGER update_seller_subscriptions_updated_at
  BEFORE UPDATE ON public.seller_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Seller performance stats view
--    Aggregates metrics used for automatic level calculation.
CREATE OR REPLACE VIEW public.seller_stats AS
SELECT
  p.user_id,
  p.seller_level,
  COUNT(DISTINCT g.id)                                                   AS total_gigs,
  COUNT(DISTINCT o.id)                                                   AS total_orders,
  COUNT(DISTINCT CASE WHEN o.status = 'completed' THEN o.id END)        AS completed_orders,
  COUNT(DISTINCT CASE WHEN o.status = 'cancelled' THEN o.id END)        AS cancelled_orders,
  CASE
    WHEN COUNT(DISTINCT o.id) > 0
    THEN ROUND(
      (COUNT(DISTINCT CASE WHEN o.status = 'completed' THEN o.id END)::numeric
       / COUNT(DISTINCT o.id)::numeric) * 100, 1)
    ELSE 0
  END                                                                     AS completion_rate,
  ROUND(AVG(r.rating), 2)                                               AS avg_rating,
  COUNT(DISTINCT r.id)                                                   AS review_count
FROM public.profiles p
LEFT JOIN public.gigs g ON g.seller_id = p.user_id AND g.status = 'active'
LEFT JOIN public.orders o ON o.seller_id = p.user_id
LEFT JOIN public.reviews r ON r.seller_id = p.user_id
WHERE p.is_seller = true
GROUP BY p.user_id, p.seller_level;

-- 4. Function: compute and store new seller level
CREATE OR REPLACE FUNCTION public.refresh_seller_level(p_user_id uuid)
RETURNS text AS $$
DECLARE
  v_completed   integer;
  v_total       integer;
  v_rate        numeric;
  v_rating      numeric;
  v_new_level   text;
BEGIN
  SELECT
    COUNT(CASE WHEN status = 'completed' THEN 1 END),
    COUNT(*),
    CASE WHEN COUNT(*) > 0 THEN
      ROUND(COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / COUNT(*)::numeric * 100, 1)
    ELSE 0 END
  INTO v_completed, v_total, v_rate
  FROM public.orders
  WHERE seller_id = p_user_id;

  SELECT ROUND(AVG(rating), 2) INTO v_rating
  FROM public.reviews
  WHERE seller_id = p_user_id;

  -- Level rules (Fiverr-inspired)
  IF v_completed >= 100 AND v_rate >= 95 AND COALESCE(v_rating, 0) >= 4.7 THEN
    v_new_level := 'Top Rated';
  ELSIF v_completed >= 50 AND v_rate >= 90 THEN
    v_new_level := 'Level 2';
  ELSIF v_completed >= 10 AND v_rate >= 85 THEN
    v_new_level := 'Level 1';
  ELSE
    v_new_level := 'New';
  END IF;

  UPDATE public.profiles SET seller_level = v_new_level WHERE user_id = p_user_id;
  RETURN v_new_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Trigger: recalculate seller level whenever an order status changes
CREATE OR REPLACE FUNCTION public.handle_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Guard against INSERT (OLD is NULL) and no-op updates
  IF OLD IS NULL OR NEW.status IS DISTINCT FROM OLD.status THEN
    PERFORM public.refresh_seller_level(NEW.seller_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_order_status_changed
  AFTER UPDATE OF status ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_order_status_change();
