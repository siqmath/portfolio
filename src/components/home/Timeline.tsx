"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROLE_TO_HIGHLIGHTED } from "@/components/home/IntentSelector";

gsap.registerPlugin(ScrollTrigger);

// Timeline item index mapping (after adding Nova Habitar at index 0):
// 0 = Nova Habitar (2026–Presente)
// 1 = Avolta Group (Jan 2025 – Jan 2026)
// 2 = KQ Personalizados (2016 – 2026)
// 3 = PROINFRA / UFJF (2023)
// 4 = Engenharia Civil UFJF (2016 – 2023)
// 5 = Bromberg (2015 – 2016)
// 6 = CEFET-RJ (2013 – 2015)

const TIMELINE_YEARS = [
  "2026 – Presente",
  "Jan 2025 – Jan 2026",
  "2016 – 2026",
  "2023",
  "2016 – 2023",
  "2015 – 2016",
  "2013 – 2015",
];

function TimelineContent() {
  const t = useTranslations("Timeline_Dossier");
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const role = searchParams.get("role");
  const highlightedItems: number[] =
    role && role in ROLE_TO_HIGHLIGHTED
      ? ROLE_TO_HIGHLIGHTED[role as keyof typeof ROLE_TO_HIGHLIGHTED]
      : [];

  const timelineItems = [
    { key: "item0" }, // Nova Habitar
    { key: "item1" }, // Avolta
    { key: "item2" }, // KQ
    { key: "item3" }, // PROINFRA
    { key: "item4" }, // UFJF
    { key: "item5" }, // Bromberg
    { key: "item6" }, // CEFET
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
    <section
      id="cv"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 bg-background flex justify-center selection:bg-accent selection:text-background"
    >
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
          {timelineItems.map((item, index) => {
            const isHighlighted = highlightedItems.includes(index);

            return (
              <div
                key={index}
                className={`timeline-node relative flex flex-col md:flex-row w-full transition-all duration-500 ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Center Dot */}
                <div
                  className={`hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 border-4 border-background ring-1 transition-all duration-500 ${
                    isHighlighted
                      ? "bg-[#E8724A] ring-[#E8724A]/40 scale-125"
                      : "bg-accent ring-accent/20"
                  }`}
                />

                {/* Content Box */}
                <div
                  className={`pl-12 md:pl-0 md:w-[45%] flex flex-col gap-4 transition-all duration-500 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  } ${isHighlighted ? "opacity-100" : highlightedItems.length > 0 ? "opacity-40" : "opacity-100"}`}
                >
                  {/* Year */}
                  <div
                    className={`font-mono font-bold text-sm tracking-widest uppercase transition-colors duration-500 ${
                      isHighlighted ? "text-[#E8724A]" : "text-accent"
                    }`}
                  >
                    {TIMELINE_YEARS[index]}
                  </div>

                  <h3
                    className={`font-display text-3xl md:text-4xl font-bold leading-tight transition-colors duration-500 ${
                      isHighlighted ? "text-[#E8724A]" : "text-foreground"
                    }`}
                  >
                    {t(`${item.key}_role`)}
                  </h3>

                  <div
                    className={`tracking-[0.2em] text-xs font-mono uppercase px-3 py-1 rounded-sm inline-block self-start md:self-auto transition-all duration-500 ${
                      isHighlighted
                        ? "bg-[#E8724A]/10 text-[#E8724A]"
                        : "bg-foreground/5 text-muted-foreground"
                    }`}
                  >
                    {t(`${item.key}_company`)}
                  </div>

                  <p className="mt-4 text-foreground/70 leading-relaxed text-sm md:text-base font-light max-w-xl self-start md:self-auto ml-0 mr-0">
                    {t(`${item.key}_desc`)}
                  </p>

                  {/* Decorative line */}
                  <div
                    className={`mt-6 w-full h-[2px] bg-gradient-to-r transition-all duration-500 ${
                      isHighlighted
                        ? index % 2 === 0
                          ? "from-transparent to-[#E8724A]/40"
                          : "from-[#E8724A]/40 to-transparent"
                        : index % 2 === 0
                        ? "from-transparent to-accent/20"
                        : "from-accent/20 to-transparent"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <Suspense
      fallback={
        <section
          id="cv"
          className="relative w-full min-h-screen bg-background"
        />
      }
    >
      <TimelineContent />
    </Suspense>
  );
}
