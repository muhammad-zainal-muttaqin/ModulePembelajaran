// Load konten .md sumber via Vite `?raw`. Semua bundled di build; cukup cepat.
import GithubSlugger from "github-slugger";
import c00 from "../content/chapters/00_Pendahuluan.md?raw";
import c01 from "../content/chapters/01_W1_Tabular_Output_Heads.md?raw";
import c02 from "../content/chapters/02_W2_Images_CNN_Smoke_Test.md?raw";
import c03 from "../content/chapters/03_W3_Loss_Optimizer_Evaluasi.md?raw";
import c04 from "../content/chapters/04_W4_Reproducibility_Experiment_Matrix.md?raw";
import c05 from "../content/chapters/05_W5_Sequences_RNN_LSTM.md?raw";
import c06 from "../content/chapters/06_W6_Representations_Temporal_Leakage.md?raw";
import c07 from "../content/chapters/07_W7_Text_Transformers_Repo_Adoption.md?raw";
import c08 from "../content/chapters/08_W8_Foundation_Models.md?raw";
import c09 from "../content/chapters/09_W9_Multimodal_Reasoning.md?raw";
import c10 from "../content/chapters/10_W10_Paper_Reading.md?raw";
import c11 from "../content/chapters/11_W11_Research_Framing.md?raw";
import c12 from "../content/chapters/12_Capstone_3_Minggu.md?raw";
import c13 from "../content/chapters/13_Rubrik_Penilaian.md?raw";
import c14 from "../content/chapters/14_Lampiran.md?raw";
import c15 from "../content/chapters/15_Panduan_Instruktur.md?raw";
import baselineYaml from "../content/configs/baseline.yaml?raw";
import focalFreezeYaml from "../content/configs/focal_freeze.yaml?raw";
import mlpMnistYaml from "../content/configs/mlp_mnist.yaml?raw";
import lstmTimeseriesYaml from "../content/configs/lstm_timeseries.yaml?raw";
import transformerMiniYaml from "../content/configs/transformer_mini.yaml?raw";
import aeCifarYaml from "../content/configs/ae_cifar.yaml?raw";
import glossaryJson from "../content/glossary.json";

export type GlossaryEntry = { id: string; en: string; def: string; usage: string };

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
  "13": c13,
  "14": c14,
  "15": c15,
};

// Strip <details> navigasi yang ada di awal tiap file (redundant dengan nav SPA).
function stripTopNav(md: string): string {
  return md
    .replace(/^﻿/, "")
    .replace(/^<details>[\s\S]*?<\/details>\s*\n?/, "")
    .replace(/^---\s*\n/, "");
}

// Rewrite inter-module links: `01_W1_Tabular_Output_Heads.md` -> `#/modul/01`.
function rewriteLinks(md: string): string {
  return md.replace(/\((\d{2}[a-z]?)_[^)]+?\.md(#[^)]+)?\)/g, (_m, num: string, anchor: string = "") => {
    return `(#/modul/${num}${anchor})`;
  });
}

// Rewrite relative figure paths `./figures/` -> `/ModulePembelajaran/figures/`.
function rewriteImagePaths(md: string): string {
  return md.replace(/\(\.\/figures\//g, "(/figures/");
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
  mlp_mnist: mlpMnistYaml,
  lstm_timeseries: lstmTimeseriesYaml,
  transformer_mini: transformerMiniYaml,
  ae_cifar: aeCifarYaml,
};

export const GLOSSARY: GlossaryEntry[] = glossaryJson as GlossaryEntry[];
