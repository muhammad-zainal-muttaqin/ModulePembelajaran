// Sync sumber modul (.md) + template configs (.yaml) dari folder induk ke src/content/
// Jalan otomatis via `npm run dev` dan `npm run build`.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.resolve(ROOT, "..");
const OUT = path.resolve(ROOT, "src", "content");

const CHAPTERS = [
  "00_Pendahuluan.md",
  "01_Memahami_ML_DL.md",
  "02_Ide_Ke_Eksperimen.md",
  "03_Eksperimen_Reproduksibel.md",
  "04_Validasi_Data.md",
  "05_AI_Tools_Sebagai_Pendukung.md",
  "06_Adopsi_Repo_Riset.md",
  "07_Alat_Pendukung_Ringan.md",
  "08_Platform_Dan_Tool_Baru.md",
  "09_Pengembangan_Mandiri.md",
  "10_Capstone_Project.md",
  "11_Rubrik_Penilaian.md",
  "12_Lampiran.md",
];

const CONFIGS = [
  ["template_repo/configs/baseline.yaml", "baseline.yaml"],
  ["template_repo/configs/focal_freeze.yaml", "focal_freeze.yaml"],
];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyFile(src, dest) {
  try {
    const data = await fs.readFile(src, "utf8");
    await fs.writeFile(dest, data, "utf8");
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(`[sync] missing: ${src}`);
      return null;
    }
    throw err;
  }
}

// Parse tabel ID<->EN dari 12_Lampiran.md untuk glossary.
function parseGlossary(md) {
  const entries = [];
  const lines = md.split(/\r?\n/);
  let inTable = false;
  let headerSeen = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      if (!headerSeen) {
        const isHeader = cells.some((c) => /indonesia/i.test(c)) && cells.some((c) => /inggris|english/i.test(c));
        if (isHeader) {
          headerSeen = true;
          inTable = true;
        }
        continue;
      }
      if (inTable) {
        if (cells.every((c) => /^-+$/.test(c))) continue;
        if (cells.length >= 2 && cells[0] && cells[1] && !/^-+$/.test(cells[0])) {
          const [id, en, note] = cells;
          entries.push({ id, en, note: note || "" });
        }
      }
    } else if (inTable && trimmed === "") {
      inTable = false;
      headerSeen = false;
    }
  }
  return entries;
}

async function copyDir(srcDir, destDir) {
  await ensureDir(destDir);
  let entries;
  try {
    entries = await fs.readdir(srcDir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    if (entry.isFile()) {
      await copyFile(path.join(srcDir, entry.name), path.join(destDir, entry.name));
    }
  }
}

async function main() {
  await ensureDir(path.join(OUT, "chapters"));
  await ensureDir(path.join(OUT, "configs"));

  let appendixMd = null;
  for (const name of CHAPTERS) {
    const src = path.join(SOURCE, name);
    const dest = path.join(OUT, "chapters", name);
    const data = await copyFile(src, dest);
    if (name === "12_Lampiran.md") appendixMd = data;
  }

  for (const [rel, out] of CONFIGS) {
    const src = path.join(SOURCE, rel);
    const dest = path.join(OUT, "configs", out);
    await copyFile(src, dest);
  }

  if (appendixMd) {
    const glossary = parseGlossary(appendixMd);
    await fs.writeFile(path.join(OUT, "glossary.json"), JSON.stringify(glossary, null, 2), "utf8");
    console.log(`[sync] glossary: ${glossary.length} entries`);
  }

  const figSrc = path.join(SOURCE, "figures");
  const figDest = path.join(ROOT, "public", "figures");
  await copyDir(figSrc, figDest);

  console.log(`[sync] chapters: ${CHAPTERS.length}, configs: ${CONFIGS.length}`);
}

main().catch((err) => {
  console.error("[sync] failed:", err);
  process.exit(1);
});
