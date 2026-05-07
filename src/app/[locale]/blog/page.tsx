import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Link } from "@/i18n/routing";
import { Navbar } from "@/components/ui/Navbar";

export default async function BlogIndex(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  const contentDir = path.join(process.cwd(), "src/content", locale, "blog");
  let posts: any[] = [];
  
  if(fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
      posts = files.map(filename => {
        const filePath = path.join(contentDir, filename);
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(rawContent);
        return {
          slug: filename.replace('.md', ''),
          title: data.title || filename,
          date: data.date,
          description: data.description
        };
      });
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <section className="max-w-4xl w-full mx-auto px-8 py-32 mt-12 flex flex-col gap-12">
        <h1 className="text-4xl font-display font-medium text-foreground tracking-tight border-b border-muted/20 pb-6 uppercase">
          Obsidian Subsystem <span className="text-accent text-sm ml-2">[{posts.length} Nodes]</span>
        </h1>
        
        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="flex flex-col p-6 rounded-[1rem] bg-foreground/5 border border-muted/10 hover:border-accent/50 transition-colors group"
            >
              <div className="font-mono text-xs text-muted mb-2">{post.date}</div>
              <h2 className="text-2xl font-bold font-sans group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-foreground/70 font-sans mt-2">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
