'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { FaArrowRightLong } from "react-icons/fa6";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';

export function Herosection() {
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeMessage, setActiveMessage] = useState(0);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const interval = setInterval(() => {
            setActiveMessage((prev) => (prev + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHydrated]);

    const chatMessages = [
        { text: "Hi! I'm interested in a 3-bedroom villa in Palm Jumeirah", sender: "client" },
        { text: "Perfect! I have several luxury options available. What's your budget range?", sender: "ai" },
        { text: "Around AED 8-10 million", sender: "client" }
    ];

    return (
        <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
            <div className="grid lg:grid-cols-2 gap-4 max-sm:gap-10">
                {/* Left Side  */}
                <div className=" flex flex-col">
                    <div className="flex gap-2 items-center text-secondary border border-white rounded-full px-6 py-2 mr-auto text-sm font-semibold">
                        <HiSparkles size={16} />
                        AI-Powered Real Estate Intelligence
                    </div>
                    <h1 className="2xl:text-[60px] xl:text-[60px] lg:text-[48px] md:text-[64px] text-[36px] text-white mt-6 font-playfair font-semibold leading-none">
                        Never Miss a Lead <span className="text-secondary">Again</span>
                    </h1>
                    <p className="text-gray-500 mt-6 lg:text-lg">
                        24/7 AI-powered lead capture for Dubai's elite real estate professionals. Instant notifications, intelligent responses, and seamless WhatsApp integration.
                    </p>
                    <div className="flex max-sm:flex-col gap-4 items-center mt-10">
                        <Link
                            href=''
                            className="flex gap-2 justify-center items-center text-center bg-secondary text-primary py-4 px-8 rounded-lg font-semibold hover:scale-105 transition duration-300 max-sm:w-full"
                        >Start Free Trail <FaArrowRightLong size={16} /></Link>

                        <Link
                            href=''
                            className="flex gap-2 justify-center items-center text-center bg-transparent text-white border border-white py-4 px-8 rounded-lg font-semibold max-sm:w-full"
                        ><CircleDollarSign size={16} /> View Pricing</Link>
                    </div>

                    <div className="flex gap-6 justify-start items-center flex-wrap mt-10">
                        <div className="flex gap-2 items-center text-gray-400 text-xs">
                            <span className="text-green-500"><ShieldCheck size={16} /></span>
                            UAE Certified
                        </div>
                        <div className="flex gap-2 items-center text-gray-400 text-xs">
                            <span className="text-yellow-500"><CircleCheck size={16} /></span>
                            WhatsApp Partner
                        </div>
                        <div className="flex gap-2 items-center text-gray-400 text-xs">
                            <span className="text-green-500"><Lock size={16} /></span>
                            GDPR Compliant
                        </div>
                    </div>
                </div>
                {/* Right Side  */}
                <div className="relative">
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-white">
                        {/* Chat Header */}
                        <div className="bg-primary px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                    <HiSparkles size={18} />
                                </div>
                                <div>
                                    <div className="text-white font-semibold">AI Estate Assistant</div>
                                    <div className="flex items-center space-x-1 text-xs text-green-500">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span>Online 24/7</span>
                                    </div>
                                </div>
                            </div>
                            <EllipsisVertical className='text-white' size={16} />
                        </div>

                        {/* Chat Messages */}
                        <div className="p-6 space-y-4 bg-gradient-to-b from-muted/30 to-background min-h-[400px]">
                            {isHydrated ? (
                                chatMessages.slice(0, activeMessage + 1).map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.sender === 'client' ? 'bg-secondary  rounded-br-none' : 'bg-white rounded-bl-none shadow-md'
                                                }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-card text-foreground rounded-bl-none shadow-md">
                                        <p className="text-sm">Hi! I'm interested in a 3-bedroom villa in Palm Jumeirah</p>
                                    </div>
                                </div>
                            )}

                            {/* Typing Indicator */}
                            {isHydrated && activeMessage < 2 && (
                                <div className="flex justify-start">
                                    <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-none shadow-md">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 bg-card border-t border-border">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                                    disabled
                                />
                                <button className="p-3 bg-secondary text-primary rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                                    <SendHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Floating Notification */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 animate-slide-up">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                                <Bell size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-cta font-semibold text-sm text-primary">New Lead Captured!</div>
                                <p className="text-xs text-gray-500 ">Premium villa inquiry from qualified buyer</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-secondary">
                    <ChevronDown size={40} />
                </div>
            </div>
        </section>
    )
}