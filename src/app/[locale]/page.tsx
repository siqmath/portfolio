import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Timeline } from "@/components/home/Timeline";
import { Mechanics } from "@/components/home/Mechanics";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Philosophy />
      {/* Fase 3: Timeline Dossier */}
      <Timeline />
      {/* Fase 4: Mechanics and Blog */}
      <Mechanics />
    </main>
  );
}
