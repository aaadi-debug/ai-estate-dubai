'use client';
import PlanCard from '@/app/pricing/components/PlanCard'; // Reuse from pricing
import { useState } from 'react';

export default function Upgrade() {
  const currentPlan = localStorage.getItem('plan') || 'starter';
  const [loadingPlan, setLoadingPlan] = useState(null);

  // Reuse handleSelectPlan from buy-plan/page.js (or copy it here)
  const handleSelectPlan = async (planId) => {
    // ... (copy logic from your buy-plan/page.js, but skip if same as currentPlan)
    if (planId === currentPlan) {
      alert('You are already on this plan.');
      return;
    }
    // Proceed with payment flow...
  };

  const plans = [ /* Copy plans array from buy-plan/page.js, but add prop for currentPlan */ ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your Plan</h1>
      <p className="text-gray-500 mb-8">Choose a better plan to unlock more features. Your current plan: {currentPlan.toUpperCase()}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            ctaText={plan.id === currentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
            loading={loadingPlan === plan.id}
            onSelectPlan={() => handleSelectPlan(plan.id)}
            disabled={plan.id === currentPlan}
          />
        ))}
      </div>
    </div>
  );
}