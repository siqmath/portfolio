"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Trophy, 
  Zap, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Rocket,
  Target,
  AlertTriangle,
  Link2,
  HeartPulse,
  MapPin
} from "lucide-react";
import { useLocale } from "next-intl";

export default function HoneymoonChallengePage() {
  const t = useTranslations("ProjectCaseHC");
  const tp = useTranslations("Projects");
  const locale = useLocale();

  const metrics = [
    { label: t("metric1_label"), value: t("metric1_value"), icon: Trophy },
    { label: t("metric2_label"), value: t("metric2_value"), icon: Rocket },
    { label: t("metric3_label"), value: t("metric3_value"), icon: Zap },
    { label: t("metric4_label"), value: t("metric4_value"), icon: Terminal },
  ];

  const prismaSteps = [
    { id: "p", icon: Target },
    { id: "r", icon: AlertTriangle },
    { id: "i", icon: Link2 },
    { id: "s", icon: HeartPulse },
    { id: "m", icon: MapPin },
  ];

  const features = [
    {
      title: t("p1_title"),
      desc: t("p1_desc"),
      gradient: "from-[#FF2E93]/20 to-transparent",
      accent: "text-[#FF2E93]",
      icon: Users
    },
    {
      title: t("p2_title"),
      desc: t("p2_desc"),
      gradient: "from-[#FF2E93]/20 to-transparent",
      accent: "text-[#FF2E93]",
      icon: Trophy
    },
    {
      title: t("p3_title"),
      desc: t("p3_desc"),
      gradient: "from-[#FF2E93]/20 to-transparent",
      accent: "text-[#FF2E93]",
      icon: Zap
    },
    {
      title: t("p4_title"),
      desc: t("p4_desc"),
      gradient: "from-[#FF2E93]/20 to-transparent",
      accent: "text-[#FF2E93]",
      icon: CheckCircle2
    },
    {
      title: t("p5_title"),
      desc: t("p5_desc"),
      gradient: "from-[#FF2E93]/20 to-transparent",
      accent: "text-[#FF2E93]",
      icon: Terminal
    }
  ];

  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-[#FF2E93] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-white/10 overflow-hidden">
        {/* Full-bleed cinematic image background */}
        {/* Premium Dark Background & Edge Shading */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FF2E93]/5 to-transparent opacity-50 pointer-events-none" />

        {/* Ambient Background Glow (Residual from legacy) */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF2E93]/10 blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          
          <Link 
            href={`/${locale}/#projects`} 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground/50 hover:text-[#FF2E93] transition-colors mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>

          {/* Fully Centered Headline Context */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            
            {/* Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="text-[#FF2E93] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-6">
                {tp("tag_gamification")}
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] mb-8">
                The Honeymoon <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E93] via-white to-white/50">
                  Challenge
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
                {tp("hc_desc")}
              </p>
            </motion.div>
          </div>

          {/* Key Stats Panel - Centered Beneath */}
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/50 to-transparent" />
              {metrics.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-lg bg-[#FF2E93]/10 border border-[#FF2E93]/20 flex items-center justify-center mb-4">
                      <Icon size={14} className="text-[#FF2E93]" />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-mono text-foreground/40 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm md:text-base font-display font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* PROJECT MOCKUP SHOWCASE */}
      <section className="py-20 relative bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative aspect-[16/9] w-full bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-30px_rgba(255,46,147,0.2)] group"
          >
             <Image 
               src="/images/projects/honeymoon-challenge.png" 
               alt="Honeymoon Challenge Scoreboard UI"
               fill
               className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>
      </section>

      {/* STRATEGIC CONTEXT */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6">{t("context")}</h2>
              <div className="w-12 h-[3px] bg-[#FF2E93]" />
              
              <div className="mt-12 space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-2">{t("client")}</h4>
                  <p className="text-white font-bold">Matheus & Taís Siqueira</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-2">{t("main_pillar")}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{t("main_pillar_desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 text-lg text-foreground/70 font-light leading-relaxed space-y-8">
             <p className="text-xl md:text-2xl text-white font-display font-medium leading-snug">
               {t("context_desc")}
             </p>
             
             <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
               <h3 className="text-white font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                 <Terminal className="text-[#FF2E93] w-5 h-5" />
                 {t("stack")}
               </h3>
               <p className="text-sm md:text-base">{t("stack_desc")}</p>
             </div>
          </div>

        </div>
      </section>
      {/* 5. PRISMA FRAMEWORK SECTION (INSERTED FOR CANONICAL UNIFICATION) */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5">
        <div className="mb-16 border-l-4 border-[#FF2E93] pl-6">
          <div className="text-[10px] font-mono font-bold text-[#FF2E93] uppercase tracking-[0.3em] mb-3 bg-[#FF2E93]/10 px-2 py-1 rounded-sm inline-block">
            Prisma Framework — [P.R.I.S.M]
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4 text-white">
            {t("prisma_section_title")}
          </h2>
          <p className="text-foreground/60 text-base max-w-xl leading-relaxed">
            {t("prisma_section_desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prismaSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-[#FF2E93]/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-neutral-900 border border-white/10 text-[#FF2E93] group-hover:scale-110 transition-transform duration-500">
                  <step.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#FF2E93] transition-colors mb-2">
                    {t(`prisma_${step.id}_title`)}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {t(`prisma_${step.id}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ANTIFRAGILITY SECTION TAG */}
      <div className="max-w-7xl mx-auto px-6 pt-24 -mb-16">
        <div className="text-[10px] font-mono font-bold text-[#FF2E93] uppercase tracking-[0.3em] mb-3 bg-[#FF2E93]/10 px-2 py-1 rounded-sm inline-block">
          Prisma Framework — [A] Final
        </div>
      </div>


      {/* PILLAR GRID */}
      <section className="py-32 relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-[#FF2E93]/30 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`mb-6 inline-flex w-12 h-12 rounded-xl bg-white/5 items-center justify-center ${feature.accent} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#FF2E93]/10 text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-8">
            Build to Learn.
          </h2>
          <Link 
            href={`/${locale}/#projects`} 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)]"
          >
            Explore Other Artifacts
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}
