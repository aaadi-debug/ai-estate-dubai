// frontend/app/agent/dashboard/analytics/page.js
'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Calendar, 
  ArrowUpRight, ArrowDownRight, RefreshCw,  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 12m
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    conversionRate: '0%',
    leadGrowth: '+0%',
    monthlyData: [],
  });

  // Mock data - in real app replace with API fetch
  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const monthlyData = [
        { month: 'Jan', leads: 145, qualified: 89, converted: 34 },
        { month: 'Feb', leads: 178, qualified: 112, converted: 45 },
        { month: 'Mar', leads: 203, qualified: 134, converted: 52 },
        { month: 'Apr', leads: 189, qualified: 121, converted: 48 },
        { month: 'May', leads: 234, qualified: 156, converted: 61 },
        { month: 'Jun', leads: 267, qualified: 178, converted: 72 },
        { month: 'Jul', leads: 298, qualified: 201, converted: 85 },
        { month: 'Aug', leads: 312, qualified: 219, converted: 94 },
        { month: 'Sep', leads: 345, qualified: 238, converted: 102 },
        { month: 'Oct', leads: 378, qualified: 256, converted: 115 },
        { month: 'Nov', leads: 401, qualified: 278, converted: 128 },
        { month: 'Dec', leads: 432, qualified: 301, converted: 142 },
      ];

      // Filter based on timeRange (mock - take last N months)
      let filtered = monthlyData;
      if (timeRange === '1m') filtered = monthlyData.slice(-1);
      else if (timeRange === '3m') filtered = monthlyData.slice(-3);
      else if (timeRange === '6m') filtered = monthlyData.slice(-6);
      // 12m = all

      const totalLeads = filtered.reduce((sum, d) => sum + d.leads, 0);
      const qualified = filtered.reduce((sum, d) => sum + d.qualified, 0);
      const converted = filtered.reduce((sum, d) => sum + d.converted, 0);

      const prevMonth = monthlyData[monthlyData.length - 2] || { leads: 0 };
      const currMonth = monthlyData[monthlyData.length - 1];
      const leadGrowth = ((currMonth.leads - prevMonth.leads) / prevMonth.leads * 100).toFixed(1);

      setStats({
        totalLeads,
        qualifiedLeads: qualified,
        convertedLeads: converted,
        conversionRate: totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) + '%' : '0%',
        leadGrowth: leadGrowth > 0 ? `+${leadGrowth}%` : `${leadGrowth}%`,
        monthlyData: filtered,
      });

      setLoading(false);
    }, 800);
  }, [timeRange]);

  const StatCard = ({ title, value, change, icon: Icon, color = 'text-secondary' }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text', 'bg')}/10`}>
          <Icon size={24} className={color} />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {parseFloat(change) >= 0 ? (
            <ArrowUpRight size={16} className="text-green-600" />
          ) : (
            <ArrowDownRight size={16} className="text-red-600" />
          )}
          <span className={parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'}>
            {change} this month
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Performance</h1>
            <p className="text-gray-600 mt-1">Track your leads, conversions and growth over time</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-secondary outline-none"
            >
              <option value="1m">Last 1 Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
            </select>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Leads" 
            value={stats.totalLeads.toLocaleString()} 
            change={stats.leadGrowth}
            icon={Users}
          />
          <StatCard 
            title="Qualified Leads" 
            value={stats.qualifiedLeads.toLocaleString()} 
            icon={CheckCircle2}
            color="text-green-600"
          />
          <StatCard 
            title="Converted" 
            value={stats.convertedLeads.toLocaleString()} 
            icon={DollarSign}
            color="text-purple-600"
          />
          <StatCard 
            title="Conversion Rate" 
            value={stats.conversionRate} 
            icon={TrendingUp}
            color="text-amber-600"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar Chart - Monthly Performance */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Monthly Lead Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="leads" name="Total Leads" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="qualified" name="Qualified" fill="#059669" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="converted" name="Converted" fill="#0A0E27" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line + Area Chart - Growth Trend */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Lead Growth Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
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
                  <Line 
                    type="monotone" 
                    dataKey="converted" 
                    stroke="#0A0E27" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    name="Converted" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        )}
      </div>
    </div>
  );
}