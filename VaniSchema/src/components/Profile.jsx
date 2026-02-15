import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Award, Edit3 } from 'lucide-react';

const Profile = ({ language }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-4 pb-24"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-24 bg-brand-primary/10 relative">
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-gray-100" />
                        </div>
                    </div>
                </div>
                <div className="pt-12 pb-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Rajesh Kumar</h2>
                    <p className="text-sm text-gray-500">Farmer • Nagpur, MH</p>
                </div>

                <div className="px-6 pb-6 space-y-4">
                    <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                        <Phone className="w-5 h-5 text-brand-primary" />
                        <span className="text-sm font-medium">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                        <MapPin className="w-5 h-5 text-brand-primary" />
                        <span className="text-sm font-medium">Village Rampur, Dist. Nagpur</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                        <Award className="w-5 h-5 text-brand-primary" />
                        <span className="text-sm font-medium">Level 2 Beneficiary</span>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <button className="w-full py-2 border border-brand-primary text-brand-primary rounded-xl font-semibold text-sm hover:bg-brand-primary hover:text-white transition-colors flex items-center justify-center">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
