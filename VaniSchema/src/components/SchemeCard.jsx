import React from 'react';
import { FileText, CheckCircle, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

const SchemeCard = ({ scheme, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-brand-primary cursor-pointer active:scale-95 mb-4"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{scheme.local_name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{scheme.name}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                    <IndianRupee className="w-6 h-6 text-brand-primary" />
                </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                {scheme.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 justify-between items-center">
                <div className="flex gap-2">
                    {scheme.eligibility && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" /> Eligible
                        </span>
                    )}
                </div>
                <button
                    className="bg-brand-primary text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md active:scale-95"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(scheme);
                    }}
                >
                    Apply Now
                </button>
            </div>
        </motion.div>
    );
};

export default SchemeCard;
