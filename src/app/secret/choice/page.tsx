'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, DoorOpen } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

// Very subtle ambient dust in the nearly empty antique room
const ROOM_DUST = [
  { id: 1, x: '18%', y: '35%', size: 2.2, duration: 14, delay: 0 },
  { id: 2, x: '42%', y: '22%', size: 1.6, duration: 16, delay: 2 },
  { id: 3, x: '68%', y: '58%', size: 2, duration: 12, delay: 1 },
  { id: 4, x: '82%', y: '30%', size: 1.8, duration: 15, delay: 3 },
  { id: 5, x: '30%', y: '75%', size: 2.4, duration: 13, delay: 4 },
  { id: 6, x: '58%', y: '80%', size: 1.4, duration: 17, delay: 2.5 },
];

export default function ChoicePage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();

  const isAlreadyChosen = Boolean(discoveredClues['choice']);
  const [selectedChoice, setSelectedChoice] = useState<'speak' | 'silence' | null>(
    isAlreadyChosen ? 'speak' : null
  );
  const [showResponse, setShowResponse] = useState(isAlreadyChosen);

  const handleChoice = (choice: 'speak' | 'silence') => {
    if (selectedChoice !== null) return; // already chosen

    setSelectedChoice(choice);
    setTimeout(() => {
      setShowResponse(true);
      unlockClue('choice');
    }, 350);
  };

  const handleNext = () => {
    markStepComplete('locked-door');
    setStep('locked-door');
    router.push('/secret/locked-door');
  };

  const firstResponse =
    selectedChoice === 'speak'
      ? 'কিছু কথা বলা হয়ে গেলে তাদের আর আগের জায়গায় ফিরিয়ে রাখা যায় না।'
      : 'নীরবতারও কখনো কখনো নিজস্ব ভাষা থাকে।';

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-14 relative overflow-hidden select-none">
      {/* Central Warm Amber Light */}
      <div className="absolute w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full bg-gradient-to-br from-[#C9A45C]/12 via-[#A9824A]/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating ambient dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ROOM_DUST.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ['0px', '-38px', '0px'],
              x: ['0px', '10px', '0px'],
              opacity: [0.08, 0.38, 0.08],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#C9A45C]"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-10 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211C16]/80 border border-[#A9824A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#C9A45C]">
              অধ্যায় ৮ / ১১
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide leading-snug">
            কিছু কথা বলা হয়, কিছু কথা থেকে যায়
          </h1>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#C9A45C]/80">
            — শেষের আগের পৃষ্ঠা —
          </p>

          <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-md mx-auto leading-relaxed pt-1">
            সব অনুভূতির প্রকাশ প্রয়োজন হয় না।
            <br />
            আবার কিছু সত্য নিজের কাছেও লুকিয়ে রাখা যায় না।
          </p>
        </motion.div>

        {/* Choice Presentation */}
        <AnimatePresence mode="wait">
          {!showResponse ? (
            /* Two Choices */
            <motion.div
              key="choices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8"
            >
              {/* Choice 1 */}
              <button
                type="button"
                onClick={() => handleChoice('speak')}
                className="group p-6 sm:p-8 rounded-2xl bg-[#1C1710]/80 border border-[#A9824A]/30 hover:border-[#C9A45C] hover:bg-[#231E14] transition-all duration-400 text-center space-y-3 cursor-pointer shadow-xl focus:outline-none"
              >
                {/* Subtle door glyph for "speak" path */}
                <div className="mx-auto w-14 h-14 rounded-full bg-[#12110E] border border-[#A9824A]/40 flex items-center justify-center group-hover:border-[#C9A45C] transition-colors">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-6 h-6 stroke-[#C9A45C]/80 fill-none group-hover:stroke-[#F3E7CC] transition-colors"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Speaking / open shape */}
                    <path d="M 10 18 Q 18 6 26 18 Q 18 30 10 18 Z" />
                    <circle cx="18" cy="18" r="3" />
                  </svg>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#F3E7CC]/90 group-hover:text-[#F3E7CC] transition-colors leading-snug">
                  কথাগুলো বলা উচিত
                </p>

                <p className="text-xs text-[#A99A7C]/60 font-mono">
                  প্রথম পথ
                </p>
              </button>

              {/* Choice 2 */}
              <button
                type="button"
                onClick={() => handleChoice('silence')}
                className="group p-6 sm:p-8 rounded-2xl bg-[#1C1710]/80 border border-[#A9824A]/30 hover:border-[#A99A7C] hover:bg-[#1A1813] transition-all duration-400 text-center space-y-3 cursor-pointer shadow-xl focus:outline-none"
              >
                {/* Silence / closed glyph */}
                <div className="mx-auto w-14 h-14 rounded-full bg-[#12110E] border border-[#A9824A]/40 flex items-center justify-center group-hover:border-[#A99A7C] transition-colors">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-6 h-6 stroke-[#A99A7C]/70 fill-none group-hover:stroke-[#F3E7CC] transition-colors"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    {/* Closed / still shape */}
                    <path d="M 8 18 L 28 18" />
                    <path d="M 12 13 L 12 23" />
                    <path d="M 24 13 L 24 23" />
                  </svg>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#F3E7CC]/90 group-hover:text-[#F3E7CC] transition-colors leading-snug">
                  কথাগুলো নীরব থাকুক
                </p>

                <p className="text-xs text-[#A99A7C]/60 font-mono">
                  দ্বিতীয় পথ
                </p>
              </button>
            </motion.div>
          ) : (
            /* Shared Response After Choice */
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Individual Response */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1C1710]/90 border border-[#A9824A]/40 text-center space-y-3 shadow-xl">
                <p className="font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed italic">
                  "{firstResponse}"
                </p>
              </div>

              {/* Shared Message Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#A9824A]/40" />
                <span className="text-[11px] font-mono text-[#C9A45C]/60 uppercase tracking-widest">
                  তবু
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#A9824A]/40" />
              </div>

              {/* Shared Conclusion */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#211C14]/80 border border-[#C9A45C]/30 text-center space-y-4 shadow-xl">
                <p className="font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed">
                  কিন্তু আজ তোমার সামনে সিদ্ধান্ত নেওয়ার কিছু নেই।
                  <br />
                  শুধু শেষ দরজাটার সামনে গিয়ে দাঁড়ানোর সময় হয়েছে।
                </p>

                <div className="h-[1px] bg-[#A9824A]/20 mx-6" />

                <p className="text-xs sm:text-sm text-[#A99A7C] font-serif leading-relaxed">
                  কিছু সত্যের মূল্য তার উত্তর পাওয়ার মধ্যে নয়—
                  <br />
                  তাকে একবার নিজের কাছে স্বীকার করার মধ্যেও থাকে।
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!showResponse}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              showResponse
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>শেষ দরজার দিকে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!showResponse && (
            <p className="text-xs text-[#A99A7C]/60 mt-4 italic font-mono">
              (একটি পথ বেছে নাও)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
