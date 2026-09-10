import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mic, MicOff, X, Sparkles, Volume2 } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery?: (query: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onSelectQuery }) => {
  const { currentLanguage, speakText, t } = useLanguage();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const sampleVoiceQueries = [
    'Tamatar ki keemat kya hai?',
    'Show organic fresh tomatoes',
    'What is the demand prediction for Basmati Rice?',
    'Add 5kg Red Onions to cart',
    'Track my order #ORD-98214'
  ];

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript('Listening... Speak your query or select a quick voice shortcut below');
      const timer = setTimeout(() => {
        setIsListening(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateSpeech = (query: string) => {
    setTranscript(query);
    speakText(`Searching for ${query}`);
    if (onSelectQuery) {
      onSelectQuery(query);
    }
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
                isListening
                  ? 'bg-agri-600 text-white shadow-xl shadow-agri-600/40 ring-8 ring-agri-100 animate-pulse'
                  : 'bg-agri-100 text-agri-700'
              }`}
            >
              {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <MicOff className="w-10 h-10" />}
            </div>
            {isListening && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-agri-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider">
                Active
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1.5">
              <Sparkles className="w-5 h-5 text-agri-600" />
              {t('voiceAssistant')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports voice input across 22 Indian languages ({currentLanguage.toUpperCase()})
            </p>
          </div>

          {/* Transcript Display Box */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 min-h-[70px] flex items-center justify-center text-center">
            <p className="text-sm font-semibold text-slate-800 italic">
              "{transcript}"
            </p>
          </div>

          {/* Quick Voice Prompt Shortcuts */}
          <div className="space-y-2 text-left pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Popular Voice Shortcuts
            </p>
            <div className="space-y-1.5">
              {sampleVoiceQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateSpeech(q)}
                  className="w-full text-left text-xs bg-agri-50 hover:bg-agri-100 text-agri-900 font-semibold px-3 py-2 rounded-xl transition-all flex items-center justify-between border border-agri-200/60"
                >
                  <span>🗣️ "{q}"</span>
                  <Volume2 className="w-3.5 h-3.5 text-agri-600 opacity-60" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
