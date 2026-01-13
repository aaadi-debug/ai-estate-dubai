import Actions from "./components/Actions";
import Integrations from "./components/Integrations";
import Leads from "./components/Leads";
import Overview from "./components/Overview";
import PerformanceChart from "./components/PerformanceChart";


export const metadata = {
    title: 'Dashboard - AI Estate Dubai',
    description: 'Comprehensive lead management interface with real-time notifications, performance analytics, and integration status for Dubai real estate professionals.',
};
export default function DashboardNew() {
    return (
        <main className="bg-[#FAFBFC] pb-20">
            <Overview />
            <section className="grid gap-6 lg:grid-cols-12 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6">
                <div className="2xl:col-span-8 xl:col-span-7 col-span-full">
                    <PerformanceChart />
                </div>
                <div className="2xl:col-span-4 xl:col-span-5 col-span-full">
                    <Actions />
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-12 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6">
                <div className="2xl:col-span-8 xl:col-span-7 col-span-full">
                    <Leads />
                </div>
                <div className="2xl:col-span-4 xl:col-span-5 col-span-full">
                    <Integrations />
                </div>
            </section>
        </main>
    )
}