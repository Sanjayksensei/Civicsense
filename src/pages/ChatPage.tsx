import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, Paperclip, Copy, ThumbsUp, ThumbsDown, RotateCcw,
  PanelLeftOpen, PanelRightOpen, ExternalLink, Volume2, MicOff, X,
  Globe, FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ChatSidebar from '../components/ChatSidebar';
import RightSidebar from '../components/RightSidebar';
import MessageRenderer from '../components/MessageRenderer';
import { QUICK_PROMPTS, LANGUAGES } from '../data/mockData';

const VOICE_WAVES = Array.from({ length: 5 }, (_, i) => i);

export default function ChatPage() {
  const {
    darkMode, chatSessions, currentSession, createNewSession, sendMessage,
    isTyping, sidebarOpen, setSidebarOpen, rightSidebarOpen, setRightSidebarOpen,
  } = useApp();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const isEmpty = !currentSession || currentSession.messages.length === 0;

  const mainMarginLeft = sidebarOpen ? 'lg:ml-[260px]' : 'ml-0';
  const mainMarginRight = rightSidebarOpen ? 'lg:mr-[288px]' : 'mr-0';

  return (
    <div className={`flex h-[calc(100vh-64px)] mt-16 overflow-hidden ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Left Sidebar */}
      <ChatSidebar onSelectSession={(id) => {
        const session = chatSessions.find(s => s.id === id);
      }} />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${mainMarginLeft} ${mainMarginRight}`}>
        {/* Chat Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b flex-shrink-0
          ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <PanelLeftOpen size={18} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] flex items-center justify-center">
                <span className="text-white text-xs font-bold">CS</span>
              </div>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CivicSense AI</p>
                <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>● Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Globe size={14} />
                {selectedLang}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`absolute right-0 mt-1 w-36 rounded-xl shadow-lg border py-1 z-50
                      ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.name); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors
                          ${selectedLang === lang.name ? 'text-[#0F4C81] font-semibold' : darkMode ? 'text-gray-300' : 'text-gray-700'}
                          ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className={`p-2 rounded-lg transition-all ${rightSidebarOpen
                ? 'bg-[#0F4C81] text-white'
                : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <PanelRightOpen size={18} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6">
          {isEmpty ? (
            // Welcome Screen
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] mx-auto mb-6
                    flex items-center justify-center shadow-xl"
                >
                  <span className="text-4xl">🏛</span>
                </motion.div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Welcome to CivicSense 👋
                </h2>
                <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  How can I help you with government services today?
                </p>
              </motion.div>

              {/* Quick Prompts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={prompt.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendMessage(prompt.query)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 group
                      ${darkMode
                        ? 'bg-gray-800/70 border-gray-700 hover:border-[#14B8A6]/60 hover:bg-gray-800'
                        : 'bg-white border-gray-200 hover:border-[#14B8A6]/60 hover:shadow-md'
                      }`}
                  >
                    <span className="text-xl block mb-1.5">{prompt.icon}</span>
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {prompt.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <p className={`text-center text-xs mt-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                Information sourced from official Government of India portals
              </p>
            </div>
          ) : (
            // Messages
            <div className="max-w-3xl mx-auto space-y-6">
              {currentSession?.messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">🏛</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {msg.role === 'user' ? (
                      <div className="bg-gradient-to-r from-[#0F4C81] to-[#1565A8] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm">
                        {msg.content}
                      </div>
                    ) : (
                      <div className={`px-5 py-4 rounded-2xl rounded-tl-sm ${darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
                        <MessageRenderer content={msg.content} />

                        {/* Sources */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-dashed border-gray-200/50">
                            <p className={`text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sources</p>
                            <div className="flex flex-wrap gap-2">
                              {msg.sources.map(source => (
                                <a
                                  key={source.url}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs text-[#14B8A6] hover:underline"
                                >
                                  <ExternalLink size={10} />
                                  {source.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message actions for assistant */}
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 px-1">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className={`p-1.5 rounded-lg transition-all text-xs flex items-center gap-1
                            ${darkMode ? 'text-gray-600 hover:text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        >
                          <Copy size={12} />
                          {copied === msg.id ? 'Copied!' : 'Copy'}
                        </button>
                        <button className={`p-1.5 rounded-lg transition-all ${darkMode ? 'text-gray-600 hover:text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                          <ThumbsUp size={12} />
                        </button>
                        <button className={`p-1.5 rounded-lg transition-all ${darkMode ? 'text-gray-600 hover:text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold
                      ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      U
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🏛</span>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl rounded-tl-sm ${darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-[#14B8A6]"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`flex-shrink-0 px-4 py-4 border-t ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="max-w-3xl mx-auto">
            {/* Voice listening indicator */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center justify-center gap-3 mb-3 py-2 rounded-xl bg-red-50 border border-red-200"
                >
                  <div className="flex items-end gap-0.5 h-6">
                    {VOICE_WAVES.map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: ['8px', '20px', '8px'] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-red-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-red-600">Listening...</span>
                  <button onClick={() => setIsListening(false)} className="text-red-400 hover:text-red-600">
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`flex items-end gap-2 p-2 rounded-2xl border transition-all
              ${darkMode
                ? 'bg-gray-800 border-gray-700 focus-within:border-[#14B8A6]/60'
                : 'bg-gray-50 border-gray-300 focus-within:border-[#14B8A6]/60'
              } focus-within:ring-2 focus-within:ring-[#14B8A6]/10`}
            >
              {/* Attach buttons */}
              <div className="flex gap-1 flex-shrink-0 pb-1">
                <button className={`p-2 rounded-xl transition-all ${darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                  title="Attach PDF">
                  <FileText size={16} />
                </button>
                <button className={`p-2 rounded-xl transition-all ${darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                  title="Upload Document">
                  <Paperclip size={16} />
                </button>
              </div>

              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask CivicSense anything about government services..."
                rows={1}
                className={`flex-1 bg-transparent resize-none outline-none text-sm py-2 px-1 max-h-32 scrollbar-thin
                  ${darkMode ? 'text-gray-100 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
                style={{ minHeight: '36px' }}
              />

              {/* Action buttons */}
              <div className="flex gap-1 flex-shrink-0 pb-1">
                <button
                  onClick={() => setIsListening(v => !v)}
                  className={`p-2 rounded-xl transition-all ${isListening
                    ? 'bg-red-100 text-red-500'
                    : darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                  title="Voice input"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-2 rounded-xl transition-all ${input.trim()
                    ? 'bg-gradient-to-r from-[#0F4C81] to-[#14B8A6] text-white hover:shadow-md'
                    : darkMode ? 'text-gray-600 bg-gray-700 cursor-not-allowed' : 'text-gray-400 bg-gray-200 cursor-not-allowed'}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            <p className={`text-center text-xs mt-2 ${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>
              CivicSense may produce inaccurate information. Verify from official government portals.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
