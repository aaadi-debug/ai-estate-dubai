// frontend/app/pricing/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';
import HeroSection from './components/HeroSection';
import SecurityFeatures from './components/SecurityFeatures';
import DataProtectionSection from './components/DataProtection';


export default function Security() {
    return (
        <>
            <HeroSection />
            <SecurityFeatures />
            <DataProtectionSection />
        </>
    )
}