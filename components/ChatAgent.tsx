
import React, { useState, useRef, useEffect } from 'react';
import { DailyThought } from '../types';
import { createChatSession } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatAgentProps {
  thought: DailyThought;
}

export const ChatAgent: React.FC<ChatAgentProps> = ({ thought }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Greetings, seeker. I am the Guide of the Logos. How may I help you navigate the mysteries of "${thought.synthesis.title}" today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset chat session when the thought changes
    chatRef.current = createChatSession(thought);
    setMessages([{ 
      role: 'model', 
      text: `The wisdom has shifted. I am now reflecting upon "${thought.synthesis.title}". How shall we explore this new revelation together?` 
    }]);
  }, [thought]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = createChatSession(thought);
      }
      
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const text = response.text;
      
      setMessages(prev => [...prev, { role: 'model', text: text || "The oracle is momentarily silent. Please ask again." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "A shadow has crossed the connection. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50 group"
      >
        <svg className={`w-7 h-7 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
        <span className="absolute -top-10 right-0 bg-slate-800 text-amber-500 text-[10px] py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-cinzel tracking-widest pointer-events-none border border-amber-500/20 whitespace-nowrap">
          Seek Guidance
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-96 h-[500px] glass rounded-3xl border-amber-500/20 shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-slate-900/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 className="font-cinzel text-xs font-bold text-amber-500 tracking-widest uppercase">Guide of the Logos</h4>
              <p className="text-[10px] text-slate-500 font-lora italic">Consulting the ancient wisdom...</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-hide bg-slate-900/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500/10 border border-amber-500/20 text-slate-200' 
                    : 'bg-slate-800/80 border border-white/5 text-slate-300 font-lora italic'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-white/5 p-3 rounded-2xl flex gap-1 items-center">
                  <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900/50 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the Guide..."
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-4 pr-12 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 transition-colors font-lora"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 disabled:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
