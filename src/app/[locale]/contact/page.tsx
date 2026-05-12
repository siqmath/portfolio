import { Navbar } from "@/components/ui/Navbar";
import { getTranslations } from "next-intl/server";
import { MessageCircle, Mail, MapPin, Briefcase, Copy, CheckCircle, Globe, Clock } from "lucide-react";
import ContactActions from "./ContactActions"; // Separate client component for interactions

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const email = "me@matheus.ie";
  const phoneRaw = "353830693753";
  const waLink = `https://wa.me/${phoneRaw}`;

  return (
    <main className="min-h-screen bg-background flex flex-col selection:bg-accent selection:text-black">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-32 px-6 md:px-12 relative overflow-hidden mt-8">
        
        {/* Background atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-3xl w-full relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6 bg-white/5">
              <Globe className="w-3 h-3" />
              Global Delivery Network
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-4">
              {t("title")}
            </h1>
            <p className="text-muted font-medium text-sm md:text-base tracking-wide font-sans uppercase opacity-70">
              {t("subtitle")}
            </p>
          </div>

          {/* Main Content Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp Direct Connection */}
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between aspect-square hover:border-accent/50 hover:bg-accent/[0.02] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-accent/20 transition-colors">
                <MessageCircle size={100} strokeWidth={1} />
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-[10px] font-mono tracking-widest uppercase text-muted mb-1">{t("phone_label")}</h3>
                <p className="text-xl font-display font-bold text-foreground tracking-tight">+353 83 069 3753</p>
              </div>
              
              <div className="mt-auto flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-accent">
                <span>{t("cta_whatsapp")}</span>
                <div className="w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <MessageCircle size={12} />
                </div>
              </div>
            </a>

            {/* Grid Stack: Email, Location, LinkedIn */}
            <div className="flex flex-col gap-6 h-full">
              
              {/* Email Component (Hydrates locally for copy features) */}
              <ContactActions 
                email={email} 
                emailLabel={t("email_label")} 
                copyLabel={t("cta_copy_email")}
                successLabel={t("copy_success")}
              />

              {/* Nested Grid for Location and LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                {/* Location Context */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono tracking-widest uppercase text-muted mb-1">{t("location_label")}</h3>
                    <p className="text-sm font-bold font-display text-foreground uppercase tracking-wider leading-tight">Waterford, Ireland</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground font-mono">
                      <Clock size={10} />
                      <span>{t("timezone_note")}</span>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Direct Portal */}
                <a 
                  href="https://www.linkedin.com/in/matheusfern/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden group hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/[0.03] transition-all"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-[#0A66C2] group-hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono tracking-widest uppercase text-muted mb-1">Network</h3>
                    <p className="text-sm font-bold font-display text-foreground uppercase tracking-wider leading-tight group-hover:text-[#0A66C2] transition-colors">LinkedIn</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>/matheusfern</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Panel: Availability Status */}
          <div className="mt-6 bg-foreground text-background rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none -mb-12 -mr-12">
              <Briefcase size={200} strokeWidth={1} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center text-background relative z-10">
              <Briefcase size={28} />
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-xs font-mono font-black tracking-[0.2em] uppercase opacity-60 mb-2">{t("availability_label")}</h3>
              <p className="text-base md:text-lg font-display font-bold leading-tight tracking-tight uppercase max-w-xl text-balance">
                {t("availability_desc")}
              </p>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase animate-pulse shadow-xl shadow-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Active
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
