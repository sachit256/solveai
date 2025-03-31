import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowRight, FileText } from 'lucide-react';

export const TermsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen relative pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 via-transparent to-transparent dark:from-[rgb(79,70,229)]/10" />
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-8"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Scale className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Terms and Conditions</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Terms and Conditions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Last updated: March 17, 2025
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pb-8"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 backdrop-blur-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-2xl" />
            <div className="relative prose dark:prose-invert max-w-none">
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    By accessing and using BrainlyAi's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">2. Description of Service</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    BrainlyAi provides an AI-powered educational assistance platform that helps students understand and solve academic problems. Our services include but are not limited to:
                  </p>
                  <ul className="list-none space-y-2">
                    {[
                      'Problem-solving assistance',
                      'Step-by-step explanations',
                      'Practice exercises',
                      'Study materials'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">3. User Accounts</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    To access certain features of our service, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-none space-y-2">
                    {[
                      'Maintaining the confidentiality of your account',
                      'All activities that occur under your account',
                      'Notifying us of any unauthorized use'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">4. Subscription and Payments</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Premium features require a paid subscription. By subscribing, you agree to:
                  </p>
                  <ul className="list-none space-y-2">
                    {[
                      'Pay all applicable fees',
                      'Provide accurate billing information',
                      'Maintain an active payment method'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">5. Acceptable Use</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    You agree not to:
                  </p>
                  <ul className="list-none space-y-2">
                    {[
                      'Use our service for cheating or academic dishonesty',
                      'Share account credentials',
                      'Attempt to reverse engineer our technology',
                      'Use our service for any illegal purpose'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">6. Intellectual Property</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    All content and materials available through our service are protected by intellectual property rights. You may not:
                  </p>
                  <ul className="list-none space-y-2">
                    {[
                      'Copy or redistribute our content',
                      'Modify or create derivative works',
                      'Use our trademarks without permission'
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">7. Termination</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    We reserve the right to terminate or suspend your account for violations of these terms or for any other reason at our discretion.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">8. Changes to Terms</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    We may modify these terms at any time. Continued use of our service after changes constitutes acceptance of the modified terms.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">9. Contact Information</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    For questions about these terms, please contact us at:
                  </p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Email: info.codersachit@gmail.com
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Address: CODWAYS TECHNOLOGIES LLP Office No. 101 D-60, Sector-63, Noida, Uttar Pradesh India - 201301
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};