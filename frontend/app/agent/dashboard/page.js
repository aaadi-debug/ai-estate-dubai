// frontend/app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AlertCircle, ArrowUpRight, Copy } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [agentId, setAgentId] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    warm: 0,
    cold: 0,
    today: 0,
  });
  const [plan, setPlan] = useState('starter');

  useEffect(() => {
    const id = localStorage.getItem('agentId');
    const storedPlan = localStorage.getItem('plan') || 'starter';

    if (!id) {
      window.location.href = '/login';
      return;
    }

    setAgentId(id);
    setPlan(storedPlan);
    fetchLeads(id);
  }, []);

  const fetchLeads = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/agent?agentId=${id}`
      );
      if (!res.ok) throw new Error('Failed to fetch leads');

      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        calculateStats(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsArray) => {
    const today = new Date().toDateString();
    let hot = 0,
      warm = 0,
      cold = 0,
      todayCount = 0;

    leadsArray.forEach((lead) => {
      if (lead.score === 'Hot') hot++;
      else if (lead.score === 'Warm') warm++;
      else cold++;

      if (new Date(lead.createdAt).toDateString() === today) todayCount++;
    });

    setStats({
      total: leadsArray.length,
      hot,
      warm,
      cold,
      today: todayCount,
    });
  };

  const markContacted = async (leadId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'contacted' }),
        }
      );

      if (!res.ok) throw new Error('Failed to update status');

      // Update local state
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: 'contacted' } : l))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to mark as contacted');
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<script src="${window.location.origin}/widget.js" data-agent-id="${agentId}"></script>`;
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };

  if (!agentId) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Upgrade Banner for Starter users */}
        {plan === 'starter' && (
          <div className="mb-10 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <AlertCircle size={32} className="text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-amber-900">
                  You're on Starter Plan
                </h3>
                <p className="text-amber-800 mt-1">
                  Upgrade to Professional for unlimited conversations, WhatsApp
                  integration, advanced analytics and more.
                </p>
              </div>
            </div>
            <Link
              href="/agent/dashboard/my-plan"
              className="whitespace-nowrap bg-secondary text-primary px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition transform"
            >
              Upgrade Now <ArrowUpRight size={18} />
            </Link>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-10">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium">Total Leads</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">{stats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium">Hot Leads</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.hot}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium">Warm Leads</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">{stats.warm}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium">Cold Leads</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.cold}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium">Today</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.today}</p>
          </div>
        </div>

        {/* Quick Actions + Embed Code */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Embed Code Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Chatbot Embed Code</h2>
            <pre className="bg-gray-900 text-green-300 p-5 rounded-xl text-sm overflow-x-auto font-mono">
              {`<script src="${window.location.origin}/widget.js" data-agent-id="${agentId}"></script>`}
            </pre>
            <button
              onClick={copyEmbedCode}
              className="mt-5 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Copy size={18} />
              Copy to Clipboard
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid gap-4">
              <Link
                href="/agent/dashboard/leads"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="font-medium">View All Leads</span>
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/agent/dashboard/my-plan"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="font-medium">Manage Subscription</span>
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/agent/dashboard/profile"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="font-medium">Update Profile</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold mb-6">Recent Leads</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No leads captured yet. Share your widget code!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-4 px-4 font-medium">Date</th>
                    <th className="text-left py-4 px-4 font-medium">Name</th>
                    <th className="text-left py-4 px-4 font-medium">Phone</th>
                    <th className="text-left py-4 px-4 font-medium">Email</th>
                    <th className="text-left py-4 px-4 font-medium">Budget</th>
                    <th className="text-left py-4 px-4 font-medium">Score</th>
                    <th className="text-left py-4 px-4 font-medium">Status</th>
                    <th className="text-left py-4 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 10).map((lead) => (  // showing only 10 most recent
                    <tr key={lead._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="py-4 px-4 font-medium">{lead.name}</td>
                      <td className="py-4 px-4">{lead.phone}</td>
                      <td className="py-4 px-4">{lead.email || '-'}</td>
                      <td className="py-4 px-4">{lead.budget}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            lead.score === 'Hot'
                              ? 'bg-red-100 text-red-800'
                              : lead.score === 'Warm'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {lead.score || 'Cold'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs ${
                            lead.status === 'contacted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {lead.status !== 'contacted' && (
                          <button
                            onClick={() => markContacted(lead._id)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark Contacted
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}