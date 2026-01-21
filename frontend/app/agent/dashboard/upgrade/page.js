'use client';

import { useState, useEffect } from 'react';
import { Check, X, ArrowRight, Crown, Star, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

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
      { text: 'Standard Templates', included: true },
      { text: 'WhatsApp Integration', included: false },
      { text: 'Unlimited Conversations', included: false },
      { text: 'Advanced Analytics', included: false },
      { text: 'Lead Scoring', included: false },
    ],
    popular: false,
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
      { text: 'Instant SMS Alerts', included: true },
      { text: 'Lead Scoring (Hot/Warm/Cold)', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support (24h)', included: true },
      { text: 'Team Accounts (up to 5)', included: false },
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '999',
    period: 'month',
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Custom Chatbot Branding & Flows', included: true },
      { text: 'Multi-language Support', included: true },
      { text: 'API Access & Webhooks', included: true },
      { text: 'White-label Dashboard', included: true },
      { text: 'Team Accounts (up to 5 users)', included: true },
      { text: '24/7 Priority Support', included: true },
      { text: 'White-glove Onboarding', included: true },
    ],
    popular: false,
  },
];

export default function UpgradePage() {
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPlan, setProcessingPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/usage/${agentId}`
        );

        if (!res.ok) throw new Error('Failed to load plan');

        const data = await res.json();
        setCurrentPlan(data.plan || 'starter');
        setUsage(data);
      } catch (err) {
        setError(err.message || 'Failed to load plan');
        // Fallback
        setCurrentPlan(localStorage.getItem('plan') || 'starter');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan) {
      alert("You're already on this plan.");
      return;
    }

    if (processingPlan) return;
    setProcessingPlan(planId);

    try {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) throw new Error('Please log in again');

      const confirmed = window.confirm(
        `You will be charged $${plans.find(p => p.id === planId).price} USD/month to upgrade to ${planId}. Continue?`
      );

      if (!confirmed) {
        setProcessingPlan(null);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/razorpay/create-subscription`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: planId, agentId }),
          credentials: 'include',
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create subscription');
      }

      const { short_url } = await res.json();

      window.location.href = short_url;
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setProcessingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-secondary text-primary rounded-lg hover:scale-105 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isCurrent = (id) => id === currentPlan;
  const isStarter = currentPlan === 'starter';
  const isProfessional = currentPlan === 'professional';
  const isElite = currentPlan === 'elite';
  const isUnlimited = usage?.isUnlimited ?? false;

  // console.log("Usage: ", usage)

  return (
    <div className="p-6 min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className="flex justify-between items-end gap-6  border-b border-gray-300 mb-4 pb-4">
        <div>
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">Upgrade Your Plan</h1>
          <p className="text-secondary">
            Get more conversations, advanced tools, and priority support
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="flex justify-center">
          <div className="border border-gray-200 shadow-sm rounded-lg p-2 px-6">
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-600">Current Plan</div>
              <div className="text-2xl font-bold capitalize text-secondary">
                {currentPlan}
                {isUnlimited && <span className="ml-2 text-green-600 text-xl">Unlimited</span>}
              </div>
            </div>
            {usage?.planExpiry && (
              <div className="text-sm text-gray-500">
                Renews on {new Date(usage.planExpiry).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans
          .filter((plan) => {
            if (isStarter) {
              // Starter sees ALL three plans
              return true;
            }
            if (isProfessional) {
              // Professional sees Professional (current) + Elite (upgrade)
              return plan.id === 'professional' || plan.id === 'elite';
            }
            if (isElite) {
              // Elite sees ONLY Elite
              return plan.id === 'elite';
            }
            return true; // fallback (shouldn't reach here)
          })
          .map((plan) => {
            const isCurrentPlan = isCurrent(plan.id);
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${isCurrentPlan
                  ? 'border-secondary ring-4 ring-secondary/30'
                  : isPopular
                    ? 'border-secondary'
                    : 'border-gray-200 hover:border-secondary/50'
                  }`}
              >
                {/* Popular Badge */}
                {/* {isPopular && !isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 animate-pulse">
                    <Star size={16} fill="currentColor" />
                    Most Popular
                  </div>
                )} */}

                {/* Current Badge */}
                {isCurrentPlan && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                    Current Plan
                  </div>
                )}

                <div className="p-8 pb-10">
                  <h3 className="text-3xl font-semibold text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-black text-gray-900">${plan.price}</span>
                    <span className="text-xl text-gray-500 ml-2">/mo</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        {f.included ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={!f.included ? 'line-through text-gray-400' : ''}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan || processingPlan === plan.id}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform cursor-pointer ${isCurrentPlan
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : processingPlan === plan.id
                        ? 'bg-gray-400 text-white cursor-wait'
                        : isPopular
                          ? 'bg-secondary text-primary hover:scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:bg-secondary hover:scale-105'
                      }`}
                  >
                    {processingPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Upgrading...
                      </span>
                    ) : isCurrentPlan ? (
                      'Current Plan'
                    ) : (
                      `Switch to ${plan.name}`
                    )}
                  </button>
                </div>
              </div>
            );
          })}

        {isElite && (
          <div className="col-span-2 text-center bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-2xl border border-indigo-200 flex flex-col justify-center items-center">
            <Crown size={48} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-indigo-900 mb-3">You're on the Elite Plan</h3>
            <p className="text-indigo-800 max-w-2xl mx-auto">
              Enjoy full access, dedicated support, team accounts, white-labeling, and priority onboarding.
              You're at the top tier!
            </p>
          </div>
        )}
      </div>



      {/* Footer Help */}
      <div className="mt-16 text-center text-gray-600">
        <p className="text-lg mb-4">Need help choosing or have questions?</p>
        <Link
          href="/contact-us"
          className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
        >
          Contact Support <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}