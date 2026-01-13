import { IoSettingsOutline } from "react-icons/io5";
import { BsBarChart } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";

export default function Actions() {
  const actions = [
    {
      title: "Customize Chatbot",
      description: "Update responses and branding",
      icon: IoSettingsOutline,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BsBarChart,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Integration Status",
      description: "Manage WhatsApp & CRM",
      icon: FaLink,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Export Leads",
      description: "Download lead data",
      icon: LuDownload,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl lg:text-2xl font-playfair font-bold text-primary mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;

          return (
            <button
              key={index}
              className="flex flex-col items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-md transition-all duration-300 text-left group"
            >
              <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent size={24} className={action.color} />
              </div>
              <div className="flex-1 ">
                <h3 className="font-semibold text-primary mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}