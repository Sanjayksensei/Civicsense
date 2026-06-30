import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, ChatSession } from '../types';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  chatSessions: ChatSession[];
  currentSession: ChatSession | null;
  createNewSession: () => void;
  sendMessage: (content: string) => void;
  isTyping: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

const generateId = () => Math.random().toString(36).slice(2);

const MOCK_RESPONSES = [
  `I'm CivicSense, your AI-powered Government Services Assistant. I can help you with:

**Government Schemes & Benefits**
- Find schemes you're eligible for based on your profile
- Explain eligibility criteria and application process

**Document Services**
- Aadhaar, PAN, Passport, Driving Licence
- Birth Certificate, Income Certificate, Caste Certificate

Please ask me anything about government services!`,

  `## Farmer Schemes in India

Here are the major government schemes available for farmers:

### 1. PM-KISAN Samman Nidhi
- **Benefit:** ₹6,000/year in 3 installments
- **Eligibility:** Small & marginal farmers with up to 2 hectares land

### 2. Kisan Credit Card (KCC)
- **Benefit:** Credit up to ₹3 lakh at 4% interest
- **Eligibility:** All farmers with land ownership

### 3. PM Fasal Bima Yojana
- **Benefit:** Crop insurance coverage
- **Eligibility:** All farmers growing notified crops

Would you like detailed information about any specific scheme?`,

  `## Passport Application Process

**Step 1:** Register at passportindia.gov.in
**Step 2:** Fill application form with personal details
**Step 3:** Upload required documents
**Step 4:** Book appointment at nearest Passport Seva Kendra
**Step 5:** Visit PSK with original documents

### Required Documents
- Aadhaar Card (mandatory)
- Birth Certificate / 10th Marksheet
- Address Proof
- Recent Passport Photo

### Processing Time
- Normal: 30-45 days
- Tatkal: 3-5 days

Need help with any specific step?`,

  `## Ayushman Bharat PM-JAY

India's flagship health insurance scheme providing coverage up to **₹5 lakh per family per year**.

### Key Features
- Covers 25,000+ empanelled hospitals
- Cashless treatment facility
- Covers pre-existing conditions from day 1
- No cap on family size

### How to Check Eligibility
1. Visit pmjay.gov.in
2. Enter your mobile number / Aadhaar
3. Check if your family is covered

### To Avail Benefits
Show your Ayushman Card or Aadhaar at any empanelled hospital. Treatment is completely free for covered procedures.`,
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const createNewSession = () => {
    const session: ChatSession = {
      id: generateId(),
      title: 'New Chat',
      createdAt: new Date(),
      messages: [],
    };
    setChatSessions(prev => [session, ...prev]);
    setCurrentSession(session);
  };

  const sendMessage = (content: string) => {
    if (!currentSession) {
      const session: ChatSession = {
        id: generateId(),
        title: content.slice(0, 40),
        createdAt: new Date(),
        messages: [],
      };
      const userMsg: Message = { id: generateId(), role: 'user', content, timestamp: new Date() };
      const updatedSession = { ...session, messages: [userMsg] };
      setChatSessions(prev => [updatedSession, ...prev]);
      setCurrentSession(updatedSession);
      simulateResponse(updatedSession, userMsg);
    } else {
      const userMsg: Message = { id: generateId(), role: 'user', content, timestamp: new Date() };
      const updatedSession = {
        ...currentSession,
        title: currentSession.messages.length === 0 ? content.slice(0, 40) : currentSession.title,
        messages: [...currentSession.messages, userMsg],
      };
      setChatSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
      setCurrentSession(updatedSession);
      simulateResponse(updatedSession, userMsg);
    }
  };

  const simulateResponse = (session: ChatSession, userMsg: Message) => {
    setIsTyping(true);
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const responseText = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        sources: [
          { title: 'Government of India Portal', url: 'https://india.gov.in' },
          { title: 'MyScheme Portal', url: 'https://myscheme.gov.in' },
        ],
      };
      const finalSession = { ...session, messages: [...session.messages, assistantMsg] };
      setChatSessions(prev => prev.map(s => s.id === session.id ? finalSession : s));
      setCurrentSession(finalSession);
      setIsTyping(false);
    }, delay);
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode: () => setDarkMode(d => !d),
      language,
      setLanguage,
      chatSessions,
      currentSession,
      createNewSession,
      sendMessage,
      isTyping,
      sidebarOpen,
      setSidebarOpen,
      rightSidebarOpen,
      setRightSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};
