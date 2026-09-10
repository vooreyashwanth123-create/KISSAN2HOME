import React, { createContext, useContext, useState, useEffect } from 'react';
import { IndianLanguageCode, LanguageOption } from '../types';
import { INDIAN_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { ttsService } from '../services/ttsService';

interface LanguageContextType {
  currentLanguage: IndianLanguageCode;
  languages: LanguageOption[];
  setLanguage: (lang: IndianLanguageCode) => void;
  t: (key: string) => string;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<IndianLanguageCode>(() => {
    const saved = localStorage.getItem('k2h_lang');
    return (saved as IndianLanguageCode) || 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('k2h_lang', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (lang: IndianLanguageCode) => {
    setCurrentLanguageState(lang);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };

  const speakText = (text: string) => {
    setIsSpeaking(true);
    ttsService.speak(text, currentLanguage, () => {
      setIsSpeaking(false);
    });
  };

  const stopSpeech = () => {
    ttsService.stop();
    setIsSpeaking(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languages: INDIAN_LANGUAGES,
        setLanguage,
        t,
        speakText,
        stopSpeech,
        isSpeaking
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
