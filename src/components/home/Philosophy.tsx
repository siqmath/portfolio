"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    <section ref={containerRef} className="w-full min-h-[90vh] flex flex-col items-center justify-center px-8 md:px-16 py-24 bg-foreground text-background relative overflow-hidden selection:bg-accent selection:text-foreground">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="bg-blob absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-accent rounded-[100%] blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        {/* Left: Radial Timeline */}
        <div className="lg:col-span-7 w-full h-[450px] lg:h-[600px] flex items-center justify-center radial-section">
          <RadialOrbitalTimeline />
        </div>

        {/* Right: Text */}
        <div ref={textRef} className="lg:col-span-5 flex flex-col items-start justify-center text-left">
          <div className="border border-background/20 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-background/60 mb-6">
            Core Competence & Role
          </div>

          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] tracking-tighter text-background mb-6 uppercase">
            Full-Stack <br />
            <span className="text-accent">Product</span> <br />
            Manager
          </h2>

          <p className="text-background/70 text-sm md:text-base font-sans max-w-sm leading-relaxed font-light">
            Bridging the gap between deep technical architecture, seamless user experiences, and strategic business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
