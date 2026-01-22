'use client';

import { Star, MessageSquareText, ArrowRight } from 'lucide-react';
import { PiChats } from "react-icons/pi";
import Image from 'next/image';
import Link from 'next/link';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: 'Ahmed Al Mansouri',
            role: 'Senior Real Estate Consultant',
            company: 'Dubai Marina Properties',
            image: "/assets/images/Ahmed.png",
            alt: 'Professional Middle Eastern man in navy suit with confident smile in modern office',
            plan: 'Elite Plan',
            quote: 'AI Estate Dubai transformed my business. I never miss a lead, even when I\'m showing properties. The ROI is incredible - I closed 3 deals in the first month that came directly from the chatbot.',
            metrics: [
                { label: 'Lead Increase', value: '+65%' },
                { label: 'Response Time', value: '< 2 min' },
                { label: 'Monthly Deals', value: '+8' }
            ]
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            role: 'Luxury Property Specialist',
            company: 'Palm Jumeirah Estates',
            image: "/assets/images/Sarah.png",
            alt: 'Professional woman with blonde hair in elegant business attire smiling in bright office',
            plan: 'Professional Plan',
            quote: 'The 24/7 lead capture is a game-changer. My clients love the instant responses, and I love waking up to qualified leads every morning. Best investment I\'ve made in my career.',
            metrics: [
                { label: 'Lead Quality', value: '+40%' },
                { label: 'Client Satisfaction', value: '98%' },
                { label: 'Time Saved', value: '15 hrs/week' }
            ]
        },
        {
            id: 3,
            name: 'Elena Petrova',
            role: 'Sales Manager',
            company: 'Global Estates Dubai',
            image: "/assets/images/Elena.png",
            alt: 'Middle Eastern businessman with beard in gray suit standing in modern corporate lobby',
            plan: 'Elite Plan',
            quote: 'The white-glove service and dedicated account manager make all the difference. They helped optimize my chatbot for Dubai\'s luxury market, and now I\'m closing deals worth AED 5M+ monthly.',
            metrics: [
                { label: 'Deal Value', value: '+120%' },
                { label: 'Conversion Rate', value: '22%' },
                { label: 'First Month', value: '+AED 2.4M' }
            ]
        }
    ];

    return (
        <section className="bg-gradient-to-br from-primary via-[#191E38] to-primary py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header  */}
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                        <PiChats name='messageIcon' size={16} />
                        Success Stories
                    </div>
                    <h2 className="max-w-3xl mt-6 lg:text-5xl md:text-4xl text-3xl font-semibold text-white text-center leading-none font-playfair">
                        Trusted by Dubai's <span className="text-secondary">Elite Agents </span>
                    </h2>
                    <p className="text-gray-500 mt-6 lg:text-lg text-center">
                        See how top performers are using AI Estate Dubai to dominate their markets
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-2xl p-8 shadow-luxury hover:scale-105 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.alt}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-playfair font-semibold text-lg text-foreground">{testimonial.name}</h3>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                                </div>
                            </div>

                            {/* Plan Badge */}
                            <div className="inline-flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-1 mb-4">
                                <Star size={14} className="text-secondary fill-current" />
                                <span className="text-secondary text-xs font-semibold">{testimonial.plan}</span>
                            </div>

                            {/* Quote */}
                            <blockquote className="text-foreground text-sm leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                {testimonial.metrics.map((metric, index) => (
                                    <div key={index} className="text-center">
                                        <p className="font-playfair font-bold text-xl text-accent">{metric.value}</p>
                                        <p className="text-gray-500 text-xs mt-1">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-white text-lg mb-6">
                        Join 100+ elite agents who never miss a lead
                    </p>
                    <Link href='/signup' className="px-8 py-4 bg-secondary text-primary rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer">
                        <span>Start Your Success Story</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}