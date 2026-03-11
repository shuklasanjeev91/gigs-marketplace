-- Create gigs table
CREATE TABLE public.gigs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 25,
  delivery_days integer NOT NULL DEFAULT 3,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'draft')),
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;

-- Anyone can view active gigs
CREATE POLICY "Active gigs are viewable by everyone"
ON public.gigs FOR SELECT
TO public
USING (status = 'active');

-- Sellers can view all their own gigs
CREATE POLICY "Sellers can view own gigs"
ON public.gigs FOR SELECT
TO authenticated
USING (seller_id = auth.uid());

-- Sellers can create gigs
CREATE POLICY "Sellers can create gigs"
ON public.gigs FOR INSERT
TO authenticated
WITH CHECK (seller_id = auth.uid());

-- Sellers can update their own gigs
CREATE POLICY "Sellers can update own gigs"
ON public.gigs FOR UPDATE
TO authenticated
USING (seller_id = auth.uid());

-- Sellers can delete their own gigs
CREATE POLICY "Sellers can delete own gigs"
ON public.gigs FOR DELETE
TO authenticated
USING (seller_id = auth.uid());

-- Auto-update updated_at
CREATE TRIGGER update_gigs_updated_at
  BEFORE UPDATE ON public.gigs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();