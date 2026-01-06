
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";

import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';
import { HiMiniServer } from "react-icons/hi2";
import { LuFileCheck } from "react-icons/lu";
import { BsEyeSlashFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";


export default function SecurityFeatures({ className = '' }) {
    const features = [
        {
            id: 1,
            icon: ShieldCheck,
            title: 'End-to-End Encryption',
            description: 'Military-grade AES-256 encryption protects your data in transit and at rest',
            details: [
                'TLS 1.3 for all data transmission',
                'Encrypted database storage',
                'Zero-knowledge architecture',
                'Secure key management system'
            ]
        },
        {
            id: 2,
            icon: Lock,
            title: 'Access Control',
            description: 'Multi-layered authentication and authorization protocols',
            details: [
                'Two-factor authentication (2FA)',
                'Role-based access control (RBAC)',
                'Session management and timeout',
                'IP whitelisting capabilities'
            ]
        },
        {
            id: 3,
            icon: HiMiniServer,
            title: 'Infrastructure Security',
            description: 'Enterprise-grade cloud infrastructure with 99.99% uptime',
            details: [
                'AWS/Azure certified data centers',
                'Automated backup systems',
                'DDoS protection and mitigation',
                'Regular security audits'
            ]
        },
        {
            id: 4,
            icon: LuFileCheck,
            title: 'Compliance & Certifications',
            description: 'Meeting international and regional data protection standards',
            details: [
                'GDPR compliant operations',
                'UAE Data Protection Law adherence',
                'ISO 27001 certified',
                'SOC 2 Type II compliant'
            ]
        },
        {
            id: 5,
            icon: BsEyeSlashFill,
            title: 'Privacy Protection',
            description: 'Your data belongs to you, with complete transparency and control',
            details: [
                'Data anonymization options',
                'Right to deletion (GDPR)',
                'Export your data anytime',
                'No third-party data sharing'
            ]
        },
        {
            id: 6,
            icon: Bell,
            title: 'Threat Monitoring',
            description: '24/7 security operations center monitoring for threats',
            details: [
                'Real-time threat detection',
                'Automated incident response',
                'Security event logging',
                'Vulnerability scanning'
            ]
        }
    ];

    return (
        <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            {/* Section Header  */}
            <div className="flex flex-col items-center justify-center">
                {/* <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                        <PiChats name='messageIcon' size={16} />
                        Success Stories
                    </div> */}
                <h2 className="max-w-3xl lg:text-5xl md:text-4xl text-3xl font-semibold text-primary text-center leading-none font-playfair">
                    Comprehensive Security <span className="text-secondary">Architecture </span>
                </h2>
                <p className="text-gray-500 mt-6 lg:text-lg text-center">
                    Multi-layered protection designed for the most demanding security requirements in Dubai's luxury real estate market
                </p>
            </div>

            {/* Section Content  */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {features.map((feature) => {
                    const IconComponent = feature.icon;

                    return (
                        <div
                            key={feature.id}
                            className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                                    <IconComponent size={24} className="text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-headline text-xl font-bold text-primary mb-2">
                                        {feature.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-gray-500 mb-4 leading-relaxed">
                                {feature.description}
                            </p>

                            <ul className="space-y-2">
                                {feature.details.map((detail, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <FaCircleCheck size={16} className="text-secondary flex-shrink-0 mt-1" />
                                        <span className="text-sm text-primary">{detail}</span>
                                    </li>
                                ))}
                            </ul>
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
                    <FaArrowRightLong size={20} />
                </Link>
            </div>
        </section>
    );
}