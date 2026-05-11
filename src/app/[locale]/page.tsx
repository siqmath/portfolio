import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/home/Hero";
import { Radial } from "@/components/home/Radial";
import { Projects } from "@/components/home/Projects";
import { Philosophy } from "@/components/home/Philosophy";
import { Timeline } from "@/components/home/Timeline";
import { Consulting } from "@/components/home/Consulting";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Radial />
      <Projects />
      <Philosophy />
      <Timeline />
      <Consulting />
    </main>
  );
}
