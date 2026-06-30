import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Search, Shield, Zap, Globe, ChevronRight, ArrowRight,
  Star, Users, CheckCircle, Award, TrendingUp, FileText, MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const FLOATING_ICONS = [
  { label: 'Aadhaar', emoji: '🪪', delay: 0, x: -180, y: -80 },
  { label: 'Passport', emoji: '🛂', delay: 0.3, x: 180, y: -100 },
  { label: 'Agriculture', emoji: '🌾', delay: 0.6, x: -200, y: 60 },
  { label: 'Education', emoji: '🎓', delay: 0.9, x: 200, y: 80 },
  { label: 'Healthcare', emoji: '🏥', delay: 1.2, x: -120, y: 160 },
  { label: 'Housing', emoji: '🏠', delay: 1.5, x: 140, y: 170 },
  { label: 'Services', emoji: '🏛', delay: 1.8, x: 0, y: -200 },
  { label: 'Employment', emoji: '💼', delay: 2.1, x: -60, y: 230 },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'AI-Powered Assistant',
    desc: 'Get instant, accurate answers about government schemes and services powered by advanced AI.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Search,
    title: 'Scheme Discovery',
    desc: 'Find all government schemes you are eligible for based on your profile in seconds.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: CheckCircle,
    title: 'Eligibility Checker',
    desc: 'Answer simple questions and instantly know which schemes and benefits you qualify for.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: MapPin,
    title: 'Nearby Offices',
    desc: 'Locate government offices, CSC centres, and service centers nearest to you.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: FileText,
    title: 'Document Guidance',
    desc: 'Step-by-step guidance for Aadhaar, Passport, PAN, Driving Licence, and more.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    desc: 'Available in English, Hindi, Malayalam, Tamil, and Kannada for maximum accessibility.',
    color: 'from-pink-500 to-pink-600',
  },
];

const SCHEMES_PREVIEW = [
  { name: 'PM-KISAN', category: 'Agriculture', benefit: '₹6,000/year', emoji: '🌾' },
  { name: 'Ayushman Bharat', category: 'Healthcare', benefit: '₹5L coverage', emoji: '🏥' },
  { name: 'PM Awas Yojana', category: 'Housing', benefit: '₹1.2L support', emoji: '🏠' },
  { name: 'NSP Scholarship', category: 'Education', benefit: 'Up to ₹50K', emoji: '🎓' },
  { name: 'PM Mudra Yojana', category: 'Business', benefit: 'Loan ₹10L', emoji: '💼' },
  { name: 'Sukanya Samriddhi', category: 'Women', benefit: '8.2% interest', emoji: '👩' },
];

