// Load konten .md sumber via Vite `?raw`. Semua bundled di build; cukup cepat.
import GithubSlugger from "github-slugger";
import c00 from "../content/chapters/00_Pendahuluan.md?raw";
import c01 from "../content/chapters/01_Memahami_ML_DL.md?raw";
import c02 from "../content/chapters/02_Ide_Ke_Eksperimen.md?raw";
import c03 from "../content/chapters/03_Eksperimen_Reproduksibel.md?raw";
import c04 from "../content/chapters/04_Validasi_Data.md?raw";
import c05 from "../content/chapters/05_AI_Tools_Sebagai_Pendukung.md?raw";
import c06 from "../content/chapters/06_Adopsi_Repo_Riset.md?raw";
import c07 from "../content/chapters/07_Alat_Pendukung_Ringan.md?raw";
import c08 from "../content/chapters/08_Platform_Dan_Tool_Baru.md?raw";
import c09 from "../content/chapters/09_Pengembangan_Mandiri.md?raw";
import c10 from "../content/chapters/10_Capstone_Project.md?raw";
import c11 from "../content/chapters/11_Rubrik_Penilaian.md?raw";
import c12 from "../content/chapters/12_Lampiran.md?raw";
import baselineYaml from "../content/configs/baseline.yaml?raw";
import focalFreezeYaml from "../content/configs/focal_freeze.yaml?raw";
import glossaryJson from "../content/glossary.json";

export type GlossaryEntry = { id: string; en: string; note: string };

const RAW: Record<string, string> = {
  "00": c00,
  "01": c01,
  "02": c02,
  "03": c03,
  "04": c04,
  "05": c05,
  "06": c06,
  "07": c07,
  "08": c08,
  "09": c09,
  "10": c10,
  "11": c11,
  "12": c12,
};

// Strip <details> navigasi yang ada di awal tiap file (redundant dengan nav SPA).
function stripTopNav(md: string): string {
  return md.replace(/^<details>[\s\S]*?<\/details>\s*\n?/, "").replace(/^---\s*\n/, "");
}

// Rewrite inter-module links: `01_Memahami_ML_DL.md` -> `#/modul/01`.
function rewriteLinks(md: string): string {
  return md.replace(/\((\d{2})_[^)]+?\.md(#[^)]+)?\)/g, (_m, num: string, anchor: string = "") => {
    return `(#/modul/${num}${anchor})`;
  });
}

// Rewrite relative figure paths `./figures/` -> `/ModulePembelajaran/figures/`.
function rewriteImagePaths(md: string): string {
  return md.replace(/\(\.\/figures\//g, "(/ModulePembelajaran/figures/");
}

export function getChapterMarkdown(id: string): string {
  const raw = RAW[id];
  if (!raw) return "";
  return rewriteImagePaths(rewriteLinks(stripTopNav(raw)));
}

export function getAllChapters(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(RAW)) {
    out[key] = rewriteImagePaths(rewriteLinks(stripTopNav(RAW[key])));
  }
  return out;
}

export type HeadingEntry = { depth: number; text: string; slug: string };

// Harus sama dengan `rehype-slug` agar klik ToC cocok dengan id heading.
// rehype-slug memakai GithubSlugger (with occurrences) per dokumen.
export function extractHeadings(md: string): HeadingEntry[] {
  const lines = md.split(/\r?\n/);
  const out: HeadingEntry[] = [];
  const slugger = new GithubSlugger();
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (m) {
      const depth = m[1].length;
      const text = m[2].replace(/[`*_]/g, "").trim();
      out.push({ depth, text, slug: slugger.slug(text) });
    }
  }
  return out;
}

// Estimate baca: ~220 kata/menit Bahasa Indonesia.
export function readingMinutes(md: string): number {
  const words = md.replace(/```[\s\S]*?```/g, "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const CONFIGS = {
  baseline: baselineYaml,
  focal_freeze: focalFreezeYaml,
};

export const GLOSSARY: GlossaryEntry[] = glossaryJson as GlossaryEntry[];
