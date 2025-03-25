import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export const PrivacyPage = () => {
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
              <Lock className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Privacy Policy</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Privacy Policy
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
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">1. Introduction</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    At BrainlyAi, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">2. Information We Collect</h2>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">2.1 Personal Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">We collect information that you provide directly to us, including:</p>
                    <ul className="list-none space-y-2">
                      {['Name and email address', 'Payment information', 'Academic information', 'Usage data and preferences'].map((item, index) => (
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

                  <div>
                    <h3 className="text-xl font-semibold mb-4">2.2 Automatically Collected Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">When you use our service, we automatically collect:</p>
                    <ul className="list-none space-y-2">
                      {['Device information', 'Log data', 'Usage patterns', 'Performance data'].map((item, index) => (
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
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">3. How We Use Your Information</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">We use the collected information to:</p>
                  <ul className="list-none space-y-2">
                    {[
                      'Provide and maintain our service',
                      'Improve and personalize your experience',
                      'Process payments',
                      'Send important notifications',
                      'Analyze usage patterns',
                      'Prevent fraud and abuse'
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
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">4. Information Sharing</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">We may share your information with:</p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Service providers and partners
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Legal authorities when required
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Other users (only with your consent)
                    </motion.li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">5. Data Security</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We implement appropriate security measures to protect your information, including:
                  </p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Encryption of sensitive data
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Regular security audits
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Access controls
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Secure data storage
                    </motion.li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">6. Your Rights</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">You have the right to:</p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Access your personal information
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Correct inaccurate data
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Request deletion of your data
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Opt-out of marketing communications
                    </motion.li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">7. Children's Privacy</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">8. Changes to Privacy Policy</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may update this policy periodically. We will notify you of any material changes by posting the new policy on this page.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">9. Contact Us</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Email: privacy@brainlyai.app
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Address: 123 AI Street, Tech Valley, CA 94025
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