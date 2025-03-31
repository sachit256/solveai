import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface InvoiceEmailProps {
  userEmail: string;
  userName: string;
  planName: string;
  amount: number;
  invoiceDate: string;
  invoiceNumber: string;
}

export const sendInvoiceEmail = async (props: InvoiceEmailProps) => {
  try {
    const response = await fetch('https://bjzhilutsglpvwsllqnk.supabase.co/functions/v1/send-invoice-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(props),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return { success: false, error };
  }
}; 