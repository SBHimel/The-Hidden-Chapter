'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSecretJourney } from '@/context/SecretJourneyContext';

/* ─────────────────────────────────────────────
   Dust‑particle layer — pure SVG animation, no deps
   ───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  cx: 20 + Math.round((i * 67) % 260),
  cy: 10 + Math.round((i * 53) % 180),
  r: 0.6 + (i % 3) * 0.4,
  delay: (i * 0.37) % 3.5,
  dur: 3.5 + (i % 4) * 1.2,
}));

function DustLayer() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
    >
      {PARTICLES.map((p) => (
        <circle key={p.id} cx={p.cx} cy={p.cy} r={p.r} fill="#C9A45C" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0.35;0"
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${p.cy};${p.cy - 8};${p.cy}`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Engraved ring overlay — SVG, no deps
   ───────────────────────────────────────────── */
function ArtifactRings({ examined }: { examined: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <circle
        cx="80" cy="80" r="72"
        fill="none" stroke="#A9824A" strokeWidth="0.5"
        strokeDasharray="4 6" opacity="0.5"
      />
      <circle
        cx="80" cy="80" r="58"
        fill="none" stroke="#C9A45C" strokeWidth="0.4"
        opacity={examined ? 0.8 : 0.35}
        style={{ transition: 'opacity 1.2s ease' }}
      />
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 80 + 54 * Math.cos(rad);
        const y1 = 80 + 54 * Math.sin(rad);
        const x2 = 80 + 62 * Math.cos(rad);
        const y2 = 80 + 62 * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#C9A45C" strokeWidth="0.8" opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Central sigil — hexagon + circle + crosshair
   ───────────────────────────────────────────── */
function CentralSigil({ examined }: { examined: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className="w-14 h-14"
      style={{
        filter: examined ? 'drop-shadow(0 0 4px #C9A45C66)' : 'none',
        transition: 'filter 1.4s ease',
      }}
    >
      <polygon
        points="30,4 52,17 52,43 30,56 8,43 8,17"
        fill="none" stroke="#A9824A" strokeWidth="1"
        opacity={examined ? 0.9 : 0.55}
        style={{ transition: 'opacity 1.2s ease' }}
      />
      <circle
        cx="30" cy="30" r="10"
        fill="none" stroke="#C9A45C" strokeWidth="0.8"
        opacity={examined ? 1 : 0.45}
        style={{ transition: 'opacity 1.2s ease' }}
      />
      <line x1="30" y1="20" x2="30" y2="40" stroke="#C9A45C" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="30" x2="40" y2="30" stroke="#C9A45C" strokeWidth="0.5" opacity="0.5" />
      <circle
        cx="30" cy="30" r="2"
        fill={examined ? '#C9A45C' : '#A9824A'}
        style={{ transition: 'fill 1.2s ease' }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════ */
export default function Clue2Page() {
  const router = useRouter();
  const { unlockClue, markStepComplete, setStep, discoveredClues } = useSecretJourney();
  const isUnlocked = discoveredClues['clue-2'];
  const [isExamined, setIsExamined] = useState(isUnlocked);

  /* ── unchanged logic ── */
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
      <div className="max-w-2xl mx-auto space-y-10 text-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="space-y-3"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A9824A]">
            অধ্যায় ২ / ৮
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#F3E7CC] leading-snug">
            যে জিনিসটি সময়ের কাছে ছিল
          </h1>
          <p className="text-xs sm:text-sm text-[#A99A7C] font-light leading-relaxed max-w-md mx-auto">
            একটি পুরোনো স্মারক পড়ে আছে নীরবে। প্রথম দেখায় এতে বিশেষ কিছু নেই।
            কিন্তু কিছু জিনিসকে শুধু দেখা যায় না—তাদের একটু সময় দিয়ে পড়তে হয়।
          </p>
        </motion.div>

        {/* ── Instruction ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="space-y-1"
        >
          <p className="text-xs text-[#A99A7C] italic leading-relaxed">
            কেন্দ্রের চিহ্নটির দিকে একটু মন দিয়ে তাকাও।
            হয়তো এটি শুধু একটি অলংকার নয়।
          </p>
          <p className="text-[10px] text-[#A99A7C]/50 font-mono tracking-wide">
            কিছু চিহ্নের অর্থ প্রথম দেখায় বোঝা যায় না।
          </p>
        </motion.div>

        {/* ── Artifact Chamber ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1 }}
          onClick={handleExamine}
          className="cursor-pointer relative"
          style={{ perspective: '900px' }}
        >
          <motion.div
            whileHover={{ scale: 1.015, rotateX: 1.5, rotateY: -1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            className="group relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #1C1710 0%, #12110E 60%, #211C16 100%)',
              border: '1px solid #A9824A33',
              boxShadow:
                '0 0 0 1px #A9824A18, 0 4px 40px #00000080, inset 0 1px 0 #A9824A22, inset 0 -1px 0 #00000040',
            }}
          >
            {/* ambient dust */}
            <DustLayer />

            {/* top metallic sheen */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A45C44, transparent)' }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center py-12 px-8 space-y-6">

              {/* ── Locket artifact ── */}
              <motion.div
                animate={
                  isExamined
                    ? { y: [0, -3, 0], filter: ['brightness(1)', 'brightness(1.12)', 'brightness(1)'] }
                    : { y: [0, -2.5, 0] }
                }
                transition={{ repeat: Infinity, duration: isExamined ? 3.5 : 5, ease: 'easeInOut' }}
                className="relative"
                style={{ willChange: 'transform' }}
              >
                <div
                  className="relative w-36 h-44 flex items-center justify-center"
                  style={{
                    filter: isExamined
                      ? 'drop-shadow(0 0 14px #A9824A55)'
                      : 'drop-shadow(0 2px 8px #00000088)',
                    transition: 'filter 1.6s ease',
                  }}
                >
                  {/* outer bezel */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(145deg, #4A3820 0%, #2A1F14 50%, #3A2A1D 100%)',
                      border: isExamined ? '1.5px solid #C9A45C88' : '1.5px solid #A9824A55',
                      boxShadow: isExamined
                        ? 'inset 0 2px 8px #00000066, inset 0 -1px 4px #C9A45C33, 0 0 24px #A9824A33'
                        : 'inset 0 2px 8px #00000066, inset 0 -1px 3px #A9824A22',
                      transition: 'border 1.4s ease, box-shadow 1.4s ease',
                    }}
                  />
                  {/* antique reflection sweep */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(120deg, #C9A45C12 0%, transparent 50%, #A9824A08 100%)',
                    }}
                  />
                  {/* engraved rings */}
                  <ArtifactRings examined={isExamined} />
                  {/* central sigil */}
                  <CentralSigil examined={isExamined} />
                </div>
              </motion.div>

              {/* status label */}
              <span
                className="text-[9px] font-mono tracking-[0.35em] uppercase transition-all duration-1000"
                style={{ color: isExamined ? '#C9A45C' : '#A99A7C55' }}
              >
                {isExamined ? 'চিহ্নটি জেগে উঠেছে' : 'চিহ্নটি পরীক্ষা করো'}
              </span>

              {/* artifact label */}
              <div className="text-center space-y-1">
                <h3
                  className="text-sm font-serif transition-colors duration-700"
                  style={{ color: isExamined ? '#C9A45C' : '#F3E7CC' }}
                >
                  পুরোনো খোদাই
                </h3>
                <p className="text-[11px] text-[#A99A7C] font-light leading-relaxed max-w-xs">
                  স্পর্শ করলে হয়তো এর ভেতরের চিহ্নটি আরও কিছু বলবে।
                </p>
              </div>
            </div>

            {/* bottom metallic sheen */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #A9824A33, transparent)' }}
            />
          </motion.div>
        </motion.div>

        {/* ── Archival Reveal Note ── */}
        <AnimatePresence>
          {isExamined && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl overflow-hidden text-left space-y-5"
              style={{
                background: 'linear-gradient(160deg, #2A1F14 0%, #1C1710 100%)',
                border: '1px solid #C9A45C33',
                boxShadow: 'inset 0 1px 0 #C9A45C18, 0 8px 40px #00000060',
              }}
            >
              {/* aged paper line texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, #C9A45C 0px, transparent 1px, transparent 18px)',
                }}
              />

              <div className="relative z-10 p-6 space-y-5">
                {/* heading */}
                <div className="flex items-center gap-2.5 text-[#C9A45C]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 opacity-70" />
                  <h3 className="font-serif text-sm font-medium tracking-wide">
                    চিহ্নটির অর্থ মিলল
                  </h3>
                </div>

                {/* preamble */}
                <p className="text-xs text-[#A99A7C] leading-relaxed">
                  ভেতরে পাওয়া ছোট্ট লেখাটি অদ্ভুত—
                </p>

                {/* main quote */}
                <blockquote className="border-l-2 border-[#A9824A]/50 pl-4 py-1">
                  <p
                    className="text-sm sm:text-base font-serif text-[#F3E7CC] leading-relaxed italic"
                    style={{ textShadow: '0 1px 12px #A9824A22' }}
                  >
                    &ldquo;সময় এগিয়ে যায়, কিন্তু কিছু স্মৃতি তার কাঁটার সঙ্গে ঘুরতে থাকে।&rdquo;
                  </p>
                </blockquote>

                {/* interpretation */}
                <p className="text-[11px] text-[#A99A7C] leading-relaxed">
                  এটি কোনো উত্তর নয়। বরং পরের দরজার জন্য রেখে যাওয়া একটি ইঙ্গিত।
                </p>

                {/* divider */}
                <div
                  className="h-px w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #A9824A33, transparent)' }}
                />

                {/* cipher stamp */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded flex flex-col items-center justify-center"
                    style={{
                      background: '#12110E',
                      border: '1px solid #A9824A44',
                      boxShadow: 'inset 0 1px 4px #00000060',
                    }}
                  >
                    <span
                      className="font-mono text-2xl font-bold leading-none"
                      style={{ color: '#C9A45C', textShadow: '0 0 10px #C9A45C55' }}
                    >
                      3
                    </span>
                    <span className="text-[7px] font-mono text-[#A99A7C55] tracking-widest mt-0.5 uppercase">
                      cipher
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#A9824A]">
                      দ্বিতীয় সংকেতের সংখ্যা
                    </p>
                    <p className="text-[10px] text-[#A99A7C]/60 leading-relaxed">
                      তুমি শুধু একটি সংখ্যা পাওনি।
                    </p>
                    <p className="text-[10px] text-[#A99A7C]/50 leading-relaxed">
                      কোনো এক জায়গায় এই সংখ্যাটির প্রয়োজন হবে।
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Next Chapter Button ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-3"
        >
          <motion.button
            onClick={handleNext}
            disabled={!isExamined}
            whileHover={isExamined ? { scale: 1.03 } : {}}
            whileTap={isExamined ? { scale: 0.97 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className={`px-8 py-3.5 rounded-full font-medium text-sm border flex items-center gap-3 mx-auto shadow-xl transition-all duration-500 ${
              isExamined
                ? 'cursor-pointer text-[#F3E7CC] border-[#A9824A]/60'
                : 'cursor-not-allowed text-[#A99A7C]/30 border-[#A9824A]/15'
            }`}
            style={
              isExamined
                ? {
                    background: 'linear-gradient(135deg, #3A2A1D 0%, #2A1F14 100%)',
                    boxShadow: '0 2px 20px #A9824A25, inset 0 1px 0 #C9A45C22',
                  }
                : { background: '#12110E55' }
            }
          >
            <span>পরের অধ্যায়ে এগিয়ে যাও</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {!isExamined && (
            <p className="text-[10px] text-[#A99A7C]/40 italic font-mono">
              (চিহ্নটি এখনও পরীক্ষা করা হয়নি)
            </p>
          )}
        </motion.div>

      </div>
    </div>
  );
}
