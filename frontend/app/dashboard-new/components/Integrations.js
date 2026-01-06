import {
    Mail,
} from 'lucide-react';
import { PiChats } from "react-icons/pi";
import { LuDatabase } from "react-icons/lu";
import { GoDeviceMobile } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";

export default function Integrations() {
    const integrations = [
        {
            name: "WhatsApp Business",
            status: "connected",
            icon: PiChats,
            lastSync: "Just now",
        },
        {
            name: "SMS Gateway",
            status: "connected",
            icon: GoDeviceMobile,
            lastSync: "5 minutes ago",
        },
        {
            name: "Email Service",
            status: "syncing",
            icon: Mail,
            lastSync: "Syncing...",
        },
        {
            name: "Calendar",
            status: "connected",
            icon: IoCalendarClearOutline,
            lastSync: "2 hours ago",
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            connected: 'bg-green-50 text-green-600',
            disconnected: 'bg-red-50 text-red-500',
            syncing: 'bg-amber-100 text-amber--500',
        };
        return colors[status];
    };

    const getStatusText = (status) => {
        const text = {
            connected: 'Connected',
            disconnected: 'Disconnected',
            syncing: 'Syncing',
        };
        return text[status];
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl lg:text-2xl font-playfair font-bold text-primary">
                    Integrations
                </h2>
                <button className="px-4 py-2 bg-secondary text-primary rounded-md font-semibold hover:scale-105 transition-transform duration-300 text-sm cursor-pointer">
                    Manage
                </button>
            </div>

            <div className="space-y-4">
                {integrations.map((integration, index) => {
                    const IconComponent = integration.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-secondary transition-colors duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gray-100">
                                    <IconComponent size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className=" font-semibold text-primary mb-1">
                                        {integration.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Last sync: {integration.lastSync}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs  font-medium ${getStatusColor(
                                    integration.status
                                )}`}
                            >
                                {getStatusText(integration.status)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}