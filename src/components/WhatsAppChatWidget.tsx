'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, Sparkles, CheckCheck } from 'lucide-react';

interface WhatsAppChatWidgetProps {
  onOpenBookingModal?: () => void;
}

export const WhatsAppChatWidget: React.FC<WhatsAppChatWidgetProps> = ({ onOpenBookingModal }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { sender: 'concierge' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'concierge',
      text: 'Namaste! Welcome to Rangrez Holidays 🙏 How can we help you plan your India journey or taxi rental today?',
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const quickPrompts = [
    'Inquire Golden Triangle Tour',
    'Book Innova Crysta Taxi',
    'Char Dham Yatra Dates',
    'Same Day Taj Mahal Trip',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text, time },
    ]);

    setInputMessage('');

    // Concierge automatic reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: `Thank you for asking about "${text}"! We have special private departures and sanitized vehicles available. Click below to chat directly with our senior travel concierge on WhatsApp!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const getDirectWhatsAppUrl = (customText?: string) => {
    const query = encodeURIComponent(
      customText ||
        'Namaste Rangrez Holidays! I am visiting your website and would like instant assistance with tour packages / taxi rental.'
    );
    return `https://wa.me/919760402549?text=${query}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#EADBDF] overflow-hidden flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A0E35] to-[#25D366] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">
                  RH
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">Rangrez Concierge</h4>
                <p className="text-[10px] text-white/85">Online • Instant Support via WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/20 text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Chips */}
          <div className="bg-[#FAF4F8] px-3 py-2 border-b border-[#EADBDF] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-[#EADBDF] hover:border-[#F05A28] text-[10px] font-semibold text-[#4A0E35] hover:text-[#F05A28] transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#FAF7F5] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#4A0E35] text-white rounded-tr-none'
                      : 'bg-white text-[#2D1A25] border border-[#EADBDF] rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1 ${
                      m.sender === 'user' ? 'text-white/70' : 'text-[#8B6B80]'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Call to Action & Input */}
          <div className="p-3 bg-white border-t border-[#EADBDF] space-y-2">
            <a
              href={getDirectWhatsAppUrl(inputMessage || 'Inquiring from website')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Continue on WhatsApp App</span>
            </a>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about dates, tours, or taxi..."
                className="flex-1 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3 py-2 text-xs text-[#331C29] focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#4A0E35] text-white hover:bg-[#3B0827] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-xl transition-all hover:scale-105"
        aria-label="Chat with Rangrez Holidays on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-1 ring-white" />
        </div>
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </button>
    </div>
  );
};
