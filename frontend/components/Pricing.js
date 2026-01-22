'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiFillDollarCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoRocketSharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { CiCalculator1 } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { ShieldCheck } from 'lucide-react';
import { PiChats } from "react-icons/pi";


const PricingSection = ({ className = '' }) => {
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    // Icon mapping: string name → React component
    const iconMap = {
        IoRocketSharp: IoRocketSharp,
        FaTrophy: FaTrophy,
        HiSparkles: HiSparkles,
        ShieldCheck: ShieldCheck,
        FaRegCreditCard: FaRegCreditCard,
        LuRefreshCw: LuRefreshCw,
        PiChats: PiChats
    };

    const plans = [
        {
            id: 1,
            name: "Starter",
            monthlyPrice: 149,
            annualPrice: 1499, // 10% discount example
            oneTimeFee: 0,
            period: billingPeriod === 'monthly' ? '/month' : '/year',
            description: "Perfect for individual agents testing AI lead capture",
            features: [
                "24/7 AI Chatbot on your website",
                "Up to 50 conversations/month",
                "Basic Chatbot, No Branding",
                "Email Notifications",
                "Basic Leads Dashboard",
                "Email support (48h response)"
            ],
            popular: false,
            cta: "Buy Starter",
            icon: "IoRocketSharp"
        },
        {
            id: 2,
            name: "Professional",
            monthlyPrice: 349,
            annualPrice: 3499, // ≈ 3769.2, or set fixed 3499 as you have
            oneTimeFee: 199,
            period: billingPeriod === 'monthly' ? '/month' : '/year',
            description: "Premium white-glove service for top agents & teams",
            features: [
                "Everything in Starter",
                "Up to 300 conversations/month",
                "Advanced Chatbot with Branding",
                "Instant SMS Alerts",
                "Google Calendar Auto-booking",
                "Lead Segregation (Hot/Warm/Cold)",
                "Advanced Analytics & Stats",
                "Priority Email Support (2h response)",
                "One-time Setup Assistance",
            ],
            popular: true,
            cta: "Buy Professional",
            icon: "HiSparkles"
        },
        {
            id: 3,
            name: "Elite",
            monthlyPrice: 499,
            annualPrice: 4799, // ≈ 5389.2, or fixed 4599
            oneTimeFee: 499,
            period: billingPeriod === 'monthly' ? '/month' : '/year',
            description: "Premium solution for top-performing agents and teams",
            features: [
                "Everything in Professional",
                "Unlimited conversations",
                "Custom Chatbot Branding & Flows",
                "Instant SMS & Email Notifications",
                "WhatsApp Integration",
                "Premium Dashboard'",
                "Advanced Anti-spam (CAPTCHA + Honeypot)",
                "Performance Analytics & Custom Reports",
                "Priority Email Support (30 mins response)",
                "White-label Dashboard",
                "Dedicated Account Manager",
                "White-glove Onboarding",
                "24/7 Phone & WhatsApp Support",
                "Custom AI Training (coming Q2 2026)",
            ],
            popular: false,
            cta: "Buy Elite",
            icon: "FaTrophy"
        }
    ];

    return (
        <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            {/* Section Header  */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                    <AiFillDollarCircle size={16} />
                    Transparent Pricing
                </div>
                <h2 className="max-w-3xl mt-6 lg:text-5xl md:text-4xl text-3xl font-semibold text-primary text-center leading-none font-playfair">
                    Choose Your <span className="text-secondary">Success Plan</span>
                </h2>
                <p className="text-gray-500 mt-6 lg:text-lg text-center">
                    Flexible pricing designed for Dubai's real estate professionals. No hidden fees.
                </p>
            </div>

            {/* Pricing Main Content */}
            <div className="text-center max-w-3xl mx-auto mb-16 mt-10">
                {/* Billing Toggle */}
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
                    <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-2 cursor-pointer rounded-full font-cta font-semibold text-sm transition-all duration-300 ${billingPeriod === 'monthly'
                            ? 'bg-secondary text-primary shadow-md'
                            : 'text-gray-500 hover:text-foreground'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingPeriod('annual')}
                        className={`px-6 py-2 cursor-pointer rounded-full font-cta font-semibold text-sm transition-all duration-300 relative ${billingPeriod === 'annual'
                            ? 'bg-secondary text-primary shadow-md'
                            : 'text-gray-500 hover:text-foreground'
                            }`}
                    >
                        Annual
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                            Save 10%
                        </span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {plans.map((plan) => {
                    const IconComponent = iconMap[plan.icon] || IoRocketSharp; // fallback icon
                    const currentPrice = billingPeriod === 'monthly'
                        ? plan.monthlyPrice
                        : plan.annualPrice;

                    const savings = billingPeriod === 'annual'
                        ? Math.round(plan.monthlyPrice * 12 - plan.annualPrice)
                        : 0;
                    return (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${plan.popular
                                ? 'border-secondary shadow-xl scale-105'
                                : 'border-gray-200 hover:border-accent/50'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-secondary text-primary px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                <IconComponent size={28} className="text-secondary" />
                            </div>

                            {/* Plan Name */}
                            <h3 className="font-playfair font-bold text-2xl text-foreground mb-2">
                                {plan.name}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-sm text-gray-500 mr-1">USD</span>
                                    <span className="font-playfair font-bold text-4xl text-foreground">
                                        {currentPrice.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {billingPeriod === 'monthly' ? '/month' : '/year'}
                                    </span>
                                </div>

                                {billingPeriod === 'annual' && savings > 0 && (
                                    <p className="text-sm text-green-600 mt-2">
                                        Save USD {savings} annually (vs monthly billing)
                                    </p>
                                )}

                                {plan.oneTimeFee > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        + USD {plan.oneTimeFee} one-time setup fee
                                    </p>
                                )}
                            </div>


                            {/* CTA Button */}
                            <Link
                                href={plan.id === 3 ? '/signup' : '/signup'}
                                className={`block w-full text-center px-6 py-3 rounded-lg font-cta font-semibold transition-all duration-300 mb-6 ${plan.popular
                                    ? 'bg-secondary text-primary hover:scale-105 shadow-lg'
                                    : 'bg-gray-100 text-black hover:bg-secondary hover:text-primary'
                                    }`}
                            >
                                {plan.cta}
                            </Link>

                            {/* Features List */}
                            <div className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <IoIosCheckmarkCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-500">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ROI Calculator CTA */}
            <div className="bg-primary from-primary to-secondary rounded-2xl p-8 text-center">
                <h3 className="font-playfair font-bold text-2xl text-white mb-4">
                    Calculate Your ROI
                </h3>
                <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
                    See how much revenue you could generate with AI Estate Dubai. Most agents see positive ROI within the first month.
                </p>
                <Link
                    href="/pricing"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-secondary text-primary rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                    <CiCalculator1 size={20} />
                    <span>Try ROI Calculator</span>
                </Link>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {
                    [
                        { icon: "ShieldCheck", text: "Money-back guarantee" },
                        { icon: "FaRegCreditCard", text: "Start easily with your credit/debit card" },
                        { icon: "LuRefreshCw", text: "Cancel anytime" },
                        { icon: "PiChats", text: "24/7 support" }
                    ].map((item, index) => {
                        const IconComponent = iconMap[item.icon] || IoRocketSharp; // fallback icon
                        return (
                            <div key={index} className="flex items-center space-x-3 justify-center">
                                <IconComponent size={20} className="text-secondary" />
                                <span className="text-sm text-gray-500">{item.text}</span>
                            </div>
                        )
                    })}
            </div>
        </section>
    );
};

export default PricingSection;