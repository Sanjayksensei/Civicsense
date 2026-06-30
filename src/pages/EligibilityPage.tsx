import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, ExternalLink, Award, FileText, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCHEMES } from '../data/mockData';
import { EligibilityResult } from '../types';

const STEPS = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'select',
    options: ['Below 18', '18-25', '26-35', '36-45', '46-60', '60+'],
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'select',
    options: ['Male', 'Female', 'Other', 'Prefer not to say'],
  },
  {
    id: 'state',
    question: 'Which state do you live in?',
    type: 'select',
    options: ['Kerala', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Gujarat', 'West Bengal', 'Andhra Pradesh', 'Other'],
  },
  {
    id: 'occupation',
    question: 'What is your occupation?',
    type: 'select',
    options: ['Farmer', 'Student', 'Government Employee', 'Private Employee', 'Self-employed / Business', 'Homemaker', 'Unemployed', 'Retired'],
  },
  {
    id: 'income',
    question: 'What is your annual household income?',
    type: 'select',
    options: ['Below ₹1 lakh', '₹1-2.5 lakh', '₹2.5-5 lakh', '₹5-10 lakh', 'Above ₹10 lakh'],
  },
  {
    id: 'category',
    question: 'What is your social category?',
    type: 'select',
    options: ['General', 'OBC', 'SC', 'ST', 'EWS'],
  },
  {
    id: 'landOwnership',
    question: 'Do you own agricultural land?',
    type: 'select',
    options: ['Yes, less than 1 hectare', 'Yes, 1-2 hectares', 'Yes, more than 2 hectares', 'No'],
  },
  {
    id: 'studentStatus',
    question: 'Are you currently a student?',
    type: 'select',
    options: ['Yes, School (Class 1-10)', 'Yes, Higher Secondary', 'Yes, Undergraduate', 'Yes, Postgraduate / PhD', 'No'],
  },
  {
    id: 'seniorCitizen',
    question: 'Are you a Senior Citizen?',
    type: 'select',
    options: ['Yes (60+ years)', 'No'],
  },
  {
    id: 'disability',
    question: 'Do you have a disability?',
    type: 'select',
    options: ['Yes, with certificate', 'Yes, without certificate', 'No'],
  },
];

