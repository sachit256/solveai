import React from 'react';

export const PrivacyPage = () => {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: March 17, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>
              At SolveAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and email address</li>
              <li>Payment information</li>
              <li>Academic information</li>
              <li>Usage data and preferences</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you use our service, we automatically collect:</p>
            <ul>
              <li>Device information</li>
              <li>Log data</li>
              <li>Usage patterns</li>
              <li>Performance data</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our service</li>
              <li>Improve and personalize your experience</li>
              <li>Process payments</li>
              <li>Send important notifications</li>
              <li>Analyze usage patterns</li>
              <li>Prevent fraud and abuse</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers and partners</li>
              <li>Legal authorities when required</li>
              <li>Other users (only with your consent)</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information, including:
            </p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Regular security audits</li>
              <li>Access controls</li>
              <li>Secure data storage</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>

            <h2>8. Changes to Privacy Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of any material changes by posting the new policy on this page.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@solveai.com</li>
              <li>Address: 123 AI Street, Tech Valley, CA 94025</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};