/*
  # Fix subscription policies and add payment tracking

  1. Changes
    - Add payment_id column to track Razorpay payments
    - Update RLS policies to allow authenticated users to manage their subscriptions
    - Add service role policy for admin operations

  2. Security
    - Maintain RLS protection
    - Allow users to only manage their own subscriptions
    - Give service role full access for admin operations
*/

-- Add payment_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'subscriptions' AND column_name = 'payment_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN payment_id text;
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role full access" ON subscriptions;

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

CREATE POLICY "Service role full access"
  ON subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);