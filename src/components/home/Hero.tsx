"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";

export function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.4
      });

      gsap.from(".radial-hero", {
        x: -40,
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <InfiniteGrid className="absolute inset-0">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-20 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-24 h-full">
          
          {/* Left: Radial Timeline */}
          <div className="lg:col-span-7 w-full h-[500px] lg:h-[750px] flex items-center justify-center radial-hero order-2 lg:order-1 transform lg:-translate-y-40 z-20">
            <RadialOrbitalTimeline />
          </div>

          {/* Right: Headlines */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-start text-left order-1 lg:order-2">
            <div className="hero-text border border-muted/20 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-muted mb-8">
              {t("label")}
            </div>

            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter mb-8 max-w-sm">
              {t("headline_1")} <br/>
              <span className="text-accent">{t("headline_2")}</span>
            </h1>

            <div className="hero-text w-24 h-[1px] bg-accent/30 mb-8" />
            
            <p className="hero-text text-muted-foreground text-base max-w-xs font-light leading-relaxed mb-10 opacity-70">
              Antifragile systems. <br/>
              Process-driven autonomy.
            </p>

            <button className="hero-text relative overflow-hidden group px-8 py-4 bg-accent text-background font-bold rounded-full text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20">
              {t("cta")}
            </button>
          </div>

        </div>
      </InfiniteGrid>
    </section>
  );
}
