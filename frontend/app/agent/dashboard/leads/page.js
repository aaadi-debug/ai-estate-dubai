// frontend/app/dashboard/leads/page.js
'use client';

import { useEffect, useState } from 'react';
import {
    Search, Filter, Download, RefreshCw,
    Mail, Phone, Clock, CheckCircle2, XCircle,
    ChevronDown, ChevronUp, User, DollarSign,
    X, Calendar, MapPin, MessageSquare, Plus, Edit3
} from 'lucide-react';
import { format } from 'date-fns';

export default function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, hot, name
    const [selectedLead, setSelectedLead] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const openLeadDetail = (lead) => {
        setSelectedLead(lead);
    };

    useEffect(() => {
        const agentId = localStorage.getItem('agentId');
        if (!agentId) {
            window.location.href = '/login';
            return;
        }

        fetchLeads(agentId);
    }, []);

    const fetchLeads = async (agentId) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/agent?agentId=${agentId}`
            );

            if (!res.ok) throw new Error('Failed to load leads');

            const data = await res.json();
            if (data.leads) {
                // Sort by newest first by default
                const sorted = [...data.leads].sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setLeads(sorted);
                setFilteredLeads(sorted);
            }
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters & search
    useEffect(() => {
        let result = [...leads];

        // Search
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(lead =>
                lead.name?.toLowerCase().includes(term) ||
                lead.phone?.includes(term) ||
                lead.email?.toLowerCase().includes(term) ||
                lead.budget?.toLowerCase().includes(term)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(lead => lead.status === statusFilter);
        }

        // Sorting
        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === 'hot') {
            result.sort((a, b) => {
                const scoreOrder = { Hot: 3, Warm: 2, Cold: 1 };
                return (scoreOrder[b.score] || 0) - (scoreOrder[a.score] || 0);
            });
        } else if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredLeads(result);
        setCurrentPage(1); // reset to first page when filters change
    }, [searchTerm, statusFilter, sortBy, leads]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const markContacted = async (leadId) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}/status`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'contacted' }),
                }
            );

            if (!res.ok) throw new Error('Failed to update');

            // Update both leads arrays
            const updateLead = (arr) => arr.map(l =>
                l._id === leadId ? { ...l, status: 'contacted' } : l
            );

            setLeads(updateLead);
            setFilteredLeads(updateLead);
        } catch (err) {
            console.error(err);
            alert('Failed to mark as contacted');
        }
    };

    const getScoreColor = (score) => {
        switch (score) {
            case 'Hot': return 'bg-red-100 text-red-800';
            case 'Warm': return 'bg-amber-100 text-amber-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    const exportToCSV = () => {
        if (!filteredLeads.length) return;

        const headers = ['Date', 'Name', 'Phone', 'Email', 'Budget', 'Property Type', 'Score', 'Status'];
        const csvRows = filteredLeads.map(lead => [
            format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm'),
            `"${lead.name || ''}"`,
            lead.phone || '',
            lead.email || '',
            lead.budget || '',
            lead.propertyType || '',
            lead.score || 'Cold',
            lead.status || 'new'
        ]);

        const csvContent = [
            headers.join(','),
            ...csvRows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `leads_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">All Leads</h1>
                        <p className="text-gray-600 mt-1">
                            {filteredLeads.length} leads found • Last updated: {format(new Date(), 'MMM d, yyyy HH:mm')}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => fetchLeads(localStorage.getItem('agentId'))}
                            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition"
                        >
                            <RefreshCw size={18} />
                            Refresh
                        </button>

                        <button
                            onClick={exportToCSV}
                            disabled={!filteredLeads.length}
                            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, phone, email or budget..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-secondary outline-none appearance-none"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                            </div>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-secondary outline-none appearance-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="hot">Hot First</option>
                                    <option value="name">By Name</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leads Table */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your leads...</p>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                        <User size={64} className="mx-auto text-gray-300 mb-6" />
                        <h3 className="text-xl font-semibold mb-2">No leads found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            {searchTerm || statusFilter !== 'all'
                                ? "Try adjusting your filters or search terms"
                                : "Share your chatbot widget code to start capturing leads!"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-max">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-medium">Date</th>
                                            <th className="text-left py-4 px-6 font-medium">Name</th>
                                            <th className="text-left py-4 px-6 font-medium">Contact</th>
                                            <th className="text-left py-4 px-6 font-medium">Budget</th>
                                            <th className="text-left py-4 px-6 font-medium">Score</th>
                                            <th className="text-left py-4 px-6 font-medium">Status</th>
                                            <th className="text-left py-4 px-6 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {currentItems.map((lead) => (
                                            <tr
                                                key={lead._id}
                                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                onClick={() => openLeadDetail(lead)}
                                            >
                                                <td className="py-4 px-6 text-gray-600">
                                                    {format(new Date(lead.createdAt), 'MMM d, yyyy • HH:mm')}
                                                </td>
                                                <td className="py-4 px-6 font-medium">{lead.name}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        {lead.phone && (
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Phone size={16} className="text-gray-500" />
                                                                {lead.phone}
                                                            </div>
                                                        )}
                                                        {lead.email && (
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Mail size={16} className="text-gray-500" />
                                                                {lead.email}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign size={16} className="text-gray-500" />
                                                        {lead.budget || '—'}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                                                            {lead.score || 'Cold'}
                                                        </span>

                                                        {/* Visual indicator */}
                                                        {lead.score === 'Hot' && (
                                                            <span className="text-red-500 animate-pulse">●</span>
                                                        )}
                                                        {lead.score === 'Warm' && (
                                                            <span className="text-amber-500">●●</span>
                                                        )}
                                                        {(!lead.score || lead.score === 'Cold') && (
                                                            <span className="text-blue-500">●</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${lead.status === 'contacted'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {lead.status === 'contacted' ? 'Contacted' : 'New'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {lead.status !== 'contacted' && (
                                                        <button
                                                            onClick={() => markContacted(lead._id)}
                                                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                            Mark Contacted
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-600">
                                    Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredLeads.length)} of {filteredLeads.length} leads
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                                            // Simple pagination window
                                            const pageNum = i + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => paginate(pageNum)}
                                                    className={`px-4 py-2 rounded-lg ${currentPage === pageNum
                                                        ? 'bg-secondary text-primary font-medium'
                                                        : 'border hover:bg-gray-50'
                                                        } transition`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal  */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                                <p className="text-gray-500 mt-1">
                                    Lead captured • {format(new Date(selectedLead.createdAt), 'MMM d, yyyy • HH:mm')}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            {/* Left Column - Basic Info */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-5 rounded-xl">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <User size={20} /> Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Phone size={18} className="text-gray-500" />
                                            <span>{selectedLead.phone}</span>
                                        </div>
                                        {selectedLead.email && (
                                            <div className="flex items-center gap-3">
                                                <Mail size={18} className="text-gray-500" />
                                                <span>{selectedLead.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <DollarSign size={20} /> Budget & Preferences
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <DollarSign size={18} className="text-gray-500" />
                                            <span className="font-medium">{selectedLead.budget || 'Not specified'}</span>
                                        </div>
                                        {selectedLead.propertyType && (
                                            <div className="flex items-center gap-3">
                                                <Building size={18} className="text-gray-500" />
                                                <span>{selectedLead.propertyType}</span>
                                            </div>
                                        )}
                                        {selectedLead.locationPrefs?.length > 0 && (
                                            <div className="flex items-start gap-3">
                                                <MapPin size={18} className="text-gray-500 mt-1" />
                                                <div>
                                                    <span>Preferred Locations:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {selectedLead.locationPrefs.map((loc, i) => (
                                                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                                {loc}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Actions & Notes */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-5 rounded-xl">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <MessageSquare size={20} /> Lead Status
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Current Status:</span>
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${selectedLead.status === 'contacted'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {selectedLead.status === 'contacted' ? 'Contacted' : 'New'}
                                            </span>
                                        </div>

                                        {selectedLead.status !== 'contacted' && (
                                            <button
                                                onClick={() => {
                                                    markContacted(selectedLead._id);
                                                    setSelectedLead(prev => ({ ...prev, status: 'contacted' }));
                                                }}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
                                            >
                                                Mark as Contacted
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Notes Section (placeholder for future) */}
                                <div className="bg-gray-50 p-5 rounded-xl">
                                    <h3 className="font-semibold mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit3 size={20} /> Notes
                                        </span>
                                        <button className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1">
                                            <Plus size={16} /> Add Note
                                        </button>
                                    </h3>
                                    <p className="text-gray-500 italic text-center py-6">
                                        No notes added yet
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}