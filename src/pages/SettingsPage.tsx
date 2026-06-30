import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Moon, Sun, Globe, Bell, Shield, Trash2, Info, ChevronRight,
  Volume2, Accessibility, Eye, Type, Layout
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/mockData';

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none
        ${checked ? 'bg-[#0F4C81]' : 'bg-gray-300'}`}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  desc,
  children,
  darkMode,
}: {
  icon: any;
  title: string;
  desc?: string;
  children?: React.ReactNode;
  darkMode: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-4 border-b last:border-b-0
      ${darkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Icon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
        </div>
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</p>
          {desc && <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, language, setLanguage } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);

  const sections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          title: 'Dark Mode',
          desc: 'Switch between light and dark theme',
          control: <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />,
        },
        {
          icon: Eye,
          title: 'High Contrast',
          desc: 'Increase contrast for better visibility',
          control: <ToggleSwitch checked={highContrast} onChange={() => setHighContrast(v => !v)} />,
        },
        {
          icon: Type,
          title: 'Large Text',
          desc: 'Increase font size for accessibility',
          control: <ToggleSwitch checked={largeText} onChange={() => setLargeText(v => !v)} />,
        },
      ],
    },
    {
      title: 'Language & Region',
      items: [
        {
          icon: Globe,
          title: 'Language',
          desc: 'Choose your preferred language',
          control: (
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className={`text-sm px-3 py-1.5 rounded-lg border outline-none cursor-pointer
                ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-700'}`}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          title: 'Push Notifications',
          desc: 'Receive alerts for government updates',
          control: <ToggleSwitch checked={notifications} onChange={() => setNotifications(v => !v)} />,
        },
        {
          icon: Volume2,
          title: 'Sound',
          desc: 'Play sound for new messages',
          control: <ToggleSwitch checked={soundEnabled} onChange={() => setSoundEnabled(v => !v)} />,
        },
      ],
    },
    {
      title: 'Privacy & Data',
      items: [
        {
          icon: Shield,
          title: 'Save Chat History',
          desc: 'Store conversations for future reference',
          control: <ToggleSwitch checked={saveHistory} onChange={() => setSaveHistory(v => !v)} />,
        },
        {
          icon: Trash2,
          title: 'Clear Chat History',
          desc: 'Delete all saved conversations',
          control: (
            <button className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all border border-red-200">
              Clear All
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      <div className={`border-b ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Customize your CivicSense experience
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
          >
            <div className={`px-5 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50'}`}>
              <h2 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {section.title}
              </h2>
            </div>
            <div className="px-5">
              {section.items.map(item => (
                <SettingRow key={item.title} icon={item.icon} title={item.title} desc={item.desc} darkMode={darkMode}>
                  {item.control}
                </SettingRow>
              ))}
            </div>
          </motion.div>
        ))}

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <div className={`px-5 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50'}`}>
            <h2 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              About CivicSense
            </h2>
          </div>
          <div className="p-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏛</span>
            </div>
            <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>CivicSense</h3>
            <p className={`text-xs mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Version 1.0.0</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-powered Government Services Assistant
            </p>
            <p className={`text-xs mt-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Making Government Services Smarter, Simpler, and Accessible for every citizen of India.
            </p>
            <div className="flex gap-3 justify-center mt-4">
              <button className={`text-xs px-4 py-2 rounded-xl border transition-all ${darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                Privacy Policy
              </button>
              <button className={`text-xs px-4 py-2 rounded-xl border transition-all ${darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
