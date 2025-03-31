import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';

export const CancellationPage = () => {
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
              <RotateCcw className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Cancellation Policy</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Cancellation Policy
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
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">1. Subscription Cancellation</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can cancel your subscription at any time through your account settings. Upon cancellation:
                  </p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Your access will continue until the end of your current billing period
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      No partial refunds for unused time
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      You can continue using premium features until the period ends
                    </motion.li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">2. Cancellation Process</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    To cancel your subscription:
                  </p>
                  <ul className="list-none space-y-2">
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Log into your account
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Go to Account Settings
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Select Subscription Management
                    </motion.li>
                    <motion.li 
                      variants={itemVariants}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                      Click "Cancel Subscription"
                    </motion.li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">3. Auto-Renewal</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    By default, all subscriptions are set to auto-renew. You can disable auto-renewal at any time before the next billing cycle.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">4. Contact Us</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you have any questions about cancellation, please contact our support team:
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
                      Phone: +91 8700944131
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