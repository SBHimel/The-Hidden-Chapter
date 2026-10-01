'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, Unlock, KeyRound, Sparkles, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

const CORRECT_COMBINATION = ['7', '3', '9', '2'];

export default function LockedDoorPage() {
  const router = useRouter();
  const { unlockDoor, isDoorUnlocked } = useSecretJourney();
  const [digits, setDigits] = useState<string[]>(isDoorUnlocked ? CORRECT_COMBINATION : ['0', '0', '0', '0']);
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(isDoorUnlocked);
  const [showConfirmation, setShowConfirmation] = useState(isDoorUnlocked);

  const handleDigitChange = (index: number, direction: 'up' | 'down') => {
    if (isUnlocked) return;
    setError(false);
    setDigits((prev) => {
      const updated = [...prev];
      const currentVal = parseInt(updated[index], 10);
      const newVal = direction === 'up' ? (currentVal + 1) % 10 : (currentVal + 9) % 10;
      updated[index] = newVal.toString();
      return updated;
    });
  };

  const handleAutoFill = () => {
    setDigits(CORRECT_COMBINATION);
    setError(false);
  };

  const handleAttemptUnlock = () => {
    if (digits.join('') === CORRECT_COMBINATION.join('')) {
      setIsUnlocked(true);
      unlockDoor();
      setTimeout(() => {
        setShowConfirmation(true);
      }, 1000);
    } else {
      setError(true);
    }
  };

  const handleProceedToLetter = () => {
    router.push('/secret/letter');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
            The Final Threshold
          </span>
          <h1 className="text-3xl font-serif text-[#F3E7CC]">
            The Antique Combination Lock
          </h1>
          <p className="text-xs text-[#A99A7C] font-light">
            Align the four cipher digits discovered along your journey (`7 - 3 - 9 - 2`).
          </p>
        </div>

        {/* Lock Mechanism Container */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#211C16] border border-[#A9824A]/40 shadow-2xl relative space-y-8">
          {/* Lock Icon Emblem */}
          <div className="mx-auto w-20 h-20 rounded-full bg-[#12110E] border-2 border-[#A9824A] flex items-center justify-center shadow-inner">
            {isUnlocked ? (
              <Unlock className="w-10 h-10 text-[#C9A45C] animate-bounce" />
            ) : (
              <Lock className="w-10 h-10 text-[#A9824A]" />
            )}
          </div>

          {/* Combination Dials */}
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            {digits.map((digit, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleDigitChange(i, 'up')}
                  disabled={isUnlocked}
                  className="p-1 text-[#A99A7C] hover:text-[#C9A45C] disabled:opacity-30"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>

                <div className="w-14 h-20 sm:w-16 sm:h-24 rounded-xl bg-[#12110E] border-2 border-[#A9824A]/40 flex items-center justify-center text-2xl sm:text-3xl font-mono text-[#F3E7CC] shadow-inner">
                  {digit}
                </div>

                <button
                  onClick={() => handleDigitChange(i, 'down')}
                  disabled={isUnlocked}
                  className="p-1 text-[#A99A7C] hover:text-[#C9A45C] disabled:opacity-30"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Helper & Auto-fill Action */}
          {!isUnlocked && (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleAutoFill}
                className="text-xs font-mono text-[#C9A45C] hover:underline flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-fill Discovered Cipher (7392)</span>
              </button>

              {error && (
                <p className="text-xs text-red-400 font-mono">
                  Incorrect combination. Review the fragments collected earlier.
                </p>
              )}
            </div>
          )}

          {/* Unlock Action Button */}
          {!isUnlocked && (
            <button
              onClick={handleAttemptUnlock}
              className="w-full py-4 rounded-xl bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm border border-[#A9824A]/40 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02]"
            >
              <KeyRound className="w-4 h-4" />
              <span>Turn Brass Key & Unlock</span>
            </button>
          )}
        </div>

        {/* Final Confirmation Modal / Card */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#3A2A1D]/90 border border-[#C9A45C] shadow-2xl space-y-6 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-[#12110E] border border-[#C9A45C] flex items-center justify-center text-[#C9A45C]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-[#F3E7CC]">
                  The Inner Seal is Broken
                </h3>
                <p className="text-base font-serif italic text-[#C9A45C]">
                  "Are you ready to read what was written in silence?"
                </p>
              </div>

              <button
                onClick={handleProceedToLetter}
                className="px-8 py-4 rounded-full bg-[#A9824A] hover:bg-[#C9A45C] text-[#12110E] font-semibold text-base shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Open the Parchment Letter
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
