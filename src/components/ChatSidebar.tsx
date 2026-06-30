import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, MessageSquare, Bookmark, CheckCircle, Rss, Settings, ChevronLeft,
  Clock, Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatSidebarProps {
  onSelectSession?: (id: string) => void;
}

export default function ChatSidebar({ onSelectSession }: ChatSidebarProps) {
  const { darkMode, chatSessions, currentSession, createNewSession, sidebarOpen, setSidebarOpen } = useApp();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: Bookmark, label: 'Saved Schemes', path: '/schemes' },
    { icon: CheckCircle, label: 'Eligibility Results', path: '/eligibility' },
    { icon: Rss, label: 'Government Updates', path: '/resources' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] z-40 overflow-hidden flex-shrink-0
          ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'} border-r`}
      >
        <div className="w-[260px] h-full flex flex-col overflow-hidden">
          <div className="p-3 flex-shrink-0">
            <button
              onClick={() => { createNewSession(); navigate('/chat'); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                bg-gradient-to-r from-[#0F4C81] to-[#1565A8] text-white hover:from-[#0a3d6b] hover:to-[#1254a0]
                transition-all duration-200 shadow-sm"
            >
              <Plus size={16} />
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
            {/* Chat History */}
            {chatSessions.length > 0 && (
              <div className="mb-4">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Recent Chats
                </p>
                <div className="space-y-0.5">
                  {chatSessions.slice(0, 8).map(session => (
                    <button
                      key={session.id}
                      onClick={() => onSelectSession?.(session.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all
                        ${currentSession?.id === session.id
                          ? darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-[#0F4C81]'
                          : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <MessageSquare size={14} className="flex-shrink-0" />
                      <span className="truncate">{session.title || 'Untitled Chat'}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Navigation
              </p>
              <div className="space-y-0.5">
                {sidebarLinks.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-[#0F4C81]'}`}
                  >
                    <item.icon size={15} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Collapse button */}
          <div className={`p-3 border-t flex-shrink-0 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm transition-all
                ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={16} />
              Collapse
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
