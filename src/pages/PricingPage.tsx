import React from 'react';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';

export const PricingPage = () => {
  return (
    <main className="pt-16 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <Pricing />
      <FAQ />
    </main>
  );
}; 