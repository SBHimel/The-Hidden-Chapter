'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SecretLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecretLoginModal({ isOpen, onClose }: SecretLoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to secret intro
        router.push('/secret/intro');
      } else {
        setError(data.message || 'Credentials unrecognized. Access denied.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#12110E]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#211C16] border border-[#A9824A]/30 shadow-2xl shadow-black/90 space-y-6 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#A99A7C] hover:text-[#F3E7CC] transition-colors rounded-lg hover:bg-[#3A2A1D]/40"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#3A2A1D] border border-[#A9824A]/40 flex items-center justify-center text-[#C9A45C]">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif text-[#F3E7CC] tracking-wide">
                The Hidden Chamber
              </h2>
              <p className="text-xs text-[#A99A7C] font-light">
                Only those with the secret key may enter beyond this threshold.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-950/30 border border-red-800/40 text-red-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#A99A7C] tracking-wider uppercase">
                  Email Identifier
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/40 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#A99A7C] tracking-wider uppercase">
                  Secret Key
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/40 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-lg bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm border border-[#A9824A]/40 transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#F3E7CC] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Unlock Chamber</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-[10px] text-[#A99A7C]/60 font-mono">
              SECURE ENCRYPTED ACCESS PORTAL
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
