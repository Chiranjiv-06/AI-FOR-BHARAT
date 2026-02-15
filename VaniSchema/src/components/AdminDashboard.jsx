import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Users, FileText, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { db } from '../services/db';

const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview'); // overview, users, applications
    const [applications, setApplications] = useState([]);

    // Load data from DB and subscribe to changes
    useEffect(() => {
        // Initial fetch
        setApplications(db.getAll());

        // Subscribe to real-time updates
        const unsubscribe = db.subscribe((updatedData) => {
            setApplications(updatedData);
        });

        return () => unsubscribe();
    }, []);

    const handleAction = (id, action) => {
        // Update DB
        db.updateStatus(id, action === 'approve' ? 'Approved' : 'Rejected');
        // State will auto-update via subscription, but for instant UI feedback we can also set local state if we wanted
    };

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'Pending').length,
        approved: applications.filter(a => a.status === 'Approved').length,
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex text-gray-800 dark:text-gray-100 transition-colors">

            {/* Sidebar */}
            <div className="w-64 bg-brand-darker text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold flex items-center">
                        <span className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center mr-2">V</span>
                        Admin Panel
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        <BarChart2 className="w-5 h-5" />
                        <span>Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'applications' ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                        <FileText className="w-5 h-5" />
                        <span>Applications</span>
                        {stats.pending > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.pending}</span>}
                    </button>
                    <button
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-gray-800`}
                    >
                        <Users className="w-5 h-5" />
                        <span>Users</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={onLogout} className="w-full text-red-400 hover:text-red-300 text-sm font-semibold flex items-center justify-center py-2">
                        Log Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold dark:text-white capitalize">{activeTab}</h2>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-primary outline-none" />
                        </div>
                        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-8">

                    {/* Stats Cards */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Applications</p>
                                        <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.total}</h3>
                                    </div>
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-brand-primary">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Review</p>
                                        <h3 className="text-3xl font-bold mt-2 text-yellow-600">{stats.pending}</h3>
                                    </div>
                                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-600">
                                        <Filter className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Approved</p>
                                        <h3 className="text-3xl font-bold mt-2 text-green-600">{stats.approved}</h3>
                                    </div>
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Applications Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 dark:text-white">Recent Applications</h3>
                            <button className="text-sm text-brand-primary font-medium hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Applicant</th>
                                        <th className="px-6 py-3">Scheme</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs mr-3">
                                                        {app.user.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white text-sm">{app.user}</p>
                                                        <p className="text-xs text-gray-500">{app.location}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{app.scheme}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{app.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${app.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {app.status === 'Pending' && (
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button onClick={() => handleAction(app.id, 'approve')} className="p-1 hover:bg-green-100 text-green-600 rounded transition-colors" title="Approve">
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                        <button onClick={() => handleAction(app.id, 'reject')} className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors" title="Reject">
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
