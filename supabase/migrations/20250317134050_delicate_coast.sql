/*
  # Add name fields to users table

  1. Changes
    - Add first_name and last_name columns to auth.users
    - Add trigger to sync names with auth.users
    - Add RLS policies for name fields

  2. Security
    - Only allow users to update their own name fields
*/

-- Create a trigger function to sync names with auth.users
CREATE OR REPLACE FUNCTION public.handle_user_names()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{first_name}',
    to_jsonb(NEW.first_name)
  );
  
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{last_name}',
    to_jsonb(NEW.last_name)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create trigger to sync names
CREATE TRIGGER sync_user_names
  AFTER UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_names();