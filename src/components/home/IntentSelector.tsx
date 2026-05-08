"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, ChevronRight } from "lucide-react";
import { NodeKey } from "@/components/ui/radial-orbital-timeline";

type Intent = "explore" | "hire";
type Role = "pm" | "projectmanager" | "bizdev";
type Context = "project" | "recruiter";

const WHATSAPP_NUMBER = "353830693753";

const WA_TEXTS: Record<string, string> = {
  "hire-pm-project":
    "Olá Matheus! Vi seu portfólio e quero conversar sobre contratar você como Product Manager para um projeto específico.",
  "hire-pm-recruiter":
    "Olá Matheus! Sou recrutador(a) e quero conversar sobre uma oportunidade de Product Manager.",
  "hire-projectmanager-project":
    "Olá Matheus! Vi seu portfólio e tenho interesse em você como Project Manager para um projeto.",
  "hire-projectmanager-recruiter":
    "Olá Matheus! Sou recrutador(a) e quero conversar sobre uma vaga de Project Manager.",
  "hire-bizdev-project":
    "Olá Matheus! Vi seu portfólio e quero conversar sobre uma oportunidade de Business Development.",
  "hire-bizdev-recruiter":
    "Olá Matheus! Sou recrutador(a) e quero falar sobre uma posição de Business Developer.",
  "explore-pm-project":
    "Olá Matheus! Vi seu portfólio e quero saber mais sobre seu trabalho como Product Manager.",
  "explore-pm-recruiter":
    "Olá Matheus! Vi seu portfólio e quero conhecer mais sobre seu perfil.",
  "explore-projectmanager-project":
    "Olá Matheus! Vi seu portfólio e quero saber mais sobre seu trabalho em gestão de projetos.",
  "explore-projectmanager-recruiter":
    "Olá Matheus! Vi seu portfólio e quero conhecer mais sobre seu perfil.",
  "explore-bizdev-project":
    "Olá Matheus! Vi seu portfólio e quero saber mais sobre sua experiência em Business Development.",
  "explore-bizdev-recruiter":
    "Olá Matheus! Vi seu portfólio e quero conhecer mais sobre seu perfil.",
};

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

function buildWhatsAppUrl(
  intent: string,
  role: string,
  context: string
): string {
  const key = `${intent}-${role}-${context}`;
  const text = WA_TEXTS[key] ?? "Olá Matheus! Vi seu portfólio e quero entrar em contato.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const CTA_LABELS: Record<string, string> = {
  "hire-pm": "Falar sobre Product Manager",
  "hire-projectmanager": "Falar sobre Project Manager",
  "hire-bizdev": "Falar sobre Business Dev",
  "explore-pm": "Conhecer mais →",
  "explore-projectmanager": "Conhecer mais →",
  "explore-bizdev": "Conhecer mais →",
};

function getCTALabel(intent: string | null, role: string | null): string {
  if (!intent || !role) return "Selecione as opções acima";
  return CTA_LABELS[`${intent}-${role}`] ?? "Entrar em contato";
}

function IntentSelectorInner() {
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
        Qual o seu contexto?
      </div>

      {/* Row 1: Intent */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          Eu quero
        </span>
        <div className="flex flex-wrap gap-2">
          {(["explore", "hire"] as Intent[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("intent", val)}
              className={`${chipBase} ${intent === val ? chipActive : chipInactive}`}
            >
              {val === "explore" ? "Conhecer mais" : "Contratar"}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Role */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          um
        </span>
        <div className="flex flex-wrap gap-2">
          {(["pm", "projectmanager", "bizdev"] as Role[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("role", val)}
              className={`${chipBase} ${role === val ? chipActive : chipInactive}`}
            >
              {val === "pm"
                ? "Product Manager"
                : val === "projectmanager"
                ? "Project Manager"
                : "Business Developer"}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: Context */}
      <div className="flex flex-col gap-3">
        <span className="text-background/40 font-mono text-[10px] tracking-widest uppercase">
          para
        </span>
        <div className="flex flex-wrap gap-2">
          {(["project", "recruiter"] as Context[]).map((val) => (
            <button
              key={val}
              onClick={() => updateParams("context", val)}
              className={`${chipBase} ${context === val ? chipActive : chipInactive}`}
            >
              {val === "project" ? "Um projeto específico" : "Como recrutador(a)"}
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
            Selecione as opções acima
          </div>
        )}
        <p className="mt-3 text-background/30 font-mono text-[10px] tracking-wider">
          → O link que você enviar já virá pré-configurado
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
