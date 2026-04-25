# [CLAUDE.md](http://CLAUDE.md)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tujuan Proyek

Modul pembelajaran semester 14-minggu untuk mahasiswa S1 (semester 4–6) yang menjadi **asisten dosen riset ML/DL**. Fokus bukan pada framework, tetapi pada empat sikap riset: **Curiosity, Rigor, Skepticism, Ownership**. Referensi utama: `EXPECTED_OUTCOME.txt` (9 outcome), `TODO.txt` (konteks dan pesan dosen).

## Struktur Konten

```
ModulePembelajaran/
├── 00_Pendahuluan.md
├── 01a_Fondasi_Neural_Network.md   Tensor I/O, MLP backprop, 4 keluarga arsitektur, layer (Minggu 2)
├── 01b_Loss_Optimizer_Evaluasi.md  Loss, optimizer, evaluasi, representasi, diagnosis (Minggu 3)
├── 02–09_*.md          Bab lanjutan (Minggu 4-12)
├── 10_Capstone_Project.md
├── 11_Rubrik_Penilaian.md   4-level mastery (novice/developing/proficient/masterpiece)
├── 12_Lampiran.md           Glosarium ID↔EN, checklist, template (termasuk C.9 Template Komponen Mandiri)
└── template_repo/           Skeleton repo riset yang di-fork mahasiswa
```

**File sumber catatan (sudah terintegrasi; file asli disimpan sebagai referensi):**

- `ModulePembelajaran/Notes - 17 April 2026/petabesar.md` → **Section 2.1** di `01a_Fondasi_Neural_Network.md`
- `ModulePembelajaran/Notes - 17 April 2026/representasifitur.md` → **Section 2.4** di `01b_Loss_Optimizer_Evaluasi.md`

**Perubahan struktural besar (April 2026):**
- `01_Memahami_ML_DL.md` (499 baris) dipecah menjadi `01a` (Minggu 2) + `01b` (Minggu 3)
- Section 2.0b (bolt-on MLP backprop) dihapus dan diintegrasikan sebagai Section 2.2 di 01a
- Section 2.6 (representasi fitur) kini Section 2.4 di 01b; Section 2.7 (loss curve) kini Section 2.5 di 01b
- Komponen Mandiri Bab 02-09 disederhanakan: pointer ke Lampiran C.9 + tabel 2-kolom per-pekan
- 5 Mermaid diagram ditambahkan: Bab 00 §5c, Bab 04 §2.1, Bab 06 §2.1, Bab 07 §2.1, Bab 09 §2.2
- Lampiran C.9 baru: Template Komponen Mandiri (kriteria standar semua pekan)

**Penambahan April 2026 (Gap Analysis Implementation):**
- `13_Panduan_Dosen.md`: file baru, panduan lengkap dosen (filosofi, pacing, emphasis per-bab, cara baca rubrik, cara nilai portofolio, skenario kelas)
- Bab 02 §3.5: Komunikasi Efektif dengan Dosen Pembimbing (template weekly update, kerangka SQRC, matriks saluran komunikasi, ekspresi ketidakpastian profesional)
- Bab 01b §2.5: Mermaid decision tree diagnostik loss curve (branching flowchart mencakup 5 pola + navigasi "mulai dari overfit one batch")
- Bab 04 §2.6: Etika Data dan Bias (4 jenis dataset bias, fairness awareness, negative results sebagai kewajiban etis, tanggung jawab asisten riset)
- Bab 06 Lab 6c (pair): Peer Code Review Repo Eksternal (aktivitas berpasangan, mapping 4 komponen repo, issue palsu, peer_review_log.md)
- Bab 03 §2.10: Git Workflow untuk Riset Eksperimental (commit convention `exp:`/`fix:`/`docs:`, branching strategy minimal `main`+`exp/<nama>`, kapan commit)
- Bab 08 §2.1.1: Matriks Evaluasi Tool (skoring 5 dimensi: dokumentasi, reproduksibilitas, ekosistem, biaya, komunitas; aturan <12 curigai, 12-18 coba kecil, >18 adopsi)
- Lampiran §C.10: Template Weekly Experiment Log Ringan (format tabel 5 kolom, 5-10 menit/hari, aturan kapan C.10 vs C.4)
- Lampiran §G: Self-Checklist Mingguan (12 tabel, Minggu 1-12, kolom Belum/Mulai/Sudah, 4-7 poin per minggu)
- Navigasi: semua 14 bab + README + Lampiran diperbarui menyertakan link ke `13_Panduan_Dosen.md`
- Indeks Cepat (Lampiran §E): 10+ entri baru untuk semua section/lab/template baru

**Konten utama per bab (state saat ini):**

