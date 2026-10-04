'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Feather, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

// Subtle floating dust motes through warm candlelight
const DUST_PARTICLES = [
  { id: 1, x: '28%', y: '25%', size: 2.2, duration: 11, delay: 0 },
  { id: 2, x: '48%', y: '65%', size: 1.8, duration: 13, delay: 2 },
  { id: 3, x: '72%', y: '35%', size: 2.4, duration: 10, delay: 1 },
  { id: 4, x: '35%', y: '75%', size: 1.6, duration: 12, delay: 3 },
  { id: 5, x: '65%', y: '55%', size: 2, duration: 14, delay: 4 },
];

export default function UnsentLetterPage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();

  const isAlreadyOpened = Boolean(discoveredClues['unsent-letter']);
  const [isOpen, setIsOpen] = useState(isAlreadyOpened);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      unlockClue('unsent-letter');
    }, 900);
  };

  const handleNext = () => {
    markStepComplete('room');
    setStep('room');
    router.push('/secret/room');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden select-none">
      {/* Warm Ambient Candlelight & Shadows */}
      <div className="absolute w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full bg-gradient-to-br from-[#C9A45C]/15 via-[#A9824A]/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DUST_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: ['0px', '-35px', '0px'],
              x: ['0px', '12px', '0px'],
              opacity: [0.1, 0.45, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#C9A45C]"
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full space-y-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211C16]/80 border border-[#A9824A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#C9A45C]">
              অধ্যায় ৪ / ১১
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide">
            যে চিঠি কখনো পাঠানো হয়নি
          </h1>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#C9A45C]/80">
            — একটি অসম্পূর্ণ পৃষ্ঠা —
          </p>

          <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-xl mx-auto leading-relaxed pt-1">
            কিছু কথা কাগজে লেখা যায়। কিছু কথা লিখতে গিয়েও থেমে যেতে হয়।
          </p>
        </motion.div>

        {/* Envelope & Parchment Scene */}
        <div
          className="relative rounded-2xl bg-[#1C1710] border border-[#A9824A]/30 shadow-2xl p-6 sm:p-10 min-h-[440px] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500"
          style={{
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7), 0 12px 35px rgba(0,0,0,0.6)',
          }}
        >
          {/* Subtle woodgrain backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #C9A45C 0px, transparent 2px, transparent 36px)',
            }}
          />

          {!isOpen ? (
            /* Sealed Envelope State */
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-md py-6 flex flex-col items-center space-y-6"
            >
              {/* Interactive Envelope Graphic */}
              <button
                type="button"
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
              >
                {/* Envelope Body */}
                <div
                  className="w-[280px] sm:w-[360px] h-[190px] sm:h-[230px] rounded-lg bg-gradient-to-b from-[#251E16] via-[#1E1710] to-[#15100B] border border-[#A9824A]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4"
                  style={{
                    boxShadow: '0 15px 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(201,164,92,0.15)',
                  }}
                >
                  {/* Diagonal Envelope Creases (SVG) */}
                  <svg
                    viewBox="0 0 360 230"
                    className="absolute inset-0 w-full h-full pointer-events-none stroke-[#A9824A]/25 fill-none"
                    strokeWidth="1.2"
                  >
                    <path d="M 0 0 L 180 120 L 360 0" />
                    <path d="M 0 230 L 140 100" />
                    <path d="M 360 230 L 220 100" />
                  </svg>

                  {/* Wax Seal in Center */}
                  <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      animate={
                        isOpening
                          ? { scale: [1, 1.25, 0], opacity: [1, 0.8, 0] }
                          : { scale: [1, 1.04, 1] }
                      }
                      transition={
                        isOpening
                          ? { duration: 0.8, ease: 'easeInOut' }
                          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                      }
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#8A1C1C] via-[#651010] to-[#450909] border-2 border-[#A93232] shadow-xl flex items-center justify-center relative cursor-pointer group-hover:border-[#C9A45C]/60 group-hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all"
                    >
                      {/* Wax stamp emblem */}
                      <div className="w-10 h-10 rounded-full border border-[#D46B6B]/40 flex items-center justify-center">
                        <Feather className="w-5 h-5 text-[#F3D7A4]/90" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Envelope Bottom Label */}
                  <div className="mt-auto text-center w-full z-10">
                    <span className="text-[11px] font-mono tracking-widest text-[#A99A7C]/60 uppercase">
                      গোপন ও সংরক্ষিত
                    </span>
                  </div>
                </div>
              </button>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-serif text-[#C9A45C]">
                  {isOpening ? 'মোমের সিলটি ধীরে ধীরে গলছে...' : 'সিলটি খুলতে খামের ওপর স্পর্শ করো'}
                </p>
                <p className="text-[11px] text-[#A99A7C]/60 font-mono italic">
                  (চিঠিটির সিল এখনও খোলা হয়নি)
                </p>
              </div>
            </motion.div>
          ) : (
            /* Unsealed / Opened Letter State */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-xl text-left space-y-6 py-2"
            >
              {/* Parchment Document */}
              <div
                className="relative rounded-xl bg-gradient-to-b from-[#201912] to-[#17120D] border border-[#A9824A]/40 p-6 sm:p-8 shadow-2xl space-y-5"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5)',
                }}
              >
                {/* Parchment top header with feather stamp */}
                <div className="flex items-center justify-between border-b border-[#A9824A]/25 pb-3">
                  <div className="flex items-center gap-2 text-[#C9A45C]">
                    <Feather className="w-4 h-4" />
                    <span className="text-xs font-serif italic tracking-wide">
                      অসমাপ্ত চিরকুট
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A99A7C]">
                    তারিখহীন একটি ক্ষণ
                  </span>
                </div>

                {/* The Unfinished Passage */}
                <div className="font-serif text-sm sm:text-base text-[#F3E7CC]/90 leading-relaxed space-y-4 drop-shadow-sm">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    “কিছু কথা অনেকবার লিখতে চেয়েছি।
                    <br />
                    প্রতিবারই মনে হয়েছে—এগুলো বলা উচিত কি না, সেই প্রশ্নের উত্তর এখনও আমার কাছে নেই।
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="pt-1"
                  >
                    তাই কথাগুলোকে পাঠানোর বদলে রেখে দিয়েছি।
                    <br />
                    হয়তো কোনো একদিন...
                    <br />
                    হয়তো কোনোদিনই নয়।”
                  </motion.p>
                </div>

                {/* Ink smudge / unfinished trailing line */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                  className="pt-2 flex items-center gap-2"
                >
                  <div className="h-[1px] w-24 bg-gradient-to-r from-[#A9824A]/60 to-transparent" />
                  <span className="text-xs text-[#A99A7C]/50 font-serif italic">
                    ...লেখাটি এখানেই থেমে গেছে
                  </span>
                </motion.div>
              </div>

              {/* Discovery Reflection Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="p-5 rounded-xl bg-[#2A1E14]/80 border border-[#C9A45C]/30 space-y-2 shadow-lg"
              >
                <div className="flex items-center gap-2 text-[#C9A45C]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="font-serif text-sm font-semibold tracking-wide">
                    পাতাটি এখনও অসম্পূর্ণ
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#F3E7CC]/90 leading-relaxed font-serif">
                  সব লেখা শেষ করার জন্য লেখা হয় না। কিছু কথা শুধু নিজের কাছে সত্যি করে রাখার জন্যও লেখা হয়।
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Next Action Navigation */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!isOpen}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isOpen
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12110E]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>পরের অধ্যায়ে এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isOpen && (
            <p className="text-xs text-[#A99A7C]/60 mt-4 italic font-mono">
              (চিঠিটির সিল এখনও খোলা হয়নি)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
