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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "en" ? "pt" : "en";

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-8 py-3 rounded-full border transition-all duration-300 font-sans ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-muted/20 shadow-lg text-foreground"
          : "bg-transparent border-transparent text-foreground"
      }`}
    >
      <Link href="/" className="font-display font-bold tracking-tight text-lg hover:text-accent transition-colors">MF</Link>
      
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="#cv" className="hover:-translate-y-[1px] hover:text-accent transition-transform">
          {t("timeline")}
        </Link>
        <Link href="#mechanics" className="hover:-translate-y-[1px] hover:text-accent transition-transform">
          {t("artifacts")}
        </Link>
        <Link href="/blog" className="hover:-translate-y-[1px] hover:text-accent transition-transform">
          {t("blog")}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href={pathname}
          locale={otherLocale}
          className="text-xs font-mono font-bold px-2 py-1 bg-muted/10 rounded-sm hover:bg-accent hover:text-background transition-colors uppercase"
        >
          {otherLocale}
        </Link>
        
        <button className="hidden md:block relative overflow-hidden group px-5 py-2 bg-foreground text-background font-medium rounded-full text-sm">
          <span className="relative z-10 transition-colors group-hover:text-foreground">{t("contact")}</span>
          <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </nav>
  );
}