- **01a**: Section 2.1 (tensor I/O), 2.2 (MLP backprop 7-langkah), 2.3 (4 keluarga arsitektur), 2.4 (layer: inisialisasi Kaiming/Xavier, BatchNorm/LayerNorm/GroupNorm tabel, ReLU/GELU/SiLU)
- **01b**: Section 2.1 (loss), 2.2 (optimizer + AdamW weight decay note), 2.3 (evaluasi metrik), 2.4 (representasi fitur: engineered/extracted/learned), 2.5 (diagnosis loss curve 5 pola)
- **Bab 02**: Section 2.6 (hasil negatif), bootstrap CI + effect size §2.4, HP search + batch/LR interaction §2.3
- **Bab 03**: Section 2.8 (resume checkpoint), Section 2.9 (konvergensi + early stopping)
- **Bab 05**: Section 2.6 (LLM non-kode), Lab 5b (teks IndoNLU SmSA)
- **Bab 06**: Section 2.8 (kategori error), Lab 6b (Transformer-mini)
- **Bab 07**: Lab 7b (Autoencoder + denoising AE + t-SNE)
- **Bab 08**: tabel platform (RunPod/Colab Pro/Modal/Lambda) §2.6
- **Bab 09**: navigasi arXiv §2.1 (ringkas), Peta Keluarga Generatif §2.7
- **Bab 00**: Section 5b (peta dependensi), Section 5c (quick-start path 10 minggu + Mermaid)
- **Rubrik (11)**: Kompetensi 10 (Eksplorasi Mandiri & Komunikasi), bobot Kompetensi 1: 14%
- **Lampiran (12)**: C.6-C.9 (entri portofolio, panduan presentasi, template lab breadth, template Komponen Mandiri)

**Breadth Arsitektur NN (penambahan untuk alignment tujuan "NN general, intermediate"):**

Tujuan penambahan: modul melatih breadth lima keluarga arsitektur NN (MLP, CNN, RNN/LSTM, Transformer, Autoencoder), bukan hanya CNN.

- Bab 01a: Section 2.2 (MLP dan Backpropagation - derivasi chain rule 7-langkah untuk MSE+sigmoid, jembatan ke CNN/RNN/Transformer), Section 2.4 (BatchNorm vs LayerNorm vs GroupNorm tabel + ReLU/GELU/SiLU kurva)
- Bab 03: +tautan Lab 3b (RNN vs LSTM) di Section 5 sebagai breadth lab
- Bab 06: +tautan Lab 6b (Transformer-mini dari nol) di Section 5 sebagai breadth lab
- Bab 07: +tautan Lab 7b (Autoencoder + denoising AE + t-SNE bottleneck) di Section 5 sebagai breadth lab
- Bab 09: +Section 2.7 (Peta Keluarga Model Generatif - tabel VAE/GAN/Diffusion/Normalizing Flow dengan paper pointers; tidak ada implementasi, peta mental saja)
- Bab 10: +Template D (LSTM vs Transformer sequence forecasting ETTh1) dan Template E (Autoencoder representation learning + linear probe)
- Bab 00: +Kontrak Belajar klausul "Keenam - Breadth Check" (lulus dengan forward pass 4 dari 5 keluarga), +Lab 1c/3b/6b/7b di daftar lab Section 5, +Jalur 4 "Arsitektur Baru" di Komponen Mandiri, +rantai lab breadth di Section 5b
- Rubrik (11): Kompetensi 1 diperluas lintas 4 level dengan deskriptor breadth; bobot Kompetensi 1: 12%→14%, Kompetensi 7: 6%→4%
- Lampiran (12): +A.1 entri glosarium (MLP, LSTM cell, GRU, attention, multi-head attention, positional encoding, encoder/decoder, autoencoder, bottleneck, reconstruction loss, latent space, VAE, GAN, diffusion model), +C.8 Template Lab Replikasi Arsitektur untuk Jalur 4

**Lab breadth baru (`template_repo/notebooks/`):**
- `lab1c_mlp_numpy.ipynb`: MLP 2-layer dari nol dengan numpy (forward, backward manual 7-langkah, finite-difference gradient check, SGD), parity check dengan `SimpleMLP` PyTorch
- `lab3b_sequence_lstm.ipynb`: sine+noise one-step-ahead regression, RNN vanilla vs LSTM gradient flow (log-plot vanishing gradient), training dengan grad clipping, visualisasi prediksi
- `lab6b_transformer_mini.ipynb`: `scaled_dot_product_attention` dari nol, `SingleHeadAttention`, `TinyBlock` (pre-norm LN + GELU FFN), parity check vs `nn.TransformerEncoderLayer`, toy sequence classifier
- `lab7b_autoencoder.ipynb`: convolutional AE CIFAR-10 unsupervised, rekonstruksi visual, t-SNE bottleneck 32-dim, denoising AE variant, peta ke VAE/GAN/Diffusion

