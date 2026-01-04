'use client';

import { useState, useEffect, useRef } from 'react';
import PricingHero from './PricingHero';
import PlanCard from './PlanCard';
// import ROICalculator from './ROICalculator';
// import ComparisonTable from './ComparisonTable';
// import TestimonialSection from './TestimonialSection';
// import FAQSection from './FAQSection';

export default function PricingInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const plansRef = useRef(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '499',
      period: 'per month',
      description: 'Perfect for new agents starting their AI journey',
      features: [
        { text: '24/7 AI Chatbot', included: true },
        { text: 'WhatsApp Integration', included: true },
        { text: '50 SMS Notifications/month', included: true },
        { text: 'Email Notifications', included: true },
        { text: 'Basic Dashboard', included: true },
        { text: 'Basic Branding', included: true },
        { text: '10 Custom Responses', included: true },
        { text: 'Email Support', included: true },
        { text: 'Lead Scoring', included: false },
        { text: 'Performance Analytics', included: false },
        { text: 'Multi-language Support', included: false },
        { text: 'Priority Support', included: false }
      ],
      isPopular: false,
      ctaText: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '999',
      period: 'per month',
      description: 'For established agents scaling their business',
      features: [
        { text: '24/7 AI Chatbot', included: true },
        { text: 'WhatsApp Integration', included: true },
        { text: '200 SMS Notifications/month', included: true },
        { text: 'Email Notifications', included: true },
        { text: 'Advanced Dashboard', included: true },
        { text: 'Advanced Branding', included: true },
        { text: '50 Custom Responses', included: true },
        { text: 'Lead Scoring', included: true },
        { text: 'Performance Analytics', included: true },
        { text: 'Multi-language Support', included: true },
        { text: 'Export Data', included: true },
        { text: 'Priority Support', included: true },
        { text: '1 Onboarding Session', included: true },
        { text: 'Dedicated Account Manager', included: false },
        { text: 'White-label Option', included: false }
      ],
      isPopular: true,
      ctaText: 'Start Free Trial'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '1,999',
      period: 'per month',
      description: 'Premium solution for top-performing agents',
      features: [
        { text: '24/7 AI Chatbot', included: true },
        { text: 'WhatsApp Integration', included: true },
        { text: 'Unlimited SMS Notifications', included: true },
        { text: 'Email Notifications', included: true },
        { text: 'Premium Dashboard', included: true },
        { text: 'Full Custom Branding', included: true },
        { text: 'Unlimited Custom Responses', included: true },
        { text: 'Lead Scoring', included: true },
        { text: 'Priority Lead Routing', included: true },
        { text: 'Performance Analytics', included: true },
        { text: 'Custom Reports', included: true },
        { text: 'Multi-language Support', included: true },
        { text: 'Export Data', included: true },
        { text: 'API Access', included: true },
        { text: 'White-label Option', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'White-glove Onboarding', included: true },
        { text: 'Monthly Strategy Calls', included: true }
      ],
      isPopular: false,
      ctaText: 'Contact Sales'
    }
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-muted rounded w-2/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectPlan = (planId) => {
    if (planId === 'elite') {
      window.location.href = '/contact';
    } else {
      window.location.href = '/signup';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] " id='plans'>
      {/* Pricing Plans */}
      <section ref={plansRef} className="py-20 px-4 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={plan.ctaText}
                onSelectPlan={() => handleSelectPlan(plan.id)}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground font-body text-sm mb-4">
              All plans include 14-day free trial • No credit card required • Cancel anytime
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs">
              <span>✓ UAE Business Certified</span>
              <span>✓ GDPR Compliant</span>
              <span>✓ 256-bit SSL Encryption</span>
              <span>✓ 99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </section>
{/* 
      <ROICalculator />
      <TestimonialSection />
      <ComparisonTable />
      <FAQSection /> */}
    </div>
  );
}