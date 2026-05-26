"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Crosshair, Hexagon, Layers, ShieldAlert, Target, Zap, ChevronRight } from "lucide-react";

type ViewState = "VOID" | "PRISM" | "ANTIFRAGILITY" | "ULTRALEARNING";

const PRISMA_KEYS = ["p", "r", "i", "s", "m", "a"] as const;

// 3D Prism Component made with pure CSS and Framer Motion for peak aesthetics
const Prism3D = () => {
  const side = 80; // size in px
  return (
    <div className="relative w-32 h-32 flex items-center justify-center" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ 
          transformStyle: "preserve-3d", 
          width: `${side}px`, 
          height: `${side}px` 
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [20, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      >
        {/* 4 side faces with correct 3D geometry */}
        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={i}
            className="absolute inset-0 origin-bottom"
            style={{
              transform: `rotateY(${angle}deg) translateZ(${side / 2}px) rotateX(30deg)`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "linear-gradient(to top, rgba(224,122,58,0.45), rgba(224,122,58,0.05))",
              border: "1px solid rgba(224,122,58,0.6)",
              backdropFilter: "blur(1px)",
            }}
          />
        ))}
        {/* Base base to form a complete pyramid */}
        <div
          className="absolute w-full h-full bg-accent/20 border border-accent/50 shadow-[0_0_15px_rgba(224,122,58,0.3)]"
          style={{
            transform: "rotateX(90deg) translateZ(-40px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export function Philosophy() {
  const t = useTranslations("Philosophy");
  const [view, setView] = useState<ViewState>("VOID");
  const [hoveredPrisma, setHoveredPrisma] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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

  const handleBackgroundClick = () => {
    if (view === "VOID") return;
    setView(view === "PRISM" ? "VOID" : "PRISM");
  };

  return (
    <section 
      ref={containerRef}
      onClick={handleBackgroundClick}
      className="relative w-full h-[680px] overflow-hidden bg-background border-y border-foreground/10 font-mono group/canvas cursor-pointer selection:bg-accent selection:text-foreground"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
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
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }}
      />

      {/* HUD Coordinates (MOVED TO RIGHT) */}
      <div className="absolute top-6 right-6 z-20 text-[10px] text-accent/70 tracking-widest flex flex-col gap-1 pointer-events-none text-right">
        <div>[STATUS: OPERATIONAL]</div>
        <div>[X: {String(mousePos.x).padStart(4, '0')}, Y: {String(mousePos.y).padStart(4, '0')}]</div>
        <div>[SYS: PRISMA_V1]</div>
      </div>

      {/* Section Title (MOVED TO LEFT) */}
      <div className="absolute top-6 left-6 z-20 text-left pointer-events-none">
        <div className="text-sm text-muted tracking-widest font-bold uppercase">{t("label")}</div>
        <div className="text-2xl text-foreground tracking-tighter font-black uppercase">{t("title")}</div>
      </div>

      {/* Breadcrumbs / Back Control */}
      <AnimatePresence>
        {view !== "VOID" && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={(e) => {
               e.stopPropagation();
               setView(view === "PRISM" ? "VOID" : "PRISM");
            }}
            className="absolute bottom-6 left-6 z-30 flex items-center gap-2 bg-background border border-accent/30 hover:border-accent px-4 py-2 text-xs text-accent tracking-widest transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            {t("back").toUpperCase()}
          </motion.button>
        )}
      </AnimatePresence>

      {/* MAIN CANVAS CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        
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
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <motion.div 
                  className="relative cursor-pointer flex items-center justify-center"
                  onClick={(e) => {
                     e.stopPropagation();
                     setView("PRISM");
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Rotating rings surrounding the 3D Prism */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute -inset-8 border border-dashed border-accent/30 rounded-full pointer-events-none"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute -inset-16 border border-accent/5 rounded-full pointer-events-none"
                  />

                  {/* NEW 3D ROTATING PRISM */}
                  <div className="relative z-10">
                    <Prism3D />
                  </div>
                  
                  {/* Core pulse shadow underneath */}
                  <div className="absolute inset-0 bg-accent opacity-20 animate-pulse rounded-full blur-2xl scale-75" />
                </motion.div>

                <div className="flex flex-col items-center text-center mt-2 pointer-events-none">
                  <motion.h3 
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="text-base text-accent font-bold tracking-[0.3em]"
                  >
                    {t("product_title")}
                  </motion.h3>
                  <p className="text-xs text-muted uppercase mt-2 max-w-xs leading-relaxed">
                    {t("cta_void")}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: THE PRISM (UPDATED LAYOUT) */}
            {view === "PRISM" && (
              <motion.div
                key="prism-screen"
                className="absolute inset-0 flex items-center px-6 md:px-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div 
                  className="grid grid-cols-1 lg:grid-cols-12 w-full h-full max-w-5xl mx-auto items-center gap-8 lg:gap-12 py-20"
                >
                  
                  {/* LEFT COLUMN: 2 MAIN PILLARS (40%) */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    
                    <div className="flex flex-col gap-1 mb-1" onClick={(e) => e.stopPropagation()}>
                      <span className="text-xs font-bold text-accent tracking-[0.3em] uppercase">
                        {t("inspirations")}
                      </span>
                    </div>
                    
                    {/* Antifragility Node */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex gap-4 bg-accent/5 border border-accent/10 p-5 group/node cursor-pointer hover:border-accent/40 transition-all"
                      onClick={(e) => {
                         e.stopPropagation();
                         setView("ANTIFRAGILITY");
                      }}
                    >
                      <div className="relative shrink-0">
                        <motion.div 
                          whileHover={{ rotate: 45 }}
                          className="w-16 h-16 border border-accent/40 bg-background flex items-center justify-center group-hover/node:border-accent group-hover/node:shadow-[0_0_15px_rgba(224,122,58,0.2)] transition-all"
                        >
                          <ShieldAlert className="w-7 h-7 text-accent" />
                        </motion.div>
                      </div>
                      <div className="flex flex-col justify-center text-left overflow-hidden">
                        <div className="text-[11px] text-accent/70 mb-1 tracking-widest">SYSTEMA 01</div>
                        <h3 className="text-2xl font-black text-foreground uppercase group-hover/node:text-accent transition-colors truncate">
                          {t("pillar_1_title")}
                        </h3>
                        <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                          {t("pillar_1_desc")}
                        </p>
                      </div>
                    </motion.div>

                    {/* Ultralearning Node */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex gap-4 bg-accent/5 border border-accent/10 p-5 group/node cursor-pointer hover:border-accent/40 transition-all"
                      onClick={(e) => {
                         e.stopPropagation();
                         setView("ULTRALEARNING");
                      }}
                    >
                      <div className="relative shrink-0">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-16 h-16 border border-accent/40 bg-background flex items-center justify-center group-hover/node:border-accent group-hover/node:shadow-[0_0_15px_rgba(224,122,58,0.2)] transition-all"
                        >
                          <Hexagon className="w-7 h-7 text-accent fill-transparent" />
                        </motion.div>
                      </div>
                      <div className="flex flex-col justify-center text-left overflow-hidden">
                        <div className="text-[11px] text-accent/70 mb-1 tracking-widest">SYSTEMA 02</div>
                        <h3 className="text-2xl font-black text-foreground uppercase group-hover/node:text-accent transition-colors truncate">
                          {t("pillar_2_title")}
                        </h3>
                        <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                          {t("pillar_2_desc")}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* MIDDLE DECORATIVE ELEMENT (OPTIONAL, OR JUST SPACING) */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center items-center relative pointer-events-none">
                    <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
                    <div className="absolute w-2 h-2 bg-accent rotate-45 shadow-[0_0_8px_rgba(224,122,58,0.6)]" />
                  </div>

                  {/* RIGHT COLUMN: PRISMA ACRONYM DESCRIPTION (60%) */}
                  <div className="lg:col-span-6 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    <div className="mb-2">
                      <div className="text-xs text-accent font-bold tracking-widest uppercase">Matriz Operacional</div>
                      <h3 className="text-3xl font-black text-foreground tracking-tight">PRISMA</h3>
                    </div>

                    {PRISMA_KEYS.map((key, idx) => {
                      const isHovered = hoveredPrisma === key;
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                          onMouseEnter={() => setHoveredPrisma(key)}
                          onMouseLeave={() => setHoveredPrisma(null)}
                          className={`group relative border-l-2 p-3 transition-all cursor-default ${
                            isHovered ? "border-accent bg-accent/5 translate-x-2" : "border-foreground/10 bg-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-bold text-base tracking-wide uppercase transition-colors ${isHovered ? "text-accent" : "text-foreground/80"}`}>
                              {t(`prisma_${key}_label`)}
                            </span>
                            <ChevronRight className={`w-4 h-4 transition-all ${isHovered ? "text-accent opacity-100" : "text-muted opacity-0"}`} />
                          </div>
                          
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-muted mt-2 leading-relaxed">
                                  {t(`prisma_${key}_desc`)}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                </div>
              </motion.div>
            )}

            {/* SCREEN 3: DETAILS (SPLIT VIEW) - REDUCED HEIGHT VERSION */}
            {(view === "ANTIFRAGILITY" || view === "ULTRALEARNING") && (
              <motion.div
                key="detail-screen"
                className="absolute inset-0 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* LEFT CONTENT: RADAR/EXPLODED DIAGRAM (60%) */}
                <div className="w-full lg:w-[60%] h-full flex items-center justify-center relative p-8">
                  
                  <div className="relative w-full max-w-sm aspect-square flex items-center justify-center pointer-events-none">
                    
                    {/* Background Concentric Rings */}
                    <div className="absolute inset-0 border border-foreground/5 rounded-full" />
                    <div className="absolute inset-[20%] border border-foreground/10 rounded-full" />
                    <div className="absolute inset-[40%] border border-foreground/20 border-dashed rounded-full" />
                    
                    {/* Central Icon & Floating Title - FIXED OPEN STYLE */}
                    <motion.div 
                      animate={{ scale: [1, 1.03, 1] }} 
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="relative z-10 flex flex-col items-center justify-center pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                       <div className="relative w-20 h-20 border-2 border-accent bg-background/60 backdrop-blur-md flex items-center justify-center text-accent shadow-[0_0_30px_rgba(224,122,58,0.2)] transform rotate-45">
                         <div className="-rotate-45 flex items-center justify-center w-full h-full">
                            {view === "ANTIFRAGILITY" ? <ShieldAlert className="w-9 h-9" /> : <Hexagon className="w-9 h-9" />}
                         </div>
                       </div>
                       
                       <div className="absolute top-[125%] w-full flex justify-center pointer-events-none">
                          <div className="text-accent font-black text-xs tracking-[0.2em] uppercase bg-background border border-accent/30 px-4 py-1.5 shadow-lg text-center whitespace-nowrap">
                            {view === "ANTIFRAGILITY" ? t("pillar_1_title") : t("pillar_2_title")}
                          </div>
                       </div>
                    </motion.div>

                    {[
                      { angle: -30, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_1") : t("pillar_2_sub_1"), icon: Zap },
                      { angle: 90, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_2") : t("pillar_2_sub_2"), icon: Layers },
                      { angle: 210, label: view === "ANTIFRAGILITY" ? t("pillar_1_sub_3") : t("pillar_2_sub_3"), icon: Target },
                    ].map((node, idx) => {
                      const translateDistance = isMobile ? -105 : -145;
                      return (
                        <div
                          key={idx}
                          className="absolute left-1/2 top-1/2 pointer-events-none flex items-center justify-center"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateY(${translateDistance}px)`,
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -node.angle }}
                            animate={{ 
                              scale: hoveredNode === idx ? 1.15 : 1, 
                              opacity: 1, 
                              rotate: -node.angle 
                            }}
                            transition={{ delay: 0.2 + idx * 0.1, type: "spring", duration: 0.3 }}
                            className="flex flex-col items-center gap-2 pointer-events-auto"
                            onMouseEnter={() => setHoveredNode(idx)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className={`w-10 h-10 bg-background border ${hoveredNode === idx ? 'border-accent shadow-[0_0_15px_rgba(224,122,58,0.4)] scale-110' : 'border-accent/50'} transition-all duration-300 flex items-center justify-center group cursor-default`}>
                              <node.icon className={`w-5 h-5 text-accent transition-transform duration-300 ${hoveredNode === idx ? 'scale-110' : ''}`} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 tracking-wider whitespace-nowrap border backdrop-blur-md transition-colors duration-300 ${hoveredNode === idx ? 'text-accent border-accent bg-background' : 'text-foreground bg-background/80 border-foreground/10'}`}>
                              {node.label}
                            </span>
                          </motion.div>
                        </div>
                      );
                    })}

                    {/* Dynamic SVG Connections - Fixed and Synced for all nodes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
                       {[-30, 90, 210].map((deg, i) => (
                          <line 
                            key={i} 
                            x1="50%" y1="50%" x2="50%" y2={isMobile ? "22%" : "15%"} 
                            stroke="var(--color-accent)" 
                            strokeOpacity="0.15" 
                            strokeDasharray="3 3" 
                            style={{ transformOrigin: '50% 50%', transform: `rotate(${deg}deg)` }}
                          />
                       ))}
                    </svg>

                  </div>
                </div>

                {/* RIGHT PANEL: GLASS DATA PANEL */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                  className="hidden lg:flex flex-col w-[40%] h-full bg-foreground/5 backdrop-blur-md border-l border-accent/20 relative cursor-default"
                >
                  {/* Panel Header */}
                  <div className="p-5 border-b border-accent/20 bg-accent/5 flex items-center gap-3">
                     <Crosshair className="w-4 h-4 text-accent" />
                     <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{t("detail_panel_title")}</div>
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                    <div>
                       <div className="text-[11px] text-muted-foreground tracking-widest mb-1">MODULE TYPE</div>
                       <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">
                         {view === "ANTIFRAGILITY" ? t("pillar_1_title") : t("pillar_2_title")}
                       </h2>
                       <span className="text-[11px] text-accent mt-1 block">{view === "ANTIFRAGILITY" ? t("pillar_1_author") : t("pillar_2_author")}</span>
                    </div>

                    <div>
                       <div className="text-[11px] text-muted-foreground tracking-widest mb-1">DESCRIÇÃO GERAL</div>
                       <p className="text-sm text-foreground/80 leading-relaxed">
                         {view === "ANTIFRAGILITY" ? t("pillar_1_desc") : t("pillar_2_desc")}
                       </p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-foreground/10 pt-4">
                      {[1, 2, 3].map((step, idx) => {
                         const prefix = view === "ANTIFRAGILITY" ? "pillar_1" : "pillar_2";
                         const isLit = hoveredNode === idx;
                         const isAnythingLit = hoveredNode !== null;
                         
                         return (
                           <motion.div 
                             key={step}
                             onMouseEnter={() => setHoveredNode(idx)}
                             onMouseLeave={() => setHoveredNode(null)}
                             animate={{ opacity: !isAnythingLit || isLit ? 1 : 0.4 }}
                             className={`border-l-2 ${isLit ? 'border-accent bg-accent/10 translate-x-1' : 'border-foreground/20 bg-foreground/5'} pl-4 py-2.5 transition-all duration-300 cursor-default`}
                           >
                             <h4 className={`text-[10px] font-bold tracking-widest mb-1 uppercase transition-colors ${isLit ? 'text-accent' : 'text-muted-foreground'}`}>
                               {t(`${prefix}_sub_${step}`)}
                             </h4>
                             <p className={`text-xs leading-relaxed transition-colors ${isLit ? 'text-foreground font-medium' : 'text-muted'}`}>
                               {t(`${prefix}_sub_${step}_desc`)}
                             </p>
                           </motion.div>
                         );
                      })}
                    </div>

                    <div className="mt-auto flex flex-col gap-3 border-t border-foreground/10 pt-6">
                       <div className="text-[10px] text-accent/70 font-bold tracking-widest pb-1 flex justify-between items-center">
                          <span className="uppercase">{t("practice_title")}</span>
                          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                       </div>
                       
                       <div className="p-4 border border-dashed border-accent/30 bg-background/30">
                          <p className="text-xs text-muted italic leading-relaxed">
                            {t("practice_desc")}
                          </p>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* MOBILE FALLBACK FOR RIGHT PANEL CONTENT */}
                <div className="lg:hidden absolute bottom-0 left-0 w-full p-5 bg-background/90 backdrop-blur-xl border-t border-accent/30 z-30" onClick={(e) => e.stopPropagation()}>
                   <h2 className="text-xl font-bold text-accent mb-1 uppercase">
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
