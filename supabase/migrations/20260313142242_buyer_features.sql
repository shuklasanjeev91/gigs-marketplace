-- ============================================================
-- BUYER FEATURES MIGRATION
-- Orders, Reviews, Private Feedback, Favorites
-- ============================================================

-- 1. Orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES auth.users(id),
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  package text NOT NULL DEFAULT 'basic' CHECK (package IN ('basic', 'standard', 'premium')),
  price numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'delivered', 'completed', 'cancelled')),
  requirements text,
  delivery_days integer NOT NULL DEFAULT 3,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view own orders"
  ON public.orders FOR SELECT TO authenticated
  USING (buyer_id = auth.uid());

CREATE POLICY "Sellers can view orders for their gigs"
  ON public.orders FOR SELECT TO authenticated
  USING (seller_id = auth.uid());

CREATE POLICY "Buyers can create orders"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Sellers can update order status"
  ON public.orders FOR UPDATE TO authenticated
  USING (seller_id = auth.uid());

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES auth.users(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  attachment_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Buyers can create reviews"
  ON public.reviews FOR INSERT TO authenticated
  WITH CHECK (buyer_id = auth.uid());

-- Buyers can update reviews within 14 days of creation
CREATE POLICY "Buyers can update recent reviews"
  ON public.reviews FOR UPDATE TO authenticated
  USING (
    buyer_id = auth.uid()
    AND created_at > now() - interval '14 days'
  );

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Private Feedback table (visible only to platform)
CREATE TABLE public.private_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.private_feedback ENABLE ROW LEVEL SECURITY;

-- Only the submitting buyer can insert (no SELECT policy = platform-only visibility)
CREATE POLICY "Buyers can submit private feedback"
  ON public.private_feedback FOR INSERT TO authenticated
  WITH CHECK (buyer_id = auth.uid());

-- Buyers can view their own submitted feedback
CREATE POLICY "Buyers can view own private feedback"
  ON public.private_feedback FOR SELECT TO authenticated
  USING (buyer_id = auth.uid());

-- 4. Favorites table
CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gig_id uuid NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, gig_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add favorites"
  ON public.favorites FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove favorites"
  ON public.favorites FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- 5. Review-attachment storage bucket (private, per-user folder)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('review_attachments', 'review_attachments', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Buyers can upload review attachments"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'review_attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Buyers can view own review attachments"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'review_attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
