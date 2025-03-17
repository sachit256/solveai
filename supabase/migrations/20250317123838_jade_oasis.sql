/*
  # Fix subscriptions table RLS policies

  1. Security Changes
    - Drop existing policies
    - Enable RLS on subscriptions table
    - Add policy for authenticated users to read their own subscriptions
    - Add policy for authenticated users to insert their own subscriptions
    - Add policy for authenticated users to update their own subscriptions
    - Add policy for service role to manage all subscriptions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role can insert/update subscriptions" ON subscriptions;

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow service role full access
CREATE POLICY "Service role full access"
  ON subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);