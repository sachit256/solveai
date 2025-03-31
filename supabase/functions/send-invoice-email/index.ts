import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    const { userEmail, userName, planName, amount, invoiceDate, invoiceNumber } = await req.json()

    const response = await resend.emails.send({
      from: 'BrainlyAI <no-reply@brainlyai.in>',
      to: userEmail,
      subject: 'Thank you for your subscription!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .amount { font-size: 24px; font-weight: bold; color: #4f46e5; }
              .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Invoice from BrainlyAI</h1>
                <p>Invoice #${invoiceNumber}</p>
              </div>
              
              <p>Dear ${userName},</p>
              
              <p>Thank you for subscribing to BrainlyAI! Here's your invoice for your recent subscription purchase.</p>
              
              <div class="invoice-details">
                <p><strong>Plan:</strong> ${planName}</p>
                <p><strong>Date:</strong> ${invoiceDate}</p>
                <p><strong>Amount:</strong> <span class="amount">₹${(amount/100).toFixed(2)}</span></p>
              </div>
              
              <p>Your subscription is now active and you have full access to all premium features.</p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              
              <div class="footer">
                <p>BrainlyAI - Your AI Learning Assistant</p>
                <p>© ${new Date().getFullYear()} BrainlyAI. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 