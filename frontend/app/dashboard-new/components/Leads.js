import {
  Plus,
  Eye,
  ChatBubbleLeft,
  EllipsisVertical,
} from 'lucide-react';
import Image from 'next/image';
import { IoFlagSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { PiChats } from "react-icons/pi";

export default function Leads() {
  const leads = [
    {
      id: "L001",
      name: "Ahmed Al Maktoum",
      email: "ahmed.almaktoum@example.ae",
      phone: "+971 50 123 4567",
      property: "Palm Jumeirah Villa",
      budget: "AED 15,000,000",
      status: "new",
      priority: "high",
      source: "WhatsApp",
      timestamp: "2 minutes ago",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1723d6ff3-1763294365385.png",
      alt: "Professional Middle Eastern businessman in white kandura with confident smile"
    },
    {
      id: "L002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+971 55 987 6543",
      property: "Downtown Dubai Penthouse",
      budget: "AED 8,500,000",
      status: "contacted",
      priority: "high",
      source: "Website Chat",
      timestamp: "15 minutes ago",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18811c304-1763296452128.png",
      alt: "Professional woman with blonde hair in business attire smiling at camera"
    },
    {
      id: "L003",
      name: "Mohammed Hassan",
      email: "m.hassan@example.ae",
      phone: "+971 52 456 7890",
      property: "Dubai Marina Apartment",
      budget: "AED 3,200,000",
      status: "qualified",
      priority: "medium",
      source: "SMS",
      timestamp: "1 hour ago",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_197c13e05-1763296541243.png",
      alt: "Young Middle Eastern man in navy suit with professional demeanor"
    },
    {
      id: "L004",
      name: "Elena Petrova",
      email: "elena.p@example.com",
      phone: "+971 56 234 5678",
      property: "Emirates Hills Villa",
      budget: "AED 22,000,000",
      status: "negotiating",
      priority: "high",
      source: "Email",
      timestamp: "3 hours ago",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16091a4bc-1763293415295.png",
      alt: "Elegant woman with dark hair in professional black blazer"
    },
    {
      id: "L005",
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "+971 54 876 5432",
      property: "Business Bay Office",
      budget: "AED 5,800,000",
      status: "contacted",
      priority: "medium",
      source: "WhatsApp",
      timestamp: "5 hours ago",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_102e495dc-1763293449995.png",
      alt: "Asian businessman in gray suit with glasses and professional smile"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-secondary/10 text-secondary',
      contacted: 'bg-blue-500/10 text-blue-600',
      qualified: 'bg-green-50 text-green-500',
      negotiating: 'bg-red-50 text-red-500'
    };
    return colors[status];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-gray-500'
    };
    return colors[priority];
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl lg:text-2xl font-playfair font-bold text-primary">
            Recent Leads
          </h2>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 text-primary rounded-md font-medium hover:bg-muted/80 transition-colors duration-300 flex items-center gap-2 cursor-pointer">
              <CiFilter size={18} />
              <span>Filter</span>
            </button>
            {/* <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md font-cta font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              <Plus size={18} />
              <span>Add Lead</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Lead</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary hidden lg:table-cell">Property</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary hidden md:table-cell">Budget</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border divide-gray-300">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={lead.avatar}
                        alt={lead.alt}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-primary truncate">{lead.name}</p>
                      <p className="text-sm text-gray-500 truncate">{lead.email}</p>
                      <p className="text-xs text-gray-500 mt-1">{lead.timestamp}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-primary">{lead.property}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className=" font-semibold text-primary">{lead.budget}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                    <IoFlagSharp size={16} className={getPriorityColor(lead.priority)} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200" aria-label="View lead details">
                      <Eye size={18} className="text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200" aria-label="Contact lead">
                      <PiChats size={18} className="text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors duration-200" aria-label="More options">
                      <EllipsisVertical size={18} className="text-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm  text-gray-500">
            Showing 5 of 1,247 leads
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 bg-gray-200 text-primary rounded-md  font-medium hover:bg-muted/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 bg-secondary text-primary rounded-md  font-medium hover:scale-105 transition-transform duration-300 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}