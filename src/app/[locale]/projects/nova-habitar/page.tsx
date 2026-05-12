"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Layers, ShieldCheck, Zap, LayoutGrid, MessageSquareText, CheckCircle2,
  Target, AlertTriangle, Link2, HeartPulse, MapPin, Globe
} from "lucide-react";
import Link from "next/link";

import { useLocale } from "next-intl";

export default function NovaHabitarCase() {
  const t = useTranslations("ProjectCaseNH");
  const tGeneral = useTranslations("Projects");
  const locale = useLocale();

  const prismaSteps = [
    { id: "p", icon: Target },
    { id: "r", icon: AlertTriangle },
    { id: "i", icon: Link2 },
    { id: "s", icon: HeartPulse },
    { id: "m", icon: MapPin },
  ];

  const features = [
    { id: 1, icon: LayoutGrid },
    { id: 2, icon: ShieldCheck },
    { id: 3, icon: Zap },
    { id: 4, icon: Layers },
    { id: 5, icon: MessageSquareText },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-[#C6A667] selection:text-black pb-24 font-sans">
      
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href={`/${locale}/#projects`}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
          <div className="text-[10px] font-mono text-[#C6A667] uppercase tracking-[0.2em] border border-[#C6A667]/20 px-3 py-1 rounded-full">
            Case 02 // Real Estate
          </div>
        </div>
      </header>

      {/* 2. Hero Section - Full Bleed Background */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Cinematic Image */}
        {/* Premium Dark Gradient Subtle Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#C6A667]/5 to-transparent opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10 py-20">


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mb-6"
          >
            {tGeneral("nh_title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            {tGeneral("nh_desc")}
          </motion.p>

          <div className="mt-8">
            <a 
              href="https://www.novahabitar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A667]/30 text-[10px] font-mono uppercase tracking-widest text-[#C6A667] hover:bg-[#C6A667]/10 transition-colors"
            >
              <Globe size={12} />
              www.novahabitar.com
            </a>
          </div>
        </div>
      </section>

      {/* 4. Context Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground/5 border border-white/5 p-8 rounded-2xl"
        >
          <h3 className="text-[#C6A667] text-xs font-bold uppercase tracking-widest mb-3">{t("context")}</h3>
          <p className="text-sm text-foreground/90 leading-relaxed">{t("context_desc")}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-foreground/5 border border-white/5 p-8 rounded-2xl md:col-span-2"
        >
          <h3 className="text-[#C6A667] text-xs font-bold uppercase tracking-widest mb-3">{t("stack")}</h3>
          <p className="text-sm text-foreground/90 leading-relaxed mb-4">{t("stack_desc")}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {["React", "Vite", "TailwindCSS", "Cloudinary", "Docker", "Hetzner", "Caddy"].map(tag => (
               <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded-md bg-white/5">{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. PRISMA FRAMEWORK SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="mb-12 border-l-4 border-[#C6A667] pl-6 relative">
          <div className="text-[10px] font-mono font-bold text-[#C6A667] uppercase tracking-[0.3em] mb-3 bg-[#C6A667]/10 px-2 py-1 rounded-sm inline-block">
            Prisma Framework — [P.R.I.S.M]
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase mb-2">
            {t("prisma_section_title")}
          </h2>
          <p className="text-muted text-base max-w-xl">
            {t("prisma_section_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prismaSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 bg-foreground/5 border border-white/5 rounded-2xl hover:border-[#C6A667]/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-background border border-white/10 text-[#C6A667] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(198,166,103,0.15)]">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#C6A667] transition-colors mb-2">
                    {t(`prisma_${step.id}_title`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`prisma_${step.id}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. ANTIFRAGILITY SECTION [A] */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="mb-12 border-l-4 border-[#C6A667] pl-6 relative pt-12">
          <div className="text-[10px] font-mono font-bold text-[#C6A667] uppercase tracking-[0.3em] mb-3 bg-[#C6A667]/10 px-2 py-1 rounded-sm inline-block">
            Prisma Framework — [A] Final
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase mb-2">
            {t("antifragility_pillar")}
          </h2>
          <p className="text-muted text-base max-w-xl">
            {t("antifragility_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 bg-foreground/5 border border-white/5 rounded-2xl hover:border-[#C6A667]/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-background border border-white/10 text-[#C6A667] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(198,166,103,0.1)]">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-[#C6A667]/60 tracking-widest">0{feat.id}</span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[#C6A667] transition-colors">
                      {t(`p${feat.id}_title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`p${feat.id}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. Footnote / Roadmap Callout */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
         <div className="flex flex-col items-center gap-4 mb-8">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C6A667]/10 border border-[#C6A667]/30 text-[#C6A667] font-bold text-xs uppercase tracking-widest rounded-full">
             <CheckCircle2 className="w-3.5 h-3.5" />
             {t("footnote_status")}
           </div>
         </div>
         <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">{t("footnote_title")}</h3>
         <p className="text-muted text-sm max-w-2xl mx-auto">{t("footnote_desc")}</p>
      </section>

    </main>
  );
}
