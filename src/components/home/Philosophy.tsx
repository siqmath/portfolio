"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Crosshair, Hexagon, Disc3, Square, Layers, ShieldAlert, Target, Zap } from "lucide-react";

type ViewState = "VOID" | "PRISM" | "ANTIFRAGILITY" | "ULTRALEARNING";

export function Philosophy() {
  const t = useTranslations("Philosophy");
  const [view, setView] = useState<ViewState>("VOID");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const resetView = () => setView("VOID");

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[800px] overflow-hidden bg-background border-y border-foreground/10 font-mono group/canvas cursor-crosshair selection:bg-accent selection:text-foreground"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Subtle 10px Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }}
      />

      {/* HUD Coordinates */}
      <div className="absolute top-6 left-6 z-20 text-[10px] text-accent/70 tracking-widest flex flex-col gap-1 pointer-events-none">
        <div>[STATUS: OPERATIONAL]</div>
        <div>[X: {String(mousePos.x).padStart(4, '0')}, Y: {String(mousePos.y).padStart(4, '0')}]</div>
        <div>[SYS: PRISMA_V1]</div>
      </div>

      {/* Section Title */}
      <div className="absolute top-6 right-6 z-20 text-right pointer-events-none">
        <div className="text-xs text-muted tracking-widest font-bold uppercase">{t("label")}</div>
        <div className="text-xl text-foreground tracking-tighter font-black uppercase">{t("title")}</div>
      </div>

      {/* Breadcrumbs / Back Control */}
      <AnimatePresence>
        {view !== "VOID" && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setView(view === "PRISM" ? "VOID" : "PRISM")}
            className="absolute bottom-6 left-6 z-30 flex items-center gap-2 bg-background border border-accent/30 hover:border-accent px-4 py-2 text-xs text-accent tracking-widest transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            {t("back").toUpperCase()}
          </motion.button>
        )}
      </AnimatePresence>

      {/* MAIN CANVAS CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        
        {/* ANIMATED SVG CONNECTIONS */}
        <svg 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          <AnimatePresence>
            {view !== "VOID" && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Center stem */}
                <motion.path 
                  d="M 500 500 L 500 600"
                  stroke="currentColor"
                  className="text-accent/40 fill-none"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                
                {/* Left Branch to Antifragility */}
                <motion.path 
                  d="M 500 500 C 450 400, 300 400, 250 500" 
                  className="text-accent/40 fill-none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Right Branch to Ultralearning */}
                <motion.path 
                  d="M 500 500 C 550 400, 700 400, 750 500" 
                  className="text-accent/40 fill-none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* SVG is sometimes easier to map dynamically, but let's just use coordinate wrappers for simple responsiveness */}
        <div className="relative w-full h-full max-w-6xl mx-auto">
          
          <AnimatePresence mode="wait">
            {/* SCREEN 1: THE VOID */}
            {view === "VOID" && (
              <motion.div
                key="void-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              >
                <motion.div 
                  className="relative cursor-pointer"
                  onClick={() => setView("PRISM")}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Rotating rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute -inset-6 border border-dashed border-accent/40 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute -inset-10 border border-accent/10 rounded-full"
                  />

                  {/* Core Node */}
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(224,122,58,0.4)] relative z-10">
                    <Square className="w-6 h-6 text-background fill-background" />
                  </div>
                  
                  {/* Core pulse shadow */}
                  <div className="absolute inset-0 bg-accent opacity-40 animate-ping" />
                </motion.div>

                <div className="flex flex-col items-center text-center">
                  <motion.h3 
                    animate={{ opacity: [0.5, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-sm text-accent font-bold tracking-[0.3em]"
                  >
                    {t("product_title")}
                  </motion.h3>
                  <p className="text-[10px] text-muted uppercase mt-2 max-w-xs leading-relaxed">
                    {t("cta_void")}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: THE PRISM */}
            {view === "PRISM" && (
              <motion.div
                key="prism-screen"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Root node moved down slightly */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none opacity-40">
                  <div className="w-8 h-8 border-2 border-accent flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent" />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center w-full h-full px-8">
                  <div className="grid grid-cols-2 w-full max-w-4xl gap-20 md:gap-40 items-center relative">
                    
                    {/* Left Node: Antifragility */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col items-end group/node cursor-pointer"
                      onClick={() => setView("ANTIFRAGILITY")}
                    >
                      <div className="flex flex-col items-end mb-6 text-right">
                        <div className="text-[10px] text-accent/70 mb-1 tracking-widest">SYS.01</div>
                        <h3 className="text-2xl font-black text-foreground uppercase group-hover/node:text-accent transition-colors">
                          {t("pillar_1_title")}
                        </h3>
                        <p className="text-[11px] text-muted mt-2 max-w-xs opacity-60 group-hover/node:opacity-100 transition-opacity leading-relaxed">
                          {t("pillar_1_desc")}
                        </p>
                      </div>
                      <div className="relative">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 45 }}
                          className="w-16 h-16 border-2 border-accent/50 bg-background flex items-center justify-center group-hover/node:border-accent transition-all group-hover/node:shadow-[0_0_20px_rgba(224,122,58,0.2)] rotate-45 overflow-hidden"
                        >
                          <div className="-rotate-45 text-accent">
                             <ShieldAlert className="w-6 h-6" />
                          </div>
                        </motion.div>
                        <div className="absolute -right-4 top-1/2 w-4 h-[1px] bg-accent/30 group-hover/node:bg-accent transition-colors" />
                      </div>
                    </motion.div>

                    {/* Right Node: Ultralearning */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex flex-col items-start group/node cursor-pointer"
                      onClick={() => setView("ULTRALEARNING")}
                    >
                      <div className="relative">
                        <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-accent/30 group-hover/node:bg-accent transition-colors" />
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 border-2 border-accent/50 bg-background flex items-center justify-center group-hover/node:border-accent transition-all group-hover/node:shadow-[0_0_20px_rgba(224,122,58,0.2)]"
                        >
                          <Hexagon className="w-6 h-6 text-accent fill-transparent" />
                        </motion.div>
                      </div>
                      <div className="flex flex-col items-start mt-6 text-left">
                        <div className="text-[10px] text-accent/70 mb-1 tracking-widest">SYS.02</div>
                        <h3 className="text-2xl font-black text-foreground uppercase group-hover/node:text-accent transition-colors">
                          {t("pillar_2_title")}
                        </h3>
                        <p className="text-[11px] text-muted mt-2 max-w-xs opacity-60 group-hover/node:opacity-100 transition-opacity leading-relaxed">
                          {t("pillar_2_desc")}
                        </p>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: DETAILS (SPLIT VIEW) */}
            {(view === "ANTIFRAGILITY" || view === "ULTRALEARNING") && (
              <motion.div
                key="detail-screen"
                className="absolute inset-0 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* LEFT CONTENT: RADAR/EXPLODED DIAGRAM (60%) */}
                <div className="w-full lg:w-[60%] h-full flex items-center justify-center relative p-12">
                  
                  <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    
                    {/* Background Concentric Rings */}
                    <div className="absolute inset-0 border border-foreground/5 rounded-full" />
                    <div className="absolute inset-[20%] border border-foreground/10 rounded-full" />
                    <div className="absolute inset-[40%] border border-foreground/20 border-dashed rounded-full" />
                    
                    {/* Central Icon */}
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="relative z-10 w-20 h-20 bg-accent flex items-center justify-center text-background shadow-xl shadow-accent/20"
                    >
                      {view === "ANTIFRAGILITY" ? <ShieldAlert className="w-8 h-8" /> : <Hexagon className="w-8 h-8" />}
                    </motion.div>

                    {/* Orbiting Sub-Nodes */}
                    {[
                      { angle: -30, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_1") : t("pillar_2_sub_1"), icon: Zap },
                      { angle: 90, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_2") : t("pillar_2_sub_2"), icon: Layers },
                      { angle: 210, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_3") : t("pillar_2_sub_3"), icon: Target },
                    ].map((node, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                        className="absolute flex flex-col items-center gap-2"
                        style={{
                          transform: `rotate(${node.angle}deg) translateY(-150px) rotate(-${node.angle}deg)`,
                        }}
                      >
                        <div className="w-10 h-10 bg-background border border-accent/50 hover:border-accent hover:shadow-[0_0_10px_rgba(224,122,58,0.3)] transition-all flex items-center justify-center group cursor-default">
                          <node.icon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[9px] text-foreground font-bold bg-background/80 px-2 py-1 tracking-wider whitespace-nowrap border border-foreground/10 backdrop-blur-md">
                          {node.label}
                        </span>
                      </motion.div>
                    ))}

                    {/* Dynamic SVG Connections for Sub-Nodes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
                       <line x1="50%" y1="50%" x2="50%" y2="12%" stroke="var(--color-accent)" strokeOpacity="0.2" strokeDasharray="2 2" transform="rotate(90 256 256)"/>
                       {/* Hardcoded angles in CSS transforms are tricky to replicate pixel-perfectly in raw SVG lines without explicit coordinates. Kept as visualization lines implicitly or CSS-based lines */}
                    </svg>

                  </div>
                </div>

                {/* RIGHT PANEL: GLASS DATA PANEL (40%) */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="hidden lg:flex flex-col w-[40%] h-full bg-foreground/5 backdrop-blur-md border-l border-accent/20 relative"
                >
                  {/* Panel Header */}
                  <div className="p-6 border-b border-accent/20 bg-accent/5 flex items-center gap-3">
                     <Crosshair className="w-4 h-4 text-accent" />
                     <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{t("detail_panel_title")}</div>
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-8">
                    <div>
                       <div className="text-[10px] text-muted-foreground tracking-widest mb-2">MODULE TYPE</div>
                       <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">
                         {view === "ANTIFRAGILITY" ? t("pillar_1_title") : t("pillar_2_title")}
                       </h2>
                       <span className="text-xs text-accent mt-2 block">{view === "ANTIFRAGILITY" ? t("pillar_1_author") : t("pillar_2_author")}</span>
                    </div>

                    <div className="border-l-2 border-accent pl-4 py-1 bg-accent/5">
                      <p className="text-sm text-foreground leading-relaxed font-medium">
                        {view === "ANTIFRAGILITY" ? t("pillar_1_desc") : t("pillar_2_desc")}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                       <div className="text-[10px] text-accent/70 font-bold tracking-widest border-b border-accent/10 pb-2 flex justify-between items-center">
                          <span>TELEMETRIA ATIVA</span>
                          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-accent rounded-full" />
                       </div>
                       
                       {/* Fake Stat Blocks */}
                       <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 border border-foreground/10 bg-background/40">
                             <div className="text-[9px] text-muted uppercase mb-1">Intensidade</div>
                             <div className="text-lg font-bold text-foreground tracking-tighter">[99.4%]</div>
                          </div>
                          <div className="p-3 border border-foreground/10 bg-background/40">
                             <div className="text-[9px] text-muted uppercase mb-1">Processamento</div>
                             <div className="text-lg font-bold text-foreground tracking-tighter">[REALTIME]</div>
                          </div>
                          <div className="col-span-2 p-3 border border-accent/30 bg-accent/5">
                             <div className="text-[9px] text-accent uppercase mb-1">Síntese Operacional</div>
                             <div className="text-xs font-bold text-foreground tracking-tight uppercase">{t("product_title")} READY</div>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* MOBILE FALLBACK FOR RIGHT PANEL CONTENT */}
                <div className="lg:hidden absolute bottom-0 left-0 w-full p-6 bg-background/90 backdrop-blur-xl border-t border-accent/30 z-30">
                   <h2 className="text-xl font-bold text-accent mb-2 uppercase">
                     {view === "ANTIFRAGILITY" ? t("pillar_1_title") : t("pillar_2_title")}
                   </h2>
                   <p className="text-xs text-foreground/80 leading-relaxed">
                     {view === "ANTIFRAGILITY" ? t("pillar_1_desc") : t("pillar_2_desc")}
                   </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
      
      {/* Ambient Light Glow (Bottom) */}
      <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
