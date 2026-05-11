"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/routing";

gsap.registerPlugin(ScrollTrigger);

export function Consulting() {
  const containerRef = useRef<HTMLElement>(null);
  const typeWriterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const typeText = "INITIATING_DIAGNOSIS...\n> SCRAPING_PROCESS_WASTE\n> MODELING_RESILIENT_STRUCTURES\n> LAUNCHING_IMPACT_VECTOR";
      
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
    <section id="consulting" ref={containerRef} className="w-full flex justify-center py-32 bg-background relative selection:bg-accent selection:text-background">
      <div className="max-w-5xl w-full px-8">
        <div className="inline-flex items-center border border-muted/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-muted mb-4">
          High Agency Execution
        </div>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 uppercase tracking-tighter text-foreground border-b border-muted/20 pb-8">
          Consultoria Operacional
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Diagnostic */}
          <div className="bg-foreground/5 border border-muted/20 rounded-3xl p-10 shadow-2xl relative group overflow-hidden flex flex-col h-full">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
             
             <h3 className="font-mono font-black text-lg mb-8 text-foreground tracking-widest uppercase border-b border-foreground/10 pb-4 flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               PRISMA Diagnosis
             </h3>
             
             <div className="flex gap-2 mb-8 flex-wrap">
                {["P", "R", "I", "S", "M", "A"].map((letter, i) => (
                    <div key={i} className="w-10 h-10 rounded border border-muted/30 flex items-center justify-center font-mono font-bold text-muted group-hover:border-accent group-hover:text-accent transition-colors duration-500" style={{transitionDelay: `${i * 75}ms`}}>
                      {letter}
                    </div>
                ))}
             </div>
             <p className="text-base text-muted/80 font-sans leading-relaxed mt-auto">
               Análise fria e vetorização de processos. Refração da complexidade corporativa em componentes modulares e auditáveis, eliminando dependência operacional humana desnecessária.
             </p>
          </div>

          {/* Right Card: The Engine */}
          <div className="bg-foreground/5 border border-muted/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden group flex flex-col h-full">
            <h3 className="font-mono font-bold text-xs mb-8 text-muted tracking-[0.2em] uppercase">Telemetry Feed</h3>
            
            <div 
              ref={typeWriterRef}
              className="font-mono text-accent text-sm leading-relaxed min-h-[100px] mb-10 bg-background/40 p-4 rounded-lg border border-accent/10"
            />
            
            <div className="mt-auto flex flex-col items-start">
              <p className="text-sm text-muted/70 mb-6">
                Consultoria voltada para a otimização agressiva de infraestrutura de negócio.
              </p>
              
              <Link href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-background text-xs font-bold font-mono uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95">
                Solicitar Diagnóstico
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
