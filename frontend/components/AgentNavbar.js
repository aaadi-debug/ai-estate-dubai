// frontend/components/AgentNavbar.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, UserCircle, CreditCard, Settings, LogOut,
    MessageSquare, BarChart3, ShieldCheck
} from 'lucide-react';
import { FiLogOut } from "react-icons/fi";
import { TbSettingsUp } from "react-icons/tb";

const AgentNavbar = () => {
    const pathname = usePathname(); // ← This gives current URL path
    const [agentName, setAgentName] = useState('Agent');
    const [plan, setPlan] = useState('none');

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
        <aside className="bg-primary border-r border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 pt-6 border-b border-gray-500 flex justify-between">
                <div className="flex items-center gap-3 mb-4 w-[80%]">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                        <UserCircle size={24} className="text-secondary" />
                    </div>
                    <div>
                        <p className="font-medium text-white">Hi, {agentName}</p>
                        <p className="text-xs text-secondary capitalize">{plan} Plan</p>
                    </div>
                </div>

                {/* Logout button with tooltip */}
                <div className="relative group">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-red-600 px-4 py-2 rounded-lg cursor-pointer transition"
                    >
                        <FiLogOut />
                    </button>

                    {/* Tooltip - appears BELOW the icon */}
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap
                     bg-white text-primary text-xs font-medium rounded-md px-3 py-2
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     pointer-events-none transition-all duration-200 z-90
                     before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2
                     before:border-4 before:border-transparent before:border-b-white">
                        Log out
                    </span>
                </div>
            </div>

            {/* Nav Items  */}
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
                                        ? 'bg-white text-primary font-medium shadow-sm'
                                        : 'text-white hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-primary' : ''} />
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
        </aside>
    )
}

export default AgentNavbar