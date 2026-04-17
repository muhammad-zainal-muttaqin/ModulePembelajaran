// Metadata 13 bab. Konten aktual dari src/content/chapters/*.md (di-import raw).

export type Sikap = "curiosity" | "rigor" | "skepticism" | "ownership";

export type ChapterMeta = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  weeks: string;
  weekNumbers: number[];
  sikap: Sikap[];
  labName: string | null;
  filename: string;
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "00",
    number: 0,
    title: "Pendahuluan",
    subtitle: "Orientasi, sikap, kontrak belajar",
    weeks: "1",
    weekNumbers: [1],
    sikap: ["curiosity"],
    labName: null,
    filename: "00_Pendahuluan.md",
  },
  {
    id: "01",
    number: 1,
    title: "Memahami ML/DL",
    subtitle: "Arsitektur, loss, optimisasi, evaluasi, representasi",
    weeks: "2-3",
    weekNumbers: [2, 3],
    sikap: ["curiosity"],
    labName: "Lab 1 - Baseline CNN",
    filename: "01_Memahami_ML_DL.md",
  },
  {
    id: "02",
    number: 2,
    title: "Ide ke Eksperimen",
    subtitle: "Menerjemahkan instruksi terbuka menjadi rancangan konkret",
    weeks: "4",
    weekNumbers: [4],
    sikap: ["curiosity", "rigor"],
    labName: "Lab 2 - Loss + Freeze Ablation",
    filename: "02_Ide_Ke_Eksperimen.md",
  },
  {
    id: "03",
    number: 3,
    title: "Eksperimen Reproduksibel",
    subtitle: "Config, seed, logging, ablation",
    weeks: "5-6",
    weekNumbers: [5, 6],
    sikap: ["rigor"],
    labName: "Lab 3 - Config + Logging",
    filename: "03_Eksperimen_Reproduksibel.md",
  },
  {
    id: "04",
    number: 4,
    title: "Validasi Data",
    subtitle: "EDA, leakage, audit pipeline pra-pemrosesan",
    weeks: "7",
    weekNumbers: [7],
    sikap: ["skepticism"],
    labName: "Lab 4 - EDA + Leakage Audit",
    filename: "04_Validasi_Data.md",
  },
  {
    id: "05",
    number: 5,
    title: "AI Tools Sebagai Pendukung",
    subtitle: "LLM dan Copilot sebagai rubber duck, bukan penggantimu",
    weeks: "8",
    weekNumbers: [8],
    sikap: ["ownership"],
    labName: "Lab 5 - LLM-Assisted Loop",
    filename: "05_AI_Tools_Sebagai_Pendukung.md",
  },
  {
    id: "06",
    number: 6,
    title: "Adopsi Repo Riset",
    subtitle: "Membaca, menjalankan, memodifikasi repo orang lain",
    weeks: "9",
    weekNumbers: [9],
    sikap: ["ownership", "curiosity"],
    labName: "Lab 6 - Adopt External Repo",
    filename: "06_Adopsi_Repo_Riset.md",
  },
  {
    id: "07",
    number: 7,
    title: "Alat Pendukung Ringan",
    subtitle: "Streamlit, Gradio, visualizer sederhana",
    weeks: "10",
    weekNumbers: [10],
    sikap: ["ownership"],
    labName: "Lab 7 - Streamlit Demo",
    filename: "07_Alat_Pendukung_Ringan.md",
  },
  {
    id: "08",
    number: 8,
    title: "Platform & Tool Baru",
    subtitle: "RunPod, SSH, manajemen checkpoint lintas mesin",
    weeks: "11",
    weekNumbers: [11],
    sikap: ["ownership", "curiosity"],
    labName: "Lab 8 - RunPod Remote",
    filename: "08_Platform_Dan_Tool_Baru.md",
  },
  {
    id: "09",
    number: 9,
    title: "Pengembangan Mandiri",
    subtitle: "Baca paper, formulasi pertanyaan, pre-registration",
    weeks: "12",
    weekNumbers: [12],
    sikap: ["curiosity", "rigor", "skepticism", "ownership"],
    labName: "Lab 9 - Paper to Experiment",
    filename: "09_Pengembangan_Mandiri.md",
  },
  {
    id: "10",
    number: 10,
    title: "Capstone Project",
    subtitle: "Integrasi empat sikap, tiga template pilihan",
    weeks: "13-14",
    weekNumbers: [13, 14],
    sikap: ["curiosity", "rigor", "skepticism", "ownership"],
    labName: "Capstone",
    filename: "10_Capstone_Project.md",
  },
  {
    id: "11",
    number: 11,
    title: "Rubrik Penilaian",
    subtitle: "4-level mastery: novice, developing, proficient, masterpiece",
    weeks: "-",
    weekNumbers: [],
    sikap: ["rigor"],
    labName: null,
    filename: "11_Rubrik_Penilaian.md",
  },
  {
    id: "12",
    number: 12,
    title: "Lampiran",
    subtitle: "Glosarium ID-EN, checklist, template",
    weeks: "-",
    weekNumbers: [],
    sikap: ["rigor"],
    labName: null,
    filename: "12_Lampiran.md",
  },
];

