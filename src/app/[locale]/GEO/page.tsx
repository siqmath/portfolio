import { Navbar } from "@/components/ui/Navbar";
import { getTranslations } from "next-intl/server";
import { Bot, ArrowRight, Activity, Search, Cpu, ShieldCheck, Zap, Layout, RefreshCcw, CheckCircle2 } from "lucide-react";

export default async function GEOPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "GEOPage" });

  const phoneRaw = "353830693753";
  const encodedMsg = encodeURIComponent(t("wa_message"));
  const waLink = `https://wa.me/${phoneRaw}?text=${encodedMsg}`;

  return (
    <main className="min-h-screen bg-background flex flex-col selection:bg-accent selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 overflow-hidden">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[160px] rounded-full pointer-events-none duration-10000"></div>
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-accent/5 blur-[140px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/30 text-accent rounded-full text-[10px] font-mono tracking-[0.2em] uppercase mb-6 bg-accent/5">
              <Bot className="w-3 h-3" />
              {t("label")}
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-6 text-balance">
              {t("headline")}
            </h1>
            
            <p className="text-muted font-bold text-lg md:text-xl max-w-2xl mx-auto tracking-wide mb-10 text-balance font-sans">
              {t("subheadline")}
            </p>

            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-extrabold rounded-full text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(224,122,58,0.3)] transition-all duration-300"
            >
              <span>{t("cta")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Main Metrics Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-accent/30 hover:bg-accent/[0.01] transition-all duration-500">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-display font-black text-white tracking-tighter mb-2 uppercase">{t("metric_1_title")}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("metric_1_desc")}</p>
            </div>

            <div className="bg-white/5 border border-accent/20 rounded-3xl p-8 flex flex-col hover:border-accent/50 hover:bg-accent/[0.02] shadow-[0_0_30px_rgba(224,122,58,0.05)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-background font-mono font-bold text-[8px] px-3 py-1 tracking-widest uppercase rounded-bl-xl">HOT DATA</div>
              <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-display font-black text-white tracking-tighter mb-2 uppercase">{t("metric_2_title")}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("metric_2_desc")}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-accent/30 hover:bg-accent/[0.01] transition-all duration-500">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-3xl font-display font-black text-white tracking-tighter mb-2 uppercase">{t("metric_3_title")}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t("metric_3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.9] mb-4">
              {t("shift_title")}
            </h2>
            <p className="text-muted font-medium text-sm md:text-base uppercase tracking-wider opacity-80 max-w-2xl mx-auto">
              {t("shift_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional SEO Card */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 opacity-60 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500">
              <div className="text-[10px] font-mono tracking-widest uppercase text-muted mb-2">PAST MODEL</div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground uppercase tracking-tight mb-6 border-b border-white/10 pb-4">{t("seo_col_title")}</h3>
              <ul className="flex flex-col gap-4">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <div className="w-5 h-5 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mt-0.5">
                      <span className="text-[9px] font-bold font-mono">X</span>
                    </div>
                    <p className="text-sm md:text-base font-medium text-muted-foreground">{t(`seo_c${num}`)}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* GEO Model Card */}
            <div className="bg-white/5 border-2 border-accent/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(224,122,58,0.08)] relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/10 blur-xl rounded-full"></div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-accent font-bold mb-2">CURRENT PARADIGM</div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight mb-6 border-b border-white/10 pb-4">{t("geo_col_title")}</h3>
              <ul className="flex flex-col gap-4">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <div className="w-5 h-5 shrink-0 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <p className="text-sm md:text-base font-bold text-white">{t(`geo_c${num}`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engines & Agents Intelligence */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.9] mb-6">
                {t("engine_title")}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                {t("engine_desc")}
              </p>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* ChatGPT Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] transition-all group flex items-start gap-5">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-white/80 border border-white/10 group-hover:text-accent transition-colors">
                  <span className="font-mono text-sm font-black">GPT</span>
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed self-center">{t("engine_chatgpt")}</p>
              </div>

              {/* Google Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] transition-all group flex items-start gap-5">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-white/80 border border-white/10 group-hover:text-accent transition-colors">
                  <span className="font-mono text-sm font-black">GGL</span>
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed self-center">{t("engine_google")}</p>
              </div>

              {/* Perplexity Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] transition-all group flex items-start gap-5">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-white/80 border border-white/10 group-hover:text-accent transition-colors">
                  <span className="font-mono text-sm font-black">PPLX</span>
                </div>
                <p className="text-sm md:text-base font-medium leading-relaxed self-center">{t("engine_perplexity")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology & Product Packages */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[160px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.9] mb-4">
              {t("methodology_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* GEO Build Card */}
            <div className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 hover:border-accent/30 hover:bg-accent/[0.01] transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Layout className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-widest font-bold text-accent uppercase border border-accent/30 px-3 py-1 rounded-full bg-accent/5">PHASE 1: BUILD</span>
              </div>
              
              <h3 className="text-3xl font-display font-black text-white tracking-tight uppercase mb-1">{t("build_title")}</h3>
              <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-6">{t("build_subtitle")}</p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 flex-grow">{t("build_desc")}</p>

              <ul className="flex flex-col gap-3.5 border-t border-white/5 pt-6 mb-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <li key={num} className="flex items-start gap-3 text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                    <span className="text-white/80 font-medium">{t(`build_item${num}`)}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 border border-white/20 text-white font-bold rounded-full text-[10px] md:text-xs uppercase tracking-widest group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300"
              >
                {t("cta")}
              </a>
            </div>

            {/* GEO Maintain Card */}
            <div className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 hover:border-accent/30 hover:bg-accent/[0.01] transition-all duration-500 relative">
              <div className="absolute inset-0 rounded-3xl border border-accent/20 scale-[1.01] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <RefreshCcw className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] tracking-widest font-bold text-accent uppercase border border-accent/30 px-3 py-1 rounded-full bg-accent/5">PHASE 2: MONITOR</span>
              </div>
              
              <h3 className="text-3xl font-display font-black text-white tracking-tight uppercase mb-1">{t("maintain_title")}</h3>
              <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-6">{t("maintain_subtitle")}</p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 flex-grow">{t("maintain_desc")}</p>

              <ul className="flex flex-col gap-3.5 border-t border-white/5 pt-6 mb-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <li key={num} className="flex items-start gap-3 text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                    <span className="text-white/80 font-medium">{t(`maintain_item${num}`)}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 bg-accent text-background font-bold rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(224,122,58,0.2)]"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Banner Footer CTA */}
      <section className="pb-24 px-6 md:px-12 mt-8 max-w-5xl mx-auto w-full">
        <div className="bg-foreground text-background rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none -mb-16 -mr-16">
            <ShieldCheck size={300} strokeWidth={1} />
          </div>
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-background/10 flex items-center justify-center text-background relative z-10">
            <ShieldCheck size={32} />
          </div>
          <div className="relative z-10 flex-grow">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight uppercase leading-tight mb-3 max-w-xl text-balance">
              {t("footer_title")}
            </h3>
            <p className="text-sm md:text-base font-medium leading-relaxed opacity-80">
              {t("footer_desc")}
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-background text-foreground hover:text-accent border border-background px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <span>{t("cta")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
