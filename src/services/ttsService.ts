import { IndianLanguageCode } from '../types';

// Voice BCP-47 language tag mapping
const LANGUAGE_BCP47_MAP: Record<IndianLanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  ur: 'ur-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  or: 'or-IN',
  ml: 'ml-IN',
  as: 'as-IN',
  mai: 'hi-IN', // fallback to hi-IN
  sat: 'hi-IN',
  ks: 'ur-IN',
  ne: 'ne-NP',
  kok: 'mr-IN',
  doi: 'hi-IN',
  mni: 'en-IN',
  brx: 'hi-IN',
  sa: 'hi-IN',
  sd: 'sd-IN'
};

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, langCode: IndianLanguageCode = 'en', onEnd?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    // Cancel ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = LANGUAGE_BCP47_MAP[langCode] || 'en-IN';
    utterance.lang = targetLang;
    utterance.rate = 0.9; // Slightly slower for clear Indian language accessibility
    utterance.pitch = 1.0;

    // Try to find a matching installed voice
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      console.error('TTS error:', err);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}

export const ttsService = new TTSService();
