# [CLAUDE.md](http://CLAUDE.md)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tujuan Proyek

Modul pembelajaran **11 minggu bootcamp + 3 minggu capstone** untuk mahasiswa S1 (semester 4–6) yang menjadi **asisten dosen riset ML/DL**. Target outcome: 60-70% siap untuk topik lab nyata. Fokus bukan pada framework, tetapi pada empat sikap riset: **Curiosity, Rigor, Skepticism, Ownership**. Referensi utama: `EXPECTED_OUTCOME.txt` (9 outcome), `TODO.txt` (konteks dan pesan dosen).

## Struktur Konten (Post-Revisi April 2026)

```
ModulePembelajaran/
├── 00_Pendahuluan.md              Intro + target outcome + cross-week threads + session rhythm
├── 01_W1_Tabular_Output_Heads.md  MLP as shape transformer, output head + loss matching (W1)
├── 02_W2_Images_CNN_Smoke_Test.md Tensor citra, CNN, three-level smoke test ritual (W2)
├── 03_W3_Loss_Optimizer_Evaluasi.md Example-first: galeri 5 run → loss/opt/eval theory (W3)
├── 04_W4_Reproducibility_Experiment_Matrix.md Experiment matrix + YAML/seed/checkpoint (W4)
├── 05_W5_Sequences_RNN_LSTM.md    RNN vs LSTM, gradient flow, Lab 3b mandatory (W5)
├── 06_W6_Representations_Temporal_Leakage.md Representasi recap + temporal leakage demo (W6)
├── 07_W7_Text_Transformers_Repo_Adoption.md Text, transformers, AI tools, repo adoption (W7)
├── 08_W8_Foundation_Models.md     Taxonomy modality×family×adaptation (W8) [NEW]
├── 09_W9_Multimodal_Reasoning.md  Fusion, per-modality ablation, missing modality (W9) [NEW]
├── 10_W10_Paper_Reading.md        3-pass paper reading + paper-to-code workflow (W10)
├── 11_W11_Research_Framing.md     5-Whys, capstone proposal, oral defense (W11) [NEW]
├── 12_Capstone_3_Minggu.md        W12 EDA+baseline / W13 experiment / W14 analysis (W12-14)
├── 13_Rubrik_Penilaian.md         4-level mastery + sub-rubrik per capstone phase
├── 14_Lampiran.md                 Glosarium + Lampiran A.1 backprop + C.12-C.15 + H migration
├── 15_Panduan_Dosen.md            Pacing 11+3 + emphasis per-week + skenario kelas
└── template_repo/                 Skeleton repo riset
```

**File sumber catatan (sudah terintegrasi; file asli disimpan sebagai referensi):**

- `ModulePembelajaran/Notes - 17 April 2026/petabesar.md` → konten dasar tensor/arsitektur masuk ke W1-W2
- `ModulePembelajaran/Notes - 17 April 2026/representasifitur.md` → konten representasi fitur masuk ke W3 + W6
- `ModulePembelajaran/Notes - 27 April 2026/revisi_bootcamp.md` → blueprint overhaul 11 minggu bootcamp + 3 minggu capstone (struktur saat ini)

**Perubahan struktural besar (April 2026 - Overhaul 27 April):**
- Modul lama 10-bab format-topik → 11-minggu bootcamp (W1-W11) + 3-minggu capstone (W12-W14), format weekly
- File-file lama diarsipkan ke `ModulePembelajaran/_archive/` (sengaja disimpan untuk referensi tabel migrasi di Lampiran §H, tidak dirender website)
- Mapping bab lama → bab baru terdokumentasi di `14_Lampiran.md` Lampiran H
- Konvensi penomoran konten: gunakan **W-numbering** (W1-W14) di teks bab; gunakan nama file (mis. `13_Rubrik_Penilaian.md`) saat me-link

**Konten utama per minggu (state saat ini):**

