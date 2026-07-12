"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // অ্যাসাইনমেন্ট ফ্রন্টএন্ড সিমুলেশন (সরাসরি রেসপন্স টোস্ট)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent successfully! 🚀");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Mail className="h-3.5 w-3.5" /> Get in touch
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
            Contact Support
          </h1>
          <p className="text-sm text-zinc-400">
            Have questions, feedback, or found a bug? Drop us a line below.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Thank You!</h3>
              <p className="text-sm text-zinc-400 max-w-xs mx-auto">
                Your message has been safely delivered. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-400 hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Your Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 placeholder-zinc-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Message Description
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3.5 pointer-events-none text-zinc-500">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Write your issue details here..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 placeholder-zinc-600 transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}