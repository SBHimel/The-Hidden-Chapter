'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, Mail, Key, Sparkles } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';
import { ROOM_OBJECTS, RoomObject } from '@/data/journeyData';

// Subtle floating dust motes drifting through candlelight
const DUST_PARTICLES = [
  { id: 1, x: '42%', y: '35%', size: 2.5, duration: 9, delay: 0 },
  { id: 2, x: '53%', y: '48%', size: 2, duration: 11, delay: 2 },
  { id: 3, x: '38%', y: '60%', size: 1.8, duration: 13, delay: 4 },
  { id: 4, x: '58%', y: '28%', size: 2.2, duration: 10, delay: 1 },
  { id: 5, x: '47%', y: '68%', size: 1.5, duration: 12, delay: 3 },
  { id: 6, x: '63%', y: '52%', size: 2, duration: 14, delay: 5 },
];

// Story-focused Bengali descriptions & discovery notes
const OBJECT_LORE: Record<
  string,
  {
    bengaliName: string;
    bengaliDescription: string;
    discoveryNote: string;
  }
> = {
  watch: {
    bengaliName: 'প্রাচীন পকেট ঘড়ি',
    bengaliDescription:
      'ঘড়িটা থেমে আছে। তবু কেমন যেন মনে হয়, এর কাঁটাগুলো কোনো একটি সময়কে এখনও মনে রেখেছে।',
    discoveryNote: 'সময় থেমে গেলেও কিছু মুহূর্ত থামে না।',
  },
  envelope: {
    bengaliName: 'সিলমোহর করা খাম',
    bengaliDescription:
      'মোটা কাগজের খামটি বহুদিন ধরে বন্ধ। গাঢ় মোমের সিলটি এখনও অক্ষত।',
    discoveryNote: 'কিছু কথা খোলা হয় না—শুধু সময়ের জন্য রেখে দেওয়া হয়।',
  },
  key: {
    bengaliName: 'পিতলের পুরোনো চাবি',
    bengaliDescription:
      'একটি ভারী পিতলের চাবি, পুরোনো নকশা খোদাই করা। সামান্য ছোঁয়াতেই শীতল ধাতুর স্পর্শ পাওয়া যায়।',
    discoveryNote: 'শেষ সংকেত — চতুর্থ সংখ্যা: ২',
  },
};

const CIPHER_DIGITS = [
  { label: 'সংকেত ১', digit: '7', source: 'সূচনা' },
  { label: 'সংকেত ২', digit: '3', source: 'চিঠি' },
  { label: 'সংকেত ৩', digit: '9', source: 'ঘড়ি' },
  { label: 'সংকেত ৪', digit: '2', source: 'চাবি' },
];

