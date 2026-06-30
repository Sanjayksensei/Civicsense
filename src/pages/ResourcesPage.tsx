import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, BookOpen, Video, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RESOURCES = [
  {
    category: 'Official Portals',
    items: [
      { title: 'MyScheme Portal', desc: 'Find all schemes you are eligible for', url: 'https://myscheme.gov.in', icon: '🏛' },
      { title: 'DigiLocker', desc: 'Store and share government documents digitally', url: 'https://digilocker.gov.in', icon: '🗂' },
      { title: 'UMANG App', desc: 'Unified Mobile Application for government services', url: 'https://web.umang.gov.in', icon: '📱' },
      { title: 'India.gov.in', desc: 'The National Portal of India', url: 'https://india.gov.in', icon: '🇮🇳' },
    ],
  },
  {
    category: 'Downloadable Forms',
    items: [
      { title: 'Income Certificate Application', desc: 'For state government income certificate', url: '#', icon: '📄' },
      { title: 'Ration Card Application', desc: 'New/modification of ration card', url: '#', icon: '📄' },
      { title: 'Caste Certificate Form', desc: 'For SC/ST/OBC certificate', url: '#', icon: '📄' },
      { title: 'PM-KISAN Self Registration', desc: 'Farmer registration for PM-KISAN', url: '#', icon: '📄' },
    ],
  },
  {
    category: 'Guides & Tutorials',
    items: [
      { title: 'How to Apply for Passport', desc: 'Step-by-step passport application guide', url: '#', icon: '📖' },
      { title: 'DigiLocker Setup Guide', desc: 'Create and use your DigiLocker account', url: '#', icon: '📖' },
      { title: 'Aadhaar Update Process', desc: 'How to update your Aadhaar details', url: '#', icon: '📖' },
      { title: 'Scholarship Application Tips', desc: 'Tips for NSP scholarship applications', url: '#', icon: '📖' },
    ],
  },
];

const HELPLINES = [
  { name: 'PM-KISAN Helpline', number: '155261', desc: 'Farmer support' },
  { name: 'Ayushman Bharat', number: '14555', desc: 'Health scheme queries' },
  { name: 'DigiLocker Support', number: '1800-3000-7070', desc: 'Document service support' },
  { name: 'UIDAI Aadhaar', number: '1947', desc: 'Aadhaar related queries' },
  { name: 'Passport Seva', number: '1800-258-1800', desc: 'Passport application help' },
  { name: 'National Helpline', number: '1800-11-7422', desc: 'Central government services' },
];

export default function ResourcesPage() {
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resources</h1>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Official portals, downloadable forms, guides, and helpline numbers
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources sections */}
          <div className="lg:col-span-2 space-y-8">
            {RESOURCES.map((section, si) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.1 }}
              >
                <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {section.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <motion.a
                      key={item.title}
                      href={item.url}
                      target={item.url !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 group
                        ${darkMode
                          ? 'bg-gray-800/70 border-gray-700 hover:border-gray-600'
                          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                        ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.title}
                          </h3>
                          {item.url !== '#' ? (
                            <ExternalLink size={12} className={`flex-shrink-0 ${darkMode ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          ) : (
                            <Download size={12} className={`flex-shrink-0 ${darkMode ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Helplines */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl border overflow-hidden sticky top-20 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
            >
              <div className={`px-5 py-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-[#14B8A6]" />
                  <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Government Helplines</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {HELPLINES.map(h => (
                  <div key={h.name} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{h.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{h.desc}</p>
                    </div>
                    <a
                      href={`tel:${h.number}`}
                      className="text-sm font-bold text-[#0F4C81] hover:text-[#14B8A6] transition-colors"
                    >
                      {h.number}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
