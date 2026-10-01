'use client';

import { useState } from 'react';
import { ShieldCheck, Flame } from 'lucide-react';
import SecretLoginModal from '@/components/secret/SecretLoginModal';

export default function PublicFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="mt-auto py-12 px-6 border-t border-[#A9824A]/15 bg-[#0E0D0B] text-center text-xs text-[#A99A7C]/70">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-light">
          &copy; {new Date().getFullYear()} শুভকামনার একটি অধ্যায় • Created: 01/10/2026
        </p>

        {/* Subtle Secret Trigger Element */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest text-[#A99A7C]/40">
            অধ্যায় I • 01/10/2026
          </span>


          {/* Hidden Clickable Secret Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative p-2 rounded-full text-[#A9824A]/40 hover:text-[#C9A45C] transition-colors focus:outline-none"
            title="A subtle wax seal..."
          >
            <Flame className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(201,164,92,0.5)]" />
            <span className="sr-only">Secret Portal</span>
          </button>
        </div>
      </div>

      {/* Secret Login Modal */}
      <SecretLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
