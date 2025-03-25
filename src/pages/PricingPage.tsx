import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Check, Star } from 'lucide-react';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';

export const PricingPage = () => {
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
    <main className="pt-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 via-transparent to-transparent dark:from-[rgb(79,70,229)]/10" />
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-[20%] w-8 h-8 border-2 border-[rgb(79,70,229)]/20 rounded-lg rotate-12 dark:border-[rgb(79,70,229)]/30" />
          <div className="absolute bottom-32 right-[25%] w-6 h-6 border-2 border-[rgb(79,70,229)]/20 rounded-full dark:border-[rgb(79,70,229)]/30" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Choose Your Plan</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Get unlimited access to all features with our flexible pricing plans
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Pricing Component */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Pricing />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FAQ />
      </motion.div>
    </main>
  );
}; 