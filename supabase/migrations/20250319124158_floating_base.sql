/*
  # Fix user signup process

  1. Changes
    - Update trigger function to handle null metadata values
    - Add error handling for edge cases
    - Ensure proper user profile creation
    - Fix potential race conditions

  2. Security
    - Maintain existing RLS policies
    - Keep service role access for auth hooks
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function
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
      -- Log error and re-raise
      RAISE EXCEPTION 'Error creating user profile: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure users table exists with correct structure
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
ON CONFLICT (id) DO UPDATE
SET 
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  updated_at = now();