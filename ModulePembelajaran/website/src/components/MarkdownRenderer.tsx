import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import CodeBlock from "./CodeBlock";

type Props = { markdown: string };

export default function MarkdownRenderer({ markdown }: Props) {
  return (
    <div className="prose-modul">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["anchor-link"], ariaLabel: "Tautan permanen" },
              content: { type: "text", value: "#" },
            },
          ],
        ]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const inline = !match && !String(children).includes("\n");
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            const lang = match ? match[1] : "text";
            const code = String(children).replace(/\n$/, "");
            return <CodeBlock code={code} lang={lang} />;
          },
          pre({ children }) {
            return <>{children}</>;
          },
          a({ href, children, ...props }) {
            if (href && href.startsWith("#")) {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(href.slice(1));
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  {...props}
                >
                  {children}
                </a>
              );
            }
            const isExternal = href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto scrollbar-hidden">
                <table>{children}</table>
              </div>
            );
          },
          img({ src, alt, title, ...props }) {
            const safeSrc = typeof src === "string" ? src : "";
            let fallbackAlt = alt;
            if (!fallbackAlt && safeSrc) {
              const filename = safeSrc.split(/[\\/]/).pop() || "";
              fallbackAlt = filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
              if (import.meta.env?.DEV) {
                console.warn(`[MarkdownRenderer] Image without alt text: ${safeSrc}`);
              }
            }
            return (
              <img
                src={safeSrc}
                alt={fallbackAlt || ""}
                title={title}
                loading="lazy"
                decoding="async"
                {...props}
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
