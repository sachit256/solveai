import React from 'react';
import { Camera, Sparkles, Brain, Clock, Shield, BookOpen, MessageCircle, ChevronRight, Zap, Laptop, Globe, Target, ArrowRight, Star, Lightbulb, Rocket, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesPage = () => {
  const mainFeatures = [
    {
      title: "Snap & Solve",
      description: "Take a photo of any question and get instant solutions with our advanced image recognition technology",
      icon: <Camera className="w-8 h-8" />,
      details: [
        "Support for handwritten text and complex equations",
        "Multiple question detection and batch processing",
        "Auto-crop and image enhancement",
        "Works with textbooks, worksheets, and digital content"
      ],
      demo: "/demo/snap-solve.gif",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "AI-Powered Solutions",
      description: "Our advanced AI understands and solves complex problems across all subjects with detailed explanations",
      icon: <Brain className="w-8 h-8" />,
      details: [
        "Step-by-step explanations with visual aids",
        "Multiple solution approaches",
        "Deep conceptual understanding",
        "Real-world applications and examples"
      ],
      demo: "/demo/ai-solutions.gif",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Lightning-Fast Results",
      description: "Get comprehensive answers within seconds, complete with detailed explanations",
      icon: <Zap className="w-8 h-8" />,
      details: [
        "Sub-second response time",
        "Efficient batch processing",
        "Smart queuing system",
        "Offline mode support"
      ],
      demo: "/demo/instant-results.gif",
      color: "from-amber-500/20 to-orange-500/20"
    }
  ];

  const subjects = [
    { name: "Mathematics", icon: <Target className="w-8 h-8" />, topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"] },
    { name: "Physics", icon: <Globe className="w-8 h-8" />, topics: ["Mechanics", "Electricity", "Thermodynamics", "Quantum Physics", "Optics"] },
    { name: "Chemistry", icon: <Sparkles className="w-8 h-8" />, topics: ["Organic", "Inorganic", "Physical", "Analytical", "Biochemistry"] },
    { name: "Biology", icon: <BookOpen className="w-8 h-8" />, topics: ["Anatomy", "Genetics", "Ecology", "Molecular Biology", "Evolution"] }
  ];

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

  const floatingIconVariants = {
    initial: { y: 0 },
    float: {
      y: [-10, 0, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Floating Icons */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 relative overflow-hidden"
      >
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial="initial"
            animate="float"
            variants={floatingIconVariants}
            className="absolute top-20 left-[20%]"
          >
            <Lightbulb className="w-12 h-12 text-[rgb(79,70,229)]/20" />
          </motion.div>
          <motion.div
            initial="initial"
            animate="float"
            variants={floatingIconVariants}
            transition={{ delay: 1 }}
            className="absolute bottom-40 right-[25%]"
          >
            <Rocket className="w-16 h-16 text-[rgb(79,70,229)]/20" />
          </motion.div>
          <motion.div
            initial="initial"
            animate="float"
            variants={floatingIconVariants}
            transition={{ delay: 2 }}
            className="absolute top-40 right-[15%]"
          >
            <Users className="w-10 h-10 text-[rgb(79,70,229)]/20" />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/10 via-transparent to-transparent dark:from-[rgb(79,70,229)]/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Discover Our Features</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent"
            >
              Powerful Features for
              <br />
              Smarter Learning
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Experience the future of education with our cutting-edge AI technology
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mainFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row items-center gap-12 mb-32 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-8">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-3 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-2xl">
                      {feature.icon}
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h2>
                  </motion.div>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  <ul className="space-y-4">
                    {feature.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="p-1 rounded-full bg-[rgb(79,70,229)]/10">
                          <ArrowRight className="w-4 h-4 text-[rgb(79,70,229)]" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div 
                  className="flex-1 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-2xl transform transition-transform group-hover:scale-105`} />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img 
                        src={feature.demo} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Subjects</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
              Comprehensive Subject Coverage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get expert help across a wide range of academic disciplines
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                  <div className="text-[rgb(79,70,229)] mb-6">{subject.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{subject.name}</h3>
                  <ul className="space-y-2">
                    {subject.topics.map((topic, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-gray-600 dark:text-gray-400 flex items-center gap-2"
                      >
                        <Star className="w-4 h-4 text-[rgb(79,70,229)]" />
                        {topic}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 