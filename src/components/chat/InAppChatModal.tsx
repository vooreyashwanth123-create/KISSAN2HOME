import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, X, ShieldCheck, Mic, Volume2 } from 'lucide-react';

interface InAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
  orderId?: string;
}

export const InAppChatModal: React.FC<InAppChatModalProps> = ({
  isOpen,
  onClose,
  receiverId,
  receiverName,
  orderId
}) => {
  const { currentUser } = useAuth();
  const { messages, sendMessage } = useData();
  const [inputText, setInputText] = useState('');

  if (!isOpen || !currentUser) return null;

  // Filter messages between currentUser & receiverId
  const conversation = messages.filter(
    m =>
      (m.senderId === currentUser.id && m.receiverId === receiverId) ||
      (m.senderId === receiverId && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(
      receiverId,
      receiverName,
      currentUser.id,
      currentUser.name,
      inputText.trim(),
      orderId
    );
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[520px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-agri-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-agri-700 flex items-center justify-center font-bold text-lg border border-agri-500">
              👩‍🌾
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                {receiverName}
                <ShieldCheck className="w-4 h-4 text-agri-400" />
              </h3>
              <span className="text-[10px] text-agri-200">
                Direct In-App Chat • Phone # Hidden for Privacy
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-agri-300 hover:text-white p-1 rounded-full hover:bg-agri-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {conversation.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <span className="text-3xl">💬</span>
              <p className="text-xs font-semibold">
                Start a direct message with {receiverName}.
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Discuss crop freshness, harvest details, or order delivery time securely.
              </p>
            </div>
          ) : (
            conversation.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                      isMe
                        ? 'bg-agri-700 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message ${receiverName}...`}
            className="flex-1 text-xs px-4 py-2.5 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-agri-500 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-agri-700 hover:bg-agri-800 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
