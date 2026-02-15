import { useState, useEffect, useCallback, useRef } from 'react';

const useVoice = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    // Store recognition instance in a ref
    const recognitionRef = useRef(null);

    // Initialize Recognition API once on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            setIsSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = true; // IMPORTANT: Keeps listening
            recognition.interimResults = true; // Real-time feedback
            recognition.lang = 'en-IN';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                // Don't auto-stop strictly here, let onend handle it
            };

            recognition.onresult = (event) => {
                // Map all current results to string
                const currentText = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');

                setTranscript(currentText);
            };

            recognitionRef.current = recognition;
        } else {
            console.warn("Browser does not support Speech Recognition API");
            setIsSupported(false);
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startListening = useCallback((lang = 'en-IN') => {
        if (!recognitionRef.current) return;

        // Stop any previous instance to clear state
        try { recognitionRef.current.stop(); } catch (e) { }

        // Small delay to ensure clean restart
        setTimeout(() => {
            try {
                recognitionRef.current.lang = lang;
                recognitionRef.current.start();
            } catch (err) {
                console.error("Failed to start listening:", err);
            }
        }, 100);
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            // isListening will be set to false by onend
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    const speak = useCallback((text, lang = 'en-IN') => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        speak,
        isSpeaking,
        browserSupportsSpeechRecognition: isSupported
    };
};

export default useVoice;
