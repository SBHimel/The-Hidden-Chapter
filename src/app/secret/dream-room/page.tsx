'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Moon, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

// Subtle floating dust motes drifting through moonlight
const DREAM_DUST = [
  { id: 1, x: '22%', y: '28%', size: 2.4, duration: 12, delay: 0 },
  { id: 2, x: '45%', y: '45%', size: 1.8, duration: 15, delay: 2 },
  { id: 3, x: '68%', y: '30%', size: 2.2, duration: 11, delay: 1 },
  { id: 4, x: '80%', y: '65%', size: 1.6, duration: 14, delay: 3 },
  { id: 5, x: '35%', y: '72%', size: 2, duration: 13, delay: 4 },
];

interface DreamObject {
  id: 'clock' | 'window' | 'chair';
  name: string;
  subTitle: string;
  fragmentText: string;
}

const DREAM_OBJECTS: Record<string, DreamObject> = {
  clock: {
    id: 'clock',
    name: 'প্রাচীন ঘড়ি',
    subTitle: 'স্থির কাঁটা · ১১ : ০৮',
    fragmentText: 'সময়টা মনে ছিল না। তারিখটা ছিল।',
  },
  window: {
    id: 'window',
    name: 'চন্দ্রালোকিত জানালা',
    subTitle: 'রাতের মৃদু আলো',
    fragmentText: 'কিছু দৃশ্য জেগে ওঠার পরও মনের কোথাও থেকে যায়।',
  },
  chair: {
    id: 'chair',
    name: 'নিঃসঙ্গ কাঠের চেয়ার',
    subTitle: 'স্তব্ধ নীরবতা',
    fragmentText: 'কখনো কখনো একটি স্বপ্নের সবচেয়ে বড় অংশটুকু জেগে ওঠার পর বোঝা যায়।',
  },
};

