import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Brain } from 'lucide-react';
import StudentBoard from '../components/StudentBoard';

const StudentBoardPage: React.FC = () => {
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
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
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

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative pt-20"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="container mx-auto px-4 mb-8"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Brain className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Student Dashboard</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Welcome to Your Learning Space
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Track your progress, manage your questions, and get personalized learning insights
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="container mx-auto px-4"
        >
          <StudentBoard />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentBoardPage; 