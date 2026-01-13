// frontend/app/agent-registration/buy-plan/page.js
'use client';
import { useEffect, useState, useRef } from 'react';
import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';

import Link from "next/link";
import PlanCard from '@/app/pricing/components/PlanCard';
import BuyPlanCard from '@/components/BuyPlanCard';

export default function Pricing() {
    const plansRef = useRef(null);
    const [loadingPlan, setLoadingPlan] = useState(null); // for button loading state

    // Get agentId from localStorage (after login/signup)
    const [agentId, setAgentId] = useState('');

    const planNames = {
        starter: 'Starter',
        professional: 'Professional',
        elite: 'Elite'
    };

    // Optional: also define prices if you want to display in paise or validate
    const planPrices = {
        starter: 14900,
        professional: 49900,
        elite: 99900
    };

    useEffect(() => {
        const id = localStorage.getItem('agentId');
        if (!id) {
            // Redirect to login if not logged in
            window.location.href = '/login';
        } else {
            setAgentId(id);
        }
    }, []);

    console.log("Agent ID for plan purchase:", agentId);

    const handleSelectPlan = async (planId) => {
        if (!agentId) {
            alert('Please log in');
            window.location.href = '/login';
            return;
        }

        setLoadingPlan(planId);

        try {
            console.log('Creating subscription for:', { plan: planId, agentId });

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/razorpay/create-subscription`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: planId, agentId }),
                credentials: 'include',
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert('Error: ' + (errorData.error || 'Failed to create subscription'));
                setLoadingPlan(null);
                return;
            }
            // const { short_url, firstPaymentAmount, monthlyAmount, setupFee } = await res.json();
            const { short_url, firstPaymentAmount, monthlyAmount } = await res.json();

            // Optional: Show friendly message before redirect
            // alert(`You will be charged $${monthlyAmount} USD immediately to start your ${planNames[planId]} plan. Future payments will be monthly. Proceed to payment page?`);

            // Redirect to Razorpay hosted subscription checkout page
            window.location.href = short_url;

            // const { orderId, amount } = await res.json();

            // Load script dynamically
            // const script = document.createElement('script');
            // script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            // script.onload = () => {
            //     const options = {
            //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Must be public/test key
            //         amount,
            //         currency: 'INR',
            //         name: 'AI Estate Dubai',
            //         description: `${planNames[planId] || 'Plan'} Subscription`,
            //         order_id: orderId,
            //         handler: async (response) => {
            //             // Verify on backend
            //             try {
            //                 const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/razorpay/verify-payment`, {
            //                     method: 'POST',
            //                     headers: { 'Content-Type': 'application/json' },
            //                     body: JSON.stringify({
            //                         razorpay_order_id: response.razorpay_order_id,
            //                         razorpay_payment_id: response.razorpay_payment_id,
            //                         razorpay_signature: response.razorpay_signature,
            //                         agentId,
            //                         plan: planId
            //                     })
            //                 });

            //                 const verifyData = await verifyRes.json();

            //                 if (verifyData.success) {
            //                     alert('Payment successful! Plan activated.');
            //                     localStorage.setItem('plan', planId);
            //                     window.location.href = '/agent/dashboard';
            //                 } else {
            //                     alert('Payment verification failed: ' + (verifyData.error || 'Unknown error'));
            //                 }
            //             } catch (err) {
            //                 alert('Verification error');
            //             }
            //         },
            //         prefill: {
            //             name: localStorage.getItem('agentName') || 'Agent',
            //             email: localStorage.getItem('agentEmail') || 'agent@example.com',
            //             contact: localStorage.getItem('agentPhone') || '+919876543210'
            //         },
            //         theme: { color: '#FFD700' }
            //     };

            //     const rzp = new window.Razorpay(options);
            //     rzp.open();
            // };
            // script.onerror = () => {
            //     alert('Failed to load Razorpay checkout');
            // };
            // document.body.appendChild(script);

        } catch (err) {
            console.error('Subscription error:', err);
            alert('Error initiating subscription');
        } finally {
            setLoadingPlan(null);
        }
    };

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: '149',
            // oneTimeFee: 0,
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
            ctaText: 'Buy Starter'
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
            ctaText: 'Buy Professional'
        },
        {
            id: 'elite',
            name: 'Elite',
            price: '999',
            // oneTimeFee: 499,
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
            ctaText: 'Buy Elite'
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <BuyPlanCard
                            key={plan.id}
                            name={plan.name}
                            price={plan.price}
                            // oneTimeFee={plan.oneTimeFee}
                            period={plan.period}
                            description={plan.description}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            ctaText={plan.ctaText}
                            loading={loadingPlan === plan.id}
                            onSelectPlan={() => handleSelectPlan(plan.id)}
                        />
                    ))}
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
                                // oneTimeFee={plan.oneTimeFee}
                                period={plan.period}
                                description={plan.description}
                                features={plan.features}
                                isPopular={plan.isPopular}
                                // ctaText={plan.ctaText}
                                loading={loadingPlan === plan.id}
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