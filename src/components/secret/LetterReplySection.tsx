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
import { ReplyItem } from '@/app/api/replies/route';

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
      const res = await fetch('/api/replies');
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
      const res = await fetch('/api/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage('');
        setName('');
        showAlert('success', 'Your reply has been preserved on parchment!');
        if (data.replies) {
          setReplies(data.replies);
        }
      } else {
        showAlert('error', data.message || 'Failed to post reply.');
      }
    } catch {
      showAlert('error', 'Network error. Please try again.');
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
      const res = await fetch('/api/replies', {
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
        showAlert('success', 'Your reply was successfully updated!');
      } else {
        showAlert('error', data.message || 'Failed to update reply.');
      }
    } catch {
      showAlert('error', 'Failed to update reply. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/replies?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.replies) {
          setReplies(data.replies);
        }
        setDeletingId(null);
        showAlert('success', 'Reply removed from parchment.');
      } else {
        showAlert('error', data.message || 'Failed to delete reply.');
      }
    } catch {
      showAlert('error', 'Failed to delete reply. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-8 text-left">
      {/* Divider with Emblem */}
      <div className="flex items-center gap-4 py-4">
        <div className="h-[1px] flex-1 bg-[#A9824A]/25" />
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C9A45C] tracking-widest">
          <MessageSquare className="w-4 h-4 text-[#A9824A]" />
          <span>Reader's Reflections & Responses</span>
        </div>
        <div className="h-[1px] flex-1 bg-[#A9824A]/25" />
      </div>

      {/* Global Alert Notification */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl text-xs flex items-center gap-2.5 shadow-lg border ${
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
      <div className="p-6 sm:p-8 rounded-2xl bg-[#211C16] border border-[#A9824A]/30 shadow-2xl space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-[#F3E7CC] flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#C9A45C]" />
            <span>Leave a Reply to this Letter</span>
          </h3>
          <p className="text-xs text-[#A99A7C] font-light">
            Your response will be permanently preserved on parchment for future visitors to see.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A99A7C] tracking-wider uppercase">
              Your Name / Alias (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="A Silent Reader"
              className="w-full px-4 py-2.5 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/40 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#A99A7C] tracking-wider uppercase">
              Your Message / Reflection
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your words here..."
              className="w-full px-4 py-3 rounded-lg bg-[#12110E] border border-[#A9824A]/25 text-[#F3E7CC] placeholder-[#A99A7C]/40 text-sm focus:outline-none focus:border-[#C9A45C] transition-colors leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="px-6 py-3 rounded-lg bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] font-medium text-sm border border-[#A9824A]/40 transition-all duration-300 flex items-center gap-2 shadow-lg disabled:opacity-40"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-[#F3E7CC] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Save Reply to Parchment</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Saved Replies Stream */}
      <div className="space-y-4">
        <h4 className="font-serif text-sm text-[#C9A45C] tracking-wide flex items-center gap-2">
          <span>Preserved Responses ({replies.length})</span>
        </h4>

        {replies.length === 0 ? (
          <p className="text-xs text-[#A99A7C] font-light italic">
            No replies recorded yet. Be the first to leave a message.
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
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-xl bg-[#211C16]/80 border border-[#A9824A]/20 shadow-md space-y-3 relative group"
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
                            <span className="text-[10px] text-[#C9A45C]/80 italic ml-1">(edited)</span>
                          )}
                        </span>

                        {/* Action buttons (Edit / Delete) */}
                        {!isItemEditing && !isItemDeleting && (
                          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStartEdit(item)}
                              title="Edit comment"
                              className="p-1 rounded hover:bg-[#A9824A]/20 text-[#A99A7C] hover:text-[#C9A45C] transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingId(item.id);
                                setEditingId(null);
                              }}
                              title="Delete comment"
                              className="p-1 rounded hover:bg-[#E57373]/20 text-[#A99A7C] hover:text-[#E57373] transition-colors"
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
                          <label className="text-[10px] font-mono text-[#A99A7C] uppercase tracking-wider block mb-1">
                            Name / Alias
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-[#12110E] border border-[#A9824A]/40 text-[#F3E7CC] text-xs focus:outline-none focus:border-[#C9A45C]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-[#A99A7C] uppercase tracking-wider block mb-1">
                            Comment Message
                          </label>
                          <textarea
                            rows={3}
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#12110E] border border-[#A9824A]/40 text-[#F3E7CC] text-xs focus:outline-none focus:border-[#C9A45C] leading-relaxed"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={isEditing}
                            className="px-3 py-1.5 rounded bg-[#12110E] hover:bg-[#2A241E] text-[#A99A7C] text-xs border border-[#A9824A]/25 flex items-center gap-1 transition-colors"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(item.id)}
                            disabled={isEditing || !editMessage.trim()}
                            className="px-3 py-1.5 rounded bg-[#3A2A1D] hover:bg-[#A9824A] text-[#F3E7CC] hover:text-[#12110E] text-xs border border-[#A9824A]/40 flex items-center gap-1 transition-colors disabled:opacity-40"
                          >
                            {isEditing ? (
                              <div className="w-3 h-3 border-2 border-[#F3E7CC] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Save Changes</span>
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
                        className="p-3 rounded-lg bg-[#3A1D1D]/70 border border-[#E57373]/40 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#FFCDD2] font-serif flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-[#E57373]" />
                            <span>Are you sure you want to delete this reply?</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setDeletingId(null)}
                              disabled={isDeleting}
                              className="px-2.5 py-1 rounded bg-[#12110E] text-[#A99A7C] hover:text-[#F3E7CC] text-[11px] transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleConfirmDelete(item.id)}
                              disabled={isDeleting}
                              className="px-2.5 py-1 rounded bg-[#E57373] hover:bg-[#D32F2F] text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                            >
                              {isDeleting ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                'Confirm Delete'
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

