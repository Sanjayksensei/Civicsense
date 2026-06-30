import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe, Bell, LogIn, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/mockData';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'AI Assistant', path: '/chat' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Eligibility', path: '/eligibility' },
  { label: 'Nearby Offices', path: '/offices' },
  { label: 'Resources', path: '/resources' },
];

export default function Navbar() {
  const { darkMode, toggleDarkMode, language, setLanguage } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-[#0F172A]/95 border-gray-800' : 'bg-white/95 border-gray-200'} border-b backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] flex items-center justify-center">
              <span className="text-white text-sm font-bold">CS</span>
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#0F4C81]'}`}>
              Civic<span className="text-[#14B8A6]">Sense</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path
                    ? 'bg-[#0F4C81] text-white'
                    : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-[#0F4C81] hover:bg-blue-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(o => !o)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Globe size={16} />
                {currentLang?.name}
                <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`absolute right-0 mt-2 w-40 rounded-xl shadow-lg border py-1 z-50
                      ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors
                          ${language === lang.code ? 'text-[#0F4C81] font-semibold' : darkMode ? 'text-gray-300' : 'text-gray-700'}
                          ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Bell size={18} />
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Login */}
            <Link to="/chat" className="flex items-center gap-2 btn-primary !px-4 !py-2 !text-sm">
              <LogIn size={16} />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className={`p-2 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${darkMode ? 'bg-[#0F172A] border-gray-800' : 'bg-white border-gray-200'}`}
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${location.pathname === link.path
                      ? 'bg-[#0F4C81] text-white'
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/chat" onClick={() => setMenuOpen(false)} className="block btn-primary !text-sm text-center mt-2">
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
