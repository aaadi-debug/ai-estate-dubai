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
} from 'recharts';

export default function PerformanceChart() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const data = [
    { month: 'Jan', leads: 145, qualified: 89, converted: 34 },
    { month: 'Feb', leads: 178, qualified: 112, converted: 45 },
    { month: 'Mar', leads: 203, qualified: 134, converted: 52 },
    { month: 'Apr', leads: 189, qualified: 121, converted: 48 },
    { month: 'May', leads: 234, qualified: 156, converted: 61 },
    { month: 'Jun', leads: 267, qualified: 178, converted: 72 },
  ];

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-md border border-border p-6">
        <h2 className="text-xl lg:text-2xl font-playfair font-bold text-foreground mb-6">
          Performance Overview
        </h2>
        <div className="w-full h-80 flex items-center justify-center bg-muted/30 rounded-lg">
          <p className="text-muted-foreground font-body">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl lg:text-2xl font-playfair font-bold text-foreground mb-6">
        Performance Overview
      </h2>
      <div className="w-full h-80" aria-label="Monthly Performance Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              style={{ fontSize: '14px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <YAxis
              stroke="#64748B"
              style={{ fontSize: '14px', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontFamily: 'Source Sans 3, sans-serif',
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
              }}
            />
            <Bar dataKey="leads" fill="#D4AF37" name="Total Leads" radius={[8, 8, 0, 0]} />
            <Bar dataKey="qualified" fill="#059669" name="Qualified" radius={[8, 8, 0, 0]} />
            <Bar dataKey="converted" fill="#0A0E27" name="Converted" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}