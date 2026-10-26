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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#d6dae5] dark:border-[#2a2e3d]"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] text-[#0c0e12] dark:text-[#f1f3f9] text-xs font-mono mb-4">
          <Mail className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>COMMUNICATIONS // DIRECT DISPATCH &amp; INQUIRIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] tracking-tight mb-4">
          Get in <span className="text-[#d97706] dark:text-[#f59e0b]">Touch</span>
        </h2>
        <p className="text-[#4b5262] dark:text-[#9ba1b0] text-sm sm:text-base leading-relaxed">
          Open to discuss senior software engineering roles, full-stack web applications, technical consulting, and frontend performance initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Information Card */}
        <div className="lg:col-span-2 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 sm:p-7 flex flex-col justify-between space-y-6 relative corner-crosshair">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#f59e0b] mb-2 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] animate-pulse" />
              <span>CURRENT STATUS</span>
            </div>
            <h3 className="text-xl font-bold text-[#0c0e12] dark:text-[#f1f3f9] mb-2">
              {profile.statusBadge}
            </h3>
            <p className="text-xs text-[#4b5262] dark:text-[#9ba1b0] leading-relaxed mb-6 font-normal">
              Senior Software Engineer with 5+ years of production experience across enterprise SCADA systems, Next.js applications, and distributed platforms. Reach out using the contact form below, or email me directly at gsyawale@gmail.com.
            </p>

            {/* Direct Email with 1-Click Copy */}
            <div className="p-3.5 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] mb-5">
              <div className="text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider mb-1">
                PRIMARY INBOX:
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="font-mono text-xs text-[#0c0e12] dark:text-[#f1f3f9] hover:text-[#f59e0b] truncate"
                >
                  {profile.socials.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-1 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] text-[#0c0e12] dark:text-[#f1f3f9] text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#f59e0b]" />
                      <span className="text-[#f59e0b]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#727a8c] dark:text-[#656d7e]" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Metadata */}
            <div className="space-y-2 font-mono text-xs text-[#727a8c] dark:text-[#656d7e]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span className="text-[#4b5262] dark:text-[#9ba1b0]">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>SERVER_DISPATCH // RESEND_ROUTER</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-5 border-t border-[#d6dae5] dark:border-[#2a2e3d]">
            <div className="text-[10px] font-mono text-[#727a8c] dark:text-[#656d7e] uppercase tracking-wider mb-2.5">
              EXTERNAL NETWORKS
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] hover:text-[#f59e0b] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#d6dae5] dark:border-[#2a2e3d] hover:border-[#f59e0b] text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] hover:text-[#f59e0b] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-3 bg-[#ffffff] dark:bg-[#161922] border border-[#d6dae5] dark:border-[#2a2e3d] p-6 sm:p-7 relative corner-crosshair">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#d6dae5] dark:border-[#2a2e3d] font-mono text-xs">
            <span className="text-[#0c0e12] dark:text-[#f1f3f9] font-medium">CONTACT FORM</span>
            <span className="text-[#727a8c] dark:text-[#656d7e] text-[10px]">[ END-TO-END VERIFIED ]</span>
          </div>

          {submitSuccess ? (
            <div className="p-8 text-center bg-[#edf0f5] dark:bg-[#0c0e12] border border-[#f59e0b]/40 space-y-4 animate-in fade-in duration-150">
              <div className="w-10 h-10 border border-[#f59e0b] flex items-center justify-center mx-auto text-[#f59e0b]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0c0e12] dark:text-[#f1f3f9] font-mono uppercase tracking-wide">
                Message Dispatched Successfully
              </h4>
              <p className="text-xs text-[#4b5262] dark:text-[#9ba1b0] max-w-md mx-auto leading-relaxed">
                Thank you for getting in touch. Your message has been routed to{" "}
                <span className="font-mono text-[#d97706] dark:text-[#f59e0b]">{profile.socials.email}</span>. You will receive a direct reply shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="mt-3 px-4 py-2 font-mono text-xs font-semibold text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-colors cursor-pointer"
              >
                TRANSMIT ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {serverError && (
                <div className="p-3 bg-[#edf0f5] dark:bg-[#0c0e12] border border-red-500/50 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#727a8c] dark:text-[#656d7e] mb-1.5 uppercase"
                  >
                    IDENTIFIER / NAME <span className="text-[#f59e0b]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    placeholder="Jane Doe"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 bg-[#edf0f5] dark:bg-[#0c0e12] border text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] placeholder-[#727a8c] dark:placeholder-[#656d7e] transition-colors focus:outline-none ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#d6dae5] dark:border-[#2a2e3d] focus:border-[#f59e0b]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-mono mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#727a8c] dark:text-[#656d7e] mb-1.5 uppercase"
                  >
                    REPLY ADDRESS <span className="text-[#f59e0b]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder="jane@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 bg-[#edf0f5] dark:bg-[#0c0e12] border text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] placeholder-[#727a8c] dark:placeholder-[#656d7e] transition-colors focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#d6dae5] dark:border-[#2a2e3d] focus:border-[#f59e0b]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-mono mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-[#727a8c] dark:text-[#656d7e] mb-1.5 uppercase"
                >
                  TRANSMISSION BODY <span className="text-[#f59e0b]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  {...register("message")}
                  placeholder="Hi Gaurav, I would like to discuss an engineering role / platform architecture collaboration..."
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 bg-[#edf0f5] dark:bg-[#0c0e12] border text-xs font-mono text-[#0c0e12] dark:text-[#f1f3f9] placeholder-[#727a8c] dark:placeholder-[#656d7e] transition-colors focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#d6dae5] dark:border-[#2a2e3d] focus:border-[#f59e0b]"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-[10px] font-mono mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-[#f59e0b] hover:bg-[#fbbf24] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <span>DISPATCH MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
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
