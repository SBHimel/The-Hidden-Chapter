'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Lock, Unlock, Sparkles, BookOpen } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';
import { TIMELINE_MEMORIES, TimelineNode } from '@/data/journeyData';

// Subtle floating dust motes drifting through the archive vault
const ARCHIVE_DUST = [
  { id: 1, x: '25%', y: '30%', size: 2.2, duration: 10, delay: 0 },
  { id: 2, x: '45%', y: '50%', size: 1.8, duration: 13, delay: 2 },
  { id: 3, x: '70%', y: '25%', size: 2, duration: 11, delay: 1 },
  { id: 4, x: '82%', y: '65%', size: 1.6, duration: 14, delay: 4 },
  { id: 5, x: '35%', y: '75%', size: 2.4, duration: 12, delay: 3 },
];

const MEMORY_METADATA: Record<
  string,
  {
    bengaliStamp: string;
    bengaliSubtitle: string;
    lockedHint: string;
  }
> = {
  m1: {
    bengaliStamp: 'দলিল ০১ · সূচনা',
    bengaliSubtitle: 'প্রথম দেখা',
    lockedHint: '',
  },
  m2: {
    bengaliStamp: 'দলিল ০২ · প্রবাহ',
    bengaliSubtitle: 'নিভৃত কথামালা',
    lockedHint: '',
  },
  m3: {
    bengaliStamp: 'দলিল ০৩ · উপলব্ধি',
    bengaliSubtitle: 'নীরব উপলব্ধি',
    lockedHint: 'একটি সংরক্ষিত পাতা—খুলতে স্পর্শ করুন',
  },
};

