'use client';

import { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";


import Link from 'next/link';
import Image from 'next/image';

export function Testimonials() {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Ahmed Al Mansouri",
            role: "Senior Real Estate Consultant",
            company: "Luxury Properties Dubai",
            location: "Dubai Marina",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_19458974c-1763300956934.png",
            alt: "Professional Middle Eastern man in navy suit with confident smile in modern office",
            rating: 5,
            quote: "AI Estate Dubai transformed my business overnight. I'm now capturing leads 24/7, even while I sleep. The WhatsApp integration is seamless, and the lead quality has improved by 40%.",
            results: "+40% qualified leads in first month"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Luxury Property Specialist",
            company: "Elite Estates",
            location: "Palm Jumeirah",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fca82876-1763294352035.png",
            alt: "Professional woman with blonde hair in white blazer smiling confidently in bright office",
            rating: 5,
            quote: "The AI assistant handles initial inquiries perfectly, qualifying leads before they reach me. I can focus on closing deals instead of answering basic questions. Game-changer for high-end properties.",
            results: "3x faster response time"
        },
        {
            id: 3,
            name: "Mohammed Hassan",
            role: "Real Estate Broker",
            company: "Premium Realty Group",
            location: "Downtown Dubai",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1bb3f73-1763293392766.png",
            alt: "Middle Eastern businessman with beard in gray suit standing in modern glass office",
            rating: 5,
            quote: "I was skeptical about AI, but this platform exceeded all expectations. The Arabic language support is flawless, and my clients love the instant responses. ROI was positive within two weeks.",
            results: "AED 2.5M in new deals"
        },
        {
            id: 4,
            name: "Elena Petrova",
            role: "International Property Advisor",
            company: "Global Estates Dubai",
            location: "Emirates Hills",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8b16ff9-1763296233454.png",
            alt: "Professional woman with dark hair in black business suit with warm smile in corporate setting",
            rating: 5,
            quote: "Working with international clients across time zones was challenging. Now, AI Estate captures leads from Europe and Asia while I'm offline. The analytics dashboard helps me optimize my strategy daily.",
            results: "+60% international leads"
        }
    ];

    useEffect(() => {
        if (!isHydrated) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isHydrated, testimonials.length]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            {/* Section Header  */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                    <FaStar size={16} />
                    Trusted by Elite Agents
                </div>
                <h2 className="max-w-3xl mt-6 lg:text-5xl md:text-4xl text-3xl font-semibold text-white text-center leading-none font-playfair">
                    Success Stories from <span className="text-secondary">Dubai's Top Agents</span>
                </h2>
                <p className="text-gray-500 mt-6 lg:text-lg text-center">
                    Join hundreds of successful real estate professionals transforming their business
                </p>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative max-w-5xl mx-auto mt-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Side */}
                        <div className="relative h-64 lg:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
                            {isHydrated ? (
                                <Image
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.alt}
                                    height={100}
                                    width={100}
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <Image
                                    src={testimonials[0].image}
                                    alt={testimonials[0].alt}
                                    height={100}
                                    width={100}
                                    className="w-full h-full object-cover"
                                />

                            )}

                            {/* Results Badge */}
                            <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <FaTrophy className='text-secondary' size={20} />
                                    <span className="font-cta font-semibold text-sm text-foreground">
                                        {isHydrated ? currentTestimonial.results : testimonials[0].results}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        name="StarIcon"
                                        size={16}
                                        className="text-secondary"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                                "{isHydrated ? currentTestimonial.quote : testimonials[0].quote}"
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-playfair font-bold text-xl text-foreground">
                                        {isHydrated ? currentTestimonial.name : testimonials[0].name}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {isHydrated ? currentTestimonial.role : testimonials[0].role}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <FaRegBuilding size={16} className="text-secondary" />
                                        <span className="text-sm text-muted-foreground">
                                            {isHydrated ? currentTestimonial.company : testimonials[0].company}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <IoLocationOutline size={18} className="text-secondary" />
                                        <span className="text-sm text-muted-foreground">
                                            {isHydrated ? currentTestimonial.location : testimonials[0].location}
                                        </span>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handlePrevious}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary cursor-pointer hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                                        aria-label="Previous testimonial"
                                    >
                                        <FaChevronLeft size={15} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary cursor-pointer hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                                        aria-label="Next testimonial"
                                    >
                                        <FaChevronRight size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex items-center justify-center space-x-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${(isHydrated ? currentIndex : 0) === index
                                            ? 'w-8 bg-secondary'
                                            : 'w-2 bg-gray-100'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                {[
                    { icon: "UserGroupIcon", value: "500+", label: "Active Agents" },
                    { icon: "ChatBubbleLeftRightIcon", value: "10K+", label: "Leads Monthly" },
                    { icon: "ChartBarIcon", value: "40%", label: "Avg. Increase" },
                    { icon: "ClockIcon", value: "24/7", label: "Availability" }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-primary backdrop-blur-sm rounded-xl p-6 text-center border border-white"
                    >
                        <Icon name={stat.icon} size={32} className="text-secondary mx-auto mb-3" />
                        <div className="font-playfair font-bold text-3xl text-white mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div> */}
        </section>
    )
}