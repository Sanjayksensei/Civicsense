import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Rss, MapPin, Download, Bell, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '100' },
  { name: 'Fire', number: '101' },
  { name: 'Ambulance', number: '102' },
  { name: 'Disaster Mgmt', number: '108' },
  { name: 'Women Helpline', number: '1091' },
  { name: 'Child Helpline', number: '1098' },
];

const QUICK_ACTIONS = [
  { icon: CheckCircle, label: 'Check Eligibility', path: '/eligibility', color: 'from-[#0F4C81] to-[#1565A8]' },
  { icon: MapPin, label: 'Find Offices', path: '/offices', color: 'from-[#14B8A6] to-[#0d9488]' },
  { icon: Rss, label: 'Latest Schemes', path: '/schemes', color: 'from-[#22C55E] to-[#16a34a]' },
  { icon: Download, label: 'Downloads', path: '/resources', color: 'from-orange-500 to-orange-600' },
];

export default function RightSidebar() {
  const { darkMode, rightSidebarOpen } = useApp();

  if (!rightSidebarOpen) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`w-72 flex-shrink-0 h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin
        ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'} border-l`}
    >
      <div className="p-4 space-y-5">
        {/* Quick Actions */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(action => (
              <Link
                key={action.path}
                to={action.path}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${action.color}
                  text-white text-xs font-medium text-center transition-all hover:shadow-md hover:scale-[1.02] active:scale-95`}
              >
                <action.icon size={20} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Government Updates */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Latest Updates
          </h3>
          <div className="space-y-2.5">
            {[
              { title: 'PM-KISAN 17th Installment Released', date: '2 days ago', color: 'bg-green-500' },
              { title: 'Ayushman Bharat Card Drive Extended', date: '5 days ago', color: 'bg-blue-500' },
              { title: 'New Scholarship Portal Launched', date: '1 week ago', color: 'bg-purple-500' },
            ].map((update, i) => (
              <div key={i} className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full ${update.color} mt-1.5 flex-shrink-0`} />
                  <div>
                    <p className={`text-xs font-medium leading-snug ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {update.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{update.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Emergency Contacts
          </h3>
          <div className="space-y-1.5">
            {EMERGENCY_CONTACTS.map(contact => (
              <div
                key={contact.name}
                className={`flex items-center justify-between px-3 py-2 rounded-lg
                  ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
              >
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-[#14B8A6]" />
                  <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{contact.name}</span>
                </div>
                <a href={`tel:${contact.number}`} className="text-xs font-bold text-[#0F4C81] hover:text-[#14B8A6] transition-colors">
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
