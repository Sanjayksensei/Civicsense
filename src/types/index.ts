export interface Scheme {
  id: string;
  name: string;
  category: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  applyUrl: string;
  tag?: string;
}

export interface Office {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  status: 'Open' | 'Closed' | 'Limited Hours';
  timing: string;
  phone: string;
  lat?: number;
  lng?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  url: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

export interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  category: string;
  matchScore: number;
  benefits: string[];
  documents: string[];
  applyUrl: string;
}
