import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCHEMES, CATEGORY_ICONS } from '../data/mockData';

const CATEGORIES = ['All', 'Agriculture', 'Education', 'Women', 'Healthcare', 'Employment', 'Housing', 'Business', 'Public Services'];

const CATEGORY_COLORS: Record<string, string> = {
  Agriculture: 'bg-green-100 text-green-700 border-green-200',
  Healthcare: 'bg-red-100 text-red-700 border-red-200',
  Housing: 'bg-orange-100 text-orange-700 border-orange-200',
  Education: 'bg-blue-100 text-blue-700 border-blue-200',
  Women: 'bg-pink-100 text-pink-700 border-pink-200',
  Employment: 'bg-purple-100 text-purple-700 border-purple-200',
  'Public Services': 'bg-teal-100 text-teal-700 border-teal-200',
  Business: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const TAG_COLORS: Record<string, string> = {
  Popular: 'bg-gradient-to-r from-orange-400 to-orange-500 text-white',
  New: 'bg-gradient-to-r from-green-400 to-green-500 text-white',
};

function SchemeCard({ scheme }: { scheme: typeof SCHEMES[0] }) {
  const { darkMode } = useApp();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300
        ${darkMode ? 'bg-gray-800/70 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${CATEGORY_COLORS[scheme.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {CATEGORY_ICONS[scheme.category]}{' '}{scheme.category}
              </span>
              {scheme.tag && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TAG_COLORS[scheme.tag]}`}>
                  {scheme.tag}
                </span>
              )}
            </div>
            <h3 className={`text-base font-semibold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {scheme.name}
            </h3>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{scheme.ministry}</p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : '#F8FAFC' }}>
            {CATEGORY_ICONS[scheme.category] || '🏛'}
          </div>
        </div>

        <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {scheme.description}
        </p>

        {/* Benefits preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scheme.benefits.slice(0, 2).map(b => (
            <span key={b} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              ✓ {b}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={scheme.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-4 !py-2 !text-xs flex items-center gap-1.5"
          >
            Apply Now
            <ExternalLink size={12} />
          </a>
          <button
            onClick={() => setExpanded(e => !e)}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-all
              ${darkMode ? 'text-[#14B8A6] hover:bg-gray-700' : 'text-[#0F4C81] hover:bg-blue-50'}`}
          >
            {expanded ? 'Less' : 'Learn More'}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`border-t overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
          >
            <div className={`p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-900/40' : 'bg-gray-50/80'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Eligibility</p>
                <ul className="space-y-1">
                  {scheme.eligibility.map(e => (
                    <li key={e} className={`text-xs flex items-start gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-[#0F4C81] font-bold mt-0.5">•</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>All Benefits</p>
                <ul className="space-y-1">
                  {scheme.benefits.map(b => (
                    <li key={b} className={`text-xs flex items-start gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-[#22C55E] font-bold mt-0.5">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Documents Required</p>
                <ul className="space-y-1">
                  {scheme.documents.map(d => (
                    <li key={d} className={`text-xs flex items-start gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-[#14B8A6] mt-0.5">📄</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SchemesPage() {
  const { darkMode } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return SCHEMES.filter(s => {
      const matchCat = activeCategory === 'All' || s.category === activeCategory;
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Government Schemes
            </h1>
            <p className={`text-base mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover central and state government schemes across all categories
            </p>

            {/* Search */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border max-w-2xl
              ${darkMode ? 'bg-gray-800 border-gray-700 focus-within:border-[#14B8A6]/60' : 'bg-gray-50 border-gray-300 focus-within:border-[#14B8A6]/60'}
              focus-within:ring-2 focus-within:ring-[#14B8A6]/10 transition-all`}
            >
              <Search size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search schemes by name, category, or benefit..."
                className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? 'text-gray-100 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
              />
              {search && (
                <button onClick={() => setSearch('')} className={darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}>
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-gradient-to-r from-[#0F4C81] to-[#1565A8] text-white border-transparent shadow-sm'
                  : darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800'
                }`}
            >
              {cat !== 'All' && CATEGORY_ICONS[cat]}{' '}{cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className={`flex items-center justify-between mb-5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p className="text-sm">
            Showing <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{filtered.length}</span> schemes
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {search && ` matching "${search}"`}
          </p>
        </div>

        {/* Scheme Cards */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((scheme, i) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-5xl mb-4 block">🔍</span>
              <p className={`text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No schemes found
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                Try a different search term or category
              </p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="btn-primary mt-4 !text-sm !px-5 !py-2.5">
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
