"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

export function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  return (
    <section 
      id="projects" 
      className="w-full py-24 bg-background overflow-hidden relative selection:bg-accent selection:text-background"
    >
      {/* Abstract aesthetic background decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 border border-accent/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-accent mb-4">
            <Briefcase className="w-3 h-3" />
            {t("label")}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground uppercase">
            {t("title")}
          </h2>
        </motion.div>

        {/* SINGLE FEATURED PROJECT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Link 
            href={`/${locale}/projects/siqueira-e-vale`}
            className="group block relative bg-foreground/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-[0_30px_80px_-20px_rgba(224,122,58,0.15)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[380px]">
              
              {/* Image / Logo Side */}
              <div className="relative h-full min-h-[300px] bg-black flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                {/* subtle animated bg for image side */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black opacity-50" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_80%)]" />
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10 w-full max-w-[280px] aspect-[2/1] flex items-center justify-center grayscale invert brightness-200 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-700"
                >
                   <Image 
                      src="/images/projects/siqueira-vale-logo.png" 
                      alt="Siqueira e Vale Logo" 
                      fill 
                      className="object-contain"
                      priority
                   />
                </motion.div>
              </div>

              {/* Text Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center h-full">
                <div className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent mb-3 uppercase">
                  {t("tag")}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">
                  {t("sv_title")}
                </h3>
                
                <p className="text-base text-muted leading-relaxed mb-8 max-w-md">
                  {t("sv_desc")}
                </p>
                
                <div className="mt-auto inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-foreground group-hover:translate-x-2 transition-transform duration-500">
                  <span>{t("view_case")}</span>
                  <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
            
            {/* Edge highlight sweep */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
