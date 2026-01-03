'use client';

import { useState } from 'react';
import { HiSparkles } from "react-icons/hi2";
import { Smartphone, Cog, ChevronDown } from 'lucide-react';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiChats } from "react-icons/pi";
import { LuBellRing } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaChartBarSolid } from "react-icons/lia";
import Link from 'next/link';


export function Features() {
    const [expandedFeature, setExpandedFeature] = useState(null);

    // Icon mapping: string name → React component
    const iconMap = {
        PiChats: PiChats,
        LiaChartBarSolid: LiaChartBarSolid,
        LuBellRing: LuBellRing,
        Smartphone: Smartphone,
        MdOutlineGroups: MdOutlineGroups,
        Cog: Cog,
    };

    const features = [
        {
            id: 1,
            icon: "PiChats",
            title: "24/7 AI Lead Capture",
            description: "Never miss an opportunity with round-the-clock intelligent conversation handling",
            details: [
                "Instant response to inquiries at any time",
                "Natural language processing in English and Arabic",
                "Automatic lead qualification and scoring",
                "Seamless handoff to human agents when needed"
            ]
        },
        {
            id: 2,
            icon: "LuBellRing",
            title: "Real-Time Notifications",
            description: "Get instant alerts for qualified leads via WhatsApp, SMS, and email",
            details: [
                "Multi-channel notification delivery",
                "Customizable alert preferences",
                "Priority flagging for high-value leads",
                "Mobile push notifications for urgent inquiries"
            ]
        },
        {
            id: 3,
            icon: "Smartphone",
            title: "Instant SMS/WhatsApp Alerts",
            description: "Connect directly with clients on their preferred messaging platform",
            details: [
                "Official WhatsApp Business API integration",
                "Rich media sharing (property photos, videos)",
                "Automated follow-up sequences",
                "Two-way conversation synchronization"
            ]
        },
        {
            id: 4,
            icon: "LiaChartBarSolid",
            title: "Advanced Analytics",
            description: "Track performance metrics and optimize your lead generation strategy",
            details: [
                "Real-time dashboard with key metrics",
                "Lead source attribution tracking",
                "Conversion rate analysis",
                "ROI calculation and reporting"
            ]
        },
        {
            id: 5,
            icon: "MdOutlineGroups",
            title: "Smart Lead Scoring",
            description: "AI-powered qualification to prioritize your most valuable prospects",
            details: [
                "Budget and timeline assessment",
                "Property preference matching",
                "Buyer intent analysis",
                "Automated lead categorization"
            ]
        },
        {
            id: 6,
            icon: "Cog",
            title: "Custom Branding",
            description: "Maintain your unique brand identity across all client interactions",
            details: [
                "Personalized chatbot appearance",
                "Custom greeting messages",
                "Brand-specific response templates",
                "White-label dashboard options"
            ]
        }
    ];

    const toggleFeature = (id) => {
        setExpandedFeature(expandedFeature === id ? null : id);
    };

    return (
        <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            {/* Section Header  */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                    <HiSparkles size={16} />
                    Powerful Features
                </div>
                <h2 className="max-w-3xl mt-6 lg:text-5xl md:text-4xl text-3xl font-semibold text-primary text-center leading-none font-playfair">
                    Everything You Need to <span className="text-secondary">Dominate</span> Dubai Real Estate
                </h2>
                <p className="text-gray-500 mt-6 lg:text-lg text-center">
                    Cutting-edge AI technology designed specifically for luxury property professionals
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {features.map((feature) => {
                    const IconComponent = iconMap[feature.icon] || PiChats; // fallback icon

                    return (
                        <div
                            key={feature.id}
                            className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-secondary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                            onClick={() => toggleFeature(feature.id)}
                        >
                            {/* Dynamic Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <IconComponent size={24} className="text-secondary" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl font-bold text-primary mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Expandable Details */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="pt-6 border-t border-gray-200 space-y-3">
                                    {feature.details.map((detail, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <IoIosCheckmarkCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Expand Indicator */}
                            <div className="flex justify-center mt-6">
                                <ChevronDown
                                    size={24}
                                    className={`text-secondary transition-transform duration-300 ${expandedFeature === feature.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
                <Link
                    href="/signup"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-secondary text-primary rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                    <span>Start Your Free Trial</span>
                    <FaArrowRightLong size={20}  />
                </Link>
            </div>

            {/* Section Content  */}
        </section>
    )
}