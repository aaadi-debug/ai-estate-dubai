'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { House, CircleDollarSign, Mail, ShieldCheck, X } from 'lucide-react';
import { FaTimes } from "react-icons/fa";
import { LiaChartBarSolid } from "react-icons/lia";
import { IoSearch, IoMenu } from "react-icons/io5";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
            <Link href="#features" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <House size={16} /> Home
            </Link>
            <Link href="/dashboard" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 hover:text-secondary transition duration-300">
              <LiaChartBarSolid size={16} /> Dashboard
            </Link>
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

          <Link href='' className="bg-secondary text-center text-primary py-2 2xl:px-6 xl:px-6 lg:px-4 px-6 rounded-lg font-semibold hover:scale-105 transition duration-300">Start Free Trial</Link>
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
              <Link href="#features" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <House size={20} /> Home
              </Link>
              <Link href="/dashboard" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <LiaChartBarSolid size={20} /> Dashboard
              </Link>
              <Link href="/pricing" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <CircleDollarSign size={20} /> Pricing
              </Link>
              <Link href="/security" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <ShieldCheck size={20} /> Security
              </Link>
              <Link href="/contact-us" className="flex gap-2 items-center text-primary font-semibold hover:bg-gray-100 rounded-lg py-3 px-2 hover:text-secondary transition duration-300">
                <Mail size={20} /> Contact Us
              </Link>

              {/* <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link> */}
              <Link href='' className="mt-2 w-full bg-secondary text-primary text-center py-3 px-6 rounded-lg font-semibold hover:scale-105 transition duration-300">Start Free Trial</Link>
            </nav>

          </div>
        </div>
      )}
    </header>
  );
}