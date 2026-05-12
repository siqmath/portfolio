"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { NodeKey } from "@/components/ui/radial-orbital-timeline";

type Intent = "explore" | "hire";
type Role = "pm" | "projectmanager" | "bizdev";
type Context = "project" | "recruiter";

const WHATSAPP_NUMBER = "353830693753";

// Maps a role chip to the node key in the RadialOrbitalTimeline
export const ROLE_TO_NODE: Record<Role, NodeKey> = {
  pm: "product", // Maps directly to Product Strategy & Ops node as requested
  projectmanager: "pm",
  bizdev: "founder",
};

// Maps a role to highlighted timeline item indices
export const ROLE_TO_HIGHLIGHTED: Record<Role, number[]> = {
  pm: [0, 1],
  projectmanager: [1, 3],
  bizdev: [0, 2],
};

function IntentSelectorInner() {
  const t = useTranslations("IntentSelector");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hardcode intent to 'hire' implicitly as we removed the selection row
  const intent = "hire"; 
  const role = searchParams.get("role") as Role | null;
  const context = searchParams.get("context") as Context | null;

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    // Also make sure intent=hire is kept in params implicitly so parsing downstream works
    params.set("intent", "hire");
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function buildWhatsAppUrl(
    intent: string,
    role: string,
    context: string
  ): string {
    const key = `wa_${intent}_${role}_${context}`;
    const text = t(key);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  function getCTALabel(intent: string | null, role: string | null): string {
    if (!intent || !role) return t("incomplete");
    const key = `cta_${intent}_${role}`;
    return t(key);
  }

  const isComplete = !!(role && context);
  const waUrl = isComplete ? buildWhatsAppUrl(intent, role!, context!) : "#";

  const chipBase =
    "px-4 py-2 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase border transition-all duration-200 cursor-pointer select-none";
  const chipActive =
    "bg-[#E8724A] border-[#E8724A] text-white shadow-md shadow-[#E8724A]/30";
  const chipInactive =
    "bg-transparent border-background/25 text-background/55 hover:border-background/60 hover:text-background/80";

  return (
    <div className="flex flex-col gap-7">
      {/* Prominent Highlighted Headline */}
      <div className="flex flex-col gap-2">
        <h3 className="text-background text-2xl md:text-3xl font-display font-bold tracking-tight leading-tight max-w-md">
          {t("row_2")}
        </h3>
      </div>

      {/* Row 2: Role Chips */}
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex flex-wrap gap-2">
          {(["pm", "projectmanager", "bizdev"] as Role[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("role", val)}
              className={`${chipBase} ${role === val ? chipActive : chipInactive}`}
            >
              {t(val)}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: Context */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          {t("row_3")}
        </span>
        <div className="flex flex-wrap gap-2">
          {(["project", "recruiter"] as Context[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("context", val)}
              className={`${chipBase} ${context === val ? chipActive : chipInactive}`}
            >
              {t(val)}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-2">
        {isComplete ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#E8724A] text-white font-bold rounded-full text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#E8724A]/30"
          >
            <MessageCircle size={15} />
            {getCTALabel(intent, role)}
            <ChevronRight size={13} />
          </a>
        ) : (
          <div className="inline-flex items-center gap-3 px-8 py-4 border border-background/20 text-background/30 font-bold rounded-full text-[10px] uppercase tracking-[0.2em]">
            <MessageCircle size={15} />
            {t("incomplete")}
          </div>
        )}
        <p className="mt-3 text-background/30 font-mono text-[10px] tracking-wider">
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}

export function IntentSelector() {
  return (
    <Suspense
      fallback={
        <div className="h-64 animate-pulse bg-background/5 rounded-xl" />
      }
    >
      <IntentSelectorInner />
    </Suspense>
  );
}
