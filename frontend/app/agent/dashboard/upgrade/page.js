// frontend/app/dashboard/upgrade/page.js
'use client';

import { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Crown, Star } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '149',
    period: 'month',
    features: [
      { text: '24/7 AI Chatbot', included: true },
      { text: 'Up to 200 conversations/month', included: true },
      { text: 'Email Notifications', included: true },
      { text: 'Basic Leads Dashboard', included: true },
      { text: 'WhatsApp Integration', included: false },
      { text: 'Unlimited Conversations', included: false },
      { text: 'Advanced Analytics', included: false },
    ],
    popular: false,
    current: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '499',
    period: 'month',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Unlimited conversations', included: true },
      { text: 'WhatsApp Business Integration', included: true },
      { text: 'Lead Scoring & Priority', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Team Accounts (coming soon)', included: false },
    ],
    popular: true,
    current: false,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '999',
    period: 'month',
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Custom Branding & Flows', included: true },
      { text: 'Multi-language Support', included: true },
      { text: 'API Access & Webhooks', included: true },
      { text: 'White-label Dashboard', included: true },
      { text: '24/7 Priority Support', included: true },
    ],
    popular: false,
    current: false,
  },
];

export default function UpgradePage() {
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem('plan') || 'starter';
    setCurrentPlan(storedPlan);

    // Mark current plan
    plans.forEach(p => {
      p.current = p.id === storedPlan;
    });
  }, []);

  const handleSelectPlan = async (planId) => {
    if (planId === currentPlan) {
      alert("You're already on this plan.");
      return;
    }

    if (loadingPlan) return;
    setLoadingPlan(planId);

    try {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) throw new Error('Please log in again');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/razorpay/create-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: planId, agentId }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create order');
      }

      const { orderId, amount } = await res.json();

      // Load Razorpay script if not already loaded
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount,
          currency: 'INR',
          name: 'AI Estate Dubai',
          description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Upgrade`,
          order_id: orderId,
          handler: async function (response) {
            try {
              const verifyRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/razorpay/verify-payment`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    agentId,
                    plan: planId,
                  }),
                }
              );

              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                alert('Upgrade successful! Your plan has been updated.');
                localStorage.setItem('plan', planId);
                window.location.reload();
              } else {
                alert('Payment verification failed');
              }
            } catch (err) {
              alert('Error verifying payment');
            }
          },
          prefill: {
            name: localStorage.getItem('agentName') || 'Agent',
            email: localStorage.getItem('agentEmail') || '',
            contact: localStorage.getItem('agentPhone') || '',
          },
          theme: { color: '#FFD700' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      script.onerror = () => alert('Failed to load Razorpay');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upgrade your plan to unlock more conversations, advanced features, and priority support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                plan.popular ? 'border-secondary scale-105' : 'border-gray-200'
              } ${plan.current ? 'ring-2 ring-secondary ring-offset-4' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                  <Star size={16} fill="currentColor" />
                  Most Popular
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.current && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Current Plan
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-gray-400" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-500 line-through'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={plan.current || loadingPlan === plan.id}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.current
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-secondary hover:bg-secondary/90 text-primary shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } disabled:opacity-70`}
                >
                  {loadingPlan === plan.id
                    ? 'Processing...'
                    : plan.current
                    ? 'Current Plan'
                    : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="text-lg mb-4">Not sure which plan is right for you?</p>
          <button className="text-secondary font-medium hover:underline flex items-center gap-2 mx-auto">
            Talk to our team <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}