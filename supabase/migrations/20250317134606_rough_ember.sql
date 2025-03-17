/*
  # Fix users table RLS policies

  1. Changes
    - Add service role policy for full access
    - Update existing policies to be more permissive
    - Ensure proper cascade on delete

  2. Security
    - Maintain user data privacy
    - Allow service role necessary access
    - Enable proper user creation flow
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role full access
CREATE POLICY "Service role full access"
  ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure foreign key is set up correctly
ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_id_fkey,
  ADD CONSTRAINT users_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;