export default function DreamRoomPage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();

  const isAlreadyDiscovered = Boolean(discoveredClues['dream-room']);
  const [inspected, setInspected] = useState<Record<string, boolean>>({
    clock: isAlreadyDiscovered,
    window: isAlreadyDiscovered,
    chair: isAlreadyDiscovered,
  });
  const [activeObject, setActiveObject] = useState<DreamObject | null>(
    isAlreadyDiscovered ? DREAM_OBJECTS.clock : null
  );

  // Unlock the clue after render, once all three objects have been inspected
  useEffect(() => {
    if (inspected.clock && inspected.window && inspected.chair && !isAlreadyDiscovered) {
      unlockClue('dream-room');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspected.clock, inspected.window, inspected.chair]);

  const handleInspect = (objId: 'clock' | 'window' | 'chair') => {
    setActiveObject(DREAM_OBJECTS[objId]);
    setInspected((prev) => ({ ...prev, [objId]: true }));
  };

  const isAllInspected = inspected.clock && inspected.window && inspected.chair;

  const handleNext = () => {
    markStepComplete('choice');
    setStep('choice');
    router.push('/secret/choice');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden select-none">
      {/* Faint Midnight Moonlight Beam */}
      <div className="absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-br from-[#8FA8C4]/10 via-[#C9A45C]/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating Dream Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DREAM_DUST.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ['0px', '-40px', '0px'],
              x: ['0px', '14px', '0px'],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#E2E8F0]"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181D24]/80 border border-[#8FA8C4]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FA8C4] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#8FA8C4]">
              অধ্যায় ৭ / ১১
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide">
            যে রাতটি শুধু একটি রাত ছিল না
          </h1>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#C9A45C]/80">
            — স্বপ্নের ঘর —
          </p>

          <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-xl mx-auto leading-relaxed pt-1">
            কিছু স্বপ্ন ঘুম ভাঙার পরও পুরোপুরি শেষ হয়ে যায় না।
          </p>
        </motion.div>

        {/* Cinematic Dream Room Scene Canvas */}
        <div
          className="relative rounded-2xl bg-gradient-to-b from-[#141820] via-[#101318] to-[#0D0F13] border border-[#A9824A]/25 shadow-2xl p-6 sm:p-10 min-h-[460px] flex flex-col justify-between overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), 0 12px 35px rgba(0,0,0,0.7)',
          }}
        >
          {/* Subtle Background Watermark: Year 2024 embedded in floorboards */}
          <div className="absolute bottom-4 right-6 pointer-events-none select-none">
            <span className="text-3xl sm:text-4xl font-serif tracking-[0.25em] text-[#C9A45C]/[0.07]">
              2024
            </span>
          </div>

          {/* Moonlight Ray Streaming from Top-Right */}
          <div
            className="absolute top-0 right-10 w-44 sm:w-64 h-full pointer-events-none opacity-20"
            style={{
              background:
                'linear-gradient(135deg, rgba(200, 220, 240, 0.25) 0%, transparent 75%)',
            }}
          />

          {/* 3 Interactive Objects in the Dream Room */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10 my-auto py-4">
            {/* Object 1: The Clock */}
            <motion.button
              type="button"
              onClick={() => handleInspect('clock')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center space-y-3 relative cursor-pointer ${
                activeObject?.id === 'clock'
                  ? 'bg-[#1C232E]/90 border-[#8FA8C4] shadow-[0_0_20px_rgba(143,168,196,0.25)]'
                  : inspected.clock
                  ? 'bg-[#171B22]/70 border-[#A9824A]/40 hover:border-[#C9A45C]/60'
                  : 'bg-[#12151B]/60 border-[#A9824A]/20 hover:border-[#8FA8C4]/50'
              }`}
            >
              {/* Antique Clock Graphic */}
              <div className="w-16 h-16 rounded-full bg-[#0D1016] border border-[#A9824A]/40 flex flex-col items-center justify-center relative shadow-inner">
                <Clock className="w-6 h-6 text-[#C9A45C]/90" />
                <span className="text-[10px] font-mono text-[#8FA8C4] font-semibold mt-0.5 tracking-tight">
                  11 : 08
                </span>
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#F3E7CC]">{DREAM_OBJECTS.clock.name}</h4>
                <p className="text-[11px] font-mono text-[#A99A7C]/70">
                  {DREAM_OBJECTS.clock.subTitle}
                </p>
              </div>

              <span
                className={`text-[11px] font-serif transition-colors ${
                  inspected.clock ? 'text-[#8FA8C4]' : 'text-[#A99A7C]/50'
                }`}
              >
                {inspected.clock ? '✓ দেখা হয়েছে' : 'স্পর্শ করে দেখো'}
              </span>
            </motion.button>

            {/* Object 2: The Window */}
            <motion.button
              type="button"
              onClick={() => handleInspect('window')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center space-y-3 relative cursor-pointer ${
                activeObject?.id === 'window'
                  ? 'bg-[#1C232E]/90 border-[#8FA8C4] shadow-[0_0_20px_rgba(143,168,196,0.25)]'
                  : inspected.window
                  ? 'bg-[#171B22]/70 border-[#A9824A]/40 hover:border-[#C9A45C]/60'
                  : 'bg-[#12151B]/60 border-[#A9824A]/20 hover:border-[#8FA8C4]/50'
              }`}
            >
              {/* Arched Window Graphic */}
              <div className="w-16 h-16 rounded-t-full rounded-b-md bg-[#0D1016] border border-[#8FA8C4]/40 flex items-center justify-center relative overflow-hidden shadow-inner">
                <Moon className="w-6 h-6 text-[#8FA8C4] drop-shadow-[0_0_6px_rgba(143,168,196,0.4)]" />
                {/* Windowpane crossbars */}
                <div className="absolute inset-0 pointer-events-none border-t border-b border-[#8FA8C4]/15" />
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#F3E7CC]">{DREAM_OBJECTS.window.name}</h4>
                <p className="text-[11px] font-mono text-[#A99A7C]/70">
                  {DREAM_OBJECTS.window.subTitle}
                </p>
              </div>

              <span
                className={`text-[11px] font-serif transition-colors ${
                  inspected.window ? 'text-[#8FA8C4]' : 'text-[#A99A7C]/50'
                }`}
              >
                {inspected.window ? '✓ দেখা হয়েছে' : 'স্পর্শ করে দেখো'}
              </span>
            </motion.button>

            {/* Object 3: The Empty Chair */}
            <motion.button
              type="button"
              onClick={() => handleInspect('chair')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center space-y-3 relative cursor-pointer ${
                activeObject?.id === 'chair'
                  ? 'bg-[#1C232E]/90 border-[#8FA8C4] shadow-[0_0_20px_rgba(143,168,196,0.25)]'
                  : inspected.chair
                  ? 'bg-[#171B22]/70 border-[#A9824A]/40 hover:border-[#C9A45C]/60'
                  : 'bg-[#12151B]/60 border-[#A9824A]/20 hover:border-[#8FA8C4]/50'
              }`}
            >
              {/* Empty Chair Silhouette (SVG) */}
              <div className="w-16 h-16 rounded-lg bg-[#0D1016] border border-[#A9824A]/40 flex items-center justify-center relative shadow-inner">
                <svg
                  viewBox="0 0 40 40"
                  className="w-7 h-7 stroke-[#C9A45C] fill-none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  {/* Chair back */}
                  <line x1="12" y1="6" x2="12" y2="24" />
                  <line x1="28" y1="6" x2="28" y2="24" />
                  <line x1="12" y1="10" x2="28" y2="10" />
                  <line x1="12" y1="16" x2="28" y2="16" />
                  {/* Chair seat */}
                  <rect x="10" y="22" width="20" height="4" rx="1" />
                  {/* Chair legs */}
                  <line x1="13" y1="26" x2="11" y2="36" />
                  <line x1="27" y1="26" x2="29" y2="36" />
                </svg>
              </div>

              <div>
                <h4 className="font-serif text-sm text-[#F3E7CC]">{DREAM_OBJECTS.chair.name}</h4>
                <p className="text-[11px] font-mono text-[#A99A7C]/70">
                  {DREAM_OBJECTS.chair.subTitle}
                </p>
              </div>

              <span
                className={`text-[11px] font-serif transition-colors ${
                  inspected.chair ? 'text-[#8FA8C4]' : 'text-[#A99A7C]/50'
                }`}
              >
                {inspected.chair ? '✓ দেখা হয়েছে' : 'স্পর্শ করে দেখো'}
              </span>
            </motion.button>
          </div>

          {/* Active Fragment Display */}
          <div className="relative z-10 min-h-[70px] flex items-center justify-center text-center px-4">
            <AnimatePresence mode="wait">
              {activeObject ? (
                <motion.div
                  key={activeObject.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <p className="font-serif text-base sm:text-lg text-[#F3E7CC] drop-shadow">
                    “{activeObject.fragmentText}”
                  </p>
                  <span className="text-xs font-mono text-[#8FA8C4]/70 uppercase tracking-wider">
                    — {activeObject.name}
                  </span>
                </motion.div>
              ) : (
                <p className="text-xs sm:text-sm text-[#A99A7C]/60 font-serif italic">
                  ঘরের কোনো একটি বস্তুর ওপর স্পর্শ করো...
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* All 3 Inspected: Revealed Memory Synthesis */}
          <AnimatePresence>
            {isAllInspected && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-6 p-5 sm:p-6 rounded-xl bg-[#17202A]/90 border border-[#8FA8C4]/40 text-left space-y-3 shadow-xl relative z-10"
              >
                <div className="flex items-center gap-2 text-[#8FA8C4]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="font-serif text-sm font-semibold tracking-wide">
                    প্রথম পৃষ্ঠাটি সেখানেই খুলেছিল
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#F3E7CC]/90 leading-relaxed font-serif">
                  ১১ আগস্ট ২০২৪—একটি স্বপ্ন। এরপর আরও অনেক স্বপ্ন এসেছে, অনেক অনুভূতিও। কিন্তু প্রথমটি সবসময় প্রথমই থাকে।
                </p>

                <p className="text-xs text-[#8FA8C4]/80 font-serif italic pt-1 border-t border-[#8FA8C4]/20">
                  সব স্বপ্নের অর্থ খুঁজে পাওয়া যায় না। কিছু শুধু আমাদের ভেতরে কিছু রেখে যায়।
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Action Navigation */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!isAllInspected}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isAllInspected
                ? 'bg-[#1C2532] hover:bg-[#8FA8C4] text-[#F3E7CC] hover:text-[#0D1016] border-[#8FA8C4]/50 hover:scale-105 cursor-pointer'
                : 'bg-[#12151B]/40 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>আরও এক ধাপ এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isAllInspected && (
            <p className="text-xs text-[#A99A7C]/60 mt-4 italic font-mono">
              (ঘরের সবকিছু এখনও দেখা হয়নি)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