- **W1** (`01_W1_Tabular_Output_Heads.md`): tabular MLP, output heads + loss matching, observation before conclusion
- **W2** (`02_W2_Images_CNN_Smoke_Test.md`): tensor citra, CNN, ritual three-level smoke test
- **W3** (`03_W3_Loss_Optimizer_Evaluasi.md`): example-first galeri 5 run → loss/optimizer/evaluasi theory; representasi fitur 3 strategi
- **W4** (`04_W4_Reproducibility_Experiment_Matrix.md`): experiment matrix + YAML/seed/checkpoint; §3.5 Komunikasi Efektif (SQRC, matriks saluran); §2.6 Etika Data dan Bias; Git workflow eksperimental
- **W5** (`05_W5_Sequences_RNN_LSTM.md`): RNN vs LSTM, gradient flow, Lab 3b mandatory
- **W6** (`06_W6_Representations_Temporal_Leakage.md`): representasi recap + temporal leakage demo (delta dramatic 0.92 → 0.63 di §0.6); §2.6.3 negative results sebagai kewajiban etis; Lab 6c peer code review
- **W7** (`07_W7_Text_Transformers_Repo_Adoption.md`): text + Transformers + AI tools + repo adoption (file dual-section: Part 1 ringkas + Part 2 "Pendalaman" deep dive D1-D7)
- **W8** (`08_W8_Foundation_Models.md`): taxonomy modality×family×adaptation, model card literacy, §2.1.1 matriks evaluasi tool
- **W9** (`09_W9_Multimodal_Reasoning.md`): fusion strategies, per-modality ablation, missing modality, peta keluarga generatif
- **W10** (`10_W10_Paper_Reading.md`): 3-pass paper reading + paper-to-code workflow; templates A-E (termasuk LSTM/Transformer dan Autoencoder breadth)
- **W11** (`11_W11_Research_Framing.md`): 5-Whys, capstone proposal, oral defense (note: by design tidak ada heading `## Worked Example` / `## Lab Hands-on` eksplisit; deliverable proposal menggantikan lab notebook)
- **W12-W14** (`12_Capstone_3_Minggu.md`): timeline 3-minggu capstone (EDA+baseline / experiment / analysis+demo)
- **Rubrik** (`13_Rubrik_Penilaian.md`): 4-level mastery + Kompetensi 10 (Eksplorasi Mandiri & Komunikasi); bobot Kompetensi 1: 14%, Kompetensi 7: 4%
- **Lampiran** (`14_Lampiran.md`): glosarium ID↔EN; A.1 backprop derivasi 7-langkah; C.6-C.11 (entri portofolio, presentasi, lab breadth, Komponen Mandiri, weekly log, weekly update PI); §G Self-Checklist Mingguan; §H tabel migrasi
- **Panduan Dosen** (`15_Panduan_Dosen.md`): pacing 11+3 + emphasis per-W + skenario kelas

**Breadth Arsitektur NN (lima keluarga: MLP, CNN, RNN/LSTM, Transformer, Autoencoder):**

Modul melatih breadth lima keluarga, bukan hanya CNN. Pemetaan ke W-numbering:

- W1 (Pendahuluan + 01): MLP forward pass tabular
- W2 (02): CNN + tensor citra + smoke test
- W5 (05) + Lab 3b: RNN/LSTM gradient flow (Lab 3b wajib)
- W7 (07) + Lab 5b/6b: Transformer (BERT-family fine-tune) + Lab 6b Transformer-mini dari nol (breadth opsional)
- Lab 7b: Autoencoder + denoising AE + t-SNE (breadth opsional, dapat dikerjakan kapan saja)
- W9 §2.7: peta keluarga model generatif (VAE/GAN/Diffusion/Normalizing Flow), peta mental saja tanpa implementasi
- W10 Template D dan E: LSTM vs Transformer sequence forecasting + Autoencoder representation learning
- Pendahuluan (00): Kontrak Belajar klausul Keenam - Breadth Check (forward pass 4 dari 5 keluarga)
- Rubrik Kompetensi 1: deskriptor breadth lintas 4 level (bobot 14%)
- Lampiran A.1 entri glosarium: MLP, LSTM cell, GRU, attention, multi-head attention, positional encoding, encoder/decoder, autoencoder, bottleneck, reconstruction loss, latent space, VAE, GAN, diffusion model
- Lampiran C.8: Template Lab Replikasi Arsitektur untuk Komponen Mandiri Jalur D (Arsitektur Baru)

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
- `notebooks/portofolio_mandiri.ipynb`: portfolio running-log entri W4-W10 + refleksi akhir bootcamp; template entri per-bab dengan bagian Setup/Temuan/Kejutan/Yang-Akan-Diubah/Koneksi

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

