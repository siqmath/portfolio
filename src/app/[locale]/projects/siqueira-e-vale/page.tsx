"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Shield, Code, Zap, Database, Activity, CheckCircle2, 
  Crown, Target, AlertTriangle, Link2, HeartPulse, MapPin 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function SiqueiraValeCase() {
  const t = useTranslations("ProjectCase");
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
    { id: 1, icon: Activity },
    { id: 2, icon: Shield },
    { id: 3, icon: Crown }, // Updated to King/Crown
    { id: 4, icon: Database },
    { id: 5, icon: Code },
  ];

  const ultralearningSteps = [
    { id: 1, icon: Target },
    { id: 2, icon: Activity },
    { id: 3, icon: CheckCircle2 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black pb-24 font-sans">
      
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href={`/${locale}/#projects`}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
          
          <div className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] border border-accent/20 px-3 py-1 rounded-full">
            Case 01 // LawTech
          </div>
        </div>
      </header>

      {/* Hero Section - Full Bleed Cinematic Background */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Art Layer */}
        {/* Premium Ambient Accent Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10 py-20">


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mb-6"
          >
            {tGeneral("sv_title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            {tGeneral("sv_desc")}
          </motion.p>
        </div>
      </section>


      {/* CLIENT QUOTE BLOCK */}
      <section className="max-w-4xl mx-auto px-6 mt-12 -mb-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent/10 via-background to-background border border-accent/20 rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/10 blur-2xl rounded-full -mt-16 pointer-events-none" />
          <p className="text-lg md:text-xl font-display italic text-foreground/90 leading-relaxed mb-4 relative z-10">
            "Matheus trouxe uma clareza extrema para o processo do escritório. Com certeza um divisor de águas na qualidade do nosso trabalho e principalmente na qualidade de vida dos gestores"
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
            <div className="h-[1px] w-4 bg-accent/40" />
            Felipe Siqueira
            <div className="h-[1px] w-4 bg-accent/40" />
          </div>
        </motion.div>
      </section>

      {/* Context Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground/5 border border-white/5 p-8 rounded-2xl"
        >
          <h3 className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{t("context")}</h3>
          <p className="text-sm text-foreground/90 leading-relaxed">{t("context_desc")}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-foreground/5 border border-white/5 p-8 rounded-2xl md:col-span-2"
        >
          <h3 className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{t("stack")}</h3>
          <p className="text-sm text-foreground/90 leading-relaxed mb-4">{t("stack_desc")}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {["Next.js 15", "PostgreSQL", "Prisma", "Docker", "Tailwind", "NextAuth"].map(tag => (
               <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded-md bg-white/5">{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 1. PRISMA FRAMEWORK SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="mb-12 border-l-4 border-accent pl-6 relative">
          <div className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.3em] mb-3 bg-accent/10 px-2 py-1 rounded-sm inline-block">
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
              className={`group p-8 bg-foreground/5 border border-white/5 rounded-2xl hover:border-accent/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-background border border-white/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-2">
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

      {/* PUZZLE CHESS BANNER SECTION (Conceptual Highlight) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-accent/5 via-background to-background border border-accent/10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-xl bg-accent text-black flex items-center justify-center shadow-[0_0_30px_rgba(224,122,58,0.3)]">
                <Crown size={28} /> {/* Using King/Crown icon as requested */}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1 opacity-60">
                {t("puzzle_chess_subtitle")}
              </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-6">
                {t("puzzle_chess_title")}
              </h3>
              <p className="text-lg text-foreground/80 font-light leading-relaxed max-w-4xl">
                {t("puzzle_chess_desc")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* PHILOSOPHY REFINEMENTS (SUB CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {[
            { titleKey: "clarity", icon: Target },
            { titleKey: "deadlines", icon: Shield }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-foreground/5 border border-white/5 p-8 rounded-2xl hover:bg-foreground/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-5">
                <item.icon size={20} />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{t(`${item.titleKey}_title`)}</h4>
              <p className="text-sm text-foreground/60 leading-relaxed">{t(`${item.titleKey}_desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. ANTIFRAGILITY MAIN FEATURE [A] */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <div className="mb-12 border-l-4 border-accent pl-6 relative pt-12">
          <div className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.3em] mb-3 bg-accent/10 px-2 py-1 rounded-sm inline-block">
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
              className={`group p-8 bg-foreground/5 border border-white/5 rounded-2xl hover:border-accent/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-background border border-white/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-accent/60 tracking-widest">0{feat.id}</span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
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

      {/* 3. ULTRALEARNING DIRECTIVES (USING PREMIUM GRID IDENTITY) */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="mb-12 border-l-4 border-accent pl-6 relative">
          <div className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.3em] mb-3 bg-accent/10 px-2 py-1 rounded-sm inline-block">
            Mentalidade Expandida
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase mb-2">
            {t("ultralearning_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ultralearningSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-foreground/5 border border-white/5 rounded-2xl hover:border-accent/30 transition-all duration-500"
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-background border border-white/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-accent/60 mb-2 uppercase tracking-widest">Step 0{step.id}</div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-3">
                    {t(`ul_${step.id}_title`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`ul_${step.id}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footnote Callout */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
         <div className="flex flex-col items-center gap-4 mb-8">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent font-bold text-xs uppercase tracking-widest rounded-full">
             <CheckCircle2 className="w-3.5 h-3.5" />
             Fase 1: SaaS Concluído
           </div>
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-foreground/60 font-bold text-xs uppercase tracking-widest rounded-full border-dashed animate-pulse">
             <Activity className="w-3.5 h-3.5" />
             Fase 2: Integração Agente IA com RAG próprio · Em andamento
           </div>
         </div>
         <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">Infraestrutura blindada para a escalabilidade.</h3>
         <p className="text-muted text-sm max-w-2xl mx-auto">A arquitetura de dados implementada eliminou ruído para que as pessoas possam investir o tempo em decisões intelectuais de alto valor.</p>
      </section>

    </main>
  );
}
