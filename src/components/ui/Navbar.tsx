"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after scrolling 100px
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "en" ? "pt" : "en";

  const handleTopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState({}, '', '/');
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-6 md:px-8 py-3 rounded-full border shadow-2xl transition-all duration-500 font-sans ${
        scrolled
          ? "translate-y-0 opacity-100 bg-background/70 backdrop-blur-xl border-white/10 scale-100 pointer-events-auto"
          : "-translate-y-8 opacity-0 scale-95 pointer-events-none border-transparent"
      }`}
    >
      {/* Logo MF to Top */}
      <Link 
        href="/" 
        onClick={handleTopClick} 
        className="font-display font-black tracking-tighter text-xl text-foreground hover:text-accent transition-colors"
      >
        MF
      </Link>
      
      <div className="hidden md:flex gap-6 text-xs uppercase font-bold tracking-widest">
        <Link href="#cv" className="text-foreground/70 hover:text-accent transition-colors">
          {t("timeline")}
        </Link>
        
        {/* Consultoria links to last section (#consulting) */}
        <Link href="#consulting" className="text-foreground/70 hover:text-accent transition-colors">
          {t("artifacts")}
        </Link>
        
        <Link href="/blog" className="text-foreground/70 hover:text-accent transition-colors">
          {t("blog")}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Premium Locale Picker with custom flags */}
        <Link
          href={pathname}
          locale={otherLocale}
          className="flex items-center gap-2 text-[11px] font-mono font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-accent/50 hover:bg-white/10 hover:text-accent transition-all uppercase select-none"
        >
          <span className="text-sm leading-none filter saturate-150">
            {otherLocale === "en" ? "🇮🇪" : "🇧🇷"}
          </span>
          <span>
            {otherLocale}
          </span>
        </Link>
        
        <Link href="#contact" className="hidden md:block relative overflow-hidden group px-5 py-2 bg-accent text-background font-bold uppercase tracking-widest rounded-full text-[10px] transition-transform hover:scale-105 active:scale-95">
          <span className="relative z-10">{t("contact")}</span>
        </Link>
      </div>
    </nav>
  );
}
