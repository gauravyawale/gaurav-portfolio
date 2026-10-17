"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { portfolioData } from "@/data/portfolio-data";
import {
  Mail,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle,
  MapPin,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(80, { message: "Name must not exceed 80 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must not exceed 2000 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to deliver message. Please try again."
        );
      }

      setSubmitSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>CONTACT &amp; INQUIRIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Get in <span className="glow-accent-text">Touch</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Open to discuss senior software engineering roles, full-stack web applications, technical consulting, and frontend performance initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Information Card */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              <span>AVAILABILITY</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {profile.statusBadge}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Experienced Senior Software Engineer with a focus on React, Next.js, TypeScript, and high-performance web systems. Feel free to reach out via the form or through direct email and social channels.
            </p>

            {/* Direct Email with 1-Click Copy */}
            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/[0.06] mb-6">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                Direct Email:
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="font-mono text-sm text-cyan-700 dark:text-cyan-400 hover:underline truncate"
                >
                  {profile.socials.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/80 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Response Details */}
            <div className="space-y-3 font-mono text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Direct delivery to gsyawale@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.06]">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Professional Profiles
            </div>
            <div className="flex items-center gap-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl glass-panel hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-[1.02] text-xs font-mono text-slate-700 dark:text-slate-300"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl glass-panel hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-[1.02] text-xs font-mono text-slate-700 dark:text-slate-300"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6 sm:p-8 border-slate-200/80 dark:border-white/[0.08]">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Send a Direct Message
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6">
            Validated message delivery sent directly to my personal inbox.
          </p>

          {submitSuccess ? (
            <div className="p-8 text-center rounded-2xl bg-emerald-50 dark:bg-slate-950/80 border border-emerald-300 dark:border-emerald-500/30 space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Your message has been delivered to{" "}
                <span className="font-mono text-cyan-700 dark:text-cyan-300">{profile.socials.email}</span>. I will review it and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {serverError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    placeholder="Jane Doe"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-slate-950/70 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-colors focus:outline-none ${
                      errors.name
                        ? "border-red-500/60 focus:border-red-400"
                        : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 dark:text-red-400 text-[11px] font-mono mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder="jane@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-slate-950/70 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-colors focus:outline-none ${
                      errors.email
                        ? "border-red-500/60 focus:border-red-400"
                        : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-[11px] font-mono mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  {...register("message")}
                  placeholder="Hi Gaurav, I would like to discuss a senior engineering opportunity / project collaboration..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-slate-950/70 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-colors focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-slate-200 dark:border-white/[0.08] focus:border-cyan-500"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-600 dark:text-red-400 text-[11px] font-mono mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-md shadow-cyan-600/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
