import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Search, Filter, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OFFICES } from '../data/mockData';

const OFFICE_TYPES = ['All', 'CSC Centre', 'Collector Office', 'Passport Seva Kendra', 'Government Hospital', 'Police Station', 'Panchayat Office', 'Village Office', 'RTO'];

const OFFICE_ICONS: Record<string, string> = {
  'CSC Centre': '🏪',
  'Collector Office': '🏛',
  'Passport Seva Kendra': '🛂',
  'Government Hospital': '🏥',
  'Police Station': '👮',
  'Panchayat Office': '🏘',
  'Village Office': '🏠',
  'RTO': '🚗',
};

const STATUS_STYLES: Record<string, string> = {
  Open: 'bg-green-100 text-green-700',
  Closed: 'bg-red-100 text-red-700',
  'Limited Hours': 'bg-yellow-100 text-yellow-700',
};

export default function OfficesPage() {
  const { darkMode } = useApp();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = OFFICES.filter(o => {
    const matchType = activeType === 'All' || o.type === activeType;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.address.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Nearby Government Offices
            </h1>
            <p className={`text-base mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Find government offices, service centers, and facilities near you
            </p>

            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border max-w-2xl
              ${darkMode ? 'bg-gray-800 border-gray-700 focus-within:border-[#14B8A6]/60' : 'bg-gray-50 border-gray-300 focus-within:border-[#14B8A6]/60'}
              focus-within:ring-2 focus-within:ring-[#14B8A6]/10 transition-all`}
            >
              <Search size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or area..."
                className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? 'text-gray-100 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Map placeholder + filters */}
          <div className="lg:col-span-1">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl overflow-hidden border mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200 shadow-sm'}`}
            >
              <div className={`relative h-64 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                {/* Fake map background */}
                <div className="absolute inset-0 opacity-20">
                  <div className={`absolute inset-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px',
                    }}
                  />
                </div>
                {/* Fake roads */}
                <div className="absolute inset-0">
                  <div className={`absolute h-px left-0 right-0 top-1/2 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} style={{ height: '3px' }} />
                  <div className={`absolute w-px top-0 bottom-0 left-1/3 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} style={{ width: '3px' }} />
                  <div className={`absolute w-px top-0 bottom-0 left-2/3 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} style={{ width: '2px' }} />
                  <div className={`absolute h-px left-0 right-0 top-1/3 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} style={{ height: '2px' }} />
                </div>

                {/* Map pins */}
                {[
                  { top: '30%', left: '25%' },
                  { top: '55%', left: '60%' },
                  { top: '40%', left: '75%' },
                  { top: '70%', left: '40%' },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0F4C81] border-2 border-white shadow-lg flex items-center justify-center">
                      <MapPin size={14} className="text-white" />
                    </div>
                  </motion.div>
                ))}

                <div className="relative z-10 text-center">
                  <div className={`text-base font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Interactive Map
                  </div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    Enable location for nearby offices
                  </div>
                  <button className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl bg-[#0F4C81] text-white text-xs font-medium hover:bg-[#0a3d6b] transition-all">
                    <MapPin size={13} />
                    Use My Location
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Type Filters */}
            <div className={`rounded-2xl border p-4 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Filter by Type</h3>
              <div className="space-y-1">
                {OFFICE_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                      ${activeType === type
                        ? 'bg-[#0F4C81] text-white font-medium'
                        : darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {type !== 'All' && OFFICE_ICONS[type]}{' '}{type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Office Cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{filtered.length}</span> offices found
              </p>
            </div>

            <div className="space-y-4">
              {filtered.map((office, i) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-5 transition-all duration-200
                    ${darkMode ? 'bg-gray-800/70 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                      ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      {OFFICE_ICONS[office.type] || '🏛'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {office.name}
                          </h3>
                          <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{office.type}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[office.status]}`}>
                            {office.status}
                          </span>
                          <span className={`text-xs font-semibold text-[#0F4C81] ${darkMode ? 'text-blue-400' : ''}`}>
                            {office.distance}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{office.address}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{office.timing}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
                          <a href={`tel:${office.phone}`} className="text-xs text-[#14B8A6] hover:underline">{office.phone}</a>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0F4C81] text-white hover:bg-[#0a3d6b] transition-all">
                          <Navigation size={11} />
                          Directions
                        </button>
                        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                          ${darkMode ? 'border-gray-700 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                          <Phone size={11} />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <span className="text-5xl mb-4 block">🗺</span>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No offices found</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    Try a different search or filter
                  </p>
                  <button onClick={() => { setSearch(''); setActiveType('All'); }} className="btn-primary mt-4 !text-sm !px-5 !py-2.5">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
