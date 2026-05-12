"use client";

import { useState } from "react";
import { Mail, Copy, CheckCircle } from "lucide-react";

interface ContactActionsProps {
  email: string;
  emailLabel: string;
  copyLabel: string;
  successLabel: string;
}

export default function ContactActions({ email, emailLabel, copyLabel, successLabel }: ContactActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex-1 relative overflow-hidden group hover:bg-white/[0.08] transition-all">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
          <Mail size={22} />
        </div>
        <div>
          <h3 className="text-[10px] font-mono tracking-widest uppercase text-muted mb-1">{emailLabel}</h3>
          <a 
            href={`mailto:${email}`}
            className="text-lg font-display font-bold text-foreground hover:text-accent transition-colors break-all block"
          >
            {email}
          </a>
        </div>
      </div>
      
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/5 opacity-50 hover:opacity-100 hover:bg-white/10 transition-all"
        title="Copy to Clipboard"
      >
        {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>

      {copied && (
        <div className="absolute top-14 right-4 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-sm animate-bounce">
          {successLabel}
        </div>
      )}
    </div>
  );
}