Bahasa Indonesia. Istilah teknis ML/DL dipertahankan dalam bahasa Inggris (loss, checkpoint, seed, freeze, ablation, dll.) - tidak diterjemahkan paksa. Glosarium lengkap ada di `14_Lampiran.md`.

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
- Navigasi modul pakai `<details><summary>📂 Navigasi Modul (klik untuk buka)</summary>...</details>` (konsisten di semua 16 file modul aktif).
- Tabel boleh tanpa padding alignment, tetapi header-separator wajib ada (`| --- |`).
- File `.md` wajib diakhiri dengan satu newline.

**Tipografi & Ritme Visual (untuk pembaca website):**

Modul juga di-render di website (`website/src/components/MarkdownRenderer.tsx`) dengan styling editorial di `.prose-modul`. Pola berikut wajib diikuti supaya pembaca tidak melihat dinding teks datar:

1. **Inline enumerasi prosedural pakai list bernomor, bukan paragraf.** Pola `(1) ... (2) ... (3) ...` di tengah paragraf yang isinya benar-benar langkah → pecah jadi `1. ... 2. ... 3. ...`. Pengecualian: jika hanya 2 item pendek dan tidak prosedural (sekadar listing keterangan), boleh tetap inline.
2. **Struktur paralel besar (3+ item dengan format identik) → pecah jadi `####` heading atau list bernomor.** Contoh: "Skenario A/B/C", "Kategori 1/2/3/4", "Aturan 1/2/3/4". `####` muncul di Table of Contents, jadi pembaca bisa melompat. List bernomor dengan **bold lead-in** cukup jika section sudah ramai heading.
3. **Catatan/peringatan/tips → admonition GFM, bukan paragraf bold.** Sintaks: `> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` / `> [!IMPORTANT]` / `> [!CAUTION]`, lalu newline, lalu isi blockquote. Renderer otomatis kasih ikon, label, dan warna theme. Pakai untuk: catatan reproducibility, peringatan biaya, tips workflow. Jangan pakai untuk konten utama yang panjang.
4. **Lead paragraph (kalimat pembuka section) otomatis dapat treatment editorial.** Tidak perlu markup khusus - `h2 + p`, `h3 + p`, `h4 + p` di-style dengan size sedikit lebih besar, weight lebih tegas, warna lebih pekat. Maka paragraf pembuka section harus **bisa berdiri sendiri sebagai pengantar** - jangan langsung lompat ke detail teknis.

**Singkatnya:** kalau menulis 3 item paralel dengan format identik atau menulis `(1)(2)(3)` di paragraf, tanyakan: ini sebenarnya list, kan? Kalau ya, format sebagai list. Kalau menulis "**Catatan**:" atau "**Penting**:" sebagai paragraf, tanyakan: ini sebenarnya admonition, kan? Kalau ya, pakai `> [!NOTE]` atau `> [!IMPORTANT]`.

**Workflow konten baru:**

- Ketika mengintegrasikan catatan dari folder `Notes - <tanggal>/`, ganti em dash di file asli SEBELUM menyalin ke bab utama. File asli tetap disimpan sebagai referensi (jangan dihapus).
- Setelah menambah section baru, update juga: (1) tabel of contents di awal bab, (2) rubrik penilaian terkait di `13_Rubrik_Penilaian.md`, (3) catatan integrasi di CLAUDE.md.

## Konvensi Eksperimen (untuk konten lab)

- Nama folder: `<config_name>_<modifier>_seed<N>/` - jika ada perubahan di luar config, tambah suffix deskriptif.
- Kontrak reproduksibilitas: folder eksperimen harus dapat direproduksi dari `config.yaml` + `commit_hash` di dalamnya.
- Satu variabel berubah per run ablation (kecuali eksplisit multi-factor).

