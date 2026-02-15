import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = ({ onLogin, language }) => {
    const [role, setRole] = useState('user'); // 'user' or 'admin'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulated API call latency
        setTimeout(() => {
            // Simple mock authentication
            if (role === 'admin') {
                if (username === 'admin' && password === 'admin123') {
                    onLogin('admin', { name: 'Super Admin', role: 'admin' });
                } else {
                    setError('Invalid Admin Credentials');
                    setIsLoading(false);
                }
            } else {
                // User login (mock any valid input for demo or specific user)
                if (username.length > 2) {
                    onLogin('user', { name: username, role: 'user', location: 'Nagpur' });
                } else {
                    setError('Please enter a valid username');
                    setIsLoading(false);
                }
            }
        }, 1500);
    };

    const t = {
        en: {
            welcome: "Welcome Back",
            subtitle: role === 'admin' ? "Admin Portal Access" : "Sign in to continue",
            user_tab: "Citizen Login",
            admin_tab: "Official Login",
            username_label: role === 'admin' ? "Admin ID" : "Username / Phone",
            password_label: "Password",
            login_btn: "Login Securely",
            processing: "Verifying...",
            hint: role === 'admin' ? "Hint: admin / admin123" : "Hint: Any name / password"
        },
        hi: {
            welcome: "वापसी पर स्वागत है",
            subtitle: role === 'admin' ? "व्यवस्थापक पोर्टल प्रवेश" : "जारी रखने के लिए साइन इन करें",
            user_tab: "नागरिक लॉगिन",
            admin_tab: "ऑफिशियल लॉगिन",
            username_label: role === 'admin' ? "एडमिन आईडी" : "उपयोगकर्ता नाम / फोन",
            password_label: "पासवर्ड",
            login_btn: "लॉगिन करें",
            processing: "सत्यापन हो रहा है...",
            hint: role === 'admin' ? "संकेत: admin / admin123" : "संकेत: कोई भी नाम / पासवर्ड"
        }
    }[language || 'en'];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 dark:bg-gray-900 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            >
                {/* Toggle Header */}
                <div className="flex border-b border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => setRole('user')}
                        className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors ${role === 'user' ? 'bg-brand-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    >
                        <User className="w-4 h-4" />
                        <span>{t.user_tab}</span>
                    </button>
                    <button
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors ${role === 'admin' ? 'bg-brand-dark text-white' : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t.admin_tab}</span>
                    </button>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary font-bold text-2xl animate-pulse">
                            V
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.welcome}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">{t.username_label}</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-800 dark:bg-gray-700 dark:text-white transition-all"
                                    placeholder={role === 'admin' ? "admin" : "Enter username"}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">{t.password_label}</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-800 dark:bg-gray-700 dark:text-white transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs text-center bg-red-50 p-2 rounded">
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 ${role === 'admin' ? 'bg-brand-dark hover:bg-gray-800' : 'bg-brand-primary hover:bg-blue-600'}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{t.processing}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t.login_btn}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6 bg-gray-50 dark:bg-gray-700/50 p-2 rounded border border-gray-100 dark:border-gray-700">
                        {t.hint}
                    </p>

                </div>
            </motion.div>
        </div>
    );
};

export default Login;
