import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Book, FileText, Smartphone } from 'lucide-react';

const HelpCenter = ({ language }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-4 pb-24"
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
                <h2 className="text-xl font-bold mb-6">Help & Support</h2>

                <div className="space-y-4">

                    {/* FAQ 1 */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                            <HelpCircle className="w-4 h-4 mr-2 text-brand-primary" />
                            How to apply for schemes?
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            You can use voice ("Apply for farmer loan") or browse manually. Once selected, our AI will guide you through the form.
                        </p>
                    </div>

                    {/* FAQ 2 */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-brand-primary" />
                            What documents are needed?
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Usually Aadhar Card, PAN Card, and Bank Details. You can upload photos directly in the app.
                        </p>
                    </div>

                    {/* Helper Actions */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-blue-100 transition-colors cursor-pointer">
                            <MessageSquare className="w-6 h-6 text-brand-primary mb-2" />
                            <span className="text-xs font-semibold text-brand-primary">Chat Support</span>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-green-100 transition-colors cursor-pointer">
                            <Smartphone className="w-6 h-6 text-green-600 mb-2" />
                            <span className="text-xs font-semibold text-green-700">Call Helpline</span>
                        </div>
                    </div>

                    {/* Manuals */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-gray-500 hover:text-brand-primary cursor-pointer py-2">
                            <div className="flex items-center space-x-2">
                                <Book className="w-4 h-4" />
                                <span className="text-sm">User Manual</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-gray-500 hover:text-brand-primary cursor-pointer py-2">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span className="text-sm">Terms of Service</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default HelpCenter;
