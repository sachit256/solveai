// Supabase configuration
const SUPABASE_URL = 'https://bjzhilutsglpvwsllqnk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqemhpbHV0c2dscHZ3c2xscW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTQyNDUsImV4cCI6MjAyNDUzMDI0NX0.SZTd7L4JqWXNXzf5J5F_KQ7yHpgg5JYJ4ekKYkzVe0g';

// Create Supabase client interface
const supabase = {
  async getSubscription(userId, accessToken) {
    if (!userId || !accessToken) {
      throw new Error('Missing required parameters: userId or accessToken');
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions?user_id=eq.${userId}&select=plan_id`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  },
  
  async getUser(email, accessToken) {
    if (!email || !accessToken) {
      throw new Error('Missing required parameters: email or accessToken');
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}&select=id`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  }
};

// Export for use in other files
window.supabase = supabase; 