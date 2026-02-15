import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle } from 'lucide-react';

const ApplicationList = ({ applications }) => {
    return (
        <div className="w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">My Applications</h2>
            {applications.length === 0 ? (
                <div className="text-center p-8 bg-white/50 rounded-xl">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">You haven't applied for any schemes yet.</p>
                </div>
            ) : (
                applications.map((app, index) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-bold text-gray-800">{app.schemeName}</h4>
                            <p className="text-xs text-gray-500">Applied on {app.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {app.status === 'Pending' && <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending</span>}
                            {app.status === 'Approved' && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Approved</span>}
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default ApplicationList;
