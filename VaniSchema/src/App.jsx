import { useState, useEffect } from 'react'
import useVoice from './hooks/useVoice'
import VoiceButton from './components/VoiceButton'
import SchemeCard from './components/SchemeCard'
import FormModal from './components/FormModal'
import ApplicationList from './components/ApplicationList'
import Sidebar from './components/Sidebar'
// Import New Pages
import Blogs from './components/Blogs'
import Profile from './components/Profile'
import Settings from './components/Settings'
import HelpCenter from './components/HelpCenter'
// Auth
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'

// Database
import { db } from './services/db'

import schemesData from './data/schemes.json'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Home, FileText, Globe, Send, Menu } from 'lucide-react'

const TRANSLATIONS = {
  en: {
    title: "VaniSchema",
    subtitle: "Help is just a voice command away.",
    mic_hint: 'Tap the mic OR type your query below.',
    listening: "Listening... (Tap to stop)",
    tap_to_speak: "Tap mic to speak or type below...",
    analyzing: "Analyzing your request...",
    no_results: "No matching schemes found. Try again.",
    browse: "Browse all schemes",
    nav_home: "Home",
    nav_my_apps: "My Apps",
    found_msg: (count, name) => `I found ${count} schemes. Best match is ${name}.`,
    app_started: (name) => `Starting application for ${name}. Please say or type your name.`,
    switch_lang: "Switch to Hindi",
    placeholder_search: "Type your query here...",
    send_btn: "Send"
  },
  hi: {
    title: "वाणी-योजना",
    subtitle: "मदद बस एक आवाज़ दूर है।",
    mic_hint: 'माइक दबाएं या नीचे लिखें।',
    listening: "सुन रहा हूँ... (रोकने के लिए दबाएं)",
    tap_to_speak: "बोलने के लिए माइक दबाएं या लिखें...",
    analyzing: "आपकी बात समझ रहा हूँ...",
    no_results: "कोई योजना नहीं मिली। पुनः प्रयास करें।",
    browse: "सभी योजनाएं देखें",
    nav_home: "मुखपृष्ठ",
    nav_my_apps: "मेरे आवेदन",
    found_msg: (count, name) => `मुझे ${count} योजनाएं मिलीं। सबसे बेहतर है ${name}।`,
    app_started: (name) => `${name} के लिए आवेदन शुरू कर रहा हूँ। कृपया अपना नाम बताएं या लिखें।`,
    switch_lang: "Switch to English",
    placeholder_search: "यहाँ अपना प्रश्न लिखें...",
    send_btn: "भेजें"
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const t = TRANSLATIONS[language];

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    resetTranscript
  } = useVoice();

  const [results, setResults] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [view, setView] = useState('home');
  const [applications, setApplications] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const langCode = language === 'en' ? 'en-IN' : 'hi-IN';

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load Data from DB on mount and subscribe
  useEffect(() => {
    // Initial Load
    setApplications(db.getAll());

    // Real-time Subscription
    const unsubscribe = db.subscribe((data) => {
      setApplications(data);
    });

    return () => unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    speak(newLang === 'hi' ? "हिंदी में स्वागत है।" : "Welcome to Vani Schema.", newLang === 'en' ? 'en-IN' : 'hi-IN');
  };

  useEffect(() => {
    if (transcript && isListening) {
      setTextInput(transcript);
    }
  }, [transcript, isListening]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setTextInput('');
      startListening(langCode);
      if (!selectedScheme) {
        setResults([]);
        setShowIntro(false);
      }
    }
  };

  const handleSend = () => {
    if (!textInput.trim()) return;
    if (isListening) stopListening();
    handleSearch(textInput);
    setTextInput('');
  };

  const handleSearch = async (query) => {
    if (!query) return;
    setIsThinking(true);
    setShowIntro(false);

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = schemesData.filter(scheme => {
        const keywords = scheme.keywords;
        const name = language === 'hi' ? scheme.name_hi : scheme.name;
        const localName = language === 'hi' ? scheme.local_name_hi : scheme.local_name;

        return keywords.some(k => lowerQuery.includes(k.toLowerCase())) ||
          name.toLowerCase().includes(lowerQuery) ||
          localName.toLowerCase().includes(lowerQuery);
      });

      setResults(filtered);
      setIsThinking(false);

      if (filtered.length > 0) {
        const topMatch = language === 'hi' ? filtered[0].local_name_hi : filtered[0].local_name;
        speak(t.found_msg(filtered.length, topMatch), langCode);
      } else {
        speak(t.no_results, langCode);
      }
    }, 1000);
  };

  const handleApply = (scheme) => {
    setSelectedScheme(scheme);
    const schemeName = language === 'hi' ? scheme.local_name_hi : scheme.local_name;
    speak(t.app_started(schemeName), langCode);
    stopListening();
  };

  const handleFormSubmit = (formData) => {
    // OLD: setApplications([newApp, ...applications]);
    // NEW: Add to DB
    const newApp = {
      schemeName: language === 'hi' ? selectedScheme.local_name_hi : selectedScheme.local_name,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      user: formData.name || 'Anonymous', // Ensure user name is captured
      location: formData.location || 'Unknown',
      ...formData
    };

    db.add(newApp); // This triggers the subscription update automatically

    setSelectedScheme(null);
    setView('applications');
    speak(language === 'hi' ? "आपका आवेदन जमा हो गया है।" : "Your application has been submitted successfully.", langCode);
  };

  const handleLogin = (role, userData) => {
    setAuth({ isAuthenticated: true, user: userData });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    setView('home'); // reset view
  };

  // ------------------------------------------------------------------
  // Auth Views
  // ------------------------------------------------------------------

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} language={language} />;
  }

  if (auth.user?.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // ------------------------------------------------------------------
  // Main User App Logic
  // ------------------------------------------------------------------

  const renderContent = () => {
    switch (view) {
      case 'applications':
        return <ApplicationList applications={applications} />;
      case 'blogs':
        return <Blogs language={language} />;
      case 'profile':
        return <Profile language={language} />;
      case 'settings':
        return (
          <Settings
            language={language}
            toggleLanguage={toggleLanguage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
      case 'help':
        return <HelpCenter language={language} />;
      case 'home':
      default:
        return (
          <>
            <AnimatePresence>
              {showIntro && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center mb-6 mt-4"
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 leading-tight">
                    {t.subtitle}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t.mic_hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mic Button Area */}
            <div className="mb-6 relative w-full flex flex-col items-center">
              <VoiceButton
                isListening={isListening}
                isThinking={isThinking}
                isSpeaking={false}
                onClick={handleMicClick}
              />

              {isListening && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm font-semibold mt-4 animate-pulse"
                >
                  {t.listening}
                </motion.p>
              )}
            </div>

            {/* Input Box for Text + Voice Transcript */}
            <div className="w-full relative mb-6">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t.placeholder_search}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none shadow-sm transition-all text-gray-700 dark:text-white dark:bg-gray-800"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-2 p-1.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!textInput.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="w-full space-y-4">
              {isThinking && (
                <div className="flex flex-col items-center py-10 opacity-70">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-primary mb-2" />
                  <p className="text-sm font-medium text-brand-primary dark:text-blue-400">{t.analyzing}</p>
                </div>
              )}

              <AnimatePresence>
                {results.map((scheme, index) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SchemeCard
                      scheme={{
                        ...scheme,
                        name: language === 'hi' ? scheme.name_hi : scheme.name,
                        local_name: language === 'hi' ? scheme.local_name_hi : scheme.local_name,
                        description: language === 'hi' ? scheme.description_hi : scheme.description
                      }}
                      onClick={handleApply}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center relative overflow-hidden font-sans transition-colors duration-300">

      {/* Top Bar with Hamburger */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-sm z-30 px-4 py-3 flex justify-between items-center sticky top-0 transition-colors">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">{t.title}</span>
          </div>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        view={view}
        setView={setView}
        language={language}
        toggleLanguage={toggleLanguage}
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full max-w-md flex flex-col items-center z-10 pb-32 pt-6 px-4">
        {renderContent()}
      </main>

      {/* Form Modal */}
      <FormModal
        isOpen={!!selectedScheme}
        onClose={() => {
          setSelectedScheme(null);
          stopListening();
        }}
        schemeName={selectedScheme ? (language === 'hi' ? selectedScheme.local_name_hi : selectedScheme.local_name) : ''}
        transcript={transcript}
        isListening={isListening}
        onSubmit={handleFormSubmit}
        language={language}
      />

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-2 z-20 shadow-lg pb-4 transition-colors">
        <button
          onClick={() => setView('home')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${view === 'home' ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">{t.nav_home}</span>
        </button>
        <button
          onClick={() => setView('applications')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${view === 'applications' ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'}`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">{t.nav_my_apps}</span>
        </button>
      </div>

    </div>
  )
}

export default App
