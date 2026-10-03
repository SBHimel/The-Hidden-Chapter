'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, Unlock, KeyRound, Sparkles, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

const CORRECT_COMBINATION = ['7', '3', '9', '2'];

// Subtle dust particles rising in the warm beam when door unlocks
const DOOR_DUST = [
  { id: 1, x: '28%', y: '45%', size: 2, duration: 8, delay: 0 },
  { id: 2, x: '50%', y: '62%', size: 2.4, duration: 11, delay: 1 },
  { id: 3, x: '72%', y: '38%', size: 1.8, duration: 9, delay: 2 },
  { id: 4, x: '40%', y: '72%', size: 1.6, duration: 12, delay: 3 },
  { id: 5, x: '62%', y: '28%', size: 2.2, duration: 10, delay: 1.5 },
];

export default function LockedDoorPage() {
  const router = useRouter();
  const { unlockDoor, isDoorUnlocked } = useSecretJourney();
  const [digits, setDigits] = useState<string[]>(
    isDoorUnlocked ? CORRECT_COMBINATION : ['0', '0', '0', '0']
  );
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(isDoorUnlocked);
  const [showConfirmation, setShowConfirmation] = useState(isDoorUnlocked);
  const [lastRotatedIndex, setLastRotatedIndex] = useState<number | null>(null);
  const [rotationDirection, setRotationDirection] = useState<'up' | 'down'>('up');

  // Prefetch letter page for instant navigation
  useEffect(() => {
    router.prefetch('/secret/letter');
  }, [router]);

  // Sync state if isDoorUnlocked was loaded from localStorage or context
  useEffect(() => {
    if (isDoorUnlocked) {
      setIsUnlocked(true);
      setShowConfirmation(true);
      setDigits(CORRECT_COMBINATION);
    }
  }, [isDoorUnlocked]);

  const handleDigitChange = (index: number, direction: 'up' | 'down') => {
    if (isUnlocked) return;
    setError(false);
    setLastRotatedIndex(index);
    setRotationDirection(direction);
    setDigits((prev) => {
      const updated = [...prev];
      const currentVal = parseInt(updated[index], 10);
      const newVal = direction === 'up' ? (currentVal + 1) % 10 : (currentVal + 9) % 10;
      updated[index] = newVal.toString();
      return updated;
    });
  };

  const handleAutoFill = () => {
    if (isUnlocked) return;
    setDigits(CORRECT_COMBINATION);
    setError(false);
  };

  const handleAttemptUnlock = () => {
    if (isUnlocked) return;

    if (digits.join('') === CORRECT_COMBINATION.join('')) {
      setError(false);
      setIsUnlocked(true);
      unlockDoor();

      // Show confirmation section after unlock animation
      setTimeout(() => {
        setShowConfirmation(true);
      }, 700);
    } else {
      setError(true);
    }
  };

  // Original working navigation handler
  const handleProceedToLetter = () => {
    router.push('/secret/letter');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden select-none">
      {/* Background Antique Doorway Engraving Silhouette */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-15 overflow-hidden">
        <svg
          viewBox="0 0 340 560"
          className="w-[300px] sm:w-[420px] h-auto stroke-[#C9A45C] fill-none"
          strokeWidth="1"
          strokeDasharray="3 3"
        >
          <path d="M 30 560 L 30 190 A 140 140 0 0 1 310 190 L 310 560 Z" />
          <path d="M 50 560 L 50 195 A 120 120 0 0 1 290 195 L 290 560 Z" />
          <line x1="170" y1="65" x2="170" y2="560" />
          <circle cx="170" cy="300" r="20" />
        </svg>
      </div>

      {/* Warm Antique Light Beam from Behind the Unlocked Door */}
      <motion.div
        animate={{
          opacity: isUnlocked ? 0.42 : 0.12,
          scale: isUnlocked ? 1.05 : 1,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute w-[450px] sm:w-[580px] h-[450px] sm:h-[580px] rounded-full bg-gradient-to-br from-[#C9A45C]/25 via-[#A9824A]/10 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Floating Dust Particles Around the Lock */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DOOR_DUST.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: [-12, 14, -8],
              x: [-6, 6, -4],
              opacity: isUnlocked ? [0.15, 0.4, 0.18] : [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: particle.y,
              left: particle.x,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            className="rounded-full bg-[#F3E7CC] blur-[0.4px]"
          />
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
        {/* Header / Storytelling */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="space-y-2.5"
>
  <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
    — শেষ দরজা —
  </span>

  <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide">
    যে দরজার ওপারে আর কোনো সংকেত খুঁজতে হবে না
  </h1>

  <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-lg mx-auto leading-relaxed">
    এতক্ষণ যে সংখ্যাগুলো খুঁজে পেয়েছো, সেগুলোই তোমাকে এখানে নিয়ে এসেছে। এখন আর কোনো নতুন ইঙ্গিত খুঁজতে হবে না—শুধু দরজাটা খুলতে হবে।
  </p>
</motion.div>

        {/* Antique Mechanical Combination Lock Container */}
        <motion.div
          className="p-7 sm:p-11 rounded-2xl border border-[#A9824A]/40 relative space-y-7 sm:space-y-8 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, #2b1f15 0%, #1a130d 60%, #110d09 100%)',
            boxShadow: isUnlocked
              ? 'inset 0 1px 0 rgba(201,164,92,0.3), 0 25px 60px -10px rgba(0,0,0,0.9), 0 0 30px rgba(201,164,92,0.15)'
              : 'inset 0 1px 0 rgba(201,164,92,0.15), 0 25px 60px -10px rgba(0,0,0,0.85)',
          }}
        >
          {/* Subtle Brass Rivets at Corners */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60" />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60" />
          <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60" />
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#A9824A]/50 border border-[#C9A45C]/60" />

          {/* Central Lock Emblem */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            {/* Outer Brass Ring */}
            <div
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-2xl transition-colors duration-700 ${
                isUnlocked
                  ? 'bg-gradient-to-br from-[#382618] to-[#12110E] border-[#C9A45C] shadow-[0_0_25px_rgba(201,164,92,0.35)]'
                  : 'bg-[#15100b] border-[#A9824A]/60'
              }`}
            >
              {isUnlocked ? (
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Unlock className="w-9 h-9 text-[#C9A45C]" />
                </motion.div>
              ) : (
                <Lock className="w-9 h-9 text-[#A9824A]" />
              )}
            </div>
          </div>

          {/* Antique Cylindrical Tumbler Dials */}
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {digits.map((digit, i) => {
              const isCurrentAnimating = lastRotatedIndex === i;

              return (
                <div key={i} className="flex flex-col items-center space-y-2">
                  {/* Up Dial Arrow */}
                  <button
                    type="button"
                    onClick={() => handleDigitChange(i, 'up')}
                    disabled={isUnlocked}
                    className="p-1.5 text-[#A99A7C] hover:text-[#C9A45C] hover:scale-110 active:scale-95 disabled:opacity-20 transition-transform cursor-pointer"
                    aria-label={`Digit ${i + 1} increment`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>

                  {/* Cylindrical Dial Tumbler */}
                  <div
                    className="relative w-13 sm:w-16 h-20 sm:h-24 rounded-xl border-2 flex items-center justify-center overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(180deg, #0e0b08 0%, #1e1711 35%, #2a2016 50%, #1e1711 65%, #0e0b08 100%)',
                      borderColor: isUnlocked
                        ? '#C9A45C'
                        : isCurrentAnimating
                        ? '#C9A45C'
                        : 'rgba(169, 130, 74, 0.45)',
                      boxShadow:
                        'inset 0 6px 12px rgba(0,0,0,0.85), inset 0 -6px 12px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Horizontal Tumbler Reflection Line */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#F3E7CC]/15 to-transparent pointer-events-none" />

                    {/* Animated Digit */}
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={digit}
                        initial={{
                          y: rotationDirection === 'up' ? -18 : 18,
                          opacity: 0.3,
                        }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: rotationDirection === 'up' ? 18 : -18,
                          opacity: 0,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 24,
                        }}
                        className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${
                          isUnlocked ? 'text-[#C9A45C]' : 'text-[#F3E7CC]'
                        }`}
                      >
                        {digit}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Down Dial Arrow */}
                  <button
                    type="button"
                    onClick={() => handleDigitChange(i, 'down')}
                    disabled={isUnlocked}
                    className="p-1.5 text-[#A99A7C] hover:text-[#C9A45C] hover:scale-110 active:scale-95 disabled:opacity-20 transition-transform cursor-pointer"
                    aria-label={`Digit ${i + 1} decrement`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Helper & Auto-fill Action (Subtle, doesn't reveal the combination digits) */}
          {!isUnlocked && (
            <div className="flex flex-col items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-xs font-serif text-[#C9A45C]/80 hover:text-[#C9A45C] flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                <span className="underline decoration-dotted underline-offset-4">
                  সংকেতগুলো স্বয়ংক্রিয়ভাবে সাজাও
                </span>
              </button>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#d48b72] font-serif italic max-w-md px-2"
                >
                  দরজাটি এখনও খুলল না। আগের অধ্যায়গুলোর ইঙ্গিতগুলো হয়তো আবার মনে করতে হবে।
                </motion.p>
              )}
            </div>
          )}

          {/* Unlock Action Button */}
          {!isUnlocked && (
            <button
              type="button"
              onClick={handleAttemptUnlock}
              className="w-full py-4 rounded-xl bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm sm:text-base font-serif border border-[#A9824A]/50 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.01] cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#C9A45C]" />
              <span>শেষবারের মতো চেষ্টা করো</span>
            </button>
          )}
        </motion.div>

        {/* Successful Unlock Confirmation Section */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="p-8 sm:p-10 rounded-2xl border border-[#C9A45C]/50 shadow-2xl space-y-6 text-center relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, #3a2a1d 0%, #1f1812 60%, #12100d 100%)',
              }}
            >
              {/* Subtle Golden Accent Bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A45C]">
                  — শেষ সীমা —
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F3E7CC] font-normal tracking-wide">
                  দরজাটি খুলে গেছে
                </h2>
              </div>

              {/* Poetic Final Transition Message */}
              <div className="space-y-3.5 max-w-lg mx-auto font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed border-y border-[#A9824A]/20 py-4">
                <p>
                  এতদূর পর্যন্ত আসার জন্য তোমাকে শুধু কয়েকটি সংকেত অনুসরণ করতে হয়েছে।
                </p>
                <p>
                  প্রতিটি সংকেত তোমাকে ধীরে ধীরে এই জায়গাটায় নিয়ে এসেছে।
                </p>
                <p>
                  কিন্তু এখন আর কোনো সংকেত খুঁজতে হবে না।
                </p>
                <p className="text-[#D8BD88] font-medium text-base sm:text-lg pt-1">
                  সামনে শুধু একটি শেষ পৃষ্ঠা।
                </p>
                <p className="text-xs sm:text-sm text-[#A99A7C] font-light">
                  ওপাশে কী আছে, সেটা এখান থেকে আর বলা হবে না।
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-serif text-[#A99A7C] tracking-wide">
                  শেষ পৃষ্ঠায় প্রবেশ করবে?
                </p>

                <button
                  type="button"
                  onClick={handleProceedToLetter}
                  className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#A9824A] via-[#C9A45C] to-[#A9824A] hover:brightness-110 text-[#12110E] font-serif font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(201,164,92,0.3)] transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-2.5 mx-auto"
                >
                  <span>শেষ পৃষ্ঠাটি খুলে দাও</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


