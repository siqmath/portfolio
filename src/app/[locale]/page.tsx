import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/home/Hero";
import { Radial } from "@/components/home/Radial";
import { Projects } from "@/components/home/Projects";
import { Philosophy } from "@/components/home/Philosophy";
import { Timeline } from "@/components/home/Timeline";
import { BlogPreview } from "@/components/home/BlogPreview";

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Radial />
      <Projects />
      <Philosophy />
      <Timeline />
      <BlogPreview locale={locale} />
    </main>
  );
}
