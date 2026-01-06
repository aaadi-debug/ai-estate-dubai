import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from 'react';
import { FaRegClipboard } from "react-icons/fa";

import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';


import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ className = '' }) {
    return (
        <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
            <div className="flex flex-col justify-center items-center">
                {/* Section Header  */}
                <div className="flex gap-2 items-center text-secondary border border-white rounded-full px-6 py-2 text-sm font-semibold">
                    <GoDotFill size={16} />
                    Bank-Grade Security
                </div>
                <h1 className="2xl:text-[60px] xl:text-[60px] lg:text-[48px] md:text-[64px] text-[36px] text-white mt-6 font-playfair font-semibold leading-none text-center">
                    Your Data, <span className="text-secondary">Protected</span> at Every Level
                </h1>
                <p className="text-gray-500 mt-6 lg:text-lg max-w-3xl text-center">
                    Enterprise-grade security infrastructure trusted by Dubai's elite real estate professionals. GDPR compliant, UAE certified, and built with zero-compromise data protection.
                </p>

                

                <div className="flex gap-10 max-sm:gap-6 justify-start max-sm:justify-center items-center flex-wrap mt-10">
                    <div className="flex gap-2 items-center text-white text-sm">
                        <span className="text-yellow-500"><ShieldCheck size={20} /></span>
                        ISO 27001 Certified
                    </div>
                    <div className="flex gap-2 items-center text-white text-sm">
                        <span className="text-yellow-500"><Lock size={20} /></span>
                        256-bit Encryption
                    </div>
                    <div className="flex gap-2 items-center text-white text-sm">
                        <span className="text-yellow-500"><FaRegClipboard size={20} /></span>
                        GDPR Compliant
                    </div>
                </div>
            </div>
        </section>
    );
}