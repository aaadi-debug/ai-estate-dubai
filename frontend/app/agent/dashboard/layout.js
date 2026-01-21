// frontend/app/dashboard/layout.js
'use client';


import AgentNavbar from '@/components/AgentNavbar';


export default function DashboardLayout({ children }) {
    return (
        <div className="grid grid-cols-5 h-[100vh] relative">
            {/* Sidebar */}
            <div className='w-1/5 absolute top-0 left-0 h-full overflow-y-auto overflow-x-hidden'>
                <AgentNavbar />
            </div>

            <div className="col-span-1">
            </div>

            {/* Main Content */}
            <main className="col-span-4 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}