export default function RoomPage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const [selectedObject, setSelectedObject] = useState<RoomObject | null>(null);
  const [isFocusingKey, setIsFocusingKey] = useState(false);
  const [showForeshadowDoor, setShowForeshadowDoor] = useState(false);

  const isKeyFound = Boolean(discoveredClues['room-key']);

  // Atmospheric door foreshadowing when key is found
  useEffect(() => {
    if (isKeyFound) {
      const timer = setTimeout(() => {
        setShowForeshadowDoor(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isKeyFound]);

  const handleInspect = (obj: RoomObject) => {
    if (obj.id === 'key') {
      setIsFocusingKey(true);
      setTimeout(() => {
        setSelectedObject(obj);
        unlockClue('room-key');
        unlockClue('room');
        setIsFocusingKey(false);
      }, 700);
    } else {
      setSelectedObject(obj);
    }
  };

  const handleNext = () => {
    markStepComplete('archive');
    setStep('archive');
    router.push('/secret/archive');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden select-none">
      {/* Haunting, extremely subtle antique door foreshadowing in the deep background */}
      <AnimatePresence>
        {showForeshadowDoor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: [0, 0.09, 0.05, 0.08, 0],
              scale: [0.94, 0.98, 1, 1.01, 1.02],
            }}
            transition={{
              duration: 9,
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: 'easeInOut',
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden"
          >
            <svg
              viewBox="0 0 320 540"
              className="w-[280px] sm:w-[380px] h-auto stroke-[#C9A45C] fill-none"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            >
              {/* Outer archway */}
              <path d="M 40 520 L 40 180 A 120 120 0 0 1 280 180 L 280 520 Z" />
              {/* Inner arch border */}
              <path d="M 60 520 L 60 185 A 100 100 0 0 1 260 185 L 260 520 Z" />
              {/* Door divider */}
              <line x1="160" y1="85" x2="160" y2="520" />
              {/* Vintage keyhole emblem */}
              <circle cx="160" cy="300" r="16" />
              <path d="M 154 312 L 150 338 L 170 338 L 166 312 Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full space-y-7 text-center relative z-10">
        {/* Header with authentic Bengali story text */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211C16]/80 border border-[#A9824A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#C9A45C]">
              অধ্যায় ৪ / ৮
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide">
            মোমের আলোয় সেই ঘর
          </h1>

          <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-xl mx-auto leading-relaxed">
            ঘরটি অনেকক্ষণ ধরে নীরব। টেবিলের ওপর পড়ে থাকা কয়েকটি জিনিস যেন কোনো এক অসমাপ্ত কথার অপেক্ষায় আছে।
          </p>
        </motion.div>

        {/* The Antique Study Desk Workspace */}
        <div
          className="relative rounded-2xl border border-[#A9824A]/35 shadow-2xl p-5 sm:p-10 min-h-[460px] sm:min-h-[500px] flex flex-col items-center justify-between overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, #2a2016 0%, #1c1510 50%, #120e0a 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(201,164,92,0.15), inset 0 -40px 80px rgba(0,0,0,0.8), 0 25px 60px -15px rgba(0,0,0,0.85)',
          }}
        >
          {/* Desk Wood Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(169,130,74,0.06) 50px, rgba(169,130,74,0.06) 51px)',
            }}
          />

          {/* Candlelight Warmth & Subtle Flickering Glow */}
          <motion.div
            animate={{
              opacity: [0.38, 0.46, 0.35, 0.48, 0.40],
              scale: [1, 1.04, 0.98, 1.05, 1],
              x: [-4, 6, -3, 4, -4],
              y: [-2, 3, -4, 2, -2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-br from-[#C9A45C]/20 via-[#A9824A]/10 to-transparent blur-3xl pointer-events-none top-8 left-1/2 -translate-x-1/2"
          />

          {/* Floating Atmospheric Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {DUST_PARTICLES.map((particle) => (
              <motion.div
                key={particle.id}
                animate={{
                  y: [-12, 14, -10],
                  x: [-8, 8, -6],
                  opacity: [0.12, 0.32, 0.14],
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

          {/* Antique Leather Desk Blotter Edge / Brass Corners */}
          <div className="absolute inset-3 sm:inset-4 border border-[#A9824A]/20 rounded-xl pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C9A45C]/40 rounded-tl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C9A45C]/40 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C9A45C]/40 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C9A45C]/40 rounded-br" />
          </div>

          {/* Subtle Ambient Desk Header / Mood Tag */}
          <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-serif text-[#A99A7C]/70 px-2 pt-1 pb-3 border-b border-[#A9824A]/15">
            <span className="italic flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9824A]/50" />
              টেবিলের নীরব স্মৃতি
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#C9A45C]/60 uppercase">
              STUDY DESK
            </span>
          </div>

          {/* Physical Desk Objects sitting naturally */}
          <div className="w-full relative z-10 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center">
            {ROOM_OBJECTS.map((obj) => {
              const isSelected = selectedObject?.id === obj.id;
              const isWatch = obj.id === 'watch';
              const isEnvelope = obj.id === 'envelope';
              const isKey = obj.id === 'key';
              const lore = OBJECT_LORE[obj.id] || {
                bengaliName: obj.name,
                bengaliDescription: obj.description,
                discoveryNote: obj.clueText,
              };

              // Dim surrounding objects during the key focus moment
              const isDimmed = isFocusingKey && !isKey;

              return (
                <motion.div
                  key={obj.id}
                  layout
                  animate={{
                    opacity: isDimmed ? 0.25 : 1,
                    scale: isFocusingKey && isKey ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleInspect(obj)}
                  className="group relative cursor-pointer flex flex-col items-center justify-center"
                >
                  {/* Cast shadow beneath object on the wooden surface */}
                  <div
                    className={`absolute -bottom-3 w-3/4 h-5 rounded-full blur-md transition-all duration-500 ${
                      isSelected
                        ? 'bg-[#000000]/90 scale-105'
                        : 'bg-[#000000]/65 group-hover:bg-[#000000]/80 group-hover:scale-105'
                    }`}
                  />

                  {/* Physical Object Body */}
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`relative w-full max-w-[240px] rounded-xl p-5 border transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                      isSelected
                        ? 'bg-[#291F16]/95 border-[#C9A45C] shadow-[0_0_25px_rgba(201,164,92,0.25)]'
                        : 'bg-[#18130E]/85 border-[#A9824A]/30 hover:border-[#C9A45C]/60 hover:bg-[#201812]/90'
                    }`}
                  >
                    {/* Object 1: Antique Pocket Watch */}
                    {isWatch && (
                      <div className="relative">
                        {/* Metallic rim reflection */}
                        <motion.div
                          animate={{
                            rotate: [-0.8, 0.8, -0.4, 0],
                          }}
                          transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A45C]/30 via-[#3A2A1D] to-[#12110E] p-[3px] shadow-lg border border-[#A9824A]/50 relative"
                        >
                          {/* Watch Crown top */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-2 rounded-t bg-[#A9824A] border-t border-[#C9A45C]/60" />
                          <div className="w-full h-full rounded-full bg-[#1b1510] flex items-center justify-center relative overflow-hidden">
                            {/* Watch face markings */}
                            <div className="absolute inset-1 rounded-full border border-[#C9A45C]/20 flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-[#C9A45C]/60" />
                            </div>
                            <Clock className="w-7 h-7 text-[#D8BD88] opacity-85 group-hover:scale-105 transition-transform" />
                            {/* Glass glint streak */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F3E7CC]/10 to-transparent pointer-events-none" />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Object 2: Sealed Linen Envelope with Burgundy Wax Seal */}
                    {isEnvelope && (
                      <div className="relative">
                        <motion.div
                          animate={{
                            y: [0, -1.5, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-20 h-14 rounded-md bg-[#241B13] border border-[#A9824A]/40 shadow-lg relative flex items-center justify-center overflow-hidden"
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(243,231,204,0.1)',
                          }}
                        >
                          {/* Envelope Flap Lines */}
                          <svg
                            viewBox="0 0 80 56"
                            className="absolute inset-0 w-full h-full stroke-[#A9824A]/30 fill-none pointer-events-none"
                            strokeWidth="1"
                          >
                            <path d="M 0 0 L 40 30 L 80 0" />
                            <path d="M 0 56 L 32 24" />
                            <path d="M 80 56 L 48 24" />
                          </svg>

                          {/* Burgundy Wax Seal */}
                          <div className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-br from-[#6b1e22] via-[#4d1216] to-[#2b080b] border border-[#8f2d33] flex items-center justify-center shadow-md group-hover:shadow-[0_0_10px_rgba(143,45,51,0.5)] transition-shadow">
                            <Mail className="w-3.5 h-3.5 text-[#F3E7CC]/80" />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Object 3: The Brass Cabinet Key */}
                    {isKey && (
                      <div className="relative">
                        {/* Occasional warm shimmer sweep */}
                        <motion.div
                          animate={{
                            scale: [1, 1.03, 1],
                            filter: [
                              'drop-shadow(0 0 4px rgba(201,164,92,0.25))',
                              'drop-shadow(0 0 9px rgba(201,164,92,0.45))',
                              'drop-shadow(0 0 4px rgba(201,164,92,0.25))',
                            ],
                          }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#352516] to-[#17120c] border border-[#C9A45C]/50 flex items-center justify-center relative overflow-hidden"
                        >
                          {/* Passing metallic sheen highlight */}
                          <motion.div
                            animate={{
                              x: [-60, 60],
                            }}
                            transition={{
                              duration: 3.8,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: 'easeInOut',
                            }}
                            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#F3E7CC]/20 to-transparent transform -skew-x-12 pointer-events-none"
                          />

                          <Key className="w-7 h-7 text-[#C9A45C] group-hover:rotate-6 transition-transform duration-300" />
                          <Sparkles className="w-3 h-3 text-[#F3E7CC] absolute top-2 right-2 animate-pulse opacity-70" />
                        </motion.div>
                      </div>
                    )}

                    {/* Object Titles & Sub-indicators */}
                    <div className="space-y-1 text-center">
                      <h3 className="font-serif text-sm text-[#F3E7CC] tracking-wide group-hover:text-[#C9A45C] transition-colors">
                        {lore.bengaliName}
                      </h3>
                      <p className="text-[11px] text-[#A99A7C]/80 font-light flex items-center justify-center gap-1">
                        <span>ছোঁয়া দিন</span>
                        <span className="text-[9px] opacity-60">✦</span>
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Object Detail Panel: Parchment & Archival Observation Note */}
          <AnimatePresence mode="wait">
            {selectedObject && (
              <motion.div
                key={selectedObject.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-4 p-5 sm:p-6 rounded-xl border border-[#C9A45C]/45 text-left max-w-xl w-full space-y-3.5 z-20 shadow-2xl relative"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(42,32,22,0.96) 0%, rgba(28,21,14,0.98) 100%)',
                  boxShadow:
                    '0 15px 35px -5px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,164,92,0.25)',
                }}
              >
                {/* Vintage Corner Brackets on the Archival Card */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C9A45C]/60" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C9A45C]/60" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#C9A45C]/60" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C9A45C]/60" />

                <div className="flex items-center justify-between border-b border-[#A9824A]/25 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                    <h4 className="font-serif text-base text-[#F3E7CC] font-semibold tracking-wide">
                      {OBJECT_LORE[selectedObject.id]?.bengaliName || selectedObject.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#12110E]/60 border border-[#A9824A]/30">
                    পরীক্ষা করা হয়েছে
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-[#D8BD88] italic font-serif leading-relaxed pl-2 border-l-2 border-[#A9824A]/40">
                  &ldquo;{OBJECT_LORE[selectedObject.id]?.bengaliDescription || selectedObject.description}&rdquo;
                </p>

                <div className="p-3.5 bg-[#12110E]/90 rounded-lg border border-[#A9824A]/35 text-xs text-[#F3E7CC] space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[#C9A45C] font-semibold text-xs tracking-wide">
                      নোট:
                    </span>
                    <span className="text-[#F3E7CC]/90 text-xs sm:text-[13px]">
                      {OBJECT_LORE[selectedObject.id]?.discoveryNote || selectedObject.clueText}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic "Cipher Assembled" Sequence */}
        <AnimatePresence>
          {isKeyFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="p-6 sm:p-7 rounded-2xl border border-[#C9A45C]/50 text-center space-y-5 shadow-2xl relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, #3a2a1d 0%, #1f1812 60%, #12100d 100%)',
              }}
            >
              {/* Subtle gold dust backdrop accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />

              <div className="space-y-1.5">
                <motion.h3
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-serif text-lg sm:text-xl text-[#F3E7CC] font-semibold tracking-wide"
                >
                  শেষ সংকেতটি পাওয়া গেছে
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-md mx-auto"
                >
                  এতক্ষণ ধরে পাওয়া সংখ্যাগুলো যেন হঠাৎ একে অপরের সঙ্গে মিলে গেল।
                </motion.p>
              </div>

              {/* Staggered Four-Digit Reveal: 7 · 3 · 9 · 2 */}
              <div className="py-2 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                {CIPHER_DIGITS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.7, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.3,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 260,
                    }}
                    className="flex items-center gap-2 sm:gap-4"
                  >
                    <div className="w-14 sm:w-16 h-16 sm:h-20 rounded-xl bg-[#12110E] border border-[#A9824A]/50 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                      <div className="absolute top-1 text-[9px] font-mono text-[#A99A7C]/60 uppercase">
                        {item.source}
                      </div>
                      <span className="font-mono text-2xl sm:text-3xl text-[#C9A45C] font-bold mt-2">
                        {item.digit}
                      </span>
                    </div>

                    {index < CIPHER_DIGITS.length - 1 && (
                      <span className="text-[#C9A45C]/60 text-lg font-serif">·</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Prominent, elegant mystery foreshadowing line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="pt-2 border-t border-[#A9824A]/25"
              >
                <p className="font-serif text-sm sm:text-base text-[#D8BD88] tracking-widest font-medium">
                  চারটি সংখ্যা। একটি দরজা।
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!isKeyFound}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isKeyFound
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/60 hover:scale-105 cursor-pointer shadow-[#A9824A]/20'
                : 'bg-[#12110E]/50 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>পরের অধ্যায়ে এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isKeyFound && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-serif">
              (ঘরের শেষ সংকেতটি এখনও খুঁজে পাওয়া যায়নি)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

