'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa6";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('Please fix the errors');
      return;
    }

    setMessage('Logging in...');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'  // ← THIS IS MISSING! Add it
      });

      const data = await res.json();

      if (res.ok) {
        const { token, agent } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('agentId', agent.id);
        localStorage.setItem('plan', agent.plan || 'none');
        localStorage.setItem('agentName', agent.name || 'Agent');
        localStorage.setItem('agentEmail', agent.email || 'agent@example.com');
        localStorage.setItem('agentPhone', agent.phone || '+919876543210');

        setMessage('Success! Redirecting...');

        // // Decide redirect based on plan
        // if (data.agent.plan && data.agent.plan !== 'none') {
        //   setTimeout(() => window.location.href = '/agent/dashboard', 1500);
        // } else {
        //   setTimeout(() => window.location.href = '/agent-registration/buy-plan', 1500); // or /checkout
        // }
        // Decide redirect based on plan
        const targetPath = (agent.plan && agent.plan !== 'none')
          ? '/agent/dashboard'                  // has plan → dashboard
          : '/agent-registration/buy-plan'; // no plan → buy plan

        setTimeout(() => {
          window.location.href = targetPath;
        }, 1500);
      } else {
        setMessage(data.error || 'Invalid email or password');
        setErrors({ server: data.error || 'Invalid email or password' });
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
      setErrors({ server: 'Network error. Please try again.' });
    }
  };

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
      title: 'Instant Access',
      description: 'Log in and start in seconds',
    },
  ];

  return (
    <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12">
      <div className='grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto'>

        {/* Left Section - Login Form */}
        <div className="w-full bg-white rounded-lg shadow-sm p-8 max-sm:p-4 border border-gray-200">
          <h1 className="text-3xl max-sm:text-xl font-bold font-playfair mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-8 max-sm:text-sm">Log in to your agent dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className='relative'>
              <Mail size={20} className="absolute left-3 top-12 text-gray-500 max-sm:top-10" />
              <label className="block font-medium text-primary mb-2 max-sm:text-sm">
                Email Address <span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className='relative'>
              <Lock size={20} className="absolute left-3 top-12 text-gray-500 max-sm:top-10" />
              <label className="block font-medium text-primary mb-2 max-sm:text-sm">
                Password <span className='text-red-500'>*</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Server Error */}
            {errors.server && <p className="text-red-500 text-center font-medium">{errors.server}</p>}

            <button
              type="submit"
              className="w-full bg-secondary text-primary rounded-lg py-3 font-medium cursor-pointer hover:scale-105 transition duration-300 max-sm:text-sm"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 max-sm:text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-secondary font-medium hover:underline">
              Sign up here
            </Link>
          </p>

          {message && !errors.server && (
            <p className={`text-center mt-4 font-medium ${message.includes('Success') ? 'text-green-600' : 'text-blue-600'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Right Section - Trust & Benefits */}
        <div className="bg-muted/30 rounded-lg p-6 max-sm:p-4">
          <h3 className="font-playfair text-2xl max-sm:text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <HiSparkles size={24} className="text-secondary" />
            Why Agents Love AI Estate Dubai
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col border border-gray-200 bg-white rounded-lg p-4 items-start gap-3 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <IconComponent size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary max-sm:text-base">
                      {badge.title}
                    </h4>
                    <p className="text-gray-500 mt-0.5 max-sm:text-sm">
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
                <span className="text-sm text-primary">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <AiFillThunderbolt size={16} className="text-secondary" />
                <span className="text-sm text-primary">10,000+ Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTrophy size={16} className="text-secondary" />
                <span className="text-sm text-primary">40% Sales Boost</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}