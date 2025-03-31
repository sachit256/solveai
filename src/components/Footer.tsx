import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, FileText, Shield, Info, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold">BrainlyAi</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Transform your learning experience with AI-powered solutions. Get instant answers, detailed explanations, and personalized study materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 transition-colors"
                >
                  <Info className="w-4 h-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/refund"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} BrainlyAi. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-4 max-w-3xl mx-auto leading-relaxed">
            BrainlyAI strictly opposes plagiarism and any form of academic dishonesty. If our services are misused, we reserve the right to take appropriate actions to uphold the integrity of our platform. This may include, but is not limited to, collaborating with academic institutions and suspending accounts.
          </p>
        </div>
      </div>
    </footer>
  );
};