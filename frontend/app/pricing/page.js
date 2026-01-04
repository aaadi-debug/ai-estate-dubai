// frontend/app/pricing/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { FaArrowDownLong } from "react-icons/fa6";
import { LuCalculator } from "react-icons/lu";
import { House, CircleDollarSign, Mail, ShieldCheck, Lock, CircleCheck, EllipsisVertical, SendHorizontal, Bell, ChevronDown } from 'lucide-react';
import PricingHero from './components/PricingHero';
import PlanCard from './components/PlanCard';
import PricingInteractive from './components/PricingInteractive';
import ROICalculator from './components/ROICalculator';
import Testimonials from './components/Testimonials';
import ComparisonTable from './components/ComparisonTable';


export default function Pricing() {
    return (
        <>
            <PricingHero />
            <PricingInteractive />
            <ROICalculator />
            <Testimonials />
            <ComparisonTable />
        </>
    )
}