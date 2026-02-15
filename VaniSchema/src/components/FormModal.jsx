import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Send, User, Calendar, MapPin, BadgeCheck, Upload, FileText, Keyboard, CheckCircle, Smartphone } from 'lucide-react';

const TRANSLATIONS = {
    en: {
        title: "Application Form",
        applying_for: "Applying for:",
        voice_active: "Voice Auto-Fill Active",
        mode_switch_text: "Text Mode",
        mode_switch_voice: "Voice Mode",
        voice_hint: 'Say: "My name is Rajesh, I am 45 years old, from Rampur."',
        text_hint: 'Type your details or use the fields below...',
        full_name: "Full Name",
        age: "Age",
        location: "Location",
        aadhar: "Aadhar No. (Last 4)",
        upload_docs: "Upload Documents",
        upload_hint: "Tap to scan Aadhar/ID",
        submit: "Submit Application",
        waiting: "Waiting for input...",
        doc_uploaded: "Verified: "
    },
    hi: {
        title: "आवेदन पत्र",
        applying_for: "के लिए आवेदन:",
        voice_active: "वॉयस ऑटो-फिल",
        mode_switch_text: "लिखकर भरें",
        mode_switch_voice: "बोलकर भरें",
        voice_hint: 'कहें: "मेरा नाम राजेश है, मैं 45 का हूँ, रामपुर से हूँ।"',
        text_hint: 'विवरण लिखें...',
        full_name: "पूरा नाम",
        age: "उम्र",
        location: "स्थान",
        aadhar: "आधार नंबर",
        upload_docs: "दस्तावेज़ जोड़ें",
        upload_hint: "आधार/आईडी स्कैन करें",
        submit: "आवेदन जमा करें",
        waiting: "इंतज़ार...",
        doc_uploaded: "सत्यापित: "
    }
};

const FormModal = ({ isOpen, onClose, schemeName, transcript, isListening, onSubmit, language = 'en' }) => {
    const t = TRANSLATIONS[language];
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        aadhar: ''
    });
    const [docUploaded, setDocUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [inputMode, setInputMode] = useState('voice');
    const [manualDescription, setManualDescription] = useState('');
    const fileInputRef = useRef(null);

    // Intelligent Form Filling (Regex)
    const processInputText = (text) => {
        if (!text) return;

        setFormData(prev => {
            const newFormData = { ...prev };
            const lowerText = text.toLowerCase();

            const nameMatch = lowerText.match(/name is\s+([a-z\s]+)/i) || lowerText.match(/i am\s+([a-z\s]+)/i) || lowerText.match(/mera naam\s+([a-z\s]+)/i);
            if (nameMatch && nameMatch[1]) {
                const rawName = nameMatch[1].replace('years', '').replace('old', '').replace('hai', '').replace('hu', '').trim();
                if (rawName.length > 2) {
                    newFormData.name = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                }
            }

            const ageMatch = lowerText.match(/(\d+)\s+years/i) || lowerText.match(/(\d+)\s+saal/i) || lowerText.match(/(\d+)/); // flexible age
            // Only set age if it looks like a reasonable age (18-99) to avoid confusion with other numbers
            if (ageMatch && parseInt(ageMatch[1]) < 100 && parseInt(ageMatch[1]) > 10) newFormData.age = ageMatch[1];

            const addressMatch = lowerText.match(/live in\s+([a-z\s]+)/i) || lowerText.match(/from\s+([a-z\s]+)/i) || lowerText.match(/rehta hoon\s+([a-z\s]+)/i) || lowerText.match(/se hoon\s+([a-z\s]+)/i);
            if (addressMatch && addressMatch[1]) {
                const address = addressMatch[1].trim();
                newFormData.address = address.charAt(0).toUpperCase() + address.slice(1);
            }

            return newFormData;
        });
    };

    useEffect(() => {
        if (inputMode === 'voice' && transcript) processInputText(transcript);
    }, [transcript, inputMode]);

    useEffect(() => {
        if (inputMode === 'text' && manualDescription) processInputText(manualDescription);
    }, [manualDescription, inputMode]);

    const handleSubmit = () => {
        onSubmit({ ...formData, fileName });
        onClose();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
            setDocUploaded(true);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]"
                >
                    {/* Mobile-First Header */}
                    <div className="bg-brand-primary pt-6 pb-4 px-6 text-white flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">{t.title}</h3>
                            <p className="text-blue-100 text-xs mt-1 bg-white/20 px-2 py-0.5 rounded-full inline-block">{schemeName}</p>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar">

                        {/* Mode Switcher Pills */}
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setInputMode('voice')}
                                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${inputMode === 'voice' ? 'bg-white shadow-sm text-brand-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Mic className="w-4 h-4 mr-1.5" /> {t.mode_switch_voice}
                            </button>
                            <button
                                onClick={() => setInputMode('text')}
                                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${inputMode === 'text' ? 'bg-white shadow-sm text-brand-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <Keyboard className="w-4 h-4 mr-1.5" /> {t.mode_switch_text}
                            </button>
                        </div>

                        {/* Instruction Box */}
                        <div className={`border rounded-xl p-4 transition-colors ${inputMode === 'voice' ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200'}`}>
                            <div className="flex space-x-3">
                                <div className={`p-2 h-10 w-10 flex items-center justify-center rounded-full shrink-0 ${inputMode === 'voice' && isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-gray-500 shadow-sm border border-gray-100'}`}>
                                    {inputMode === 'voice' ? <Mic className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {inputMode === 'voice' ? (
                                        <>
                                            <p className="font-semibold text-gray-800 text-sm truncate">{t.voice_active}</p>
                                            <p className="text-gray-500 text-xs mt-1 italic leading-relaxed">{t.voice_hint}</p>
                                        </>
                                    ) : (
                                        <textarea
                                            value={manualDescription}
                                            onChange={(e) => setManualDescription(e.target.value)}
                                            placeholder={t.text_hint}
                                            className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-400 resize-none h-14"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wide">{t.full_name}</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                                        placeholder={t.waiting}
                                    />
                                    {formData.name && <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wide">{t.age}</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                                        <input
                                            type="number"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="w-full pl-10 pr-2 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                                            placeholder="--"
                                        />
                                    </div>
                                </div>
                                <div className="flex-[2]">
                                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wide">{t.location}</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full pl-10 pr-2 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                                            placeholder="City"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Upload */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 ml-1 mb-1 block uppercase tracking-wide">{t.upload_docs}</label>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-xl p-4 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${docUploaded ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-brand-primary hover:bg-blue-50/50'}`}
                                >
                                    {docUploaded ? (
                                        <div className="text-center">
                                            <div className="bg-green-100 text-green-600 p-2 rounded-full inline-flex mb-1"><CheckCircle className="w-5 h-5" /></div>
                                            <p className="text-xs font-medium text-green-800 truncate max-w-[200px]">{fileName}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="bg-gray-100 text-gray-500 p-2 rounded-full inline-flex mb-1"><Upload className="w-5 h-5" /></div>
                                            <p className="text-xs text-gray-500">{t.upload_hint}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                        <div className="text-xs text-gray-400 font-medium px-2">
                            Powered by <span className="text-brand-primary">VaniAI</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.name}
                            className="flex items-center space-x-2 bg-brand-secondary hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            <span>{t.submit}</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FormModal;
