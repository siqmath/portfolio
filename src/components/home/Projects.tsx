"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const PROJECT_KEYS = [
  "item0", // Nova Habitar
  "item1", // Avolta
  "item2", // KQ
  "item3", // PROINFRA
  "item4", // UFJF
  "item5", // Bromberg
  "item6", // CEFET
];

export function Projects() {
  const t = useTranslations("Timeline_Dossier");
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      id="projects" 
      className="w-full py-24 bg-background overflow-hidden relative selection:bg-accent selection:text-background"
    >
      <div className="max-w-5xl mx-auto px-8 mb-12 flex flex-col items-start">
        <div className="inline-flex items-center gap-2 border border-muted/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-accent mb-4">
          Delivery History
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-foreground uppercase">
          Projetos & Organizações
        </h2>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative flex w-full overflow-hidden py-12"
        style={{
          "--gap": "2rem",
          "--duration": "40s"
        } as React.CSSProperties}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex shrink-0 gap-[var(--gap)] animate-marquee"
          style={{
             animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {/* Double list for continuity */}
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex gap-[var(--gap)] shrink-0">
              {PROJECT_KEYS.map((key) => {
                const companyRaw = t(`${key}_company`);
                const [companyName] = companyRaw.split("·"); // Split to show only company name on top
                
                return (
                  <div 
                    key={`${idx}-${key}`}
                    className="flex flex-col w-[280px] h-[180px] bg-foreground/5 border border-muted/10 p-6 rounded-2xl group transition-all duration-500 hover:bg-foreground/10 hover:border-accent/40 relative overflow-hidden shrink-0"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    
                    <span className="text-[10px] font-mono tracking-[0.2em] text-muted uppercase group-hover:text-accent transition-colors duration-500">
                      {t(`${key}_role`)}
                    </span>
                    
                    <h3 className="mt-auto mb-2 text-xl font-display font-bold text-foreground tracking-tight">
                      {companyName.trim()}
                    </h3>
                    
                    <div className="text-xs font-sans text-muted/70 line-clamp-3 leading-relaxed">
                      {t(`${key}_desc`)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Vignette/Fade gradients on edges for smoother flow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
}
