"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { categories } from "@/app/assets/data";

const WHATSAPP_NUMBER = "917014186406";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestModal({ isOpen, onClose }: RequestModalProps) {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryName =
      categories.find((c) => c.id === category)?.name ||
      category ||
      "Not specified";

    const lines = [
      `Hi! I'd like to make a custom request.`,
      ``,
      `*Name:* ${name || "Not provided"}`,
      `*Category:* ${categoryName}`,
      ``,
      `*Request Details:*`,
      message,
      ``,
      `Looking forward to hearing from you!`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

    setCategory("");
    setMessage("");
    setName("");
    onClose();
  };

  const inputClasses =
    "w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 smooth-transition";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background w-full max-h-[85dvh] sm:max-h-[90dvh] sm:max-w-md sm:border sm:border-border sm:rounded-2xl sm:shadow-2xl flex flex-col rounded-t-2xl sm:rounded-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 sm:px-6 sm:pt-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center">
              <MessageCircle
                size={18}
                className="text-emerald-600"
                strokeWidth={1.75}
              />
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground">
                Custom Request
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Tell us what you need — he&apos;ll make it happen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg smooth-transition"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul"
                className={inputClasses}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={inputClasses}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                <option value="custom">Something else</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                What are you looking for?
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Describe what you need — e.g. a custom insert for Catan, specific color, quantity, or any special requirements..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* WhatsApp note */}
            <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2">
              <MessageCircle
                size={13}
                className="text-emerald-600 mt-0.5 flex-shrink-0"
                strokeWidth={2}
              />
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                This will open WhatsApp with your request details pre-filled. We
                typically respond within a few hours.
              </p>
            </div>
          </div>

          {/* Sticky Submit */}
          <div className="flex-shrink-0 border-t border-border bg-background px-5 py-4 sm:px-6 sm:rounded-b-2xl">
            <button
              type="submit"
              className="w-full bg-[#25D366] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#20bd5a] smooth-transition flex items-center justify-center gap-2"
            >
              <Send size={15} strokeWidth={2} />
              Send via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
