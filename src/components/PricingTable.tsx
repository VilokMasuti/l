/* eslint-disable @typescript-eslint/no-unused-vars */

import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const PricingTable = () => {
  const tiers: PricingTier[] = [
    {
      name: 'Basic',
      price: '$29',
      description: 'Everything necessary to get started.',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO optimization',
        'Contact form',
        '1 revision'
      ],
    },
    {
      name: 'Pro',
      price: '$79',
      description: 'Perfect for growing businesses.',
      features: [
        'Up to 15 pages',
        'Responsive design',
        'Advanced SEO optimization',
        'Contact form with validation',
        'CMS integration',
        '3 revisions',
        '1 month support'
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$149',
      description: 'Advanced features for complex needs.',
      features: [
        'Unlimited pages',
        'Responsive design',
        'Advanced SEO optimization',
        'Advanced form functionality',
        'CMS integration',
        'E-commerce functionality',
        'Unlimited revisions',
        '6 months support',
        'Performance optimization'
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transparent Pricing</h2>
          <p className="mt-4 text-foreground/70">
            Choose the perfect plan that aligns with your project needs and objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`glass-card relative p-8 flex flex-col ${
                tier.highlighted ? 'md:scale-105 md:shadow-xl' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 px-4 py-1 rounded-full glass-morphism text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="ml-1 text-foreground/70">/month</span>
                </div>
                <p className="mt-3 text-sm text-foreground/70">{tier.description}</p>
              </div>

              <ul className="space-y-3 flex-grow mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-secondary text-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="ml-3 text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`rounded-full py-2.5 px-3.5 text-sm font-medium transition-all duration-200 ${
                  tier.highlighted
                    ? 'bg-foreground text-primary-foreground hover:shadow-lg'
                    : 'glass-morphism hover:shadow-md'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
