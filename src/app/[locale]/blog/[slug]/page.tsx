import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Link } from "@/i18n/routing";

export default async function BlogPost(props: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await props.params;

  const contentDir = path.join(process.cwd(), "src/content", locale, "blog");
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl w-full mx-auto px-8 py-32 mt-12 flex flex-col">
        <Link href="/blog" className="text-muted font-mono text-sm hover:text-accent flex items-center gap-2 mb-12">
          ← Back to Vault
        </Link>

        {data.date && <div className="font-mono text-accent text-sm mb-4">{data.date}</div>}
        <h1 className="text-3xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-8">
          {data.title || slug}
        </h1>
        {data.description && <p className="text-muted text-lg mb-12 border-l-2 border-accent pl-4">{data.description}</p>}

        <div className="prose-c-level flex flex-col gap-6 font-sans text-foreground/90 leading-relaxed">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground font-display" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-10 mb-4 text-foreground" {...props} />,
              p: ({node, ...props}) => <p className="mb-4" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-6 italic text-muted mt-8 mb-8 bg-foreground/5 p-4 rounded-r-lg" {...props} />
            }}
          >
            {content}
          </Markdown>
        </div>
      </article>
    </main>
  );
}
