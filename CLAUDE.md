# [CLAUDE.md](http://CLAUDE.md)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tujuan Proyek

Modul pembelajaran semester 14-minggu untuk mahasiswa S1 (semester 4–6) yang menjadi **asisten dosen riset ML/DL**. Fokus bukan pada framework, tetapi pada empat sikap riset: **Curiosity, Rigor, Skepticism, Ownership**. Referensi utama: `EXPECTED_OUTCOME.txt` (9 outcome), `TODO.txt` (konteks dan pesan dosen).

## Struktur Konten

```
ModulePembelajaran/
├── 00–12_*.md          Bab utama (dibaca berurutan; tiap bab: Peta→Motivasi→Konsep→Worked Example→Pitfalls→Lab→Refleksi→Bacaan)
├── 11_Rubrik_Penilaian.md   4-level mastery (novice/developing/proficient/masterpiece)
├── 12_Lampiran.md           Glosarium ID↔EN, checklist, template
└── template_repo/           Skeleton repo riset yang di-fork mahasiswa
```

File sumber catatan (sudah terintegrasi ke Bab 01 sebagai Section 2.0 dan Section 2.6; file asli disimpan sebagai referensi):

- `ModulePembelajaran/Notes - 17 April 2026/petabesar.md` - konsep tensor input→output lintas domain → **Section 2.0** Bab 01
- `ModulePembelajaran/Notes - 17 April 2026/representasifitur.md` - taksonomi representasi (engineered / extracted / learned) → **Section 2.6** Bab 01

Catatan: Bab 01 kini membangun fondasi konseptual berurutan - tensor masuk→keluar (2.0), arsitektur (2.1), layer (2.2), loss (2.3), optimizer (2.4), evaluasi (2.5), representasi (2.6) - dengan 5 pertanyaan refleksi (bertambah dari 3). Rubrik Kompetensi 1 (11_Rubrik_Penilaian.md) level Proficient dan Masterpiece diperbarui untuk mencerminkan kedua aspek ini.

## Template Repo (`template_repo/`)

Skeleton educational untuk klasifikasi gambar (CIFAR-10 → PathMNIST). Filosofi: **satu file = satu peran**, config di YAML bukan kode, seed dikunci penuh, checkpoint menyertakan git hash.

### Setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e .
# atau lebih cepat:
uv venv && source .venv/bin/activate && uv pip install -e .
```

Optional extras: `pip install -e ".[demo]"` (Streamlit/Gradio), `pip install -e ".[medical]"` (PathMNIST), `pip install -e ".[dev]"` (Jupyter, ruff).

### Menjalankan Eksperimen

```bash
# Smoke test (dry-run, <1 menit CPU)
python -m src.train --config configs/baseline.yaml --dry-run

# Baseline penuh
python -m src.train --config configs/baseline.yaml --seed 42

# Varian ablation
python -m src.train --config configs/focal_freeze.yaml --seed 42
```

Output per-run masuk ke `experiments/<config_name>_seed<N>/` berisi `config.yaml`, `train.log`, `ckpt_best.pt`, `ckpt_last.pt`, `summary.json`, `tb/`.

### Linting

```bash
ruff check src/
ruff format src/
```

## Konvensi Penulisan Bab

Setiap bab mengikuti urutan tetap: Peta Bab → Motivasi → Konsep Inti → Worked Example → Pitfalls & Miskonsepsi → Lab Hands-on → Refleksi (3 pertanyaan terbuka) → Bacaan Lanjutan. Jangan ubah urutan ini.

Bahasa Indonesia. Istilah teknis ML/DL dipertahankan dalam bahasa Inggris (loss, checkpoint, seed, freeze, ablation, dll.) - tidak diterjemahkan paksa. Glosarium lengkap ada di `12_Lampiran.md`.

Sikap (Curiosity, Rigor, Skepticism, Ownership) **tidak** dibahas dalam bab khusus; ditanamkan melalui cerita pembuka, pitfall, dan pertanyaan refleksi.

## Gaya Penulisan (Style Guide)

Aturan wajib saat menambah atau mengedit konten `.md` dan sel markdown notebook:

**Tanda baca:**

- **JANGAN pakai em dash (`—`, U+2014).** Ganti dengan hyphen biasa dengan spasi `-` (pola yang dipakai seluruh modul), koma, titik dua, atau tanda kurung sesuai konteks. Em dash tidak konsisten dengan PUEBI dan gaya modul lama.
- En dash (`–`, U+2013) hanya dipakai untuk rentang numerik/minggu (mis. `2–3`, `13–14`).
- Tanda kutip pakai `"..."` lurus (ASCII), bukan `"..."` smart quotes.
- Untuk interupsi/apposisi pakai `, ... ,` atau `( ... )` atau `- ... -`.

**Bahasa:**

- Ikuti PUEBI. Istilah asing yang belum diserap di-*italicize* (mis. *hidden states*, *baseline*, *fine-tune*).
- Passive prefix `di-` pada kata asing pakai hyphen: `di-fine-tune`, `di-pretrain`, `di-freeze`.
- Kata "apapun", "siapapun" ditulis menyatu (gaya yang konsisten di seluruh modul).

**Format Markdown:**

- Inline code di dalam bold: `**\`Conv2d(...)`**, bukan ``` **Conv2d(...)**` `` (backtick di luar bold).
- Checklist pakai `- [ ]` (GitHub task list), bukan bullet polos.
- Navigasi modul pakai `<details><summary>📂 Navigasi Modul (klik untuk buka)</summary>...</details>` (konsisten di 13 bab).
- Tabel boleh tanpa padding alignment, tetapi header-separator wajib ada (`| --- |`).
- File `.md` wajib diakhiri dengan satu newline.

**Workflow konten baru:**

- Ketika mengintegrasikan catatan dari folder `Notes - <tanggal>/`, ganti em dash di file asli SEBELUM menyalin ke bab utama. File asli tetap disimpan sebagai referensi (jangan dihapus).
- Setelah menambah section baru, update juga: (1) tabel of contents di awal bab, (2) rubrik penilaian terkait di `11_Rubrik_Penilaian.md`, (3) catatan integrasi di CLAUDE.md.

## Konvensi Eksperimen (untuk konten lab)

- Nama folder: `<config_name>_<modifier>_seed<N>/` - jika ada perubahan di luar config, tambah suffix deskriptif.
- Kontrak reproduksibilitas: folder eksperimen harus dapat direproduksi dari `config.yaml` + `commit_hash` di dalamnya.
- Satu variabel berubah per run ablation (kecuali eksplisit multi-factor).

