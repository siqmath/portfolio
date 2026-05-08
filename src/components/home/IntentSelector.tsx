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
  pm: "pm",
  projectmanager: "pm",
  bizdev: "founder",
};

// Maps a role to highlighted timeline item indices
// Index order after adding Nova Habitar:
// 0 = Nova Habitar, 1 = Avolta, 2 = KQ, 3 = PROINFRA, 4 = UFJF, 5 = Bromberg, 6 = CEFET
export const ROLE_TO_HIGHLIGHTED: Record<Role, number[]> = {
  pm: [0, 1],           // Nova Habitar + Avolta
  projectmanager: [1, 3], // Avolta + PROINFRA
  bizdev: [0, 2],        // Nova Habitar + KQ
};

function IntentSelectorInner() {
  const t = useTranslations("IntentSelector");
  const router = useRouter();
  const searchParams = useSearchParams();

  const intent = searchParams.get("intent") as Intent | null;
  const role = searchParams.get("role") as Role | null;
  const context = searchParams.get("context") as Context | null;

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
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

  const isComplete = !!(intent && role && context);
  const waUrl = isComplete ? buildWhatsAppUrl(intent!, role!, context!) : "#";

  const chipBase =
    "px-4 py-2 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase border transition-all duration-200 cursor-pointer select-none";
  const chipActive =
    "bg-[#E8724A] border-[#E8724A] text-white shadow-md shadow-[#E8724A]/30";
  const chipInactive =
    "bg-transparent border-background/25 text-background/55 hover:border-background/60 hover:text-background/80";

  return (
    <div className="flex flex-col gap-7">
      {/* Badge */}
      <div className="border border-background/20 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-background/60 self-start mb-1">
        {t("badge")}
      </div>

      {/* Row 1: Intent */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          {t("row_1")}
        </span>
        <div className="flex flex-wrap gap-2">
          {(["explore", "hire"] as Intent[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("intent", val)}
              className={`${chipBase} ${intent === val ? chipActive : chipInactive}`}
            >
              {t(val)}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Role */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          {t("row_2")}
        </span>
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
