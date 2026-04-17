<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| 04 | [Validasi Data](04_Validasi_Data.md) | 7 |
| 05 | [AI Tools Sebagai Pendukung](05_AI_Tools_Sebagai_Pendukung.md) | 8 |
| 06 | [Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| ▶ 12 | Lampiran | – |

</details>

---

# 12 · Lampiran

> *Lampiran yang baik adalah alat bantu, bukan hiasan. Bagian ini berisi glosarium istilah, checklist eksperimen, dan template yang dapat Anda salin-pakai langsung sepanjang semester.*

---

## A. Glosarium Indonesia ↔ Inggris

Istilah teknis ML/DL sebagian besar berasal dari Bahasa Inggris. Glosarium ini menyatukan *pilihan terjemahan* yang direkomendasikan dalam modul, untuk mencegah inkonsistensi dan membantu Anda berkomunikasi lintas konteks (tulisan akademik vs diskusi informal).

### A.1 Arsitektur & Model


| Indonesia              | Inggris                           | Catatan penggunaan                                  |
| ---------------------- | --------------------------------- | --------------------------------------------------- |
| jaringan saraf tiruan  | neural network                    | Singkat: NN. Tulis lengkap di laporan pertama kali. |
| jaringan feed-forward  | feed-forward network / FFN        | "Jaringan maju" juga diterima.                      |
| jaringan konvolusi     | convolutional network / CNN       | "Jaringan konvolusional" jarang dipakai.            |
| jaringan rekuren       | recurrent network / RNN           | LSTM dan GRU adalah varian RNN.                     |
| arsitektur Transformer | Transformer architecture          | Nama diri, jangan diterjemahkan.                    |
| lapisan (layer)        | layer                             | Dipakai sebagai pinjaman: "layer konvolusi" umum.   |
| parameter terlatih     | trained parameters / weights      | "Bobot model" juga lazim.                           |
| pretrained model       | model pralatih / pretrained model | "Pretrained" sering dipakai apa adanya.             |
| fine-tuning            | fine-tuning / penyesuaian lanjut  | "Fine-tuning" lebih dipahami.                       |
| embedding              | embedding / representasi vektor   | "Embedding" tidak perlu diterjemahkan.              |


### A.2 Pelatihan


| Indonesia                   | Inggris                           | Catatan                                  |
| --------------------------- | --------------------------------- | ---------------------------------------- |
| pelatihan (training)        | training                          | Kata kerja: "melatih".                   |
| validasi                    | validation                        | Jangan campur dengan "validation set".   |
| fungsi kerugian             | loss function                     | "Loss" singkat juga boleh.               |
| turunan gradien             | gradient                          | Jarang diterjemahkan; "gradien" dipakai. |
| penurunan gradien stokastik | stochastic gradient descent / SGD | Singkat: SGD.                            |
| laju pelatihan              | learning rate                     | "Learning rate" hampir selalu dipakai.   |
| ukuran batch                | batch size                        | Jarang diterjemahkan.                    |
| epoch                       | epoch                             | Tidak diterjemahkan.                     |
| langkah (step)              | step / iteration                  | "Iterasi" juga boleh.                    |
| checkpoint                  | checkpoint / titik simpan         | "Checkpoint" lebih dipahami.             |
| overfitting                 | overfitting / kelewat-cocok       | "Overfitting" lazim di akademik.         |
| underfitting                | underfitting / kurang-cocok       | "Underfitting" lazim.                    |
| regularisasi                | regularization                    | Tidak diterjemahkan.                     |
| dropout                     | dropout                           | Tidak diterjemahkan.                     |


### A.3 Data


| Indonesia               | Inggris                   | Catatan                              |
| ----------------------- | ------------------------- | ------------------------------------ |
| himpunan data           | dataset                   | "Dataset" hampir selalu dipakai.     |
| train/validation/test   | train / validation / test | Jangan diterjemahkan di tabel hasil. |
| label                   | label                     | Tidak diterjemahkan.                 |
| kelas                   | class                     | Dipakai apa adanya.                  |
| ketidakseimbangan kelas | class imbalance           | -                                    |
| augmentasi data         | data augmentation         | -                                    |
| pembagian data          | data split / splitting    | "Split" sering dipakai apa adanya.   |
| kebocoran data          | data leakage              | "Leakage" sering dipakai apa adanya. |
| pra-pemrosesan          | preprocessing             | -                                    |


### A.4 Evaluasi


| Indonesia              | Inggris                       | Catatan                                                             |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------- |
| metrik                 | metric                        | -                                                                   |
| akurasi                | accuracy                      | -                                                                   |
| presisi / recall / F1  | precision / recall / F1       | Diterjemahkan hanya di penjelasan awam; di laporan biarkan inggris. |
| matriks kebingungan    | confusion matrix              | -                                                                   |
| AUC / ROC              | AUC / ROC                     | Nama diri.                                                          |
| inferensi              | inference                     | -                                                                   |
| evaluasi pada data uji | test-time evaluation          | -                                                                   |
| ablation study         | studi ablasi / ablation study | Dua-duanya diterima.                                                |


### A.5 Eksperimen & Reproduksibilitas


| Indonesia              | Inggris                          | Catatan                                     |
| ---------------------- | -------------------------------- | ------------------------------------------- |
| eksperimen             | experiment                       | -                                           |
| konfigurasi            | configuration / config           | -                                           |
| seed (benih)           | seed                             | Tidak diterjemahkan.                        |
| reproduksibilitas      | reproducibility                  | -                                           |
| determinisme           | determinism                      | -                                           |
| hipotesis              | hypothesis                       | Jamak: hipotesis-hipotesis.                 |
| dapat dipalsukan       | falsifiable                      | Dari *filsafat ilmu*; kata kunci Popperian. |
| baseline               | baseline / garis dasar           | "Baseline" lebih lazim.                     |
| varian                 | variant                          | -                                           |
| pre-registration       | pre-registration / praregistrasi | Dua-duanya diterima.                        |
| hasil yang direplikasi | replicated result                | -                                           |


### A.6 Perangkat


| Indonesia                  | Inggris         | Catatan               |
| -------------------------- | --------------- | --------------------- |
| GPU (unit pemroses grafis) | GPU             | Tidak diterjemahkan.  |
| CPU                        | CPU             | -                     |
| memori (RAM)               | memory / RAM    | -                     |
| pod (di cloud)             | pod             | Tidak diterjemahkan.  |
| SSH                        | SSH             | -                     |
| tunnel                     | tunnel          | Jarang diterjemahkan. |
| checkpoint terbaik         | best checkpoint | -                     |


### A.7 Sikap Riset (dari modul)


| Indonesia      | Inggris    | Catatan                                      |
| -------------- | ---------- | -------------------------------------------- |
| keingintahuan  | curiosity  | -                                            |
| ketelitian     | rigor      | -                                            |
| skeptisisme    | skepticism | -                                            |
| tanggung jawab | ownership  | Konteks riset: "mengampuni hasilmu sendiri". |


---

## B. Checklist Eksperimen

Salin checklist ini di bagian atas setiap folder eksperimen baru (`experiments/<nama>/CHECKLIST.md`). Centang per item; eksperimen yang dilepas tanpa checklist terisi rawan kebohongan ke diri sendiri.

### B.1 Sebelum Menjalankan (Pre-flight)

- Pertanyaan riset ditulis dalam satu kalimat falsifiable.
- Baseline jelas dan adil (tanpa "handicap" tersembunyi).
- Satu metrik utama ditetapkan; metrik sekunder (bila ada) dicatat.
- Minimum 3 seed direncanakan per kondisi.
- Config YAML lengkap; tidak ada hyperparameter hardcoded di kode.
- Seed diset di `set_seed(...)` untuk Python, NumPy, Torch, CUDA.
- `torch.backends.cudnn.deterministic = True` (untuk reproduksi ketat).
- Split data train/val/test valid (tidak ada sampel sama; audit leakage bila relevan).
- Dry-run lulus (`--dry-run` atau `--limit_data 100`).
- Git commit bersih; commit hash terbaru yang akan dicatat.

### B.2 Selama Menjalankan (In-flight)

- Loss turun di epoch awal (sanity check).
- Akurasi train > chance level setelah 1 epoch.
- Monitoring TensorBoard / log berkala; tidak ada NaN.
- Checkpoint tersimpan per N epoch (bukan hanya terakhir).
- Progress bar / log berisi: epoch, loss, val metric, waktu per epoch.
- GPU utilization > 50% (bila <, ada bottleneck di data loader atau augmentasi).

### B.3 Setelah Selesai (Post-flight)

- Checkpoint `ckpt_best.pt` tersimpan dengan metadata: epoch, metric, git_hash, seed, config.
- Log training utuh tersimpan di `train.log`.
- `results.csv` diupdate dengan satu baris per run (seed, hyperparameter kunci, metrik).
- Plot utama di-generate (loss curve + metric curve).
- Deviasi dari pre-registration dicatat bila ada.
- GPU / pod dimatikan bila eksperimen di cloud.

### B.4 Sebelum Klaim Hasil

- Hasil direplikasi di minimum 3 seed; std dilaporkan.
- Test set *benar-benar* belum pernah dilihat dalam proses tuning (bukan validasi yang dinamai test).
- Perbedaan antar varian > 2× std (kalau tidak: panggil "inconclusive", bukan "better").
- Error analysis: minimal 20 sampel salah klasifikasi diperiksa manual.
- Bila hasil mengejutkan positif: cari *kemungkinan bug yang membantu* sebelum merayakan.

---

## C. Template Dokumen

### C.1 Template Pre-Registration

Salin ke `docs/preregs/<YYYY-MM-DD>_<nama_eksperimen>.md` sebelum menulis kode eksperimen. Tanggal di nama file harus lebih lama dari commit pertama kode eksperimen.

```markdown
# Pre-Registration: <judul eksperimen singkat>

**Tanggal:** YYYY-MM-DD
**Peneliti:** <nama>
**Pembimbing:** <nama> (opsional)
**Commit repo saat menulis:** <hash>

## 1. Motivasi (2-3 kalimat)

<Mengapa pertanyaan ini layak dijawab sekarang. Konteks praktis atau teoretis.>

## 2. Hipotesis (satu kalimat falsifiable)

Aku memprediksi **<metode X>** akan menghasilkan **<metrik M>** yang lebih **<tinggi/rendah>**
sebesar **≥ Δ** dibandingkan dengan **<baseline B>** pada **<dataset D>**,
ketika dijalankan pada **<kondisi/protokol>**.

## 3. Protokol

- **Dataset & split:** <D, train/val/test, ukuran>
- **Baseline:** <B, kredensial: arsitektur + hyperparameter utama>
- **Intervensi (variabel yang diubah):** <X, cara penerapan>
- **Hyperparameter yang tetap:** <daftar>
- **Metrik utama:** <M, justifikasi dalam 1 kalimat mengapa ini yang paling relevan>
- **Metrik sekunder:** <daftar, hanya dicatat bukan sebagai kriteria sukses>
- **Seed:** [<s1>, <s2>, <s3>, ...] - minimum 3
- **Hardware & waktu yang diharapkan:** <GPU, estimasi jam>
- **Kriteria sukses:** Δ ≥ <nilai> dengan |σ_M_antarseed| ≤ <nilai>

## 4. Hasil yang Diharapkan (satu paragraf)

<Tebakan awalmu sebelum melihat hasil. Menjaga kejujuran intuisi.>

## 5. Kondisi Kegagalan Hipotesis

<Kondisi konkret yang membuatmu menyatakan H0 benar: misalnya "Δ < 1% atau σ > Δ".>

## 6. Amendments (diisi setelah eksperimen)

<Deviasi dari protokol di atas, dengan tanggal dan alasan. Kosongkan awalnya.>
```

### C.2 Template Laporan Capstone (outline)

Salin ke `docs/report.md` atau `docs/report.tex` pada awal minggu capstone. Tulis paragraf kecil setiap minggu; jangan menunda ke minggu 4.

```markdown
# <Judul Proyek>
Nama · Program Studi · Semester
Tanggal: <YYYY-MM-DD>

## Abstract
<1 paragraf (~150 kata): konteks, pertanyaan, metode, hasil utama, kontribusi.>

## 1. Introduction
- Motivasi praktis atau teoretis (1 paragraf).
- Pertanyaan penelitian eksplisit (satu kalimat).
- Ringkasan kontribusi (2-3 poin).

## 2. Related Work
- 2-4 paper inti; untuk tiap paper: apa yang mereka lakukan + bagaimana beda dengan proyekmu.
- Hindari menulis "A did X. B did Y. C did Z." tanpa integrasi.

## 3. Method
- Deskripsikan baseline dan intervensi dengan cukup detail untuk replikasi.
- Notasi matematis jika membantu; hindari rumus yang hanya Anda sendiri mengerti.
- Sertakan gambar arsitektur bila relevan.

## 4. Experimental Setup
- Dataset: sumber, ukuran, split, pra-pemrosesan, audit leakage.
- Hyperparameter: tabel lengkap.
- Hardware: GPU, durasi training.
- Metrik: definisi dan justifikasi.
- Seeds: nilai yang digunakan.

## 5. Results
- Tabel utama: baseline vs intervensi, dengan ±σ dari ≥3 seed.
- Plot-plot pendukung (error bar, caption mandiri).
- Ablasi bila ada.
- Jujur: bila hasil tidak sesuai prediksi pre-reg, *nyatakan*.

## 6. Error Analysis
- Contoh konkret model gagal; kelompokkan polanya.
- Tautkan ke keputusan desain: apa yang dapat diperbaiki?

## 7. Discussion
- Apa yang terbukti dan tidak dari pertanyaan awal.
- Deviasi dari pre-registration.
- Keterbatasan yang jujur (dataset, hardware, interpretasi).

## 8. Conclusion & Future Work
- 1 paragraf kesimpulan.
- 1 paragraf future work - pertanyaan berikutnya yang paling menarik.

## References
<Format konsisten: APA atau IEEE; minimum 6 referensi untuk capstone.>

## Appendix
- Hyperparameter yang tidak muat di main text.
- Plot tambahan.
- Screenshot demo.
```

### C.3 Template LLM Interaction Log

Salin ke `docs/llm_log.md`. Update setiap pemakaian LLM yang non-trivial; baris pendek lebih baik daripada baris sempurna.

```markdown
# LLM Interaction Log
Proyek: <nama proyek>

| Tanggal | Tool | Tujuan | Prompt kunci | Verifikasi | Hasil |
|---------|------|--------|--------------|------------|-------|
| YYYY-MM-DD | Claude 3.5 | Parse format CSV tidak standar | "Tulis fungsi Python yang..." | Run di 3 sampel CSV | Dipakai, minor fix. |
| YYYY-MM-DD | Copilot | Auto-complete training loop | inline completion | Bandingkan dengan template_repo/src/train.py | Ditolak 40%, diterima 60%. |
| YYYY-MM-DD | ChatGPT | Pilih learning rate | "Apa LR default untuk fine-tune BERT?" | Verifikasi dengan paper original | Disesuaikan dengan sweep sendiri. |

## Prinsip yang saya terapkan (ingatkan diri sendiri)

1. Output LLM untuk logika/reasoning **selalu** diverifikasi dengan test kecil.
2. Output LLM untuk hyperparameter **selalu** diikuti dengan sweep atau validasi.
3. Tidak pernah menyalin kode LLM tanpa membacanya per baris.
4. Jika LLM "menciptakan" fungsi/library/API: cek dokumentasi resmi SEBELUM pakai.
```

### C.4 Template Experiment Log (jurnal eksperimen)

Salin ke `docs/experiments/<YYYY-MM-DD>_<nama>.md`. Satu file per eksperimen besar.

```markdown
# Experiment Log: <nama>
**Tanggal mulai:** YYYY-MM-DD
**Pre-reg:** `docs/preregs/<file>.md`
**Config:** `configs/<file>.yaml`
**Commit:** <hash>

## Hasil utama
| Seed | <Metrik>  | Catatan |
|------|-----------|---------|
| 42   | 0.823     |         |
| 123  | 0.819     |         |
| 2024 | 0.831     |         |
| **μ ± σ** | **0.824 ± 0.006** | |

## Perbandingan dengan pre-reg
- Hipotesis: ...
- Kriteria sukses: Δ ≥ 0.03
- Δ aktual: +0.042
- Verdict: **terkonfirmasi**

## Deviasi protokol (bila ada)
- Tidak ada. / <daftar>

## Temuan tambahan
- Di kelas minoritas, metrik turun 1.2% - layak diselidiki.

## Langkah berikutnya
- Ablasi per-class coverage.
- Bandingkan dengan varian Y.
```

### C.5 Template Paper Notes

Salin ke `docs/papers/<short_title>.md`. Format Bab 9.

```markdown
# <Judul ringkas> - <Authors, Venue, Year>

**Link:** <arxiv atau doi>
**Tanggal baca:** YYYY-MM-DD

## TL;DR (1-2 kalimat)
<Klaim utama paper, dalam kalimatmu sendiri.>

## Metode (3-5 kalimat)
<Bagaimana mereka melakukannya. Rumus penting bila relevan.>

## Bukti (2-3 kalimat)
<Dataset + metrik + hasil utama. Angka konkret.>

## Pertanyaan / Kritik (3-5 poin)
- ...
- ...

## Hubungan dengan proyek saya
<Satu kalimat: mengapa paper ini relevan (atau tidak).>
```

---

## D. Ringkasan Cepat Empat Sikap Riset

Tabel rujukan saat Anda kehilangan arah.


| Sikap      | Pertanyaan yang menjaga sikap                       | Tanda sikap ini hadir                                                            |
| ---------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Curiosity  | "Mengapa model berperilaku begini?"                 | Anda menghabiskan waktu mempertanyakan *yang aneh*, bukan hanya mengejar metrik. |
| Rigor      | "Bisakah orang lain mereproduksi ini?"              | Seed, config, git hash, pre-reg.                                                 |
| Skepticism | "Apa penjelasan paling membosankan dari hasil ini?" | Audit leakage, baseline-kuat, error analysis.                                    |
| Ownership  | "Siapa yang akan menjawab jika saya tidak?"         | Dokumen lengkap, verifikasi LLM, repo yang runnable.                             |


---

## F. Prasyarat

Bagian ini adalah *primer* singkat untuk mahasiswa yang belum solid pada tiga prasyarat masuk modul. Kerjakan bagian yang relevan sebelum membaca Bab 01. Jika sudah solid, lewati.

### F.1 Python Tingkat Menengah

Anda perlu nyaman dengan: fungsi (termasuk `*args`, `**kwargs`, default parameter), kelas dan pewarisan, modul dan impor relatif, virtual environment (`venv` atau `conda`), dan membaca traceback.

**Uji mandiri.** Bisa Anda menulis kelas `Dataset` sederhana dengan `__len__` dan `__getitem__`, lalu mengimpornya dari modul lain di folder yang sama tanpa error `ModuleNotFoundError`? Jika tidak, kerjakan satu tutorial Python OOP (Python docs atau Real Python) sebelum melanjutkan.

**Sumber rujukan.**
- Python Tutorial resmi - bagian *Classes* dan *Modules* (docs.python.org/3/tutorial).
- Real Python - "Object-Oriented Programming (OOP) in Python 3".
- `venv` quickstart: `python -m venv .venv && source .venv/bin/activate` (Linux/Mac) atau `.venv\Scripts\activate` (Windows).

### F.2 Kalkulus Dasar dan Aljabar Linear

Anda perlu memahami: turunan fungsi satu variabel, aturan rantai (*chain rule*), gradien (turunan parsial), dan perkalian matriks.

**Uji mandiri.** Tanpa membuka referensi, bisa Anda turunkan `d/dx [x² + 3x]` dan jelaskan mengapa gradien menunjuk ke arah kenaikan paling curam? Bisa Anda mengalikan matriks 2×3 dengan matriks 3×2 secara manual? Jika tidak, kerjakan dua modul pertama Khan Academy Calculus dan Linear Algebra.

**Sumber rujukan.**
- Khan Academy - *Derivatives* (khanacademy.org/math/calculus-1).
- Khan Academy - *Vectors and spaces*, *Matrix transformations* (khanacademy.org/math/linear-algebra).
- 3Blue1Brown - "Essence of Calculus" dan "Essence of Linear Algebra" (YouTube). Visual, 15-20 menit per video.

### F.3 Model ML Pertama

Anda perlu pernah melatih setidaknya satu model klasifikasi dengan scikit-learn: `fit`, `predict`, `score`. Anda perlu tahu apa itu train/test split dan mengapa diperlukan.

**Uji mandiri.** Bisa Anda melatih `LogisticRegression` pada Iris dataset dan mencetak akurasi test set dalam 15 baris kode? Jika tidak, kerjakan tutorial scikit-learn Getting Started sebelum Bab 01.

**Sumber rujukan.**
- scikit-learn - *Getting Started* (scikit-learn.org/stable/getting_started.html).
- Kaggle - *Intro to Machine Learning* (gratis, 3 jam, hands-on Jupyter).

---

## E. Indeks Cepat - Di Mana Mencari Apa

- **Prasyarat Python/Kalkulus belum solid?** → Lampiran §F
- **Cara menulis pre-registration?** → Bab 9 §2.5 + Lampiran §C.1
- **Cara memilih GPU cloud?** → Bab 8 §2.2, §2.6
- **Rubrik penilaian?** → [Rubrik Penilaian](11_Rubrik_Penilaian.md)
- **Template laporan capstone?** → Lampiran §C.2
- **Memilih template capstone?** → Bab 10 §2.2
- **Membaca paper dalam tiga putaran?** → Bab 9 §2.2
- **Audit data leakage?** → Bab 4 §2.3
- **Struktur config YAML?** → Bab 3 §2.3
- **Adopsi repo eksternal dalam beberapa jam?** → Bab 6 §2.1-§2.3
- **Verifikasi output LLM?** → Bab 5 §2.3

---

*Modul ini selesai ketika Anda merasa cukup percaya diri untuk memulai proyek riset sendiri - bukan ketika setiap halaman sudah Anda baca. Semoga Anda membawa empat sikap itu lebih lama dari satu semester.*