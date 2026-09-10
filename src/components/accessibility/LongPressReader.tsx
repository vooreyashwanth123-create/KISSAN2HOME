import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Volume2 } from 'lucide-react';

interface LongPressReaderProps {
  textToRead: string;
  children: React.ReactNode;
  className?: string;
}

export const LongPressReader: React.FC<LongPressReaderProps> = ({
  textToRead,
  children,
  className = ''
}) => {
  const { currentUser } = useAuth();
  const { speakText } = useLanguage();
  const timerRef = useRef<any>(null);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [justSpoke, setJustSpoke] = useState<boolean>(false);

  // STRICTLY FARMER ROLE ONLY
  if (currentUser?.role !== 'FARMER') {
    return <div className={className}>{children}</div>;
  }

  const handleStart = () => {
    setIsHolding(true);
    timerRef.current = setTimeout(() => {
      speakText(textToRead);
      setJustSpoke(true);
      setIsHolding(false);
      setTimeout(() => setJustSpoke(false), 2000);
    }, 600); // 600ms threshold for long press
  };

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsHolding(false);
  };

  return (
    <div
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className={`relative cursor-pointer transition-all duration-150 ${
        isHolding ? 'scale-[0.98] ring-2 ring-agri-500 ring-offset-2' : ''
      } ${justSpoke ? 'bg-agri-50/50' : ''} ${className}`}
      title="Long-press to read aloud in your language"
    >
      {children}
      {justSpoke && (
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-agri-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow animate-pulse">
          <Volume2 className="w-3 h-3" /> Reading
        </span>
      )}
    </div>
  );
};
