'use client';

import { SecretJourneyProvider, useSecretJourney } from '@/context/SecretJourneyContext';
import AmbientCanvas from '@/components/ui/AmbientCanvas';
import { LogOut, RotateCcw, Flame, ChevronRight, Lock } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

function SecretHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { resetProgress, isDoorUnlocked } = useSecretJourney();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch {
      router.push('/');
    }
  };

  const currentPathSegment = pathname.split('/').pop() || 'intro';

  return (
    <header className="sticky top-0 z-40 bg-[#12110E]/90 backdrop-blur-md border-b border-[#A9824A]/20 px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/secret/intro"
          className="flex items-center gap-2 text-[#C9A45C] hover:text-[#F3E7CC] transition-colors group"
        >
          <Flame className="w-4 h-4 text-[#A9824A] group-hover:text-[#C9A45C] animate-candlelight" />
          <span className="font-serif text-sm tracking-wide hidden sm:inline">The Hidden Chamber</span>
        </Link>
        <span className="text-[#A9824A]/40 text-xs">/</span>
        <span className="text-xs font-mono uppercase text-[#A99A7C] tracking-wider">
          {currentPathSegment.replace('-', ' ')}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isDoorUnlocked && (
          <Link
            href="/secret/letter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3A2A1D] border border-[#A9824A]/40 text-xs text-[#C9A45C] hover:bg-[#A9824A] hover:text-[#12110E] transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Final Letter</span>
          </Link>
        )}

        <button
          onClick={resetProgress}
          title="Reset Journey Progress"
          className="p-2 text-[#A99A7C]/60 hover:text-[#C9A45C] hover:bg-[#211C16] rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="sr-only">Reset Progress</span>
        </button>

        <button
          onClick={handleLogout}
          title="Exit Hidden Chamber"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211C16] hover:bg-[#3A2A1D] border border-[#A9824A]/20 text-xs text-[#A99A7C] hover:text-[#F3E7CC] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </header>
  );
}

export default function SecretLayout({ children }: { children: React.ReactNode }) {
  return (
    <SecretJourneyProvider>
      <div className="min-h-screen flex flex-col bg-[#12110E] text-[#F3E7CC] relative font-sans">
        <AmbientCanvas intensity="medium" />
        <SecretHeader />
        <main className="flex-1 relative z-10">{children}</main>
      </div>
    </SecretJourneyProvider>
  );
}
