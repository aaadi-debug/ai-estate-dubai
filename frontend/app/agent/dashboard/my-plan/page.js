'use client';
import { useEffect, useState } from 'react';
import { Upgrade, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function MyPlan() {
  const [plan, setPlan] = useState(localStorage.getItem('plan') || 'starter');
  const [usage, setUsage] = useState({ conversations: 0, max: 200 }); // Example data; fetch from backend
  const isStarter = plan === 'starter';

  useEffect(() => {
    // Fetch usage from backend
    const fetchUsage = async () => {
      try {
        const agentId = localStorage.getItem('agentId');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/usage/${agentId}`);
        if (res.ok) {
          const data = await res.json();
          setUsage(data);
          setPlan(data.plan); // Update if needed
        }
      } catch (err) {
        console.error('Failed to fetch usage:', err);
      }
    };
    fetchUsage();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">My Current Plan</h1>
      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-2xl capitalize">{plan} Plan</h2>
          <p className="text-gray-500">Active since: [Date] • Renews: [Date]</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl mb-4">Usage Stats</h3>
          <p>Conversations: {usage.conversations} / {usage.max} this month</p>
          {/* Add more stats like leads captured, etc. */}
        </div>
        {isStarter && (
          <div className="p-4 bg-yellow-100 rounded-lg flex items-center gap-4">
            <AlertCircle size={24} className="text-yellow-600" />
            <div>
              <p>You're on Starter. Upgrade to Professional for unlimited conversations, WhatsApp integration, and more!</p>
              <Link href="/dashboard/upgrade" className="text-secondary font-bold flex items-center gap-2 mt-2">
                Upgrade Now <Upgrade size={16} />
              </Link>
            </div>
          </div>
        )}
        <Link href="/dashboard/payments" className="block text-secondary">View Payment History</Link>
      </div>
    </div>
  );
}