"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const subheadWords = t("subheadline").split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger entry for left block
      gsap.from(".hero-block", {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Specific cascade for subheadline words
      gsap.from(".sub-word", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: "back.out(1.7)",
        delay: 0.8
      });

      // Checklist stagger from the right
      gsap.from(".hero-check", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden py-20 lg:py-0">
      
      <InfiniteGrid className="absolute inset-0 opacity-70">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center h-full">
          
          {/* LEFT COLUMN: HEADLINE & MISSION */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center text-left order-2 lg:order-1 pt-10 lg:pt-0">
            
            <div className="hero-block border border-accent/30 bg-accent/5 text-accent px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-6 select-none">
              {t("label")}
            </div>

            <h1 className="hero-block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.05] tracking-tighter mb-4 max-w-2xl uppercase">
              {t("headline")}
            </h1>

            {/* Staggered Subheadline Animation */}
            <div className="hero-block flex flex-wrap mb-10 select-none h-12 items-center">
              {subheadWords.map((word, idx) => (
                 <span 
                   key={idx} 
                   className="sub-word text-xl md:text-2xl font-display font-bold tracking-tight mr-3 text-foreground/80 border-b-2 border-accent/40"
                 >
                   {word}
                 </span>
              ))}
            </div>

            <Link 
              href="#cv" 
              className="hero-block relative px-8 py-3.5 bg-accent text-background font-bold rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(224,122,58,0.3)] shadow-2xl shadow-accent/10"
            >
              {t("cta")}
            </Link>
          </div>

          {/* RIGHT COLUMN: REDUCED CHECKBOX LIST */}
          <div className="lg:col-span-5 flex flex-col gap-5 order-1 lg:order-2 lg:border-l lg:border-white/5 lg:pl-10">
            
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="hero-check flex items-start gap-4 p-3 rounded-xl hover:bg-foreground/5 transition-colors group">
                 <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-accent/50 flex items-center justify-center bg-accent/10 text-accent shadow-[0_0_10px_rgba(224,122,58,0.1)] group-hover:scale-110 transition-transform">
                   <CheckCircle2 className="w-3 h-3" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-foreground tracking-tight uppercase leading-none group-hover:text-accent transition-colors">
                      {t(`c${num}_t`)}
                    </h3>
                    <p className="text-[11px] md:text-xs text-muted leading-relaxed font-medium">
                      {t(`c${num}_d`)}
                    </p>
                 </div>
              </div>
            ))}

          </div>

        </div>
      </InfiniteGrid>

      {/* Subtle background ambient glow for the right block */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0 hidden lg:block" />

    </section>
  );
}
