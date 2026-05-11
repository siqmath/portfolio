"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Code, Zap, Database, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function SiqueiraValeCase() {
  const t = useTranslations("ProjectCase");
  const tGeneral = useTranslations("Projects");
  const locale = useLocale();

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const features = [
    { id: 1, icon: Activity },
    { id: 2, icon: Shield },
    { id: 3, icon: Zap },
    { id: 4, icon: Database },
    { id: 5, icon: Code },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black pb-24 font-sans">
      
      {/* Sticky Navigation / Top Bar */}
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-white/5">
        {/* Background ambient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative w-48 h-24 mb-10 invert grayscale contrast-[2]"
          >
            <Image 
              src="/images/projects/siqueira-vale-logo.png" 
              alt="Siqueira e Vale Logo" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mb-6"
          >
            {tGeneral("sv_title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            {tGeneral("sv_desc")}
          </motion.p>
        </div>
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

      {/* ANTIFRAGILITY MAIN FEATURE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 border-l-4 border-accent pl-6">
          <h2 className="text-3xl font-black tracking-tight uppercase mb-2">
            {t("antifragility_pillar")}
          </h2>
          <p className="text-muted text-base max-w-xl">
            {t("antifragility_desc")}
          </p>
        </div>

        {/* Detailed list of points */}
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

      {/* Footnote Callout */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
         <div className="inline-flex p-1 border border-accent/20 rounded-full bg-accent/5 mb-6">
           <div className="px-4 py-1.5 bg-accent text-black font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
             <CheckCircle2 className="w-3.5 h-3.5" />
             Status Concluído
           </div>
         </div>
         <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">Infraestrutura blindada para a escalabilidade.</h3>
         <p className="text-muted text-sm">A arquitetura de dados implementada converteu ruído logístico em ativos intelectuais prontos para o futuro.</p>
      </section>

    </main>
  );
}
