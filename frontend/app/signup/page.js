'use client';

import { useState } from 'react';
import Link from 'next/link';
import AgentRegistratonForm from '@/components/AgentRegistratonForm';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa6";

export default function Signup() {
  const trustBadges = [
    {
      icon: IoShieldCheckmarkSharp,
      title: 'Secure & Encrypted',
      description: 'Bank-level 256-bit SSL encryption',
    },
    {
      icon: IoIosCheckmarkCircle,
      title: 'UAE Certified',
      description: 'Registered business in Dubai',
    },
    {
      icon: HiUserGroup,
      title: '500+ Agents',
      description: 'Trusted by elite professionals',
    },
    {
      icon: AiFillClockCircle,
      title: 'Instant Setup',
      description: 'Live in under 5 minutes',
    },
  ];

  return (
    <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12">
      <div className='grid lg:grid-cols-2 gap-6'>
        {/* Left Section  */}
        <div>
          <AgentRegistratonForm />
        </div>

        {/* Right Section  */}
        <div className="bg-muted/30 rounded-lg p-6 max-sm:p-4">
          <h3 className="font-playfair text-2xl max-sm:text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <HiSparkles size={24} className="text-secondary" />
            Why Choose AI Estate Dubai?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;

              return (
                <div key={index} className="flex flex-col border border-gray-200 bg-white rounded-lg p-4 items-start gap-3 hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <IconComponent size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary max-sm:text-base">
                      {badge.title}
                    </h4>
                    <p className="text-gray-500  mt-0.5 max-sm:text-sm">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <FaStar size={16} className="text-secondary" />
                <span className="text-sm  text-primary">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <AiFillThunderbolt size={16} className="text-secondary" />
                <span className="text-sm  text-primary">10,000+ Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTrophy size={16} className="text-secondary" />
                <span className="text-sm  text-primary">40% Increase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}