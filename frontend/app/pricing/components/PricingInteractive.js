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
      price: '149',
      oneTimeFee: 0,
      period: 'month',
      description: 'Perfect for individual agents testing AI lead capture',
      features: [
        { text: '24/7 AI Chatbot on your website', included: true },
        { text: 'Up to 200 conversations/month', included: true },
        { text: 'Email Notifications', included: true },
        { text: 'Basic Leads Dashboard', included: true },
        { text: 'Standard Templates', included: true },
        { text: 'Email Support (48h response)', included: true },
        { text: 'WhatsApp Integration', included: false },
        { text: 'Lead Scoring', included: false },
        { text: 'Performance Analytics', included: false },
        { text: 'Google Calendar Auto-booking', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Dedicated Account Manager', included: false },
        { text: 'White-label Option', included: false }
      ],
      isPopular: false,
      ctaText: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '499',
      oneTimeFee: 199,
      period: 'month',
      description: 'Premium white-glove service for top agents & teams',
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'Unlimited conversations', included: true },
        { text: 'Instant SMS Alerts', included: true },
        { text: 'Lead Segregation (Hot/Warm/Cold)', included: true },
        { text: 'Google Calendar Auto-booking', included: true },
        { text: 'Advanced Analytics & Stats', included: true },
        { text: 'Priority Email Support (24h)', included: true },
        { text: 'One-time Setup Assistance', included: true },
        { text: 'Dedicated Account Manager', included: false },
        { text: 'White-label Option', included: false },
        { text: 'API Access', included: false }
      ],
      isPopular: true,
      ctaText: 'Start Free Trial'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '999',
      oneTimeFee: 499,
      period: 'month',
      description: 'Premium solution for top-performing agents and teams',
      features: [
        { text: '24/7 AI Chatbot on your website', included: true },
        { text: 'WhatsApp Business API Integration', included: true },
        { text: 'Unlimited conversations', included: true },
        { text: 'Unlimited SMS Notifications', included: true },
        { text: 'Instant SMS & Email Notifications', included: true },
        { text: 'Premium Dashboard', included: true },
        { text: 'Advanced Anti-spam (CAPTCHA + Honeypot)', included: true },
        { text: 'Custom Chatbot Branding & Flows', included: true },
        { text: 'Full Custom Branding', included: true },
        { text: 'Lead Scoring & Priority Routing', included: true },
        { text: 'Google Calendar Auto-booking', included: true },
        { text: 'Performance Analytics & Custom Reports', included: true },
        { text: 'Multi-language Support', included: true },
        { text: 'API Access & Webhooks', included: true },
        { text: 'White-label Dashboard', included: true },
        { text: 'Team Accounts (up to 5 users)', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'White-glove Onboarding', included: true },
        { text: '24/7 Phone & WhatsApp Support', included: true },
        { text: 'Custom AI Training (coming Q2 2026)', included: true }
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
                oneTimeFee={plan.oneTimeFee}
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
            {/* <p className="text-muted-foreground font-body text-sm mb-4">
              All plans include 14-day free trial • No credit card required • Cancel anytime
            </p> */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs">
              <span>✓ UAE Business Certified</span>
              <span>✓ GDPR Compliant</span>
              <span>✓ 256-bit SSL Encryption</span>
              <span>✓ 99.9% Uptime SLA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}