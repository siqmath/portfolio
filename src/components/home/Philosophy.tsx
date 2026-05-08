"use client";

import { useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadialOrbitalTimeline, NodeKey } from "@/components/ui/radial-orbital-timeline";
import { IntentSelector, ROLE_TO_NODE } from "@/components/home/IntentSelector";

gsap.registerPlugin(ScrollTrigger);

function PhilosophyInner() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const role = searchParams.get("role");
  const externalActiveKey: NodeKey | null =
    role && role in ROLE_TO_NODE
      ? ROLE_TO_NODE[role as keyof typeof ROLE_TO_NODE]
      : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".radial-section", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[90vh] flex flex-col items-center justify-center px-8 md:px-16 py-24 bg-foreground text-background relative overflow-hidden selection:bg-accent selection:text-foreground"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="bg-blob absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-accent rounded-[100%] blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        {/* Left: Radial Timeline */}
        <div className="lg:col-span-7 w-full h-[450px] lg:h-[600px] flex items-center justify-center radial-section">
          <RadialOrbitalTimeline externalActiveKey={externalActiveKey} />
        </div>

        {/* Right: Intent Selector (replaces static text) */}
        <div
          ref={textRef}
          className="lg:col-span-5 flex flex-col items-start justify-center text-left"
        >
          <IntentSelector />
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[90vh] bg-foreground flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      }
    >
      <PhilosophyInner />
    </Suspense>
  );
}
