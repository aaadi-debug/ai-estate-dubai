// frontend/app/agent-registration/buy-plan/page.js
'use client';
import { useEffect, useState, useRef } from 'react';
import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';

import Link from "next/link";
import PlanCard from '@/app/pricing/components/PlanCard';

export default function Pricing() {
    const plansRef = useRef(null);

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: '149',
            oneTimeFee: 0,
            period: 'month',
            description: 'Perfect for individual agents testing AI lead capture',
            features: [
                { text: '24/7 AI Chatbot on your website', included: true },
                { text: 'Up to 200 conversations/month', included: true },
                { text: 'Email Notifications', included: true },
                { text: 'Basic Leads Dashboard', included: true },
                { text: 'Standard Templates', included: true },
                { text: 'Email Support (48h response)', included: true },
                { text: 'WhatsApp Integration', included: false },
                { text: 'Lead Scoring', included: false },
                { text: 'Performance Analytics', included: false },
                { text: 'Google Calendar Auto-booking', included: false },
                { text: 'Priority Support', included: false },
                { text: 'Dedicated Account Manager', included: false },
                { text: 'White-label Option', included: false }
            ],
            isPopular: false,
            ctaText: 'Start Free Trial'
        },
        {
            id: 'professional',
            name: 'Professional',
            price: '499',
            oneTimeFee: 199,
            period: 'month',
            description: 'Premium white-glove service for top agents & teams',
            features: [
                { text: 'Everything in Starter', included: true },
                { text: 'Unlimited conversations', included: true },
                { text: 'Instant SMS Alerts', included: true },
                { text: 'Lead Segregation (Hot/Warm/Cold)', included: true },
                { text: 'Google Calendar Auto-booking', included: true },
                { text: 'Advanced Analytics & Stats', included: true },
                { text: 'Priority Email Support (24h)', included: true },
                { text: 'One-time Setup Assistance', included: true },
                { text: 'Dedicated Account Manager', included: false },
                { text: 'White-label Option', included: false },
                { text: 'API Access', included: false }
            ],
            isPopular: true,
            ctaText: 'Start Free Trial'
        },
        {
            id: 'elite',
            name: 'Elite',
            price: '999',
            oneTimeFee: 499,
            period: 'month',
            description: 'Premium solution for top-performing agents and teams',
            features: [
                { text: '24/7 AI Chatbot on your website', included: true },
                { text: 'WhatsApp Business API Integration', included: true },
                { text: 'Unlimited conversations', included: true },
                { text: 'Unlimited SMS Notifications', included: true },
                { text: 'Instant SMS & Email Notifications', included: true },
                { text: 'Premium Dashboard', included: true },
                { text: 'Advanced Anti-spam (CAPTCHA + Honeypot)', included: true },
                { text: 'Custom Chatbot Branding & Flows', included: true },
                { text: 'Full Custom Branding', included: true },
                { text: 'Lead Scoring & Priority Routing', included: true },
                { text: 'Google Calendar Auto-booking', included: true },
                { text: 'Performance Analytics & Custom Reports', included: true },
                { text: 'Multi-language Support', included: true },
                { text: 'API Access & Webhooks', included: true },
                { text: 'White-label Dashboard', included: true },
                { text: 'Team Accounts (up to 5 users)', included: true },
                { text: 'Dedicated Account Manager', included: true },
                { text: 'White-glove Onboarding', included: true },
                { text: '24/7 Phone & WhatsApp Support', included: true },
                { text: 'Custom AI Training (coming Q2 2026)', included: true }
            ],
            isPopular: false,
            ctaText: 'Contact Sales'
        }
    ];

    return (
        <>
            <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
                <div className="flex flex-col justify-center items-center">
                    {/* Section Header  */}
                    <h1 className="2xl:text-[60px] xl:text-[60px] lg:text-[48px] md:text-[64px] text-[36px] text-white mt-6 font-playfair font-semibold leading-none text-center">
                        Start Your <span className="text-secondary">Journey</span>
                    </h1>
                    <p className="text-gray-500 mt-6 lg:text-lg max-w-3xl text-center">
                        Choose the perfect plan to capture every lead, maximize conversions, and dominate Dubai's luxury real estate market. Trusted by 500+ elite agents.
                    </p>

                    {/* Section Content  */}
                    <div className="flex max-sm:flex-col gap-4 items-center mt-10 w-full justify-center">
                        <Link
                            href='#plans'
                            className="flex gap-2 justify-center items-center text-center bg-secondary text-primary py-4 px-8 rounded-lg font-semibold hover:scale-105 transition duration-300 max-sm:w-full"
                        >Buy A Plan <FaArrowDownLong size={16} /></Link>

                    </div>

                    <div className="flex gap-10 max-sm:gap-6 justify-start max-sm:justify-center items-center flex-wrap mt-10">
                        <div className="flex gap-2 items-center text-gray-400 text-sm">
                            <span className="text-green-500"><ShieldCheck size={20} /></span>
                            UAE Certified
                        </div>
                        <div className="flex gap-2 items-center text-gray-400 text-sm">
                            <span className="text-yellow-500"><CircleCheck size={20} /></span>
                            WhatsApp Partner
                        </div>
                        <div className="flex gap-2 items-center text-gray-400 text-sm">
                            <span className="text-green-500"><Lock size={20} /></span>
                            GDPR Compliant
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section ref={plansRef} className="py-20 px-4 bg-[#FAFBFC]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                name={plan.name}
                                price={plan.price}
                                oneTimeFee={plan.oneTimeFee}
                                period={plan.period}
                                description={plan.description}
                                features={plan.features}
                                isPopular={plan.isPopular}
                                ctaText={plan.ctaText}
                                onSelectPlan={() => handleSelectPlan(plan.id)}
                            />
                        ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 text-center">
                        {/* <p className="text-muted-foreground font-body text-sm mb-4">
                          All plans include 14-day free trial • No credit card required • Cancel anytime
                        </p> */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs">
                            <span>✓ UAE Business Certified</span>
                            <span>✓ GDPR Compliant</span>
                            <span>✓ 256-bit SSL Encryption</span>
                            <span>✓ 99.9% Uptime SLA</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}