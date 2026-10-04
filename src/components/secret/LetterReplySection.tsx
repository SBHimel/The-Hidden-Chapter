'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  User,
  Clock,
  Feather,
  Pencil,
  Trash2,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';
import { ReplyItem } from '@/types/reply';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:5000').replace(/\/+$/, '');

export default function LetterReplySection() {
  const [replies, setReplies] = useState<ReplyItem[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch replies on mount
  useEffect(() => {
    fetchReplies();
  }, []);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const fetchReplies = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/replies`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.replies) {
        setReplies(data.replies);
      }
    } catch {
      // Ignore fetch errors
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage('');
        setName('');
        showAlert('success', 'তোমার কথাগুলো এখানে রেখে দেওয়া হলো।');
        if (data.replies) {
          setReplies(data.replies);
        }
      } else {
        showAlert('error', data.message || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।');
      }
    } catch {
      showAlert('error', 'নেটওয়ার্কে সমস্যা হয়েছে। আবার চেষ্টা করো।');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing a comment
  const handleStartEdit = (reply: ReplyItem) => {
    setEditingId(reply.id);
    setEditName(reply.name);
    setEditMessage(reply.message);
    setDeletingId(null); // Cancel any pending delete prompt
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditMessage('');
  };

  // Save edit
  const handleSaveEdit = async (id: string) => {
    if (!editMessage.trim()) return;

    setIsEditing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/replies/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editName, message: editMessage }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.replies) {
          setReplies(data.replies);
        }
        setEditingId(null);
        showAlert('success', 'তোমার কথাগুলো আপডেট করা হয়েছে।');
      } else {
        showAlert('error', data.message || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।');
      }
    } catch {
      showAlert('error', 'নেটওয়ার্কে সমস্যা হয়েছে। আবার চেষ্টা করো।');
    } finally {
      setIsEditing(false);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/replies/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.replies) {
          setReplies(data.replies);
        }
        setDeletingId(null);
        showAlert('success', 'কথাগুলো এখান থেকে সরিয়ে দেওয়া হয়েছে।');
      } else {
        showAlert('error', data.message || 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।');
      }
    } catch {
      showAlert('error', 'নেটওয়ার্কে সমস্যা হয়েছে। আবার চেষ্টা করো।');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-14 space-y-8 text-left">
      {/* Divider with Emblem */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 py-2"
      >
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#A9824A]/25 to-[#A9824A]/30" />
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C9A45C] tracking-widest px-2">
          <Feather className="w-3.5 h-3.5 text-[#A9824A]" />
          <span>— কিছু কথা, যদি বলতে ইচ্ছে হয় —</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#A9824A]/25 to-[#A9824A]/30" />
      </motion.div>

      {/* Personal Dedication & Warm Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="space-y-2 text-center max-w-xl mx-auto px-4"
      >
        <h2 className="text-base sm:text-lg font-serif text-[#D8BD88] tracking-wide">
          Fatema tuj Sadia — এই জায়গাটা শুধু তোমার জন্য।
        </h2>
        <p className="text-xs sm:text-sm text-[#A99A7C] font-light leading-relaxed">
          এই চিঠির উত্তরে তোমার কিছু বলার থাকলে, এখানে রেখে যেতে পারো। আর কিছু না বলতে চাইলেও, সেটাও সম্পূর্ণ ঠিক আছে।
        </p>
      </motion.div>

      {/* Global Alert Notification */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl text-xs flex items-center gap-2.5 shadow-lg border font-serif ${
              alert.type === 'success'
                ? 'bg-[#3A2A1D] border-[#C9A45C]/40 text-[#F3E7CC]'
                : 'bg-[#3A1D1D] border-[#E57373]/40 text-[#FFCDD2]'
            }`}
          >
            {alert.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#E57373] shrink-0" />
            )}
            <span>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="p-6 sm:p-8 rounded-2xl bg-[#211C16] border border-[#A9824A]/30 shadow-2xl space-y-6 relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #2b1f15 0%, #1c1510 60%, #12110E 100%)',
        }}
      >
        {/* Subtle Antique Corner Rivets */}
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#A9824A]/40 border border-[#C9A45C]/50 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#A9824A]/40 border border-[#C9A45C]/50 pointer-events-none" />

        <div className="space-y-1.5">
          <h3 className="font-serif text-lg text-[#F3E7CC] flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#C9A45C]" />
            <span>চিঠির উত্তরে কিছু বলতে চাও?</span>
          </h3>
          <p className="text-xs text-[#A99A7C] font-light">
            মনের কথাগুলো যেভাবে বলতে ইচ্ছে হয়, সেভাবেই লিখে রেখে যেতে পারো।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-serif text-[#A99A7C] tracking-wide block">
              তোমার নাম / ইচ্ছে হলে অন্য কোনো নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fatema tuj Sadia"
              className="w-full px-4 py-2.5 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/35 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors font-serif"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-serif text-[#A99A7C] tracking-wide block">
              তোমার কথাগুলো
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="যদি কিছু বলতে ইচ্ছে হয়, এখানেই লিখে যেতে পারো..."
              className="w-full px-4 py-3 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/35 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors leading-relaxed font-serif"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="px-6 py-3 rounded-lg bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm border border-[#A9824A]/40 transition-all duration-300 flex items-center gap-2 shadow-lg disabled:opacity-40 cursor-pointer font-serif"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-[#F3E7CC] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 text-[#C9A45C]" />
                <span>কথাগুলো রেখে দাও</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Saved Replies Stream */}
      <div className="space-y-4 pt-2">
        <h4 className="font-serif text-sm text-[#C9A45C] tracking-wide flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[#A9824A]" />
          <span>এখানে রেখে যাওয়া কথাগুলো ({replies.length})</span>
        </h4>

        {replies.length === 0 ? (
          <p className="text-xs text-[#A99A7C] font-light italic font-serif">
            এখনও এখানে কোনো কথা রেখে যাওয়া হয়নি।
          </p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {replies.map((item) => {
                const isItemEditing = editingId === item.id;
                const isItemDeleting = deletingId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 rounded-xl bg-[#211C16]/85 border border-[#A9824A]/25 shadow-md space-y-3 relative group"
                    style={{
                      background: 'linear-gradient(180deg, #211c16 0%, #17130e 100%)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#A9824A]/15 pb-2 text-xs">
                      <span className="font-serif text-[#F3E7CC] font-semibold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                        {item.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#A99A7C]/70 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {item.updatedAt && (
                            <span className="text-[10px] text-[#C9A45C]/80 italic ml-1 font-serif">
                              (সম্পাদিত)
                            </span>
                          )}
                        </span>

                        {/* Action buttons (Edit / Delete) */}
                        {!isItemEditing && !isItemDeleting && (
                          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStartEdit(item)}
                              title="সম্পাদনা করুন"
                              className="p-1 rounded hover:bg-[#A9824A]/20 text-[#A99A7C] hover:text-[#C9A45C] transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingId(item.id);
                                setEditingId(null);
                              }}
                              title="মুছে ফেলুন"
                              className="p-1 rounded hover:bg-[#E57373]/20 text-[#A99A7C] hover:text-[#E57373] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inline Editing Form */}
                    {isItemEditing ? (
                      <div className="space-y-3 pt-1">
                        <div>
                          <label className="text-[11px] font-serif text-[#A99A7C] block mb-1">
                            নাম / পরিচয়
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-[#12110E] border border-[#A9824A]/40 text-[#F3E7CC] text-xs focus:outline-none focus:border-[#C9A45C] font-serif"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-serif text-[#A99A7C] block mb-1">
                            তোমার কথা
                          </label>
                          <textarea
                            rows={3}
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#12110E] border border-[#A9824A]/40 text-[#F3E7CC] text-xs focus:outline-none focus:border-[#C9A45C] leading-relaxed font-serif"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1 font-serif">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={isEditing}
                            className="px-3 py-1.5 rounded bg-[#12110E] hover:bg-[#2A241E] text-[#A99A7C] text-xs border border-[#A9824A]/25 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            <span>বাতিল</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(item.id)}
                            disabled={isEditing || !editMessage.trim()}
                            className="px-3 py-1.5 rounded bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] text-xs border border-[#A9824A]/40 flex items-center gap-1 transition-colors disabled:opacity-40 cursor-pointer"
                          >
                            {isEditing ? (
                              <div className="w-3 h-3 border-2 border-[#F3E7CC] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Check className="w-3 h-3" />
                                <span>পরিবর্তনগুলো রেখে দাও</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : isItemDeleting ? (
                      /* Delete Confirmation Prompt */
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 rounded-lg bg-[#3A1D1D]/70 border border-[#E57373]/40 space-y-2 font-serif"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#FFCDD2] flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-[#E57373]" />
                            <span>এই কথাগুলো এখান থেকে সরিয়ে দিতে চাও?</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setDeletingId(null)}
                              disabled={isDeleting}
                              className="px-2.5 py-1 rounded bg-[#12110E] text-[#A99A7C] hover:text-[#F3E7CC] text-[11px] transition-colors cursor-pointer"
                            >
                              ফিরে যাও
                            </button>
                            <button
                              onClick={() => handleConfirmDelete(item.id)}
                              disabled={isDeleting}
                              className="px-2.5 py-1 rounded bg-[#E57373] hover:bg-[#D32F2F] text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {isDeleting ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                'হ্যাঁ, সরিয়ে দাও'
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Normal Comment View */
                      <p className="text-sm text-[#F3E7CC]/90 font-serif leading-relaxed whitespace-pre-line">
                        "{item.message}"
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
