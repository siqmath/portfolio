"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Mechanics() {
  const containerRef = useRef<HTMLElement>(null);
  const typeWriterRef = useRef<HTMLDivElement>(null);
  
  // Simulated GSAP Typewriter/Telemetry effect to represent "Artifacts"
  useEffect(() => {
    const ctx = gsap.context(() => {
      const typeText = "SYS_BOOT... GRIP_PROTOCOL_ACTIVE\n> ANALYZING WASTE\n> OPTIMIZING ARCHITECTURE\n> DEPLOYING SCALE";
      
      gsap.to(typeWriterRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        duration: 3,
        text: typeText,
        ease: "none",
        onUpdate: function() {
           if(typeWriterRef.current) {
               // Quick math to simulate typing by slicing a portion of the text based on progress
               const progress = this.progress(); 
               const charCount = Math.floor(progress * typeText.length);
               typeWriterRef.current.innerHTML = typeText.substring(0, charCount).replace(/\n/g, "<br/>");
           }
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mechanics" ref={containerRef} className="w-full flex justify-center py-24 bg-background">
      <div className="max-w-4xl w-full px-8">
        <h2 className="text-3xl font-display font-medium mb-12 uppercase tracking-widest text-muted border-b border-muted/20 pb-4">
          Interaction Mechanics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Telemetry */}
          <div className="bg-foreground/5 border border-muted/20 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="font-sans font-bold text-lg mb-4 text-foreground/80">Telemetry Engine</h3>
            <div 
              ref={typeWriterRef}
              className="font-mono text-accent text-sm leading-relaxed min-h-[100px]"
            />
          </div>

          {/* Card 2: Diagnostics */}
          <div className="bg-foreground/5 border border-muted/20 rounded-[2rem] p-8 shadow-2xl relative group overflow-hidden">
             <h3 className="font-sans font-bold text-lg mb-4 text-foreground/80">PRISMA Diagnostics</h3>
             <div className="flex gap-2">
                {["P", "R", "I", "S", "M", "A"].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded border border-muted/30 flex items-center justify-center font-mono font-bold text-muted group-hover:border-accent group-hover:text-accent transition-colors duration-500" style={{transitionDelay: `${i * 100}ms`}}>
                      {letter}
                    </div>
                ))}
             </div>
             <p className="mt-6 text-sm text-muted font-sans">
               Refração de complexidade em componentes auditáveis antes de injetar esforço de execução.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