export const COMPETENCIES = [
  { n: 1, title: "Memahami sistem ML/DL dalam praktiknya", chapter: "01", weeks: "2-3" },
  { n: 2, title: "Menerjemahkan ide menjadi eksperimen", chapter: "02", weeks: "4" },
  { n: 3, title: "Eksperimen reproduksibel", chapter: "03", weeks: "5-6" },
  { n: 4, title: "Validasi data dan pra-pemrosesan", chapter: "04", weeks: "7" },
  { n: 5, title: "AI tools sebagai pendukung", chapter: "05", weeks: "8" },
  { n: 6, title: "Adopsi repository riset asing", chapter: "06", weeks: "9" },
  { n: 7, title: "Membuat alat pendukung riset ringan", chapter: "07", weeks: "10" },
  { n: 8, title: "Mengadopsi platform dan tool baru", chapter: "08", weeks: "11" },
  { n: 9, title: "Berkembang mandiri", chapter: "09", weeks: "12" },
];

export const SIKAP_META: Record<Sikap, { label: string; color: string; tagline: string; essence: string }> = {
  curiosity: {
    label: "Curiosity",
    color: "curiosity",
    tagline: "Rasa ingin tahu yang gelisah",
    essence: "Bertanya 'mengapa' sebelum menerima hasil.",
  },
  rigor: {
    label: "Rigor",
    color: "rigor",
    tagline: "Disiplin dalam prosedur",
    essence: "Satu variabel berubah, semua jejak tersimpan, tiap angka bisa dilacak.",
  },
  skepticism: {
    label: "Skepticism",
    color: "skepticism",
    tagline: "Kesediaan tidak percaya angka sendiri",
    essence: "Akurasi 99% di hari pertama bukan kabar baik, itu lampu merah.",
  },
  ownership: {
    label: "Ownership",
    color: "ownership",
    tagline: "Rasa memiliki yang melampaui alat",
    essence: "LLM boleh menulis kode, tanggung jawab tetap kamu.",
  },
};

export const EXPECTED_OUTCOMES = [
  "Memahami sistem ML/DL praktis pada level penelitian.",
  "Menerjemahkan ide penelitian dan instruksi PI menjadi eksperimen konkret.",
  "Melaksanakan eksperimen dengan benar dan dapat direproduksi.",
  "Memeriksa data dan memvalidasi prapemrosesan sebelum mempercayai hasilnya.",
  "Menggunakan tools AI sebagai support penelitian tanpa outsource pemikiran.",
  "Mengadopsi dan menyesuaikan research repository yang tidak dikenal secara mandiri.",
  "Membuat alat pendukung penelitian yang ringan dengan cepat.",
  "Mengadopsi platform dan tool baru sesuai kebutuhan.",
  "Berkembang dan berkontribusi secara mandiri.",
];

export function chapterById(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function nextChapter(id: string): ChapterMeta | undefined {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return i >= 0 && i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : undefined;
}

export function prevChapter(id: string): ChapterMeta | undefined {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return i > 0 ? CHAPTERS[i - 1] : undefined;
}
