'use client';

import { useState, useEffect } from 'react';

import {
    Bell,
    Plus,
    X,
} from 'lucide-react';
import { PiChats } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaRegChartBar } from "react-icons/fa";


export default function Overview() {
    const [isHydrated, setIsHydrated] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const stats = [
        {
            title: "Total Leads",
            value: "1,247",
            change: "+12.5%",
            isPositive: true,
            icon: HiMiniUserGroup,
        },
        {
            title: "Active Conversations",
            value: "89",
            change: "+8.2%",
            isPositive: true,
            icon: PiChats,
        },
        {
            title: "Qualified Leads",
            value: "456",
            change: "+15.3%",
            isPositive: true,
            icon: HiMiniCheckBadge,
        },
        {
            title: "Conversion Rate",
            value: "36.6%",
            change: "+2.4%",
            isPositive: true,
            icon: FaRegChartBar,
        },
    ];

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const handleNotificationToggle = () => {
        if (isHydrated) {
            setShowNotifications(!showNotifications);
        }
    };

    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-muted rounded-lg"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="h-24 bg-muted rounded-lg"></div>
                            <div className="h-24 bg-muted rounded-lg"></div>
                            <div className="h-24 bg-muted rounded-lg"></div>
                            <div className="h-24 bg-muted rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="pt-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 lg:mt-12 md:mt-8 mt-6 relative">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-playfair font-bold text-primary mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 font-body">
                        Welcome back! Here&apos;s your lead overview
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleNotificationToggle}
                        className="relative p-3 bg-white rounded-lg border border-gray-200 hover:border-secondary transition-colors duration-300 cursor-pointer"
                        aria-label="Notifications"
                    >
                        <Bell size={20} className="text-primary" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
                    </button>
                    {/* <button className="px-6 py-3 bg-secondary text-primary rounded-md font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 cursor-pointer">
                                <Plus size={20} />
                                <span>New Lead</span>
                            </button> */}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            isPositive={stat.isPositive}
                            IconComponent={stat.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Notification Panel */}
            {showNotifications && (
                <div className="fixed top-20 right-4 w-80 bg-white rounded-lg border border-gray-200 p-6 z-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-playfair font-bold text-primary">Notifications</h3>
                        <button
                            onClick={handleNotificationToggle}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer"
                            aria-label="Close notifications"
                        >
                            <X size={20} className="text-primary" />
                        </button>
                    </div>
                    <div className="space-y-3">
                    </div>
                </div>
            )}
        </section>
    );
}


const StatCard = ({ title, value, change, isPositive, IconComponent }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-primary">
                        {value}
                    </h3>
                </div>
                <div className={`p-3 rounded-lg ${isPositive ? 'bg-secondary' : 'bg-red-500'}`}>
                    <IconComponent
                        size={24}
                        className={isPositive ? 'text-primary' : 'text-white'}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <span className={`text-sm font-body font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {change}
                </span>
                <span className="text-sm font-body text-gray-500 ml-2">
                    vs last month
                </span>
            </div>
        </div>
    );
};