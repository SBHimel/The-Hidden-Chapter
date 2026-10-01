'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, CheckCircle2, Shield } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

export default function Clue2Page() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const isUnlocked = discoveredClues['clue-2'];
  const [isExamined, setIsExamined] = useState(isUnlocked);

  const handleExamine = () => {
    setIsExamined(true);
    unlockClue('clue-2');
  };

  const handleNext = () => {
    markStepComplete('diary');
    setStep('diary');
    router.push('/secret/diary');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            Fragment II / VIII
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            The Shadow Locket
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            An antique silver locket resting upon velvet. Touch the center seal to examine its reflection.
          </p>
        </div>

        {/* Locket Card Graphic */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={handleExamine}
          className="cursor-pointer p-8 rounded-2xl bg-[#211C16] border border-[#A9824A]/30 shadow-2xl relative flex flex-col items-center justify-center space-y-6 group"
        >
          {/* Locket Oval Graphic */}
          <div className="relative w-36 h-44 rounded-full border-2 border-[#A9824A] bg-[#12110E] flex flex-col items-center justify-center shadow-inner overflow-hidden group-hover:border-[#C9A45C] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3A2A1D]/40 via-transparent to-[#C9A45C]/10" />

            <Shield className="w-12 h-12 text-[#A9824A] group-hover:text-[#C9A45C] transition-colors animate-pulse" />

            <span className="mt-2 text-[10px] font-mono text-[#A99A7C] tracking-widest">
              {isExamined ? 'UNLOCKED' : 'TOUCH TO REVEAL'}
            </span>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-sm font-serif text-[#F3E7CC] group-hover:text-[#C9A45C] transition-colors">
              Engraved Antique Emblem
            </h3>
            <p className="text-xs text-[#A99A7C] font-light">
              Click to lift the silver casing and inspect the cipher written inside.
            </p>
          </div>
        </motion.div>

        {/* Revealed Secret Box */}
        <AnimatePresence>
          {isExamined && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-[#3A2A1D]/60 border border-[#C9A45C]/40 text-left space-y-3 shadow-lg"
            >
              <div className="flex items-center gap-2 text-[#C9A45C]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-serif text-sm font-semibold">
                  Engraving Decoded
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#F3E7CC] leading-relaxed">
                Inside the locket is a tiny hand-written note: "Memories turn like hands upon a clock."
              </p>
              <div className="p-2 bg-[#12110E] rounded border border-[#A9824A]/30 text-center font-mono text-xs text-[#C9A45C]">
                Key Digit #2: <span className="font-bold text-sm text-[#F3E7CC]">3</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Chapter Action */}
        <div>
          <button
            onClick={handleNext}
            disabled={!isExamined}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isExamined
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>Proceed to Fragment III (The Diary)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isExamined && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-mono">
              (Examine the locket above to proceed)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
