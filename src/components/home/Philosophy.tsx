"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const t = useTranslations("Philosophy");
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 80,
        opacity: 0,
        rotationX: 15,
        transformPerspective: 1000,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".statement", {
        scrollTrigger: {
          trigger: ".statement-container",
          start: "top 75%",
        },
        x: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[90vh] flex flex-col items-center justify-center px-8 md:px-16 py-32 bg-foreground text-background relative overflow-hidden selection:bg-accent selection:text-foreground">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="bg-blob absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-accent rounded-[100%] blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        <div ref={quoteRef} className="lg:col-span-7 flex flex-col items-start relative">
          <span className="absolute -top-20 -left-12 text-[14rem] leading-none font-display text-background/5 opacity-80 select-none">"</span>
          <p className="font-display font-medium text-4xl md:text-6xl lg:text-[4rem] leading-[1.03] text-background/90 tracking-tighter mb-10 z-10 transition-all duration-700">
             {t("quote")}
          </p>
          <div className="flex items-center gap-6 text-accent font-mono text-sm tracking-[0.25em] uppercase z-10">
            {t("author")}
            <span className="w-24 h-[1px] bg-accent/60" />
          </div>
        </div>

        <div className="statement-container lg:col-span-5 flex flex-col gap-12 mt-12 lg:mt-32">
          <div className="statement flex flex-col gap-3 pl-0 lg:pl-10 border-l border-background/10">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-background/40">{t("statement_1")}</span>
            <span className="font-sans text-xl md:text-2xl font-light text-background/60">{t("statement_1_value")}</span>
          </div>

          <div className="statement flex flex-col gap-3 pl-0 lg:pl-10 border-l-2 border-accent relative">
            <div className="absolute top-0 -left-1 w-full h-full bg-accent/5 blur-2xl pointer-events-none"></div>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent z-10">{t("statement_2")}</span>
            <span className="font-display text-3xl md:text-5xl font-bold text-background z-10 leading-tight tracking-tight">{t("statement_2_value")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
