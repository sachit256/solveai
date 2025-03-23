import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does BrainlyAi work?",
      answer: "Simply take a photo of your question or problem, and our AI will analyze it instantly. You'll receive a detailed solution with step-by-step explanations within seconds."
    },
    {
      question: "What subjects are supported?",
      answer: "We support a wide range of subjects including Mathematics, Physics, Chemistry, Biology, Computer Science, History, Literature, and Economics. Premium users get access to all subjects."
    },
    {
      question: "Can I try BrainlyAi before subscribing?",
      answer: "Yes! You can start with our free plan that includes 5 questions per day. This allows you to experience our platform before choosing a paid subscription."
    },
    {
      question: "How accurate are the solutions?",
      answer: "Our AI system maintains a 98% accuracy rate. All solutions are verified and cross-checked for accuracy. If you ever find an incorrect solution, please report it and we'll address it immediately."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the respective app stores."
    },
    {
      question: "How does team pricing work?",
      answer: "Team pricing includes up to 5 members with shared workspaces, team analytics, and collaborative features. Contact our sales team for custom pricing for larger teams."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to know about BrainlyAi
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium text-left">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}; 