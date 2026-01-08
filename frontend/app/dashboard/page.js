// frontend/app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [agentId, setAgentId] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, hot: 0, warm: 0, cold: 0, today: 0 });

  useEffect(() => {
    const id = localStorage.getItem('agentId');
    const plan = localStorage.getItem('plan');

    if (!id) {
      window.location.href = '/login';
      return;
    }

    if (!plan || plan === 'none') {
      window.location.href = '/pricing'; // force upgrade
      return;
    }

    setAgentId(id);
    fetchLeads(id);
  }, []);

  const fetchLeads = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/agent?agentId=${id}`);
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        calculateStats(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leads) => {
    const today = new Date().toDateString();
    let hot = 0, warm = 0, cold = 0, todayCount = 0;
    leads.forEach(lead => {
      if (lead.score === 'Hot') hot++;
      else if (lead.score === 'Warm') warm++;
      else cold++;
      if (new Date(lead.createdAt).toDateString() === today) todayCount++;
    });
    setStats({ total: leads.length, hot, warm, cold, today: todayCount });
  };

  const markContacted = async (leadId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'contacted' })
      });
      setLeads(leads.map(l => l._id === leadId ? { ...l, status: 'contacted' } : l));
    } catch (err) {
      alert('Failed to update');
    }
  };

  const embedCode = `<script src="https://aiestatedubai.com/widget.js" data-agent-id="${agentId}"></script>`;

  if (!agentId) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Agent Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Total Leads</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Hot Leads</h3>
            <p className="text-3xl font-bold text-red-600">{stats.hot}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Warm Leads</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.warm}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Cold Leads</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.cold}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Today</h3>
            <p className="text-3xl font-bold text-green-600">{stats.today}</p>
          </div>
        </div>

        {/* Embed Code */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Chatbot Embed Code</h2>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            {embedCode}
          </pre>
          <button onClick={() => navigator.clipboard.writeText(embedCode)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Copy to Clipboard
          </button>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Your Leads</h2>
          {loading ? <p>Loading leads...</p> : leads.length === 0 ? <p>No leads yet.</p> : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Budget</th>
                    <th className="text-left py-3 px-4">Score</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-3 px-4">{lead.name}</td>
                      <td className="py-3 px-4">{lead.phone}</td>
                      <td className="py-3 px-4">{lead.email}</td>
                      <td className="py-3 px-4">{lead.budget}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${lead.score === 'Hot' ? 'bg-red-100 text-red-800' :
                          lead.score === 'Warm' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                          {lead.score}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${lead.status === 'contacted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {lead.status !== 'contacted' && (
                          <button
                            onClick={() => markContacted(lead._id)}
                            className="text-blue-600 hover:underline"
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