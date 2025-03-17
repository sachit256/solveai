import React from 'react';

export const TermsPage = () => {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: March 17, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using SolveAI's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              SolveAI provides an AI-powered educational assistance platform that helps students understand and solve academic problems. Our services include but are not limited to:
            </p>
            <ul>
              <li>Problem-solving assistance</li>
              <li>Step-by-step explanations</li>
              <li>Practice exercises</li>
              <li>Study materials</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our service, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us of any unauthorized use</li>
            </ul>

            <h2>4. Subscription and Payments</h2>
            <p>
              Premium features require a paid subscription. By subscribing, you agree to:
            </p>
            <ul>
              <li>Pay all applicable fees</li>
              <li>Provide accurate billing information</li>
              <li>Maintain an active payment method</li>
            </ul>

            <h2>5. Acceptable Use</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use our service for cheating or academic dishonesty</li>
              <li>Share account credentials</li>
              <li>Attempt to reverse engineer our technology</li>
              <li>Use our service for any illegal purpose</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              All content and materials available through our service are protected by intellectual property rights. You may not:
            </p>
            <ul>
              <li>Copy or redistribute our content</li>
              <li>Modify or create derivative works</li>
              <li>Use our trademarks without permission</li>
            </ul>

            <h2>7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account for violations of these terms or for any other reason at our discretion.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of our service after changes constitutes acceptance of the modified terms.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              For questions about these terms, please contact us at:
            </p>
            <ul>
              <li>Email: legal@solveai.com</li>
              <li>Address: 123 AI Street, Tech Valley, CA 94025</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};