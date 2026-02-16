"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border/60 rounded-xl p-8 md:p-10 shadow-card text-center">
      <div className="max-w-md mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Get exclusive offers and updates on new board game components
          delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 smooth-transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || success}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {success ? (
              <>
                <Check size={16} strokeWidth={2} />
                Subscribed
              </>
            ) : isLoading ? (
              "Subscribing..."
            ) : (
              "Subscribe"
            )}
          </button>
        </form>

        {error && <p className="text-destructive text-xs mt-3">{error}</p>}
      </div>
    </div>
  );
}
