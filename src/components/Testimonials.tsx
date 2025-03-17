import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "SolveAI has been a game-changer for my studies. The instant solutions and detailed explanations have helped me understand complex problems better.",
      rating: 5
    },
    {
      name: "Michael Johnson",
      role: "Engineering Student",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "The step-by-step explanations are incredibly helpful. It's like having a personal tutor available 24/7.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Mathematics Major",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "What I love most is how quickly I can get help. Just snap a photo and get detailed solutions instantly.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Join thousands of satisfied students who use SolveAI daily
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200 dark:text-primary-800" />
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 