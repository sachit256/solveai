/*
  # Fix user profile data structure

  1. Changes
    - Add trigger to automatically create user profile on signup
    - Ensure user metadata is properly synced
    - Add policies for proper data access

  2. Security
    - Maintain existing RLS policies
    - Add service role access for auth hooks
*/

-- Create a trigger function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'first_name')::text, ''),
    COALESCE((NEW.raw_user_meta_data->>'last_name')::text, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure the users table has the correct structure
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Recreate policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Service role full access" ON public.users;

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

CREATE POLICY "Service role full access"
  ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Update existing users if needed
INSERT INTO public.users (id, first_name, last_name)
SELECT 
  id,
  COALESCE((raw_user_meta_data->>'first_name')::text, ''),
  COALESCE((raw_user_meta_data->>'last_name')::text, '')
FROM auth.users
ON CONFLICT (id) DO NOTHING;