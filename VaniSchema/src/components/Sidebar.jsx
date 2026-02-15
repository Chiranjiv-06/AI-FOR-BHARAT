import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, FileText, Settings, User, LogOut, Globe, Phone, HelpCircle, BookOpen } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, view, setView, language, toggleLanguage, onLogout }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-brand-primary text-white flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border-2 border-white/30">V</div>
                                <div>
                                    <h2 className="font-bold text-lg leading-tight">VaniSchema</h2>
                                    <p className="text-xs text-blue-200">Govt. Services AI</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">

                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Main Menu</p>

                            <MenuItem
                                icon={<Home className="w-5 h-5" />}
                                label={language === 'en' ? "Home" : "मुखपृष्ठ"}
                                active={view === 'home'}
                                onClick={() => { setView('home'); onClose(); }}
                            />
                            <MenuItem
                                icon={<FileText className="w-5 h-5" />}
                                label={language === 'en' ? "My Applications" : "मेरे आवेदन"}
                                active={view === 'applications'}
                                onClick={() => { setView('applications'); onClose(); }}
                            />

                            {/* Added Blogs */}
                            <MenuItem
                                icon={<BookOpen className="w-5 h-5" />}
                                label={language === 'en' ? "Success Stories" : "सफलता की कहानियाँ"}
                                active={view === 'blogs'}
                                onClick={() => { setView('blogs'); onClose(); }}
                            />

                            <div className="my-6 border-t border-gray-100 dark:border-gray-800"></div>

                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Preferences</p>

                            <MenuItem
                                icon={<Globe className="w-5 h-5" />}
                                label={language === 'en' ? "Language: English" : "भाषा: हिन्दी"}
                                onClick={toggleLanguage}
                                highlight={true}
                            />
                            <MenuItem
                                icon={<User className="w-5 h-5" />}
                                label={language === 'en' ? "Profile" : "प्रोफ़ाइल"}
                                active={view === 'profile'}
                                onClick={() => { setView('profile'); onClose(); }}
                            />
                            <MenuItem
                                icon={<Settings className="w-5 h-5" />}
                                label={language === 'en' ? "Settings" : "सेटिंग्स"}
                                active={view === 'settings'}
                                onClick={() => { setView('settings'); onClose(); }}
                            />

                            <div className="my-6 border-t border-gray-100 dark:border-gray-800"></div>

                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Support</p>

                            <MenuItem
                                icon={<HelpCircle className="w-5 h-5" />}
                                label={language === 'en' ? "Help Center" : "सहायता केंद्र"}
                                active={view === 'help'}
                                onClick={() => { setView('help'); onClose(); }}
                            />
                            <MenuItem
                                icon={<Phone className="w-5 h-5" />}
                                label={language === 'en' ? "Contact Support" : "संपर्क करें"}
                                onClick={() => { alert("Calling Support..."); onClose(); }}
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                            <button
                                onClick={() => { onLogout(); onClose(); }}
                                className="flex items-center space-x-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full p-3 rounded-xl transition-colors font-medium text-sm"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>{language === 'en' ? "Log Out" : "लॉग आउट"}</span>
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">Version 3.5.0 (Hackathon Build)</p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const MenuItem = ({ icon, label, active, onClick, highlight }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all 
      ${active ? 'bg-brand-primary/10 text-brand-primary font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'} 
      ${highlight ? 'text-brand-primary' : ''}`}
    >
        <div className={`${active ? 'text-brand-primary' : 'text-gray-400'}`}>{icon}</div>
        <span className="text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary" />}
    </button>
);

export default Sidebar;
