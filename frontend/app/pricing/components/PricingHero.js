'use client';

import { useEffect, useState } from 'react';
import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';

import Link from "next/link";

const PricingHero = () => {
    return (
        <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
            <div className="flex flex-col justify-center items-center">
                {/* Section Header  */}
                <div className="flex gap-2 items-center text-secondary border border-white rounded-full px-6 py-2 text-sm font-semibold">
                    <HiSparkles size={16} />
                    Premium Plans for Elite Agents
                </div>
                <h1 className="2xl:text-[60px] xl:text-[60px] lg:text-[48px] md:text-[64px] text-[36px] text-white mt-6 font-playfair font-semibold leading-none text-center">
                    Invest in Your <span className="text-secondary">Success</span>
                </h1>
                <p className="text-gray-500 mt-6 lg:text-lg max-w-3xl text-center">
                    Choose the perfect plan to capture every lead, maximize conversions, and dominate Dubai's luxury real estate market. Trusted by 500+ elite agents.
                </p>

                {/* Section Content  */}
                <div className="flex max-sm:flex-col gap-4 items-center mt-10 w-full justify-center">
                    <Link
                        href='#plans'
                        className="flex gap-2 justify-center items-center text-center bg-secondary text-primary py-4 px-8 rounded-lg font-semibold hover:scale-105 transition duration-300 max-sm:w-full"
                    >View Plans <FaArrowDownLong size={16} /></Link>

                    <Link
                        href=''
                        className="flex gap-2 justify-center items-center text-center bg-transparent text-white border border-white py-4 px-8 rounded-lg font-semibold max-sm:w-full"
                    ><LuCalculator size={18} /> Calculate ROI</Link>
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
    )
}

export default PricingHero