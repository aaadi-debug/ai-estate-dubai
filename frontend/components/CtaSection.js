'use client';

import Link from 'next/link';
import { IoRocketSharp } from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';


const CtaSection = ({ className = '' }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    return (
        <section className={`py-20 bg-gradient-to-br from-primary via-[#191E39] to-primary relative overflow-hidden ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsIDE3NSwgNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
                    <IoRocketSharp size={40} className="text-secondary" />
                </div>

                {/* Section Header  */}
                <div className="flex flex-col items-center justify-center">
                    <h2 className="max-w-3xl lg:text-5xl md:text-4xl text-3xl font-semibold text-white text-center leading-none font-playfair">
                        Ready to Transform Your <span className="text-secondary">Real Estate Business?</span>
                    </h2>
                    <p className="text-gray-500 mt-6 lg:text-lg text-center max-w-3xl">
                        Join 500+ elite Dubai agents who never miss a lead. Start your free trial today—no credit card required.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto mt-6">
                    <div className="text-center">
                        <div className="font-playfair font-bold text-3xl text-secondary mb-1">14 Days</div>
                        <div className="text-sm text-gray-400">Free Trial</div>
                    </div>
                    <div className="text-center">
                        <div className="font-playfair font-bold text-3xl text-secondary mb-1">5 Min</div>
                        <div className="text-sm text-gray-400">Setup Time</div>
                    </div>
                    <div className="text-center">
                        <div className="font-playfair font-bold text-3xl text-secondary mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Support</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    {!isLoggedIn && (

                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-secondary text-primary rounded-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        >
                            <span>Start Free Trial</span>
                            <FaArrowRightLong size={20} />
                        </Link>
                    )}

                    {!isLoggedIn ? (
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent backdrop-blur-sm text-white border border-white rounded-lg font-semibold transition-all duration-300"
                        >
                            <PiChats size={20} />
                            <span>Talk to Sales</span>
                        </Link>
                    ) : (
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-secondary text-primary rounded-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        >
                            <PiChats size={20} />
                            <span>Talk to Sales</span>
                        </Link>
                    )}


                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                        <CircleCheck size={16} className="text-green-500" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <LuRefreshCw size={16} className="text-green-500" />
                        <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IoMdTime size={18} className="text-green-500" />
                        <span>Setup in 5 minutes</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;