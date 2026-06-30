import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import SchemesPage from './pages/SchemesPage';
import EligibilityPage from './pages/EligibilityPage';
import OfficesPage from './pages/OfficesPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/schemes" element={<PageWrapper><SchemesPage /></PageWrapper>} />
        <Route path="/eligibility" element={<PageWrapper><EligibilityPage /></PageWrapper>} />
        <Route path="/offices" element={<PageWrapper><OfficesPage /></PageWrapper>} />
        <Route path="/resources" element={<PageWrapper><ResourcesPage /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
