import { useMemo } from "react";
import { getChapterMarkdown } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function Capstone() {
  const markdown = useMemo(() => getChapterMarkdown("12"), []);

  return (
    <div className="page-narrow">
      <header className="page-header">
        <div className="eyebrow">Minggu 13-14</div>
        <h1 className="page-title">Capstone Project</h1>
        <p className="page-lead">
          Integrasi empat sikap dalam satu proyek akhir. Pilih satu dari tiga template (ablation ketat, adopsi repo, alat pendukung).
        </p>
      </header>

      <MarkdownRenderer markdown={markdown} />
    </div>
  );
}
