import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Link } from "@/i18n/routing";
import { ChevronRight, BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export async function BlogPreview({ locale }: { locale: string }) {
  const t = await getTranslations("HomeBlog");
  
  const contentDir = path.join(process.cwd(), "src/content", locale, "blog");
  let posts: Post[] = [];
  
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    posts = files.map(filename => {
      const filePath = path.join(contentDir, filename);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(rawContent);
      return {
        slug: filename.replace('.md', ''),
        title: data.title || filename,
        date: data.date || "",
        description: data.description || ""
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="w-full flex justify-center py-32 bg-background relative border-t border-white/5">
      <div className="max-w-5xl w-full px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 border border-muted/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-muted mb-4">
              <BookOpen size={10} className="text-accent" />
              Obsidian Subsystem
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-foreground">
              {t("title") || "Pensamento Crítico"}
            </h2>
          </div>
          
          <Link href="/blog" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted hover:text-accent transition-colors">
            {t("view_all") || "Ver Todo o Brain"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col p-8 rounded-2xl bg-foreground/[0.03] border border-white/5 hover:border-accent/30 hover:bg-foreground/[0.05] transition-all duration-500 h-full overflow-hidden"
            >
              {/* Ambient Glow on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="font-mono text-[10px] text-muted mb-4 tracking-widest">[{post.date}]</div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-sm text-muted/80 leading-relaxed line-clamp-3 mt-auto">
                {post.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted group-hover:text-foreground transition-colors">Read Entry</span>
                <ChevronRight className="w-4 h-4 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
