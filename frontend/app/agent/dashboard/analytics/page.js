'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, AreaChart, Area,
} from 'recharts';
import {
  TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, RefreshCw, CheckCircle2, AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('12m');
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    conversionRate: '0%',
    leadGrowth: '+0%',
    monthlyData: [],
    todayLeads: 0,
  });
  const [plan, setPlan] = useState('starter');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) {
        window.location.href = '/login';
        return;
      }

      // Fetch plan + usage first
      const usageRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/usage/${agentId}`);
      if (!usageRes.ok) throw new Error('Failed to fetch plan');
      const usageData = await usageRes.json();
      setPlan(usageData.plan);

      // Fetch analytics
      const analyticsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/analytics?agentId=${agentId}`
      );
      if (!analyticsRes.ok) throw new Error('Failed to load analytics');

      const data = await analyticsRes.json();

      // Filter monthly data by timeRange
      let filteredMonthly = data.monthlyData || [];
      if (timeRange === '1m') filteredMonthly = filteredMonthly.slice(-1);
      else if (timeRange === '3m') filteredMonthly = filteredMonthly.slice(-3);
      else if (timeRange === '6m') filteredMonthly = filteredMonthly.slice(-6);
      // 12m = all

      setStats({
        totalLeads: data.totalLeads || 0,
        qualifiedLeads: data.qualifiedLeads || 0,
        convertedLeads: data.convertedLeads || 0,
        conversionRate: data.conversionRate || '0%',
        leadGrowth: data.leadGrowth || '+0%',
        monthlyData: filteredMonthly,
        todayLeads: data.todayLeads || 0,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const isStarter = plan === 'starter';
  const isProfessionalOrElite = plan === 'professional' || plan === 'elite';

  const StatCard = ({ title, value, change, icon: Icon, color = 'text-secondary', locked = false }) => (
    <div className={`bg-white rounded-xl shadow-sm border p-6 relative ${locked ? 'opacity-50 blur-[2px] pointer-events-none' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text', 'bg')}/10`}>
          <Icon size={24} className={color} />
        </div>
      </div>
      {change && !locked && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {parseFloat(change) >= 0 ? (
            <ArrowUpRight size={16} className="text-green-600" />
          ) : (
            <ArrowDownRight size={16} className="text-red-600" />
          )}
          <span className={parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'}>
            {change} vs last period
          </span>
        </div>
      )}
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
          <AlertCircle size={32} className="text-amber-600 mb-2" />
          <span className="text-sm font-medium text-amber-800">Upgrade to Professional+</span>
        </div>
      )}
    </div>
  );

  console.log("Stats: ", stats)

  return (
    <div className="p-6 min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-gray-300 mb-6 pb-4">
        <div>
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">Analytics & Performance</h1>
          <p className="text-secondary">Track leads, conversions, and growth</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-secondary outline-none"
            disabled={loading || isFetching}
          >
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>

          <button
            onClick={fetchAnalytics}
            disabled={loading || isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg hover:scale-105 transition disabled:opacity-50"
          >
            <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
          {error}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads.toLocaleString()}
          change={stats.leadGrowth}
          icon={Users}
        />
        <StatCard
          title="Today's Leads"
          value={stats.todayLeads.toLocaleString()}
          icon={Calendar}
          color="text-green-600"
        />
        <StatCard
          title="Qualified Leads"
          value={stats.qualifiedLeads.toLocaleString()}
          icon={CheckCircle2}
          color="text-green-600"
          locked={isStarter}
        />
        <StatCard
          title="Converted Leads"
          value={stats.convertedLeads.toLocaleString()}
          icon={DollarSign}
          color="text-purple-600"
          locked={isStarter}
        />
        <StatCard
          title="Conversion Rate"
          value={stats.conversionRate}
          icon={TrendingUp}
          color="text-amber-600"
          locked={isStarter}
        />
      </div>

      {/* Charts */}
      <div className={`grid lg:grid-cols-2 gap-8 relative ${isStarter ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Monthly Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Monthly Lead Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" name="Total Leads" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                {isProfessionalOrElite && (
                  <>
                    <Bar dataKey="qualified" name="Qualified" fill="#059669" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="converted" name="Converted" fill="#0A0E27" radius={[8, 8, 0, 0]} />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Lead Growth Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#D4AF37"
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                  name="Total Leads"
                />
                {isProfessionalOrElite && (
                  <Line
                    type="monotone"
                    dataKey="converted"
                    stroke="#0A0E27"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Converted"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upgrade Overlay for Starter */}
        {isStarter && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-xl">
            <div className="text-center max-w-md px-8 py-10">
              <AlertCircle size={48} className="text-amber-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Unlock Full Analytics</h3>
              <p className="text-amber-800 mb-8 text-lg">
                See qualified leads, conversions, detailed charts, and trends with Professional (300 leads/mo) or Elite (unlimited).
              </p>
              <Link
                href="/agent/dashboard/my-plan"
                className="inline-block bg-secondary text-primary px-10 py-4 rounded-xl font-medium text-lg hover:scale-105 transition"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}