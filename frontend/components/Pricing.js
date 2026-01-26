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

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { MdOutlineAdsClick } from "react-icons/md";


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
        PiChats: PiChats,

        RiMoneyDollarCircleLine: RiMoneyDollarCircleLine,
        MdNotificationsActive: MdNotificationsActive,
        FaRegCalendarAlt: FaRegCalendarAlt,
        RiCompassDiscoverLine: RiCompassDiscoverLine,
        FaCode: FaCode,
        MdOutlineAdsClick: MdOutlineAdsClick
    };

    const features = [
        {
            id: 1,
            icon: "FaCode",
            title: "Paste One Line of Code on Your Website",
            description: "After signup, you receive a simple embed code. Paste it into your website — the AI assistant activates instantly.",
            trustLine: "Works with any website — no developer required."
        },
        {
            id: 2,
            icon: "RiCompassDiscoverLine",
            title: "Buyers Are Automatically Qualified",
            description: "The AI chats with visitors, asking the right questions: Budget, Preferred area, Property type, Timeline. Only serious buyers move forward.",
            trustLine: "You never waste time on unqualified inquiries."
        },
        {
            id: 3,
            icon: "FaRegCalendarAlt",
            title: "Qualified Buyers Book Directly into Your Calendar",
            description: "Serious buyers choose a time slot and book a viewing. The meeting is added to your Google Calendar automatically.",
            trustLine: "Google Meet link included (or you can call)."
        },
        {
            id: 4,
            icon: "MdNotificationsActive",
            title: "Get Notified Instantly",
            description: "As soon as an appointment is booked, you receive: WhatsApp notification, Email with full buyer details, Calendar invite & SMS Alerts.",
            trustLine: "No follow-ups. No chasing."
        },
        {
            id: 5,
            icon: "RiMoneyDollarCircleLine",
            title: "Focus Only on Buyers Who Are Ready",
            description: "You speak only with qualified buyers who are ready to move forward — not casual browsers.",
            trustLine: "Most agents recover the monthly cost from just one deal."
        }
    ];

    return (
        <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            {/* Section Header  */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                    <AiFillDollarCircle size={16} />
                    How it Works
                </div>
                <h2 className="max-w-3xl mt-6 lg:text-5xl md:text-4xl text-3xl font-semibold text-primary text-center leading-none font-playfair">
                    Turn Website Visitors into <span className="text-secondary">Booked Property</span> Appointments
                </h2>
                <p className="text-gray-500 mt-6 lg:text-lg text-center">
                    No technical work. No manual follow-ups. Fully automated.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                {features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || PiChats; // fallback icon

                    return (
                        <div
                            key={feature.id}
                            className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                        >
                            {/* Dynamic Icon */}
                            <div className='flex gap-2 items-center mb-6'>
                                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent size={18} className="text-secondary" />
                                </div>
                                <div className='font-semibold text-secondary text-lg uppercase'>
                                    Step {index + 1}
                                </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold text-primary mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {feature.description}
                            </p>
                            <p className='text-sm border-t pt-2 border-gray-300'>
                                💡{feature.trustLine}
                            </p>
                        </div>
                    );
                })}

                <div
                    className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                    {/* Dynamic Icon */}
                    <div className='flex gap-2 items-center mb-6'>
                        <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MdOutlineAdsClick size={18} className="text-secondary" />
                        </div>
                        <div className='font-semibold text-secondary text-lg uppercase'>
                            Step 6
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-primary mb-3">
                        Ready to Stop Wasting Time on Bad Leads?
                    </h3>
                    <p className="mb-10 leading-relaxed mt-10">
                        <Link href="/contact-us" className=' bg-secondary text-primary py-3 px-6 rounded-lg'>
                            Book a Free 2-Minute Demo
                        </Link>
                    </p>
                    <p className='text-sm border-t pt-2 border-gray-300'>
                        💡Limited onboarding slots available.
                    </p>
                </div>
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