function computeEligibility(answers: Record<string, string>): EligibilityResult[] {
  const results: EligibilityResult[] = [];
  const income = answers.income || '';
  const occupation = answers.occupation || '';
  const student = answers.studentStatus || '';
  const land = answers.landOwnership || '';
  const gender = answers.gender || '';
  const age = answers.age || '';

  const isFarmer = occupation === 'Farmer' || land !== 'No';
  const isStudent = student !== 'No' && student !== '';
  const isLowIncome = income === 'Below ₹1 lakh' || income === '₹1-2.5 lakh';
  const isWoman = gender === 'Female';
  const isSenior = age === '60+' || answers.seniorCitizen === 'Yes (60+ years)';
  const isDisabled = answers.disability?.startsWith('Yes');

  if (isFarmer) {
    const s = SCHEMES.find(s => s.id === 'pm-kisan');
    if (s) results.push({ schemeId: s.id, schemeName: s.name, category: s.category, matchScore: 95, benefits: s.benefits, documents: s.documents, applyUrl: s.applyUrl });
    const kcc = SCHEMES.find(s => s.id === 'kisan-credit-card');
    if (kcc) results.push({ schemeId: kcc.id, schemeName: kcc.name, category: kcc.category, matchScore: 88, benefits: kcc.benefits, documents: kcc.documents, applyUrl: kcc.applyUrl });
  }
  if (isLowIncome) {
    const s = SCHEMES.find(s => s.id === 'ayushman-bharat');
    if (s) results.push({ schemeId: s.id, schemeName: s.name, category: s.category, matchScore: 90, benefits: s.benefits, documents: s.documents, applyUrl: s.applyUrl });
    const awas = SCHEMES.find(s => s.id === 'pm-awas');
    if (awas) results.push({ schemeId: awas.id, schemeName: awas.name, category: awas.category, matchScore: 85, benefits: awas.benefits, documents: awas.documents, applyUrl: awas.applyUrl });
  }
  if (isStudent) {
    const s = SCHEMES.find(s => s.id === 'nsp');
    if (s) results.push({ schemeId: s.id, schemeName: s.name, category: s.category, matchScore: 92, benefits: s.benefits, documents: s.documents, applyUrl: s.applyUrl });
  }
  if (isWoman && isLowIncome) {
    const s = SCHEMES.find(s => s.id === 'pm-ujjwala');
    if (s) results.push({ schemeId: s.id, schemeName: s.name, category: s.category, matchScore: 87, benefits: s.benefits, documents: s.documents, applyUrl: s.applyUrl });
  }
  if (isWoman) {
    const s = SCHEMES.find(s => s.id === 'sukanya-samriddhi');
    if (s) results.push({ schemeId: s.id, schemeName: s.name, category: s.category, matchScore: 80, benefits: s.benefits, documents: s.documents, applyUrl: s.applyUrl });
  }
  const mudra = SCHEMES.find(s => s.id === 'mudra-yojana');
  if (mudra) results.push({ schemeId: mudra.id, schemeName: mudra.name, category: mudra.category, matchScore: 75, benefits: mudra.benefits, documents: mudra.documents, applyUrl: mudra.applyUrl });
  const eshram = SCHEMES.find(s => s.id === 'e-shram');
  if (eshram) results.push({ schemeId: eshram.id, schemeName: eshram.name, category: eshram.category, matchScore: 70, benefits: eshram.benefits, documents: eshram.documents, applyUrl: eshram.applyUrl });

  if (results.length < 3) {
    const digilocker = SCHEMES.find(s => s.id === 'digilocker');
    if (digilocker) results.push({ schemeId: digilocker.id, schemeName: digilocker.name, category: digilocker.category, matchScore: 99, benefits: digilocker.benefits, documents: digilocker.documents, applyUrl: digilocker.applyUrl });
    const aadhaar = SCHEMES.find(s => s.id === 'aadhaar');
    if (aadhaar) results.push({ schemeId: aadhaar.id, schemeName: aadhaar.name, category: aadhaar.category, matchScore: 99, benefits: aadhaar.benefits, documents: aadhaar.documents, applyUrl: aadhaar.applyUrl });
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

const CATEGORY_COLORS: Record<string, string> = {
  Agriculture: 'bg-green-100 text-green-700',
  Healthcare: 'bg-red-100 text-red-700',
  Housing: 'bg-orange-100 text-orange-700',
  Education: 'bg-blue-100 text-blue-700',
  Women: 'bg-pink-100 text-pink-700',
  Employment: 'bg-purple-100 text-purple-700',
  'Public Services': 'bg-teal-100 text-teal-700',
  Business: 'bg-yellow-100 text-yellow-700',
};

export default function EligibilityPage() {
  const { darkMode } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<EligibilityResult[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;
  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = { ...answers, [currentStep.id]: selectedOption };
    setAnswers(newAnswers);
    if (isLastStep) {
      setResults(computeEligibility(newAnswers));
    } else {
      setStep(s => s + 1);
      setSelectedOption(answers[STEPS[step + 1]?.id] || '');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(s => s - 1);
      setSelectedOption(answers[STEPS[step - 1].id] || '');
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
    setSelectedOption('');
  };

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#14B8A6] mb-4 shadow-lg">
            <CheckCircle size={28} className="text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Eligibility Checker</h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Answer a few questions to discover government schemes you qualify for
          </p>
        </motion.div>

        {results ? (
          // Results Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`rounded-2xl border p-6 mb-6 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  You qualify for {results.length} schemes!
                </h2>
                <button onClick={handleReset} className="btn-secondary !px-4 !py-2 !text-sm">
                  Retake
                </button>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Based on your profile, here are the government schemes you are eligible for:
              </p>
            </div>

            <div className="space-y-4">
              {results.map((result, i) => (
                <motion.div
                  key={result.schemeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
                >
                  <div className={`px-5 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[result.category] || 'bg-gray-100 text-gray-700'}`}>
                            {result.category}
                          </span>
                          <span className="text-xs font-bold text-[#22C55E]">{result.matchScore}% match</span>
                        </div>
                        <h3 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {result.schemeName}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16a34a] flex items-center justify-center flex-shrink-0">
                        <Award size={18} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Benefits */}
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Benefits</p>
                        <ul className="space-y-1">
                          {result.benefits.map(b => (
                            <li key={b} className="flex items-start gap-2">
                              <CheckCircle size={13} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Required Documents</p>
                        <ul className="space-y-1">
                          {result.documents.map(d => (
                            <li key={d} className="flex items-start gap-2">
                              <FileText size={13} className="text-[#0F4C81] mt-0.5 flex-shrink-0" />
                              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={result.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 btn-primary !px-4 !py-2 !text-sm"
                    >
                      Apply Now
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Wizard
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-md'}`}
          >
            {/* Progress bar */}
            <div className={`h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-[#0F4C81] to-[#14B8A6]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="p-8">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Step {step + 1} of {STEPS.length}
                </span>
                <div className="flex gap-1">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < step ? 'bg-[#0F4C81] w-5' : i === step ? 'bg-[#14B8A6] w-8' : 'bg-gray-200 w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentStep.question}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.options.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`px-4 py-3.5 rounded-xl border text-sm font-medium text-left transition-all duration-200
                          ${selectedOption === option
                            ? 'bg-gradient-to-r from-[#0F4C81] to-[#1565A8] text-white border-transparent shadow-md'
                            : darkMode
                              ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-[#14B8A6]/60 hover:bg-gray-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#0F4C81]/40 hover:bg-blue-50'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${step === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`flex items-center gap-2 btn-primary !px-6 !py-2.5 !text-sm
                    ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLastStep ? 'Check Eligibility' : 'Next'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