**Arsitektur baru di `template_repo/src/models.py`:**
- `SimpleMLP(input_dim, hidden_sizes, num_classes, dropout, activation)` - support Lab 1c dan tabular
- `SimpleLSTM(input_size, hidden_size, num_layers, num_classes, dropout, readout)` - support Lab 3b, readout "last" atau "all"
- `TransformerMini(vocab_size, d_model, nhead, num_layers, dim_feedforward, max_len, num_classes, dropout)` - support Lab 6b, pakai `nn.TransformerEncoder` + `_PositionalEncoding`
- `SimpleAutoencoder(image_channels, bottleneck_dim)` - support Lab 7b, method `encode`/`decode`/`forward`
- `build_model(cfg)` extended: `simple_cnn`, `simple_mlp`, `simple_lstm`, `transformer_mini`, `simple_ae`
- `apply_freeze` raises ValueError untuk non-SimpleCNN

**Config baru di `template_repo/configs/`:** `mlp_mnist.yaml`, `lstm_timeseries.yaml`, `transformer_mini.yaml`, `ae_cifar.yaml`.

**Loader baru di `template_repo/src/data.py`:**
- `mnist` (flattened untuk MLP)
- `sine_sequence` (sintetis sine + noise untuk RNN/LSTM/Transformer sequence)
- `cifar10_unlabeled` (CIFAR-10 untuk AE unsupervised, label masih dikeluarkan loader hanya untuk t-SNE coloring)

**Template repo perubahan:**
- `src/train.py`: bug `warmup_epochs` diperbaiki - sekarang menggunakan `SequentialLR` dengan `LinearLR` warmup sebelum scheduler utama
- `docs/prereg_template.md`: file baru, template pre-registration lengkap
- `notebooks/lab1_baseline_cnn.ipynb`: diisi penuh (smoke test, forward pass, log parser, confusion matrix, error analysis)
- `notebooks/lab2_loss_freeze_ablation.ipynb`: diisi penuh (FocalLoss test, 2×2 grid ablation, bar chart dengan error bars)
- `notebooks/lab3_config_logging.ipynb`: diisi penuh (reproducibility verification, checkpoint inspection, resume dari checkpoint, multi-seed plot)
- `notebooks/lab4_eda_leakage.ipynb`: diisi penuh (5-layer EDA, MD5 overlap detection, leakage audit)
- `notebooks/lab5_llm_assisted_loop.ipynb`: diisi penuh (mixup implementation, 4 sanity tests, comparison training)
- `notebooks/lab7_streamlit_demo.ipynb`: diisi penuh (aggregation plot, Streamlit template, Gradio annotation template)
- `notebooks/lab1b_representasi.ipynb`: file baru, Lab 1b representasi fitur 3 strategi
- `notebooks/lab5b_domain_teks.ipynb`: file baru, Lab 5b klasifikasi sentimen teks IndoNLU SmSA
- `notebooks/portofolio_mandiri.ipynb`: file baru, portfolio running-log 8 entri (Pekan 4-12) + refleksi akhir semester; template entri per-bab dengan bagian Setup/Temuan/Kejutan/Yang-Akan-Diubah/Koneksi

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

**Diksi Natural (hindari rasa "terjemahan literal"):**

Penulis modul adalah penutur asli Indonesia. Prosa harus terasa ditulis langsung dalam Indonesia, bukan diterjemahkan dari English academic prose. Pakai pasangan diksi berikut sebagai default; kaku di kiri, natural di kanan:

| Kaku (hindari) | Natural (pakai) | Catatan |
|---|---|---|
| `secara praktis` | `dalam praktiknya` | |
| `bekerja ampuh / bekerja kuat` | `sangat efektif` / `sangat ampuh` | |
| `ada untuk` (= "exists to") | `dirancang untuk` | |
| `menunjuk ke` (= "points to" abstrak) | `mengacu pada` | Kecuali makna spasial/matematis literal (mis. "gradien menunjuk ke arah") |
| `Ketika Anda` (awal kalimat) | `Saat Anda` | "Ketika" boleh dipertahankan jika konteks butuh formalitas tinggi |
| `yang asing` | `yang belum dikenal` | |
| `Aturan jempol` | `Aturan praktisnya` | |
| `kerangka mental` | `kerangka berpikir` | |
| `menemui` (= "encounter") | `menjumpai` | |
| `mengintimidasi` | `membuat gentar` | |

Pola pembuka section pengantar yang melibatkan pembaca: pakai "kita" sebagai penanda inklusif (mis. "Sebelum **kita** membahas..."), terutama saat menjembatani konsep baru.

Hindari konstruksi bertingkat khas English ("there is one X that Y, which Z, so that W..."). Pecah jadi 2-3 kalimat pendek dengan penanda kohesi natural ("justru", "memang", "sebaliknya", "nah"). Reduplikasi untuk jamak emphasis ("kompetensi-kompetensi", "pertanyaan-pertanyaan") lebih natural daripada artikel kuantitatif ("berbagai kompetensi").

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

