// frontend/app/dashboard/leads/page.js
'use client';

import { useEffect, useState } from 'react';
import {
    Search, Filter, Download, RefreshCw,
    Mail, Phone, Clock, CheckCircle2, XCircle,
    ChevronDown, ChevronUp, User, DollarSign,
    X, Calendar, MapPin, MessageSquare, Plus, Edit3, Building, Eye, Lock, Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, hot, name
    const [selectedLead, setSelectedLead] = useState(null);
    const [plan, setPlan] = useState('starter');


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const openLeadDetail = (lead) => {
        setSelectedLead(lead);
    };


    const isStarter = plan === 'starter';
    const isProfessional = plan === 'professional';
    const isElite = plan === 'elite';

    useEffect(() => {
        const agentId = localStorage.getItem('agentId');
        const storedPlan = localStorage.getItem('plan') || 'starter';

        if (!agentId) {
            window.location.href = '/login';
            return;
        }

        setPlan(storedPlan);
        fetchLeads(agentId);
    }, []);

    // console.log("Active plan: ", plan)

    // Fetch Leads
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
            `${isStarter ? null : (lead.score || 'Cold')}`,
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

    const addNote = async (leadId, text) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}/notes`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, agentId: localStorage.getItem('agentId') }),
                }
            );

            if (!res.ok) throw new Error('Failed to add note');

            const data = await res.json();

            // Update selected lead
            setSelectedLead(data.lead);

            // Also update leads list if needed
            setLeads(prev =>
                prev.map(l => (l._id === leadId ? data.lead : l))
            );

            alert('Note added successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add note');
        }
    };

    const deleteLead = async (leadId) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ agentId: localStorage.getItem('agentId') }),
                }
            );

            if (!res.ok) throw new Error('Failed to delete');

            // Remove from lists
            setLeads(prev => prev.filter(l => l._id !== leadId));
            setFilteredLeads(prev => prev.filter(l => l._id !== leadId));
            if (selectedLead?._id === leadId) setSelectedLead(null);

            alert('Lead deleted successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to delete lead');
        }
    };

    const deleteNote = async (leadId, noteId) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/leads/${leadId}/notes/${noteId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ agentId: localStorage.getItem('agentId') }),
                }
            );

            if (!res.ok) throw new Error('Failed to delete note');

            const data = await res.json();
            setSelectedLead(data.lead);
            setLeads(prev => prev.map(l => (l._id === leadId ? data.lead : l)));

            alert('Note deleted');
        } catch (err) {
            console.error(err);
            alert('Failed to delete note');
        }
    };

    return (
        <div className="p-6 min-h-screen bg-[#FAFBFC]">
            {/* Header */}
            <div className="flex justify-between items-end gap-6  border-b border-gray-300 mb-4 pb-4">
                <div>
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">All Leads</h1>
                    <p className="text-secondary">
                        {filteredLeads.length} leads found • Last updated: {format(new Date(), 'MMM d, yyyy HH:mm')}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => fetchLeads(localStorage.getItem('agentId'))}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg hover:scale-105 transition cursor-pointer"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>

                    <button
                        onClick={exportToCSV}
                        disabled={!filteredLeads.length}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded-lg hover:scale-105 transition disabled:opacity-50 cursor-pointer"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-medium">Date</th>
                                        <th className="text-left py-4 px-6 font-medium">Name</th>
                                        <th className="text-left py-4 px-6 font-medium">Contact</th>
                                        <th className="text-left py-4 px-6 font-medium">Budget</th>
                                        {isStarter ? null : (
                                            <th className="text-left py-4 px-6 font-medium">Score</th>
                                        )}
                                        <th className="text-left py-4 px-6 font-medium">Status</th>
                                        <th className="text-left py-4 px-6 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {currentItems.map((lead) => (
                                        <tr
                                            key={lead._id}
                                            className="hover:bg-gray-50 transition-colors"
                                        // onClick={() => openLeadDetail(lead)}
                                        >
                                            <td className="py-4 px-6 text-gray-600">
                                                {format(new Date(lead.createdAt), 'MMM d, yyyy • HH:mm')}
                                            </td>
                                            <td className="py-4 px-6 font-medium">{lead.name}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col gap-1">
                                                    {lead.phone && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone size={16} className="text-secondary" />
                                                            {lead.phone}
                                                        </div>
                                                    )}
                                                    {lead.email && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail size={16} className="text-secondary" />
                                                            {lead.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 uppercase">
                                                    <DollarSign size={16} className="text-secondary" />
                                                    {lead.budget || '—'}
                                                </div>
                                            </td>

                                            {isStarter ? null : (
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
                                            )}

                                            <td className="py-4 px-6">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${lead.status === 'contacted'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {lead.status === 'contacted' ? 'Contacted' : 'New'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 flex gap-2 items-center">
                                                <button
                                                    className='bg-blue-100 text-blue-500 rounded-lg p-2 cursor-pointer hover:scale-105 transition duration-300'
                                                    onClick={() => openLeadDetail(lead)}
                                                >
                                                    <Eye size={18} />
                                                    {/* View */}
                                                </button>
                                                {lead.status !== 'contacted' && (
                                                    <button
                                                        onClick={() => markContacted(lead._id)}
                                                        className="text-primary bg-secondary px-6 py-2 rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
                                                    >
                                                        {/* <CheckCircle2 size={16} /> */}
                                                        Mark Contacted
                                                    </button>
                                                )}
                                                {!isStarter ? (
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this lead? This cannot be undone.')) {
                                                                deleteLead(lead._id);
                                                            }
                                                        }}
                                                        className="bg-red-600 text-white p-2 rounded-lg hover:scale-105 font-medium flex items-center gap-1 cursor-pointer transition duration-300"
                                                    >
                                                        <Trash2 size={16} />
                                                        {/* Delete */}
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 cursor-not-allowed flex flex-col items-center gap-1 text-xs">
                                                        <span className='flex items-center gap-1 text-red-500'>
                                                            <Lock size={14} />
                                                            Delete
                                                        </span>
                                                        (Upgrade)
                                                    </span>
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

            {/* Modal  */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-300 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                                <p className="text-gray-500 mt-1">
                                    Lead captured • {format(new Date(selectedLead.createdAt), 'MMM d, yyyy • HH:mm')}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            {/* Left Column - Basic Info */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        {/* <User size={20} />  */}
                                        Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <Phone size={16} />
                                            <span>{selectedLead.phone}</span>
                                        </div>
                                        {selectedLead.email && (
                                            <div className="flex items-center gap-3 text-gray-500">
                                                <Mail size={16} />
                                                <span>{selectedLead.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        {/* <DollarSign size={20} />  */}
                                        Budget & Preferences
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-500 uppercase">
                                            <DollarSign size={16} />
                                            <span className="font-medium">{selectedLead.budget || 'Not specified'}</span>
                                        </div>
                                        {selectedLead.propertyType && (
                                            <div className="flex items-center gap-3 text-gray-500 capitalize">
                                                <Building size={16} />
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
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        {/* <MessageSquare size={20} />  */}
                                        Lead Status
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500">Current Status:</span>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${selectedLead.status === 'contacted'
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
                                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
                                            >
                                                Mark as Contacted
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Notes Section (placeholder for future) */}
                                {/* Notes Section */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            {/* <Edit3 size={20} />  */}
                                            Notes
                                        </span>

                                        {!isStarter ? (
                                            <button
                                                onClick={() => {
                                                    const noteText = prompt('Add a new note:');
                                                    if (noteText?.trim()) {
                                                        addNote(selectedLead._id, noteText);
                                                    }
                                                }}
                                                className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 cursor-pointer"
                                            >
                                                <Plus size={16} /> Add Note
                                            </button>
                                        ) : (
                                            <span className="text-amber-600 text-sm flex items-center gap-1">
                                                <Lock size={14} /> Upgrade to add notes
                                            </span>
                                        )}
                                    </h3>

                                    {isStarter ? (
                                        <div className="relative py-8 text-center opacity-70">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm">
                                                <Lock size={32} className="text-gray-400 mb-3" />
                                                <p className="text-gray-600 font-medium">Notes are a Professional & Elite feature</p>
                                                <Link
                                                    href="/agent/dashboard/my-plan"
                                                    className="mt-4 inline-block bg-secondary text-primary px-5 py-2 rounded-lg text-sm font-medium hover:scale-105 transition"
                                                >
                                                    Upgrade Now
                                                </Link>
                                            </div>
                                            {/* Fake blurred notes for visual effect */}
                                            <div className="space-y-3 blur-sm pointer-events-none">
                                                <div className="h-16 bg-gray-200 rounded"></div>
                                                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                                            </div>
                                        </div>
                                    ) : selectedLead.notes?.length > 0 ? (
                                        <div className="space-y-4 max-h-60 overflow-y-auto pt-2 pr-2">
                                            {selectedLead.notes.map((note, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 relative group">
                                                    <p className="text-gray-800">{note.text}</p>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {format(new Date(note.createdAt), 'MMM d, yyyy • HH:mm')}
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Delete this note?')) {
                                                                deleteNote(selectedLead._id, note._id);
                                                            }
                                                        }}
                                                        className="absolute -top-2 -right-2 transition cursor-pointer bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic text-center py-6">
                                            No notes added yet
                                        </p>
                                    )}
                                </div>
                                {/* <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit3 size={20} /> Notes
                                        </span>
                                        <button className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 cursor-pointer">
                                            <Plus size={16} /> Add Note
                                        </button>
                                    </h3>
                                    <p className="text-gray-500 italic text-center py-6">
                                        No notes added yet
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}