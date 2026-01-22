// frontend/components/Header.js
'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { House, CircleDollarSign, Mail, ShieldCheck, X, UserCircle, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { FaTimes } from "react-icons/fa";
import { LiaChartBarSolid } from "react-icons/lia";
import { IoSearch, IoMenu } from "react-icons/io5";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [plan, setPlan] = useState('none')
  const [isAccountOpen, setIsAccountOpen] = useState(false); // for accordion

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false); // optional: close accordion too
  };

  // Function to get first name from full name
  function getFirstName(fullName) {
    if (!fullName) return 'Agent';

    // Split by space and take first part
    const parts = fullName.trim().split(/\s+/);
    return parts[0]; // first name
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedPlan = localStorage.getItem('plan') || 'none'
    setIsLoggedIn(!!token)
    setPlan(storedPlan)
  }, [])

  // In your sidebar (dashboard/layout.js or wherever)
  const handleLogout = async () => {
    try {
      // Optional: Call backend to clear cookies
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    }

    // Immediately Clear localStorage
    localStorage.clear();

    // Redirect
    window.location.href = '/login';
    // window.location.replace('/login')
  };

  // Mobile auth content — same logic as desktop but vertical + accordion
  const renderMobileAuth = () => {
    if (!isLoggedIn) {
      return (
        <Link
          href="/login"
          className="mt-4 w-full bg-secondary text-primary text-center py-3 px-6 rounded-lg font-semibold hover:scale-105 transition block"
          onClick={closeMobileMenu}
        >
          Login / Register
        </Link>
      );
    }

    const firstName = getFirstName(localStorage.getItem('agentName') || 'Agent');

    if (plan !== 'none') {
      // Paid plan → accordion with many options
      return (
        <div className="mt-4">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="w-full flex items-center justify-between bg-gray-50 text-primary py-3 px-4 rounded-lg font-semibold"
          >
            <span>Hi, {firstName}</span>
            {isAccountOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>

          {isAccountOpen && (
            <div className="mt-1 pl-4 border-l-2 border-gray-200 flex flex-col gap-1 py-2">
              <Link
                href="/agent/dashboard"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                href="/agent/dashboard/leads"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Leads
              </Link>
              <Link
                href="/agent/dashboard/analytics"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Analytics
              </Link>
              <Link
                href="/agent/dashboard/my-plan"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                My Plan
              </Link>
              <Link
                href="/agent/dashboard/profile"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
              <Link
                href="/agent/dashboard/upgrade"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Upgrade
              </Link>
              <Link
                href="/agent/dashboard/settings"
                className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
                onClick={closeMobileMenu}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="py-2 px-3 text-red-600 hover:bg-red-50 rounded-md transition text-left cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      );
    }
    // Logged in but no plan
    return (
      <div className="mt-4">
        <button
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className="w-full flex items-center justify-between bg-gray-50 text-primary py-3 px-4 rounded-lg font-semibold"
        >
          <div className="flex flex-col items-start leading-tight">
            <span>Hi, {firstName}</span>
            <span className="text-xs text-gray-500">(start here)</span>
          </div>
          {isAccountOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>

        {isAccountOpen && (
          <div className="mt-1 pl-4 border-l-2 border-gray-200 flex flex-col gap-1 py-2">
            <Link
              href="/agent-registration/buy-plan"
              className="py-2 px-3 hover:bg-gray-100 rounded-md transition"
              onClick={closeMobileMenu}
            >
              Buy A Plan
            </Link>
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="py-2 px-3 text-red-600 hover:bg-red-50 rounded-md transition text-left"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    );
  };

  // Determine what to show in the header
  const renderAuthSection = () => {
    if (!isLoggedIn) {
      // Not logged in → show Login/Register
      return (
        <Link
          href="/login"
          className="bg-secondary text-center text-primary py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 rounded-lg font-semibold hover:scale-105 transition duration-300 cursor-pointer"
        >
          Login/Register
        </Link>
      );
    }

    // Logged in → always show name, but dropdown only if has paid plan
    if (plan !== 'none') {
      // Has paid plan → full dropdown
      return (
        <div className="relative group">
          <button className="flex items-center gap-2 bg-secondary text-center text-primary py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 rounded-lg font-semibold transition duration-300 cursor-pointer">
            Hi, {getFirstName(localStorage.getItem('agentName') || 'Agent')}
            <ChevronDown size={16} />
          </button>

          {/* Dropdown - only shown if logged in with plan */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-300 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="py-1">
              <Link
                href="/agent/dashboard"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                href="/agent/dashboard/leads"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Leads
              </Link>
              <Link
                href="/agent/dashboard/analytics"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Analytics
              </Link>
              <Link
                href="/agent/dashboard/my-plan"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                My Plan
              </Link>
              <Link
                href="/agent/dashboard/profile"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Profile
              </Link>
              <Link
                href="/agent/dashboard/upgrade"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Upgrade
              </Link>

              <Link
                href="/agent/dashboard/settings"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      // Logged in but plan = 'none' → just name (no dropdown), or redirect to buy-plan
      return (
        <div className="relative group">
          <button
            className="flex items-center gap-2 bg-secondary text-center text-primary py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 rounded-lg font-semibold transition duration-300 cursor-pointer"
          >
            <div className="flex flex-col leading-none">
              Hi, {getFirstName(localStorage.getItem('agentName') || 'Agent')}
              <span className="text-xs p-0 m-0">(start here)</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {/* Dropdown - only shown if logged in with plan */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-300 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="py-1">
              <Link
                href="/agent-registration/buy-plan"
                className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-100 hover:text-secondary transition duration-300"
              >
                Buy A Plan
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-100">
      {/* ====================== LARGE DEVICES ====================== */}
      <div className="hidden lg:block">
        <div className="mx-auto 2xl:px-10 xl:px-8 lg:px-4 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src='/assets/images/logo.png'
              alt='AI Estate Dubai Logo'
              width={100}
              height={100}
              className='rounded-xl 2xl:w-[120px] xl:w-[110px] lg:w-[100px] w-[120px]'
            />
            <div className='flex flex-col'>
              <span className="font-playfair 2xl:text-2xl xl:text-2xl font-bold text-primary leading-none">AI Estate</span>
              <span className="text-2xl font-bold text-secondary leading-none">Dubai</span>
            </div>
          </Link>

          <nav className="flex">
            <Link href="/" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <House size={16} /> Home
            </Link>
            {/* <Link href="/dashboard" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <LiaChartBarSolid size={16} /> Dashboard
            </Link> */}
            <Link href="/pricing" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <CircleDollarSign size={16} /> Pricing
            </Link>
            <Link href="/security" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <ShieldCheck size={16} /> Security
            </Link>
            <Link href="/contact-us" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <Mail size={16} /> Contact Us
            </Link>

            {/* <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link> */}
          </nav>

          {/* Conditional area */}
          <div className="flex items-center gap-4">
            {renderAuthSection()}
          </div>
        </div>
      </div>

      {/* ====================== SMALL DEVICES ====================== */}
      <div className="lg:hidden flex items-center justify-between mx-auto py-3 px-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src='/assets/images/logo.png'
            alt='AI Estate Dubai Logo'
            width={100}
            height={100}
            className='rounded-lg w-[80px]'
          />
          <div className='flex flex-col'>
            <span className="font-playfair text-lg font-bold text-primary leading-none">AI Estate</span>
            <span className="text-lg font-bold text-secondary leading-none">Dubai</span>
          </div>
        </Link>

        {/* Hamburger button */}
        {/* Hamburger / Close button */}
        <button
          onClick={toggleMobileMenu}
          className="bg-gray-100 p-2 rounded cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <IoMenu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-16 inset-0 z-50 flex border-t border-gray-300" onClick={closeMobileMenu}>
          <div className="bg-white w-full h-84 shadow-xl overflow-y-auto p-4" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col">
              <Link href="/" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <House size={20} /> Home
              </Link>
              {/* <Link href="/dashboard" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <LiaChartBarSolid size={20} /> Dashboard
              </Link> */}
              <Link href="/pricing" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <CircleDollarSign size={20} /> Pricing
              </Link>
              <Link href="/security" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <ShieldCheck size={20} /> Security
              </Link>
              <Link href="/contact-us" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <Mail size={20} /> Contact Us
              </Link>


              {/* Authentication block */}
              {renderMobileAuth()}
            </nav>

          </div>
        </div>
      )}
    </header>
  );
}

