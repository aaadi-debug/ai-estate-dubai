'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, AlertCircle, Clock, CreditCard,
  ArrowUpRight, Infinity, Calendar, RefreshCw
} from 'lucide-react';

export default function MyPlanPage() {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const agentId = localStorage.getItem('agentId');
    if (!agentId) {
      window.location.href = '/login';
      return;
    }

    fetchUsage(agentId);
  }, []);

  const fetchUsage = async (agentId, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/usage/${agentId}`
      );

      if (!res.ok) throw new Error('Failed to fetch plan information');

      const data = await res.json();
      setUsage(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => fetchUsage(localStorage.getItem('agentId'))}
          className="px-6 py-3 bg-secondary text-primary rounded-lg hover:scale-105 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isStarter = usage?.plan === 'starter';
  const isProfessional = usage?.plan === 'professional';
  const isElite = usage?.plan === 'elite';
  const isUnlimited = usage?.isUnlimited;
  const progress = usage?.conversationsLimit === Infinity
    ? 100
    : Math.min(100, (usage?.conversationsUsed / usage?.conversationsLimit) * 100 || 0);

  return (
    <div className="p-6 min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className="border-b border-gray-300 mb-4 pb-4 flex justify-between items-end">
        <div>
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">My Plan & Billing</h1>
          <p className="text-secondary">Your billing and plans</p>
        </div>
        <button
          onClick={() => fetchUsage(localStorage.getItem('agentId'), true)}
          disabled={refreshing || loading}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg hover:scale-105 transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Plan Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex justify-between items-start flex-wrap gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Current Plan</div>
                <h2 className="text-4xl font-bold capitalize">{usage?.plan || 'Starter'}</h2>
              </div>

              {isUnlimited ? (
                <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                  <Infinity size={24} />
                  Unlimited
                </div>
              ) : isStarter ? (
                <div className="bg-amber-100 text-amber-800 px-6 py-3 rounded-lg font-medium">
                  Starter Plan
                </div>
              ) : (
                <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-lg font-medium">
                  Premium Plan
                </div>
              )}
            </div>

            {usage?.planExpiry && (
              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>Renews on {new Date(usage.planExpiry).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold mb-6">This Month's Usage</h3>

            {isUnlimited ? (
              <div className="text-center py-10">
                <Infinity size={64} className="mx-auto text-green-500 mb-4 opacity-80" />
                <p className="text-xl text-gray-700 font-medium">
                  You have unlimited conversations this month
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700 font-medium">Conversations used</span>
                  <span className="text-xl font-bold">
                    {usage?.conversationsUsed || 0} / {usage?.conversationsLimit}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className={`h-4 rounded-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500' : progress > 70 ? 'bg-amber-500' : 'bg-secondary'
                      }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="text-right text-sm text-gray-500">
                  {usage?.conversationsLimit - (usage?.conversationsUsed || 0)} remaining
                </div>
              </>
            )}

            {isStarter && (
              <div className="mt-10 pt-8 border-t">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-amber-600" />
                  Upgrade for more features
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 p-5 rounded-xl">
                    <h5 className="font-medium mb-2">Professional</h5>
                    <p className="text-sm text-gray-700">Unlimited conversations • WhatsApp • Advanced analytics</p>
                  </div>
                  <div className="bg-purple-50 p-5 rounded-xl">
                    <h5 className="font-medium mb-2">Elite</h5>
                    <p className="text-sm text-gray-700">Everything in Professional + priority support • team accounts</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Upgrade Card */}
        <div className="bg-gradient-to-br from-secondary/10 to-amber-50/30 rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ready for More?</h3>
            <p className="text-gray-700 mb-6">
              Unlock unlimited conversations, WhatsApp integration, advanced lead scoring, and priority support.
            </p>
          </div>
          <Link
            href="/agent/dashboard/upgrade"
            className="block w-full text-center py-4 bg-secondary text-primary rounded-xl font-medium hover:scale-105 transition duration-300 transform mt-6"
          >
            See All Plans & Upgrade <ArrowUpRight size={18} className="inline ml-1" />
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        Need help with billing? <Link href="/dashboard/support" className="text-secondary hover:underline">Contact Support</Link>
      </div>
    </div>
  );
}