"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const t = useTranslations("Timeline_Dossier");
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const timelineItems = [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
    { key: "item5" },
    { key: "item6" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      });

      gsap.utils.toArray(".timeline-node").forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cv" ref={containerRef} className="relative w-full min-h-screen py-32 bg-background flex justify-center selection:bg-accent selection:text-background">
      <div className="w-full max-w-6xl px-8 flex flex-col relative">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-32 uppercase tracking-tighter text-foreground border-b border-muted/20 pb-8 inline-block self-start">
          {t("title")}
        </h2>

        {/* Central Line */}
        <div 
          ref={lineRef} 
          className="absolute left-8 md:left-1/2 top-[240px] bottom-0 w-[1px] bg-accent/20 origin-top hidden md:block" 
        />

        <div className="flex flex-col gap-24 md:gap-40 relative">
          {timelineItems.map((item, index) => (
            <div key={index} className={`timeline-node relative flex flex-col md:flex-row w-full ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
              
              {/* Center Dot */}
              <div className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent z-10 border-4 border-background ring-1 ring-accent/20" />

              {/* Content Box */}
              <div className={`pl-12 md:pl-0 md:w-[45%] flex flex-col gap-4 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <div className="font-mono text-accent font-bold text-sm tracking-widest uppercase">
                  {/* Years are not in translate yet, keeping them structured */}
                  {index === 0 ? "2025 - 2026" : 
                   index === 1 ? "2015 - Present" : 
                   index === 2 ? "2023" : 
                   index === 3 ? "2016 - 2023" : 
                   index === 4 ? "2015 - 2016" : "2013 - 2015"}
                </div>
                
                <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                  {t(`${item.key}_role`)}
                </h3>
                
                <div className="text-muted-foreground tracking-[0.2em] text-xs font-mono uppercase bg-foreground/5 px-3 py-1 rounded-sm inline-block self-start md:self-auto">
                  {t(`${item.key}_company`)}
                </div>

                <p className="mt-4 text-foreground/70 leading-relaxed text-sm md:text-base font-light max-w-xl self-start md:self-auto ml-0 mr-0">
                  {t(`${item.key}_desc`)}
                </p>

                {/* Decorative Element */}
                <div className={`mt-6 w-full h-[2px] bg-gradient-to-r ${index % 2 === 0 ? "from-transparent to-accent/20" : "from-accent/20 to-transparent"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
