/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for authenticated users to insert
    - Add policy for service role to read all messages
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to submit contact forms
CREATE POLICY "Users can submit contact forms"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow service role to read all messages
CREATE POLICY "Service role can read all messages"
  ON contacts
  FOR SELECT
  TO service_role
  USING (true);