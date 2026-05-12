"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { PROJECTS_REGISTRY } from "@/lib/constants";

export function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  const projects = PROJECTS_REGISTRY;
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  const [isHovered, setIsHovered] = useState(false);
  const [isFastZone, setIsFastZone] = useState(false);
  
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Programmatic frame driving for perfectly smooth dynamically-adjusting linear marquee
  useAnimationFrame((time, delta) => {
    if (isHovered && !isFastZone) return; // Pause on hover (except fast zone)
    
    let moveBy = -0.5; // default slow movement
    if (isFastZone) moveBy = -4.5; // ~9x acceleration in the fast right zone
    
    const contentWidth = contentRef.current?.offsetWidth || 0;
    const fullSetWidth = contentWidth / 4; // because we quadrupled list for seamless overlap
    
    let nextX = baseX.get() + moveBy;
    
    // Seamless loop reset logic
    if (nextX <= -fullSetWidth) {
       nextX = 0;
    }
    baseX.set(nextX);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setIsFastZone(x > rect.width * 0.85); // Right 15% activates speed zone
  };

  return (
    <section 
      id="projects" 
      className="w-full py-24 bg-background overflow-hidden relative selection:bg-accent selection:text-background"
    >
      {/* Background aesthetic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 mb-12">
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 border border-accent/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-accent mb-4">
            <Briefcase className="w-3 h-3" />
            {t("label")}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground uppercase">
            {t("title")}
          </h2>
        </motion.div>
      </div>

      {/* MOBILE VIEW: NATIVE SNAP SCROLLER (VISIBLE ONLY ON MOBILE) */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-8 pb-8">
        {projects.map((project) => (
          <div 
            key={project.slug} 
            className="w-[85vw] shrink-0 snap-center h-full"
          >
            <ProjectCard project={project} t={t} locale={locale} />
          </div>
        ))}
      </div>

      {/* DESKTOP/NOTEBOOK VIEW: INFINITE DYNAMIC MARQUEE */}
      <div 
        className="hidden md:block relative w-full overflow-hidden py-4 group select-none cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsFastZone(false);
        }}
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        {/* Dynamic Speed Overlay Tip */}
        {isFastZone && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-bold tracking-widest pointer-events-none shadow-2xl animate-pulse uppercase">
            Fast Forward Mode
          </div>
        )}

        <motion.div 
          ref={contentRef}
          className="flex w-fit px-8 py-4 gap-8 will-change-transform"
          style={{ x: baseX }}
        >
          {duplicatedProjects.map((project, idx) => (
            <div 
              key={`${project.slug}-${idx}`} 
              className="w-[400px] xl:w-[450px] shrink-0 py-4"
            >
              <ProjectCard project={project} t={t} locale={locale} isPriority={idx === 0} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* NEW: CTA Link Button To Full Page */}
      <div className="w-full flex justify-center mt-12">
        <Link 
          href={`/${locale}/projects`}
          className="group inline-flex items-center gap-3 px-8 py-3 border border-white/10 rounded-full text-xs uppercase font-bold tracking-widest text-foreground/60 hover:text-white hover:border-accent/50 transition-all hover:shadow-[0_0_30px_rgba(224,122,58,0.1)]"
        >
          {t("view_all_cta") || "Ver todos os projetos"}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent" />
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </section>
  );
}

// Extracted card component for cleaner duplication in viewport alternates
function ProjectCard({ project, t, locale, isPriority = false }: any) {
  return (
    <Link 
      href={`/${locale}/projects/${project.slug}`}
      className={`group flex flex-col h-full relative bg-foreground/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ${project.theme.border} hover:scale-[1.01] hover:z-10`}
    >
      {/* Text Content (Pure Typography Focus) */}
      <div className="p-10 md:p-12 flex flex-col flex-grow justify-between min-h-[320px] bg-gradient-to-br from-white/[0.03] to-transparent relative">
        
        {/* Subtle corner ambient glow to keep premium feel without heavy imagery */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${project.theme.tagText.replace('text', 'bg')}`} />

        <div className="relative z-10">
          <div className={`text-[10px] font-mono font-bold tracking-[0.4em] mb-6 uppercase ${project.theme.tagText}`}>
            {t(project.tag)}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tight mb-5 leading-[1.1] transition-transform duration-300 transform group-hover:-translate-y-0.5 group-hover:text-white">
            {t(project.title)}
          </h3>
          
          <p className="text-base text-muted leading-relaxed mb-6 line-clamp-3 font-medium max-w-lg">
            {t(project.desc)}
          </p>
        </div>
        
        <div className="relative z-10 mt-auto inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-foreground group-hover:translate-x-2 transition-transform duration-500">
          <span>{t("view_case")}</span>
          <div className={`w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-500 ${project.theme.icon}`}>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Edge highlight sweep */}
      <div className={`absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100 ${project.theme.sweep}`} />
    </Link>
  );
}
