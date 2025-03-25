import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophia Jack",
      role: "IIT Student",
      content: "BrainlyAI has transformed how I study. The instant solutions and detailed explanations have helped me understand complex topics with ease.",
      rating: 5
    },
    {
      name: "Sam Wilson",
      role: "IIT Student",
      content: "The AI-powered explanations are incredibly helpful. It's like having a personal tutor available 24/7 to help with any subject.",
      rating: 5
    },
    {
      name: "Olivia Green",
      role: "IIT Student",
      content: "What impresses me most is how the AI adapts to my learning style. The explanations are always clear and easy to understand.",
      rating: 5
    }
  ];

  // Calculate positions for vertical staggered layout
  const getPosition = (index: number) => {
    switch (index) {
      case 0: // First card - Left side, top
        return { left: '13%', top: '30px' };
      case 1: // Second card - Middle, lower
        return { left: '50%', top: '500px' };
      case 2: // Third card - Right side, middle
        return { left: '85%', top: '150px' };
      default:
        return { left: '0%', top: '0px' };
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10" />
        
        {/* Large gradient circles */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-[20%] w-8 h-8 border-2 border-[rgb(79,70,229)]/20 rounded-lg rotate-12 dark:border-[rgb(79,70,229)]/30" />
        <div className="absolute bottom-32 right-[25%] w-6 h-6 border-2 border-[rgb(79,70,229)]/20 rounded-full dark:border-[rgb(79,70,229)]/30" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-[rgb(79,70,229)] mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of students who trust BrainlyAi for their learning journey
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="max-w-[1400px] mx-auto relative min-h-[700px]">
          <div className="relative z-10">
            {testimonials.map((testimonial, index) => {
              const position = getPosition(index);
              return (
                <div
                  key={index}
                  className="absolute w-full max-w-[420px] transform transition-all duration-500 hover:scale-105"
                  style={{
                    left: position.left,
                    top: position.top,
                    transform: `translateX(-50%)`
                  }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-[32px] transform transition-transform group-hover:scale-105 duration-300" />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                      {/* Avatar and info */}
                      <div className="absolute -top-4 -right-4 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-14 h-14 rounded-full bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 flex items-center justify-center">
                          <span className="text-xl font-semibold text-[rgb(79,70,229)]">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>

                      {/* Testimonial content */}
                      <div className="relative mt-10">
                        <div className="absolute -left-3 -top-3 text-6xl text-[rgb(79,70,229)]/20 dark:text-[rgb(79,70,229)]/30">"</div>
                        <p className="text-xl font-medium mb-8 relative z-10 text-gray-800 dark:text-gray-200">
                          {testimonial.content}
                        </p>
                        <div className="absolute -right-3 bottom-0 text-6xl text-[rgb(79,70,229)]/20 dark:text-[rgb(79,70,229)]/30">"</div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mt-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-[rgb(79,70,229)] fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}; 