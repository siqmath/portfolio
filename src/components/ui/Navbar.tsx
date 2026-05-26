"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Reliable SVG Flags to fix Windows emoji support issues
const FlagIE = () => (
  <svg viewBox="0 0 6 3" className="w-4 h-2.5 rounded-sm shadow-sm">
    <rect width="2" height="3" fill="#169B62"/>
    <rect x="2" width="2" height="3" fill="#ffffff"/>
    <rect x="4" width="2" height="3" fill="#FF883E"/>
  </svg>
);

const FlagBR = () => (
  <svg viewBox="0 0 720 504" className="w-4 h-2.5 rounded-sm shadow-sm">
    <rect width="720" height="504" fill="#009c3b"/>
    <polygon points="360,48 672,252 360,456 48,252" fill="#ffdf00"/>
    <circle cx="360" cy="252" r="100.8" fill="#002776"/>
  </svg>
);

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleTopClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: pathname === "/" ? "#cv" : `/${locale}/#cv`, label: t("timeline") },
    { href: "/projects", label: t("artifacts") },
    { href: "/blog", label: t("blog") },
    { href: "/GEO", label: t("geo") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border shadow-2xl transition-all duration-500 font-sans ${
          scrolled || mobileMenuOpen
            ? "translate-y-0 opacity-100 bg-background/80 backdrop-blur-xl border-white/10 pointer-events-auto"
            : "-translate-y-8 opacity-0 pointer-events-none border-transparent"
        }`}
      >
        <Link 
          href="/" 
          onClick={(e) => { handleTopClick(e); setMobileMenuOpen(false); }} 
          className="font-display font-black tracking-tighter text-xl text-foreground hover:text-white transition-colors"
        >
          MF
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 items-center text-[10px] md:text-xs uppercase font-bold tracking-widest">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx}
              href={link.href} 
              className={`text-foreground/60 hover:text-white transition-colors ${link.href.includes("contact") ? "text-white opacity-100 font-extrabold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden text-foreground hover:text-accent transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
  
        <div className="flex items-center gap-3 pl-2 border-l border-white/10">
          {/* DYNAMIC EXPANDING LANGUAGE SELECTOR */}
          <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/5 overflow-hidden">
            
            {/* PT BUTTON */}
            <Link 
              href={pathname} 
              locale="pt"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-[10px] font-black uppercase tracking-wider ${
                locale === "pt" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <AnimatePresence mode="wait">
                {(isHovered || mobileMenuOpen) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex shrink-0 overflow-hidden"
                  >
                    <FlagBR />
                  </motion.div>
                )}
              </AnimatePresence>
              <span>PT</span>
            </Link>
  
            {/* EN BUTTON */}
            <Link 
              href={pathname} 
              locale="en"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-[10px] font-black uppercase tracking-wider ${
                locale === "en" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <AnimatePresence mode="wait">
                {(isHovered || mobileMenuOpen) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex shrink-0 overflow-hidden"
                  >
                    <FlagIE />
                  </motion.div>
                )}
              </AnimatePresence>
              <span>EN</span>
            </Link>
  
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center px-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-3xl font-black uppercase tracking-widest text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
