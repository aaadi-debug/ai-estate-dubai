'use client';

import { Check, X, Folder, TableCells, ArrowRight } from 'lucide-react';
import { BsTable } from "react-icons/bs";

export default function ComparisonTable() {
  const comparisonData = [
    {
      category: 'Lead Capture',
      features: [
        { name: '24/7 AI Chatbot', starter: true, professional: true, elite: true },
        { name: 'WhatsApp Integration', starter: true, professional: true, elite: true },
        { name: 'SMS Notifications', starter: '50/month', professional: '200/month', elite: 'Unlimited' },
        { name: 'Email Notifications', starter: true, professional: true, elite: true },
        { name: 'Lead Scoring', starter: false, professional: true, elite: true },
        { name: 'Priority Lead Routing', starter: false, professional: false, elite: true }
      ]
    },
    {
      category: 'Dashboard & Analytics',
      features: [
        { name: 'Real-time Dashboard', starter: true, professional: true, elite: true },
        { name: 'Lead Management', starter: 'Basic', professional: 'Advanced', elite: 'Premium' },
        { name: 'Performance Analytics', starter: false, professional: true, elite: true },
        { name: 'Custom Reports', starter: false, professional: false, elite: true },
        { name: 'Export Data', starter: false, professional: true, elite: true },
        { name: 'API Access', starter: false, professional: false, elite: true }
      ]
    },
    {
      category: 'Customization',
      features: [
        { name: 'Branded Chatbot', starter: 'Basic', professional: 'Advanced', elite: 'Full Custom' },
        { name: 'Custom Responses', starter: '10', professional: '50', elite: 'Unlimited' },
        { name: 'Multi-language Support', starter: false, professional: true, elite: true },
        { name: 'White-label Option', starter: false, professional: false, elite: true }
      ]
    },
    {
      category: 'Support & Training',
      features: [
        { name: 'Email Support', starter: true, professional: true, elite: true },
        { name: 'Priority Support', starter: false, professional: true, elite: true },
        { name: 'Dedicated Account Manager', starter: false, professional: false, elite: true },
        { name: 'Onboarding Training', starter: 'Self-service', professional: '1 session', elite: 'White-glove' },
        { name: 'Monthly Strategy Calls', starter: false, professional: false, elite: true }
      ]
    }
  ];

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="text-green-600 mx-auto" />
      ) : (
        <X size={20} className="text-gray-400 mx-auto" />
      );
    }
    return <span className="font-body text-sm text-primary">{value}</span>;
  };

  return (
    <section className="bg-[#FAFBFC] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 border border-gray-300 rounded-full px-6 py-2 mb-6">
            <BsTable size={16} className="text-secondary" />
            <span className="text-secondary font-semibold text-sm">Detailed Comparison</span>
          </div>
          
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">
            Compare All Features
          </h2>
          <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
            Every detail matters when choosing your AI assistant. See exactly what's included in each plan.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-200 border-b border-gray-300">
            <div className="font-playfair font-semibold text-foreground">Features</div>
            <div className="text-center">
              <p className="font-playfair font-semibold text-foreground">Starter</p>
              <p className="text-xs text-gray-500 mt-1">499 AED/mo</p>
            </div>
            <div className="text-center">
              <p className="font-playfair font-semibold text-foreground">Professional</p>
              <p className="text-xs text-gray-500 mt-1">999 AED/mo</p>
            </div>
            <div className="text-center">
              <p className="font-playfair font-semibold text-secondary">Elite</p>
              <p className="text-xs text-gray-600 mt-1">1,999 AED/mo</p>
            </div>
          </div>

          {/* Table Body */}
          {comparisonData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-b border-gray-300 last:border-b-0">
              {/* Category Header */}
              <div className="bg-gray-100 px-6 py-4">
                <h3 className="font-playfair font-semibold text-lg text-primary flex items-center space-x-2">
                  <Folder size={20} className="text-secondary" />
                  <span>{category.category}</span>
                </h3>
              </div>

              {/* Category Features */}
              {category.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="grid grid-cols-4 gap-4 p-6 hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="font-body text-sm text-primary">{feature.name}</div>
                  <div className="text-center">{renderValue(feature.starter)}</div>
                  <div className="text-center">{renderValue(feature.professional)}</div>
                  <div className="text-center">{renderValue(feature.elite)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-body text-sm">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}