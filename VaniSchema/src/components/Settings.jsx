import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Key, Shield, HelpCircle, Smartphone, Globe, Sun, Moon } from 'lucide-react';

const Settings = ({ language, toggleLanguage, darkMode, toggleDarkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-4 pb-24"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>

                <div className="space-y-6">
                    {/* Section 1 */}
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">General</p>

                        <div
                            className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 cursor-pointer"
                            onClick={toggleLanguage}
                        >
                            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                <Globe className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium">Language</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
                                <span>{language === 'en' ? 'English' : 'हिन्दी'}</span>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 cursor-pointer"
                            onClick={toggleDarkMode}
                        >
                            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                {darkMode ? <Moon className="w-5 h-5 text-brand-primary" /> : <Sun className="w-5 h-5 text-gray-400" />}
                                <span className="text-sm font-medium">Dark Mode</span>
                            </div>
                            <div className={`w-10 h-6 rounded-full text-xs font-medium relative transition-colors ${darkMode ? 'bg-brand-primary' : 'bg-gray-200'}`}>
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 shadow-sm transition-transform duration-200 ${darkMode ? 'left-5' : 'left-1'}`} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium">Notifications</span>
                            </div>
                            <div className="w-10 h-6 bg-brand-primary rounded-full text-xs font-medium text-white relative cursor-pointer">
                                <div className="w-4 h-4 rounded-full bg-white absolute top-1 right-1 shadow-sm transition-transform duration-200" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Privacy & Security</p>

                        <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 rounded-lg">
                            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                <Key className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium">Change Password</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 rounded-lg">
                            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                <Shield className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-medium">Two-Factor Auth</span>
                            </div>
                        </div>
                    </div>

                    {/* App Info */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                        <p className="text-xs text-gray-400">VaniSchema v3.5.0 • Build 2024.10.25</p>
                        <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Made with ❤️ for Hackathon</p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default Settings;
