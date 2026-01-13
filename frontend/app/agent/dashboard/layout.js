// frontend/app/dashboard/layout.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, UserCircle, CreditCard, Settings, LogOut,
    MessageSquare, BarChart3, ShieldCheck
} from 'lucide-react';
import { TbSettingsUp } from "react-icons/tb";


export default function DashboardLayout({ children }) {
    const pathname = usePathname(); // ← This gives current URL path
    const [agentName, setAgentName] = useState('Agent');
    const [plan, setPlan] = useState('none');

    // useEffect(() => {
    //     const id = localStorage.getItem('agentId');
    //     const currentPlan = localStorage.getItem('plan');

    //     if (!id) {
    //         window.location.href = '/login';
    //         return;
    //     }

    //     if (!currentPlan || currentPlan === 'none') {
    //         window.location.href = '/agent-registration/buy-plan';
    //         return;
    //     }

    //     // setAgentId(id);
    //     // fetchLeads(id);
    // }, []);

    useEffect(() => {
        const name = localStorage.getItem('agentName') || 'Agent';
        const userPlan = localStorage.getItem('plan') || 'none';
        setAgentName(name.split(' ')[0]); // First name only
        setPlan(userPlan);
    }, []);

    // In your sidebar (dashboard/layout.js or wherever)
    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error:', err);
        }

        // Clear localStorage
        localStorage.clear();

        // Redirect
        window.location.href = '/login';
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/agent/dashboard', active: true },
        { icon: Users, label: 'Leads', href: '/agent/dashboard/leads' },
        // { icon: MessageSquare, label: 'Conversations', href: '/agent/dashboard/conversations' },
        { icon: BarChart3, label: 'Analytics', href: '/agent/dashboard/analytics' },
        { icon: CreditCard, label: 'My Plan', href: '/agent/dashboard/my-plan' },
        { icon: UserCircle, label: 'Profile', href: '/agent/dashboard/profile' },
        { icon: TbSettingsUp, label: 'Upgrade', href: '/agent/dashboard/upgrade' },
        { icon: Settings, label: 'Settings', href: '/agent/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-primary">AI Estate</h1>
                    <p className="text-sm text-gray-500 mt-1">Agent Dashboard</p>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/agent/dashboard' && pathname.startsWith(item.href));

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-secondary/10 text-secondary font-medium shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon size={20} className={isActive ? 'text-secondary' : ''} />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                            <UserCircle size={24} className="text-secondary" />
                        </div>
                        <div>
                            <p className="font-medium">Hi, {agentName}</p>
                            <p className="text-xs text-gray-500 capitalize">{plan} Plan</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg cursor-pointer transition">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}