export default function ArchivePage() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const [activeMemory, setActiveMemory] = useState<TimelineNode | null>(TIMELINE_MEMORIES[0]);
  const [unlockedNodes, setUnlockedNodes] = useState<Record<string, boolean>>({
    m1: true,
    m2: true,
    m3: Boolean(discoveredClues['archive']),
  });
  const [isHighlightingTimeline, setIsHighlightingTimeline] = useState(false);

  const handleUnlockNode = (node: TimelineNode) => {
    const wasM3Locked = node.id === 'm3' && !unlockedNodes['m3'];
    setUnlockedNodes((prev) => ({ ...prev, [node.id]: true }));
    setActiveMemory(node);
    if (node.id === 'm3') {
      unlockClue('archive');
      if (wasM3Locked) {
        setIsHighlightingTimeline(true);
        setTimeout(() => setIsHighlightingTimeline(false), 2400);
      }
    }
  };

  const isAllUnlocked = unlockedNodes['m1'] && unlockedNodes['m2'] && unlockedNodes['m3'];

  const handleNext = () => {
    markStepComplete('dream-room');
    setStep('dream-room');
    router.push('/secret/dream-room');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden select-none">
      <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211C16]/80 border border-[#A9824A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#C9A45C]">
              অধ্যায় ৬ / ১১
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#F3E7CC] tracking-wide">
            যে মুহূর্তগুলো সময়ের কাছে রয়ে গেছে
          </h1>

          <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-xl mx-auto leading-relaxed">
            কিছু মুহূর্ত চলে যায়। কিছু মুহূর্ত থেকে যায়—কোনো তারিখের ভেতর, কোনো কথার আড়ালে, কিংবা শুধু মনে।
          </p>
        </motion.div>

        {/* Archival Chamber Container */}
        <div
          className="relative rounded-2xl border border-[#A9824A]/30 shadow-2xl p-6 sm:p-10 min-h-[460px] flex flex-col items-center justify-between overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, #291e15 0%, #1a130d 55%, #120e09 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(201,164,92,0.15), inset 0 -30px 60px rgba(0,0,0,0.8), 0 25px 50px -12px rgba(0,0,0,0.85)',
          }}
        >
          {/* Subtle Archival Grain / Wood Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(169,130,74,0.05) 40px, rgba(169,130,74,0.05) 41px)',
            }}
          />

          {/* Candlelight Ambience */}
          <motion.div
            animate={{
              opacity: [0.35, 0.44, 0.32, 0.46, 0.36],
              scale: [1, 1.03, 0.98, 1.04, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#C9A45C]/15 via-[#A9824A]/10 to-transparent blur-3xl pointer-events-none top-4 left-1/2 -translate-x-1/2"
          />

          {/* Floating Subtle Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {ARCHIVE_DUST.map((particle) => (
              <motion.div
                key={particle.id}
                animate={{
                  y: [-10, 14, -8],
                  x: [-6, 8, -6],
                  opacity: [0.1, 0.28, 0.12],
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
                className="rounded-full bg-[#F3E7CC] blur-[0.3px]"
              />
            ))}
          </div>

          {/* Vintage Archival Header Bar */}
          <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-serif text-[#A99A7C]/70 pb-3 border-b border-[#A9824A]/15">
            <span className="italic flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]/70" />
              সংরক্ষিত স্মৃতিকোষ
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#C9A45C]/60 uppercase">
              TIMELINE ARCHIVE
            </span>
          </div>

          {/* Timeline Visual & Nodes */}
          <div className="w-full relative z-10 py-6 sm:py-8 space-y-6">
            {/* Timeline Connecting Line */}
            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-[#3A2A1D] pointer-events-none">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    boxShadow: isHighlightingTimeline
                      ? '0 0 16px rgba(201,164,92,0.85)'
                      : '0 0 6px rgba(201,164,92,0.2)',
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`h-full origin-left transition-colors duration-700 ${
                    isHighlightingTimeline
                      ? 'bg-gradient-to-r from-[#C9A45C] via-[#F3E7CC] to-[#C9A45C]'
                      : 'bg-gradient-to-r from-[#A9824A]/50 via-[#C9A45C]/70 to-[#A9824A]/50'
                  }`}
                />
              </div>

              {/* Memory Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
                {TIMELINE_MEMORIES.map((node, index) => {
                  const isUnlocked = unlockedNodes[node.id];
                  const isActive = activeMemory?.id === node.id;
                  const isM3 = node.id === 'm3';
                  const meta = MEMORY_METADATA[node.id];

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.18, duration: 0.6 }}
                      whileHover={{ scale: 1.025, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUnlockNode(node)}
                      className={`cursor-pointer rounded-xl border text-left transition-all duration-300 relative group overflow-hidden shadow-lg ${
                        isActive
                          ? 'bg-[#2b1f15] border-[#C9A45C] shadow-[0_0_20px_rgba(201,164,92,0.25)]'
                          : isUnlocked
                          ? 'bg-[#1a140d]/90 border-[#A9824A]/30 hover:border-[#C9A45C]/60 hover:bg-[#221a11]'
                          : 'bg-[#140f0a]/90 border-[#A9824A]/20 hover:border-[#A9824A]/40'
                      }`}
                    >
                      {/* Top Timeline Node Milestone Dot */}
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          {/* Golden Node Beacon */}
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                                isUnlocked
                                  ? 'bg-[#C9A45C] border-[#F3E7CC] shadow-[0_0_8px_rgba(201,164,92,0.6)]'
                                  : 'bg-[#1b150f] border-[#A9824A]/40'
                              }`}
                            >
                              {isUnlocked && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#12110E]" />
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-[#C9A45C] tracking-wide">
                              {meta?.bengaliStamp || node.date}
                            </span>
                          </div>

                          {/* Lock / Unlock Icon */}
                          <div className="flex items-center">
                            {isUnlocked ? (
                              <div className="p-1 rounded bg-[#211C16] border border-[#A9824A]/30 text-[#C9A45C]">
                                <Unlock className="w-3 h-3" />
                              </div>
                            ) : (
                              <div className="p-1 rounded bg-[#16110b] border border-[#A9824A]/25 text-[#A99A7C]/70">
                                <Lock className="w-3 h-3 animate-pulse" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title & Preview */}
                        <div className="space-y-1">
                          <h3 className="font-serif text-sm sm:text-base text-[#F3E7CC] group-hover:text-[#C9A45C] transition-colors">
                            {node.title}
                          </h3>
                          <div className="text-[11px] text-[#A99A7C]/80 font-serif italic">
                            {meta?.bengaliSubtitle}
                          </div>
                        </div>

                        {/* Snippet / Locked Mask */}
                        {isUnlocked ? (
                          <p className="text-xs text-[#A99A7C] font-light line-clamp-2 leading-relaxed">
                            {node.snippet}
                          </p>
                        ) : (
                          <div className="p-2.5 rounded bg-[#120e09]/90 border border-[#A9824A]/20 text-[11px] text-[#C9A45C]/90 font-serif italic flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#C9A45C] shrink-0" />
                            <span>{meta?.lockedHint || 'খুলতে স্পর্শ করুন'}</span>
                          </div>
                        )}
                      </div>

                      {/* Active Selection Bottom Line */}
                      {isActive && (
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Active Memory: Opened Archival Document Inspector */}
            <AnimatePresence mode="wait">
              {activeMemory && (
                <motion.div
                  key={activeMemory.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="p-6 sm:p-8 rounded-2xl border border-[#C9A45C]/40 text-left space-y-4 shadow-2xl relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(38,27,18,0.96) 0%, rgba(24,18,12,0.98) 100%)',
                    boxShadow:
                      '0 15px 35px -5px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,164,92,0.25)',
                  }}
                >
                  {/* Parchment Corner Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C9A45C]/60" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C9A45C]/60" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#C9A45C]/60" />
                  <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C9A45C]/60" />

                  {/* Document Header & Archival Stamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A9824A]/20 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded font-mono text-[10px] text-[#C9A45C] bg-[#12110E] border border-[#A9824A]/30 uppercase tracking-wider">
                          {MEMORY_METADATA[activeMemory.id]?.bengaliStamp || activeMemory.date}
                        </span>
                        <span className="text-xs font-mono text-[#A99A7C]/70">
                          {activeMemory.date}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-serif text-[#F3E7CC] font-normal tracking-wide">
                        {activeMemory.title}
                      </h3>
                    </div>

                    <div className="text-[11px] font-serif text-[#D8BD88]/80 italic">
                      {MEMORY_METADATA[activeMemory.id]?.bengaliSubtitle}
                    </div>
                  </div>

                  {/* Decorative Subtle Divider */}
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A45C]/60 to-transparent" />

                  {/* Full Preserved Memory Text */}
                  <div className="py-2 pl-3 border-l-2 border-[#A9824A]/40">
                    <p className="text-sm sm:text-base text-[#F3E7CC]/95 font-serif leading-relaxed italic">
                      &ldquo;{activeMemory.fullMemory}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* All Memories Unlocked Confirmation Banner */}
        <AnimatePresence>
          {isAllUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 rounded-2xl border border-[#C9A45C]/40 text-center space-y-2 shadow-xl relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, #3a2a1d 0%, #201812 60%, #12100d 100%)',
              }}
            >
              <div className="inline-flex items-center gap-2 text-[#C9A45C]">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <h3 className="font-serif text-base sm:text-lg font-semibold tracking-wide">
                  সব স্মৃতির পাতা এখন খোলা
                </h3>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm text-[#A99A7C] font-light max-w-md mx-auto">
                এখন আর কোনো স্মৃতি আড়ালে নেই। সামনে শুধু একটি শেষ পথ বাকি।
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Button to Locked Door */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            disabled={!isAllUnlocked}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl ${
              isAllUnlocked
                ? 'bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] border-[#A9824A]/60 hover:scale-105 cursor-pointer shadow-[#A9824A]/25'
                : 'bg-[#12110E]/50 border-[#A9824A]/20 text-[#A99A7C]/40 cursor-not-allowed'
            }`}
          >
            <span>শেষ দরজার দিকে এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isAllUnlocked && (
            <p className="text-xs text-[#A99A7C]/60 mt-3 italic font-serif">
              (সবগুলো স্মৃতির পাতা উন্মোচন করে এগিয়ে যান)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

