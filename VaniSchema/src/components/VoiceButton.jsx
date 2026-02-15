import React from 'react';
import { motion } from 'framer-motion';
import { Mic, X, Volume2, Loader2 } from 'lucide-react';
import useVoice from '../hooks/useVoice';

const VoiceButton = ({ isListening, isThinking, isSpeaking, onClick }) => {

    if (isThinking) {
        return (
            <div className="relative group">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ loop: Infinity, ease: "linear", duration: 1 }}
                    className="w-24 h-24 rounded-full border-4 border-t-transparent border-brand-primary flex items-center justify-center bg-white shadow-2xl"
                >
                    <Loader2 className="w-10 h-10 text-brand-primary" />
                </motion.div>
            </div>
        );
    }

    if (isListening) {
        return (
            <div className="relative group cursor-pointer" onClick={onClick}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ loop: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-red-500 rounded-full opacity-30"
                />
                <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl z-10 relative">
                    <Mic className="w-10 h-10 animate-pulse" />
                </div>
                <div className="absolute top-full mt-4 text-center w-full font-semibold text-gray-700">Listening...</div>
            </div>
        );
    }

    if (isSpeaking) {
        return (
            <div className="relative group cursor-pointer" onClick={onClick}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ loop: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-brand-secondary rounded-full opacity-30"
                />
                <div className="w-24 h-24 rounded-full bg-brand-secondary flex items-center justify-center text-white shadow-2xl z-10 relative">
                    <Volume2 className="w-10 h-10" />
                </div>
                <div className="absolute top-full mt-4 text-center w-full font-semibold text-gray-700">Speaking...</div>
            </div>
        );
    }

    return (
        <div className="relative group cursor-pointer transition-transform hover:scale-105" onClick={onClick}>
            <div className="w-24 h-24 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-2xl hover:bg-blue-700 transition-colors">
                <Mic className="w-10 h-10" />
            </div>
            <div className="absolute top-full mt-4 text-center w-full font-semibold text-gray-700">Tap to Ask</div>
        </div>
    );
};

export default VoiceButton;
