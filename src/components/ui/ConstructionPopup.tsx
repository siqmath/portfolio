"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";

export default function ConstructionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState<"en" | "pt">("en");

  useEffect(() => {
    // Show the popup if not dismissed yet in this session
    const hasSeen = localStorage.getItem("site-construction-seen");
    if (!hasSeen) {
      // Tiny delay for visual effect after initial load
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("site-construction-seen", "true");
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "pt" : "en"));
  };

  const content = {
    en: {
      title: "UNDER CONSTRUCTION / ALPHA_BUILD",
      message: "This site is currently under construction. My philosophy is 'launch fast, improve fast', which is why it is already live. Feel free to provide feedback.",
      button: "Switch to Portuguese",
      closeText: "Enter System",
    },
    pt: {
      title: "EM CONSTRUÇÃO / BUILD_ALPHA",
      message: "Esse site está em construção. Minha filosofia é de lançar rápido e melhorar rápido, por isso já está disponível. Sinta-se à vontade para dar feedbacks.",
      button: "Mudar para Inglês",
      closeText: "Entrar no Sistema",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-2xl overflow-hidden"
          >
            {/* Blueprint Container */}
            <div className="relative bg-petrol/90 border border-burnt/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl p-1 flex flex-col group">
              
              {/* Crosshair Corner Top-Left */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-burnt/60 -translate-x-[1px] -translate-y-[1px]" />
              {/* Crosshair Corner Top-Right */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-burnt/60 translate-x-[1px] -translate-y-[1px]" />
              {/* Crosshair Corner Bottom-Left */}
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-burnt/60 -translate-x-[1px] translate-y-[1px]" />
              {/* Crosshair Corner Bottom-Right */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-burnt/60 translate-x-[1px] translate-y-[1px]" />

              <div className="bg-background/40 border border-burnt/10 rounded-lg p-6 md:p-8 flex flex-col relative overflow-hidden">
                
                {/* Animated background lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: `linear-gradient(#E07A3A 1px, transparent 1px), linear-gradient(90deg, #E07A3A 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />

                {/* Top Header with X Button */}
                <div className="flex items-center justify-between mb-6 z-10">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-burnt font-bold uppercase">
                    <div className="w-2 h-2 rounded-full bg-burnt animate-pulse" />
                    {content[lang].title}
                  </div>
                  <button 
                    onClick={handleClose}
                    className="text-muted-foreground hover:text-burnt transition-colors p-1 rounded hover:bg-white/5"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body Text */}
                <div className="mb-8 relative z-10">
                  <motion.p 
                    key={lang}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg sm:text-xl md:text-2xl text-foreground font-light leading-relaxed tracking-wide text-pretty"
                  >
                    {content[lang].message}
                  </motion.p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 z-10 mt-auto">
                  {/* Enter Button */}
                  <button
                    onClick={handleClose}
                    className="flex-1 py-4 px-6 bg-burnt text-background font-bold font-mono text-xs md:text-sm uppercase tracking-widest rounded hover:bg-burnt/80 hover:shadow-[0_0_20px_rgba(224,122,58,0.4)] transition-all active:scale-95"
                  >
                    {content[lang].closeText}
                  </button>

                  {/* Language Switcher */}
                  <button
                    onClick={toggleLang}
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-burnt/30 text-foreground font-mono text-[10px] uppercase tracking-wider rounded bg-white/5 hover:bg-white/10 hover:border-burnt/50 transition-all"
                  >
                    <Globe size={12} />
                    {lang === "en" ? "PT" : "EN"}
                  </button>
                </div>
                
                {/* Decorative binary stream at bottom */}
                <div className="mt-6 font-mono text-[8px] text-burnt/20 overflow-hidden whitespace-nowrap select-none opacity-50">
                  SYSTEM_STATUS: ACTIVE // BUILD: 0.9.1 // CONNECTION: ESTABLISHED // SECURE_LAYER
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
