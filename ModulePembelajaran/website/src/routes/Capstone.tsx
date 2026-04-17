import { useMemo } from "react";
import { getChapterMarkdown } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function Capstone() {
  const markdown = useMemo(() => getChapterMarkdown("10"), []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <div className="text-sm font-mono text-rigor dark:text-curiosity mb-2">Minggu 13-14</div>
        <h1 className="font-serif text-display font-semibold mb-3">Capstone Project</h1>
        <p className="text-lg text-ink/75 dark:text-parchment/80 leading-relaxed">
          Integrasi empat sikap dalam satu proyek akhir. Pilih satu dari tiga template (ablation ketat, adopsi repo, alat pendukung).
        </p>
      </header>

      <MarkdownRenderer markdown={markdown} />
    </div>
  );
}
