'use client';

import { useState, useEffect } from 'react';
import { LuCalculator } from "react-icons/lu";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';

export default function ROICalculator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [monthlyLeads, setMonthlyLeads] = useState(50);
  const [conversionRate, setConversionRate] = useState(15);
  const [avgDealValue, setAvgDealValue] = useState(3000000);
  const [planCost, setPlanCost] = useState(999);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="bg-muted py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const calculateROI = () => {
    const monthlyDeals = (monthlyLeads * conversionRate) / 100;
    const monthlyRevenue = monthlyDeals * avgDealValue * 0.02; // 2% commission
    const annualRevenue = monthlyRevenue * 12;
    const annualCost = planCost * 12;
    const roi = ((annualRevenue - annualCost) / annualCost) * 100;

    return {
      monthlyLeads,
      conversionRate,
      avgDealValue,
      monthlyRevenue,
      annualRevenue,
      roi
    };
  };

  const result = calculateROI();

  return (
    <section className="bg-[#F1F5F9] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-secondary rounded-full px-6 py-2 mb-6">
            <LuCalculator name="CalculatorIcon" size={20} className="text-secondary" />
            <span className="text-secondary font-cta font-semibold text-sm">ROI Calculator</span>
          </div>
          
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-primary mb-4">
            Calculate Your Return on Investment
          </h2>
          <p className="text-gray-500 font-body text-lg max-w-2xl mx-auto">
            See how AI Estate Dubai can transform your business with real numbers based on Dubai's luxury market
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="font-playfair font-semibold text-xl text-primary mb-4">Your Inputs</h3>
              
              {/* Monthly Leads */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-body font-medium text-primary">Monthly Leads</span>
                  <span className="font-mono text-secondary font-semibold">{monthlyLeads}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>200</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-body font-medium text-primary">Conversion Rate (%)</span>
                  <span className="font-mono text-secondary font-semibold">{conversionRate}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Average Deal Value */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-body font-medium text-primary">Avg Deal Value (AED)</span>
                  <span className="font-mono text-secondary font-semibold">{avgDealValue.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="10000000"
                  step="500000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1M</span>
                  <span>10M</span>
                </div>
              </div>

              {/* Plan Cost */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-body font-medium text-primary">Monthly Plan Cost (AED)</span>
                  <span className="font-mono text-accent font-semibold">{planCost}</span>
                </label>
                <select
                  value={planCost}
                  onChange={(e) => setPlanCost(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-body text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="499">Starter - 499 AED</option>
                  <option value="999">Professional - 999 AED</option>
                  <option value="1999">Elite - 1,999 AED</option>
                </select>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="font-playfair font-semibold text-xl text-primary mb-4">Your Results</h3>
              
              {/* Monthly Revenue */}
              <div className="bg-gradient-to-br from-accent/10 to-gold-bright/10 border border-gray-300 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <AiFillDollarCircle name="CurrencyDollarIcon" size={24} className="text-secondary" />
                  <span className="font-body text-sm text-gray-500">Monthly Revenue</span>
                </div>
                <p className="font-playfair font-bold text-3xl text-primary">
                  {result.monthlyRevenue.toLocaleString('en-AE', { maximumFractionDigits: 0 })} AED
                </p>
                <p className="text-xs text-gray-500 mt-1">Based on 2% commission</p>
              </div>

              {/* Annual Revenue */}
              <div className="border border-gray-300 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <BsBarChartFill name="ChartBarIcon" size={24} className="text-green-600" />
                  <span className="font-body text-sm text-gray-500">Annual Revenue</span>
                </div>
                <p className="font-playfair font-bold text-3xl text-primary">
                  {result.annualRevenue.toLocaleString('en-AE', { maximumFractionDigits: 0 })} AED
                </p>
                <p className="text-xs text-gray-500 mt-1">Projected yearly earnings</p>
              </div>

              {/* ROI */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <FaTrophy name="TrophyIcon" size={24} className="text-secondary" />
                  <span className="font-body text-sm text-white">Return on Investment</span>
                </div>
                <p className="font-playfair font-bold text-4xl text-secondary">
                  {result.roi.toLocaleString('en-AE', { maximumFractionDigits: 0 })}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Annual ROI after plan costs</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-gray-500 font-body mb-4">
              Ready to achieve these results? Start your journey today.
            </p>
            <Link href='/signup' className="px-8 py-4 bg-secondary text-primary rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer">
              <span>Start Here</span>
              <FaArrowRightLong name="ArrowRightIcon" size={20} variant="outline" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}