const STATS = [
  { value: '1000+', label: 'Government Schemes', icon: Award },
  { value: '100M+', label: 'Citizens Assisted', icon: Users },
  { value: '28', label: 'States Covered', icon: Globe },
  { value: '99.9%', label: 'Accuracy Rate', icon: TrendingUp },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function LandingPage() {
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${darkMode
            ? 'bg-gradient-to-br from-[#0F172A] via-[#0f2744] to-[#0F172A]'
            : 'bg-gradient-to-br from-[#F8FAFC] via-[#e8f4fd] to-[#F0FDFC]'}`}
          />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0F4C81]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 py-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6
                bg-gradient-to-r from-[#0F4C81]/10 to-[#14B8A6]/10 border border-[#0F4C81]/20"
            >
              <Zap size={14} className="text-[#14B8A6]" />
              <span className={darkMode ? 'text-[#14B8A6]' : 'text-[#0F4C81]'}>AI-Powered Government Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Civic
              <span className="bg-gradient-to-r from-[#0F4C81] to-[#14B8A6] bg-clip-text text-transparent">
                Sense
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl sm:text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Your AI-powered Government Services Assistant
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Making Government Services <span className="font-semibold text-[#14B8A6]">Smarter</span>,{' '}
              <span className="font-semibold text-[#0F4C81]">Simpler</span>, and{' '}
              <span className="font-semibold text-[#22C55E]">Accessible</span> for every citizen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/chat" className="btn-primary flex items-center justify-center gap-2 text-base">
                <MessageSquare size={18} />
                Start Chat
                <ArrowRight size={16} />
              </Link>
              <Link to="/schemes" className="btn-secondary flex items-center justify-center gap-2 text-base">
                <Search size={18} />
                Explore Schemes
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
            >
              {STATS.map(stat => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Animated illustration */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Central icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#0F4C81]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-[#14B8A6]/20"
              />

              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] shadow-2xl
                    flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-5xl">🏛</span>
                  <span className="text-white text-xs font-semibold">CivicSense</span>
                </motion.div>
              </div>

              {/* Floating icons */}
              {FLOATING_ICONS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, 5, -5, 0],
                    y: [0, -8, 8, 0],
                  }}
                  transition={{
                    opacity: { delay: item.delay, duration: 0.5 },
                    scale: { delay: item.delay, duration: 0.5 },
                    x: { delay: item.delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    y: { delay: item.delay + 0.5, duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className={`absolute w-12 h-12 rounded-2xl shadow-lg flex flex-col items-center justify-center
                    ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}
                    cursor-default`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`,
                  }}
                >
                  <span className="text-xl">{item.emoji}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Scroll to explore</span>
          <div className={`w-5 h-8 rounded-full border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'} flex items-start justify-center p-1`}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-[#14B8A6]"
            />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className={`py-24 ${darkMode ? 'bg-[#111827]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wider">Features</span>
            <h2 className={`text-3xl sm:text-4xl font-bold mt-2 mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Everything you need to navigate government services
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              CivicSense brings together AI intelligence and official government data to make services accessible for every citizen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border transition-all duration-300
                  ${darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schemes Preview */}
      <section className={`py-24 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wider">Government Schemes</span>
            <h2 className={`text-3xl sm:text-4xl font-bold mt-2 mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Popular schemes at your fingertips
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover hundreds of central and state government schemes tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {SCHEMES_PREVIEW.map((scheme, i) => (
              <motion.div
                key={scheme.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer
                  ${darkMode ? 'bg-gray-800/70 border-gray-700 hover:border-[#14B8A6]/50' : 'bg-white border-gray-100 hover:border-[#14B8A6]/50 shadow-sm'}`}
              >
                <div className="text-3xl mb-2">{scheme.emoji}</div>
                <div className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{scheme.name}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-2`}>{scheme.category}</div>
                <div className="text-xs font-bold text-[#22C55E]">{scheme.benefit}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/schemes" className="btn-primary inline-flex items-center gap-2">
              View All Schemes
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0F4C81] via-[#1565A8] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-4xl mb-6 block">🏛</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start exploring government services today
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              Ask CivicSense anything about government schemes, applications, or services. Available 24/7, in your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat" className="bg-white text-[#0F4C81] font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Chat with CivicSense
              </Link>
              <Link to="/eligibility" className="bg-white/10 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <CheckCircle size={18} />
                Check Eligibility
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${darkMode ? 'bg-[#0F172A] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">CS</span>
                </div>
                <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0F4C81]'}`}>
                  Civic<span className="text-[#14B8A6]">Sense</span>
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Making government services smarter, simpler, and accessible for every citizen.
              </p>
            </div>
            {[
              { title: 'Services', links: ['AI Assistant', 'Eligibility Checker', 'Scheme Finder', 'Nearby Offices'] },
              { title: 'Popular Schemes', links: ['PM-KISAN', 'Ayushman Bharat', 'PM Awas Yojana', 'Passport Seva'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <span className={`text-sm cursor-pointer hover:text-[#14B8A6] transition-colors ${darkMode ? 'text-gray-500 hover:text-[#14B8A6]' : 'text-gray-500 hover:text-[#0F4C81]'}`}>
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`mt-8 pt-8 border-t text-center text-sm ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
            © 2024 CivicSense. Made with ❤ for the citizens of India.
          </div>
        </div>
      </footer>
    </div>
  );
}
