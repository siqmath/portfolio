"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const t = useTranslations("Philosophy");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".phil-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      // Connection indicator lines
      gsap.from(".phil-connector", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scaleX: 0,
        duration: 1.5,
        ease: "expo.inOut",
        delay: 0.5,
        transformOrigin: "left center"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 bg-foreground text-background selection:bg-background selection:text-foreground relative overflow-hidden"
    >
      {/* Texture and visual noise background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        
        <div className="mb-20 flex flex-col items-center text-center phil-title">
          <span className="text-accent font-mono font-bold text-xs tracking-[0.3em] uppercase mb-4 border-b border-accent/20 pb-2">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase text-background">
            {t("title")}
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center relative">
          
          {/* Pillar 1: Antifragility */}
          <div className="phil-card md:col-span-4 flex flex-col h-full bg-background/5 backdrop-blur-sm border border-background/10 p-8 rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 rounded-t-2xl group-hover:bg-accent transition-colors duration-500" />
            <div className="text-3xl font-display font-black text-background/20 mb-6 group-hover:text-accent/20 transition-colors duration-500">01</div>
            <h3 className="text-xl font-bold font-display mb-2 tracking-tight">
              {t("pillar_1_title")}
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-6 block">
              {t("pillar_1_author")}
            </span>
            <p className="text-sm leading-relaxed text-background/70 mt-auto">
              {t("pillar_1_desc")}
            </p>
          </div>

          {/* Connector Line 1 (Desktop Only) */}
          <div className="hidden md:flex md:col-span-1 justify-center items-center relative h-full">
             <div className="phil-connector w-full h-[1px] bg-background/20" />
             <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-accent phil-connector" />
          </div>

          {/* Pillar 2: Ultralearning */}
          <div className="phil-card md:col-span-4 flex flex-col h-full bg-background/5 backdrop-blur-sm border border-background/10 p-8 rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 rounded-t-2xl group-hover:bg-accent transition-colors duration-500" />
            <div className="text-3xl font-display font-black text-background/20 mb-6 group-hover:text-accent/20 transition-colors duration-500">02</div>
            <h3 className="text-xl font-bold font-display mb-2 tracking-tight">
              {t("pillar_2_title")}
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase mb-6 block">
              {t("pillar_2_author")}
            </span>
            <p className="text-sm leading-relaxed text-background/70 mt-auto">
              {t("pillar_2_desc")}
            </p>
          </div>

          {/* Connector Line 2 (Desktop Only) */}
          <div className="hidden md:flex md:col-span-1 justify-center items-center relative h-full">
             <div className="phil-connector w-full h-[1px] bg-background/20" />
             <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-accent phil-connector" />
          </div>

          {/* Result: PRISMA */}
          <div className="phil-card md:col-span-2 md:col-start-6 md:col-end-8 mt-8 md:mt-16 w-full md:w-auto justify-self-center flex flex-col col-span-1 md:absolute md:bottom-[-160px] bg-accent p-8 rounded-2xl shadow-2xl shadow-accent/30 relative overflow-hidden">
             {/* High intensity focus card */}
             <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/20 blur-2xl rounded-full" />
             
             <h3 className="text-2xl font-black font-mono mb-1 tracking-[0.2em] text-foreground uppercase">
               {t("product_title")}
             </h3>
             <span className="text-[9px] font-bold text-foreground/60 tracking-widest uppercase mb-4 block">
               {t("product_author")}
             </span>
             <p className="text-xs leading-normal font-medium text-foreground">
               {t("product_desc")}
             </p>
          </div>
        </div>

        {/* Offset spacer for absolute node */}
        <div className="hidden md:block h-32" />
      </div>
    </section>
  );
}
