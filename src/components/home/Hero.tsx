"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <InfiniteGrid className="absolute inset-0">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 py-24 flex flex-col items-start justify-center text-left h-full">
          <div className="hero-text border border-muted/20 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-muted mb-6">
            {t("label")}
          </div>

          <h1 className="hero-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6rem] font-display font-bold leading-[1.05] tracking-tighter mb-6 max-w-4xl">
            {t("headline_1")} <br/>
            <span className="text-[#1B3A4B] hover:text-accent transition-colors duration-500 cursor-pointer select-none">
              {t("headline_2")}
            </span><br/>
            {t("headline_3")}
          </h1>

          <p className="hero-text text-muted text-sm md:text-base max-w-xl font-mono opacity-80 mb-10 leading-relaxed border-l border-accent/30 pl-4 select-none">
            {t("subhero")}
          </p>

          <Link href="#cv" className="hero-text relative overflow-hidden group px-8 py-4 bg-accent text-background font-bold rounded-full text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20">
            {t("cta")}
          </Link>
        </div>
      </InfiniteGrid>
    </section>
  );
}
