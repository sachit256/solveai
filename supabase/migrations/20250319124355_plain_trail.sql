/*
  # Fix signup process and RLS policies

  1. Changes
    - Add policy for service role to insert users during signup
    - Fix RLS policies for users table
    - Add policy for authenticated users to insert their own profile
    - Ensure proper cascade on user deletion

  2. Security
    - Maintain existing RLS protection
    - Allow service role necessary access for auth hooks
    - Enable proper user creation flow
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Service role full access" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Service role can manage all users"
  ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

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

CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure foreign key is set up correctly
ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_id_fkey,
  ADD CONSTRAINT users_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Update trigger function to handle signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_val text;
  last_name_val text;
BEGIN
  -- Extract first_name and last_name from metadata with null handling
  first_name_val := COALESCE(
    (NEW.raw_user_meta_data->>'first_name')::text,
    (NEW.raw_user_meta_data->>'firstName')::text,
    ''
  );
  
  last_name_val := COALESCE(
    (NEW.raw_user_meta_data->>'last_name')::text,
    (NEW.raw_user_meta_data->>'lastName')::text,
    ''
  );

  -- Create user profile with proper error handling
  BEGIN
    INSERT INTO public.users (
      id,
      first_name,
      last_name,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      first_name_val,
      last_name_val,
      COALESCE(NEW.created_at, now()),
      COALESCE(NEW.updated_at, now())
    );
  EXCEPTION 
    WHEN unique_violation THEN
      -- Profile already exists, update it
      UPDATE public.users
      SET 
        first_name = first_name_val,
        last_name = last_name_val,
        updated_at = now()
      WHERE id = NEW.id;
    WHEN OTHERS THEN
      -- Log error but don't raise exception to prevent signup failure
      RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();