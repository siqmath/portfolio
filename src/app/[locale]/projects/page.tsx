import { Navbar } from "@/components/ui/Navbar";
import { PROJECTS_REGISTRY } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ChevronRight, Layers } from "lucide-react";

export default async function ProjectsListPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <main className="flex flex-col min-h-screen bg-background selection:bg-accent selection:text-black">
      <Navbar />
      
      <section className="max-w-6xl w-full mx-auto px-8 pt-32 pb-12 mt-12">
        
        {/* HEADING */}
        <header className="mb-20 border-b border-white/5 pb-12">
          <div className="inline-flex items-center gap-2 border border-accent/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent mb-6 bg-accent/5">
            <Layers className="w-3 h-3" />
            Portfolio Archives
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-foreground tracking-tighter uppercase leading-[0.9]">
            Built to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">Transform.</span>
          </h1>
          <p className="text-muted max-w-xl mt-6 text-base md:text-lg leading-relaxed font-medium">
            {t("desc_intro") || "Technical exploration of architectures solving real problems. Click to dive into the framework and documentation of each delivery."}
          </p>
        </header>

        {/* GRID GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24">
          {PROJECTS_REGISTRY.map((project) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group flex flex-col relative bg-foreground/5 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 ${project.theme.border}`}
            >


              {/* Detail Info (Pure Typography Focus) */}
              <div className="p-12 flex flex-col flex-grow justify-between bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl min-h-[350px] relative">
                
                {/* Subtle corner ambient glow */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[120px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000 ${project.theme.tagText.replace('text', 'bg')}`} />

                <div className="relative z-10">
                  <div className={`text-[10px] font-mono font-bold tracking-[0.4em] mb-6 uppercase ${project.theme.tagText}`}>
                    {t(project.tag)}
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight mb-6 leading-[1.05] transition-transform duration-300 transform group-hover:-translate-y-0.5 group-hover:text-white">
                    {t(project.title)}
                  </h3>
                  
                  <p className="text-base md:text-lg text-muted leading-relaxed mb-8 font-medium max-w-xl">
                    {t(project.desc)}
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-foreground group-hover:translate-x-2 transition-transform duration-500">
                  <span>{t("view_case") || "View Case"}</span>
                  <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${project.theme.icon}`}>
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Linear Bottom Edge Sweep */}
              <div className={`absolute bottom-0 left-0 w-full h-[3px] transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100 ${project.theme.sweep}`} />
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}
