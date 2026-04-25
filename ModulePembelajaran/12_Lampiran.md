<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01a | [Fondasi Neural Network](01a_Fondasi_Neural_Network.md) | 2 |
| 01b | [Loss, Optimizer & Evaluasi](01b_Loss_Optimizer_Evaluasi.md) | 3 |
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
| 13 | [Panduan Dosen](13_Panduan_Dosen.md) | – |
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
| perceptron multilayer  | multilayer perceptron / MLP       | Singkat: MLP. Arsitektur *feed-forward* dasar.       |
| sel LSTM               | LSTM cell                         | Nama diri. Varian RNN dengan gate.                   |
| GRU                    | GRU / Gated Recurrent Unit        | Nama diri. Varian RNN lebih ringkas dari LSTM.       |
| mekanisme atensi       | attention mechanism               | "Atensi" dipakai; "mekanisme atensi" lebih jelas.    |
| atensi multi-kepala    | multi-head attention              | Nama diri. Sering disingkat MHA.                     |
| encoding posisi        | positional encoding               | Tidak wajib diterjemahkan.                           |
| encoder / decoder      | encoder / decoder                 | Tidak diterjemahkan.                                 |
| autoencoder            | autoencoder / AE                  | Nama diri. Encoder + decoder yang dilatih rekonstruksi. |
| bottleneck             | bottleneck                        | Tidak diterjemahkan. Lapisan sempit di tengah AE.    |
| kerugian rekonstruksi  | reconstruction loss               | Biasanya MSE atau BCE antara input dan output AE.    |
| ruang laten            | latent space / latent representation | "Ruang laten" dipakai di akademik.                |
| variational autoencoder | variational autoencoder / VAE    | Nama diri, jangan diterjemahkan.                     |
| generative adversarial network | generative adversarial network / GAN | Nama diri, jangan diterjemahkan.              |
| model difusi           | diffusion model                   | Nama diri. "Model diffusion" juga umum.              |


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

### C.6 Template Entri Portofolio Mandiri

Salin satu blok ini ke sel markdown di `notebooks/portofolio_mandiri.ipynb` untuk setiap pekan. Isi tiap bagian dengan kalimat lengkap - hindari poin-poin kosong.

```markdown
## Entri Pekan <N> - Bab <XX>

**Tanggal:** YYYY-MM-DD
**Jalur yang dipilih:** A / B / C (lingkari salah satu)
**Alasan memilih jalur ini:** <Satu kalimat: apa yang ingin Anda pelajari atau buktikan.>

### Setup
*Apa yang dikerjakan, tool/dataset/config yang dipakai, dan berapa lama.*

### Temuan
*Apa yang ditemukan. Sertakan angka, grafik, atau output kunci. Hindari "saya berhasil" tanpa angka.*

### Kejutan
*Apa yang tidak sesuai ekspektasi. Jika semua sesuai ekspektasi, tanyakan pada diri sendiri apakah ekspektasi awalnya cukup spesifik.*

### Yang Akan Diubah
*Jika mengulang eksperimen ini minggu depan, apa satu hal yang akan dilakukan berbeda dan mengapa.*

### Koneksi ke Pekan Sebelumnya
*Bagaimana pekerjaan pekan ini terhubung atau bertentangan dengan pekerjaan pekan lalu. Untuk Pekan 4 (entri pertama): tulis motivasi awal mengapa jalur ini dipilih.*
```

### C.7 Panduan Slot Presentasi Komponen Mandiri (10 Menit)

Setiap awal sesi (mulai Pekan 5), ada slot 10 menit per orang untuk mempresentasikan Komponen Mandiri pekan sebelumnya. Panduan berikut membantu Anda menggunakan waktu secara efektif.

**Struktur yang disarankan:**

| Segmen | Durasi | Isi |
| --- | --- | --- |
| Setup | 2 menit | Jalur yang dipilih dan alasannya; apa yang ingin dibuktikan. |
| Temuan | 5 menit | Hasil konkret (angka, grafik, kode); apa yang terkonfirmasi, apa yang tidak. |
| Tanya jawab | 3 menit | Satu pertanyaan terbuka yang Anda ajukan ke audiens; atau satu hal yang masih membingungkan. |

**Hal yang perlu disiapkan sebelum presentasi:**
- [ ] Satu angka atau output konkret yang bisa ditunjukkan (bukan hanya narasi).
- [ ] Satu pertanyaan terbuka atau satu hal yang masih belum jelas.
- [ ] Entri portofolio Pekan N sudah terisi sebelum presentasi dimulai.

**Hal yang tidak perlu disiapkan:**
- Slide formal tidak diwajibkan - notebook terbuka sudah cukup.
- Tidak perlu menampilkan seluruh kode; cukup bagian yang paling relevan dengan temuan.

### C.8 Template Lab Replikasi Arsitektur (Jalur 4 - Arsitektur Baru)

Jalur ini dipilih saat Anda ingin mempelajari satu keluarga arsitektur NN yang *belum* di-cover lab wajib minggu itu. Tujuan: forward pass bekerja pada *toy task*, bukan state-of-the-art. Template di bawah mengikuti pola pelaporan yang sama dengan template entri portofolio (C.6), dengan tambahan bagian spesifik untuk replikasi arsitektur.

```markdown
## Entri Arsitektur - Pekan <N>

**Arsitektur dipilih:** <nama; mis. "GRU", "Multi-Head Attention 4-head", "VAE"> 
**Referensi utama:** <1-2 paper atau blog post; tulis DOI/arXiv ID bila ada>
**Toy task:** <deskripsi singkat dataset dan target; mis. "klasifikasi sequence biner panjang 16">

### 1. Apa yang dilakukan arsitektur ini, dalam 3 kalimat
*Jelaskan input→output dan ide inti yang membedakannya dari arsitektur terdekat yang sudah Anda kenal. Untuk GRU: jelaskan beda dengan LSTM. Untuk VAE: jelaskan beda dengan AE biasa.*

### 2. Implementasi minimal
*Cuplikan kode forward pass (20-40 baris) yang cukup untuk dibaca tanpa scrolling. Gunakan torch tensor ops atau library primitives; hindari menyalin utuh dari repo eksternal tanpa pemahaman.*

### 3. Sanity check
- [ ] Output shape sesuai yang diharapkan.
- [ ] Backward pass jalan (tidak ada tensor yang *detached*).
- [ ] Parameter yang seharusnya dilatih muncul di `.parameters()`.

### 4. Learning curve pada toy task
*Satu plot (loss vs epoch atau metrik sukses). Maksimal 10-30 epoch. Tujuan: membuktikan arsitektur bisa belajar sesuatu, bukan mengejar akurasi tinggi.*

### 5. Perbandingan dengan arsitektur yang sudah dipelajari
*1-2 paragraf. Kapan arsitektur baru ini lebih cocok? Kapan lebih boros (parameter, waktu, memori)? Apakah Anda bisa membayangkan dataset di lab yang akan memberi keuntungan nyata bagi arsitektur ini?*

### 6. Pertanyaan yang muncul
*Satu pertanyaan yang Anda ingin kejar minggu depan (dapat memicu jalur Implementasi atau Analisis di entri portofolio berikutnya).*
```

**Kriteria sukses Jalur 4:**
- Arsitektur dibangun dengan kode yang Anda pahami (bukan copy-paste utuh). Acceptable: menyalin struktur umum, mengetik ulang dan memodifikasi sendiri. Unacceptable: menempel modul utuh dari Hugging Face tanpa bisa menjelaskan perannya.
- Learning curve menunjukkan loss menurun atau metrik sukses meningkat. Arsitektur yang stagnan *juga* dilaporkan - sebutkan hipotesis Anda tentang kenapa (mis. "hyperparameter tidak di-tune", "toy task terlalu mudah").
- Koneksi eksplisit ke arsitektur yang sudah di-cover lab wajib. Tidak cukup menulis "GRU lebih ringan dari LSTM"; tulis "GRU saya kurang 1 gate dibanding LSTM, dan parameter berkurang ~25%, tapi pada toy task ini akurasi hampir sama".

### C.9 Template Komponen Mandiri

Template generik untuk semua Komponen Mandiri (Pekan 4-12). Setiap bab (02-09) menyebut satu tugas spesifik per jalur sesuai konsep minggu itu; template ini mengatur format laporan dan kriteria standar yang berlaku di semua pekan.

**Empat jalur yang tersedia setiap minggu:**

| Jalur | Inti kegiatan | Artefak di portfolio |
| --- | --- | --- |
| **A - Implementasi** | Menambah, mengubah, atau menguji kode pada repo eksperimen. | Cuplikan kode + angka benchmark sebelum/sesudah + 1 paragraf interpretasi. |
| **B - Analisis** | Menyelidiki perilaku model, data, atau hasil yang sudah ada. | Visualisasi + 2-3 temuan spesifik + hipotesis turunan. |
| **C - Desain** | Merancang eksperimen baru tanpa harus menjalankannya penuh. | Protokol terstruktur (format Bab 02) + justifikasi hipotesis + estimasi biaya-waktu. |
| **D - Arsitektur Baru** | Mereplikasi satu keluarga arsitektur yang belum di-cover lab wajib minggu itu. | Forward pass bekerja pada toy task + 1 plot learning curve + 1 paragraf perbedaan vs arsitektur yang sudah dipelajari. Template lengkap di C.8. |

**Kriteria sukses per entri** (detail di Rubrik Kompetensi 10, Bab 11):
- Bukti eksekusi jelas (kode commit, plot, atau dokumen).
- Temuan dituliskan dengan skeptisisme sehat - apa yang *tidak* Anda yakini juga dicatat.
- Koneksi eksplisit ke konsep bab minggu itu.
- Entri yang hanya mengulang isi lab dinilai Novice; entri yang menunjukkan pilihan berdasarkan *gap* skill sendiri atau pertanyaan riset turunan dinilai Proficient.

**Deliverable standar:** Entri portofolio di `notebooks/portofolio_mandiri.ipynb` sesuai template C.6. Siap presentasi 10 menit di awal pekan berikutnya sesuai panduan C.7.

**Tugas spesifik per pekan:** Lihat bagian "Komponen Mandiri" di bab masing-masing untuk tugas konkret per jalur sesuai konsep minggu itu.

### C.10 Template Weekly Experiment Log (Ringan)

Template ringan untuk catatan harian rutin, berbeda dari C.4 yang dirancang untuk satu eksperimen besar. Isi dalam 5-10 menit per hari; cocok untuk mencatat progres saat Anda berganti-ganti tugas kecil atau menjalankan banyak eksperimen pendek.

**Format tabel (rekomendasi):**

```markdown
# Experiment Log Ringan - Pekan <N>

**Proyek:** <nama proyek>
**Target minggu ini:** <satu kalimat>

| Hari | Kerjaan | Hasil Kunci | Kendala | Besok |
|------|---------|-------------|---------|-------|
| Senin | | | | |
| Selasa | | | | |
| Rabu | | | | |
| Kamis | | | | |
| Jumat | | | | |
```

**Format naratif (alternatif):**

```markdown
# Experiment Log Ringan - Pekan <N>

## <Hari>, <YYYY-MM-DD>
**Kerjaan:** ...
**Hasil (satu angka/plot):** ...
**Kendala:** ...
**Besok:** ...
```

**Contoh terisi (format tabel):**

| Hari | Kerjaan | Hasil Kunci | Kendala | Besok |
|------|---------|-------------|---------|-------|
| Senin | Konfigurasi focal gamma sweep: 3 config (1.0, 2.0, 3.0) | smoke test semua config lolos | – | Jalankan seed 42 untuk ketiga config |
| Selasa | Jalankan 3 eksperimen, seed 42 | gamma=2.0 F1 tertinggi (0.72) | gamma=3.0 loss NaN setelah epoch 8 → perlu gradient clipping | Periksa log gamma=3.0; jalankan seed 43 untuk 1.0 dan 2.0 |
| Rabu | Debug gamma=3.0 NaN; tambah clip=1.0 | NaN hilang, training stabil | – | Selesaikan seed 43-44; siapkan tabel agregat |
| Kamis | 6 run selesai (3 gamma × 2 seed) | Tabel agregat selesai | gamma=3.0 lebih buruk dari 2.0 (F1 0.68 vs 0.72) | Tulis laporan 1 halaman |
| Jumat | Tulis laporan; commit semua config + hasil | Laporan selesai, commit `f41a2b3` | – | Pekan depan: ablation dengan class weighting |

**Kapan pakai C.10 vs C.4:**

| Situasi | Pakai |
| --- | --- |
| Satu eksperimen besar (>3 hari, multi-seed, ablation kompleks) | C.4 (Experiment Log) |
| Berganti-ganti tugas ringan, banyak eksperimen pendek | C.10 (Weekly Log Ringan) |
| Butuh catatan harian cepat yang tidak akan jadi laporan formal | C.10 |
| Eksperimen yang akan masuk laporan atau paper | C.4 |

Aturan praktis: jika Anda tidak yakin, mulai dengan C.10. Jika di pertengahan pekan Anda sadar eksperimennya lebih besar dari perkiraan, pindah ke C.4 - catatan C.10 bisa menjadi draft untuk C.4.

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

Bagian ini adalah *primer* singkat untuk mahasiswa yang belum solid pada tiga prasyarat masuk modul. Kerjakan bagian yang relevan sebelum membaca Bab 01a. Jika sudah solid, lewati.

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

**Uji mandiri.** Bisa Anda melatih `LogisticRegression` pada Iris dataset dan mencetak akurasi test set dalam 15 baris kode? Jika tidak, kerjakan tutorial scikit-learn Getting Started sebelum Bab 01a.

**Sumber rujukan.**
- scikit-learn - *Getting Started* (scikit-learn.org/stable/getting_started.html).
- Kaggle - *Intro to Machine Learning* (gratis, 3 jam, hands-on Jupyter).

---

## G. Self-Checklist Mingguan

Dua belas tabel di bawah adalah alat bantu bagi Anda untuk memeriksa pemahaman sendiri setiap akhir minggu. Centang "Sudah" hanya jika benar-benar bisa melakukannya *tanpa melihat catatan*. "Mulai" berarti bisa dengan bantuan atau referensi. Jika ada "Belum" di minggu sebelumnya, selesaikan sebelum lanjut ke minggu berikutnya - konsep di modul ini bertumpu seperti tangga.

### Minggu 1 - Orientasi (Bab 00)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menyebutkan 9 kompetensi dan kaitannya dengan 4 sikap riset | | | |
| Menjelaskan struktur 8-section yang dipakai semua bab | | | |
| Menyebutkan 7 klausul Kontrak Belajar, terutama Breadth Check | | | |
| Memilih jalur capstone awal (masih tentatif) | | | |
| Menjalankan `python -m src.train --config configs/baseline.yaml --dry-run` tanpa error | | | |

### Minggu 2 - Fondasi Neural Network (Bab 01a)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menjelaskan tensor I/O sebagai pasangan shape → makna untuk MLP, CNN, RNN, Transformer | | | |
| Menurunkan backprop MLP 7 langkah secara manual (chain rule, tidak lihat catatan) | | | |
| Membedakan 4 keluarga arsitektur dan asumsi data masing-masing | | | |
| Menjelaskan kapan BatchNorm vs LayerNorm vs GroupNorm | | | |
| Menggambar kurva ReLU, GELU, SiLU dan menyebutkan perbedaan utama | | | |
| Lab 1c: forward + backward MLP numpy selesai; gradient check lolos | | | |

### Minggu 3 - Loss, Optimizer & Evaluasi (Bab 01b)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memilih loss function untuk minimal 3 jenis tugas berbeda | | | |
| Menjelaskan perbedaan Adam vs AdamW dan kapan weight decay penting | | | |
| Menyebutkan minimal 4 metrik evaluasi dan kapan masing-masing relevan | | | |
| Membedakan 3 strategi representasi fitur (engineered / extracted / learned) | | | |
| Mendiagnosis loss curve: menyebutkan 5 pola dan tindakan untuk masing-masing | | | |
| Menjelaskan mengapa "overfit one batch" adalah alat diagnosis utama | | | |
| Lab 1: 4 checklist selesai (training loop, loss plot, confusion matrix, sample inspection) | | | |

### Minggu 4 - Ide ke Eksperimen (Bab 02)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menjawab 5 pertanyaan sebelum menyentuh kode untuk instruksi baru | | | |
| Menulis protokol eksperimen satu halaman (variabel, baseline, hipotesis, metrik, waktu) | | | |
| Merumuskan hipotesis yang dapat dipalsukan (bukan "loss X lebih baik") | | | |
| Menyusun update mingguan ke PI dengan format: progress, kendala, rencana, pertanyaan | | | |
| Memakai kerangka SQRC saat mengajukan pertanyaan teknis ke PI | | | |
| Lab 2: FocalLoss + freeze + ablation selesai; `protocol.md` ditulis sebelum run | | | |

### Minggu 5-6 - Eksperimen Reproduksibel (Bab 03)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Mengunci seed di 4 sumber non-determinisme (random, numpy, torch, CUDA) | | | |
| Memindahkan semua hyperparameter ke file YAML config | | | |
| Menyimpan checkpoint dengan config + seed + git hash + metrics | | | |
| Menstruktur folder eksperimen dengan konvensi penamaan yang konsisten | | | |
| Menjelaskan perbedaan ablation 1-variabel vs multi-faktor | | | |
| Menulis commit message dengan konvensi riset (`exp:`, `fix:`, `docs:`) | | | |
| Lab 3: 6 run selesai; checkpoint bisa di-resume; TensorBoard log rapi | | | |
| Lab 3b (breadth): RNN vs LSTM gradient flow selesai | | | |

### Minggu 7 - Validasi Data (Bab 04)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Melakukan EDA 3-lapis dengan pertanyaan pemandu (bukan daftar ritual) | | | |
| Membedakan 5 jenis data leakage dan menyebutkan tes cepat masing-masing | | | |
| Mengaudit kualitas label: distribusi, konsistensi, sampel salah | | | |
| Memverifikasi pipeline preprocessing tidak memakai statistik test set | | | |
| Menyebutkan 4 jenis dataset bias (selection, measurement, label, historical) | | | |
| Menjelaskan mengapa hasil negatif yang terdokumentasi adalah kewajiban etis | | | |
| Lab 4: EDA + leakage audit + label inspection selesai; minimal 1 isu data ditemukan | | | |

### Minggu 8 - AI Tools Sebagai Pendukung (Bab 05)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memakai LLM untuk 3 jenis tugas berbeda (boilerplate, debugging, eksplorasi) | | | |
| Memverifikasi output LLM: baca baris per baris, uji kasus batas, uji minimal | | | |
| Menjelaskan kapan LLM cocok dipakai dan kapan tidak | | | |
| Mencatat interaksi LLM di LLM Interaction Log (C.3) | | | |
| Lab 5: LLM-assisted feature selesai; log verifikasi terisi | | | |
| Lab 5b (domain teks): klasifikasi sentimen IndoNLU selesai (opsional) | | | |

### Minggu 9 - Adopsi Repo Riset (Bab 06)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memetakan entry point → model → loss → config repo asing dalam 30 menit | | | |
| Mengatasi error setup umum (dependency, path, CUDA version) | | | |
| Melakukan modifikasi minimal-invasif pada repo orang lain | | | |
| Menulis kategori error analysis (minimal 3 kategori) | | | |
| Me-review kode rekan: menemukan magic number, hardcoded path, missing docs | | | |
| Lab 6: satu PR/issue ke repo publik; error analysis selesai | | | |
| Lab 6b (breadth): Transformer-mini dari nol selesai | | | |

### Minggu 10 - Alat Pendukung Ringan (Bab 07)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Membuat demo Streamlit/Gradio yang bisa diakses lewat browser | | | |
| Menampilkan confusion matrix dan failure case, bukan hanya akurasi | | | |
| Menjelaskan apa yang bisa disimpulkan pengguna dari tool yang Anda buat | | | |
| Lab 7: demo interaktif online; link bisa diakses | | | |
| Lab 7b (breadth): Autoencoder + denoising AE + t-SNE selesai | | | |

### Minggu 11 - Platform & Tool Baru (Bab 08)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Mengikuti 5 langkah adopsi tool baru (quickstart → replikasi → adaptasi → integrasi → catatan) | | | |
| Menyewa GPU di RunPod, SSH, training, tarik checkpoint, matikan pod | | | |
| Mengevaluasi tool baru dengan matriks 5 dimensi (dokumentasi, repro, ekosistem, biaya, komunitas) | | | |
| Mengelola biaya GPU cloud: memilih spot vs on-demand, memantau tagihan | | | |
| Lab 8: training di RunPod selesai; pod dimatikan; tagihan < $5 | | | |

### Minggu 12 - Pengembangan Mandiri (Bab 09)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Membaca paper dengan metode 3-pass (skim → close-read → kritis) | | | |
| Mengisi template paper notes (TL;DR, metode, bukti, pertanyaan/kritik, hubungan) | | | |
| Menulis pre-registration singkat sebelum eksperimen baru | | | |
| Merumuskan pertanyaan lanjutan yang dapat dipalsukan dari satu paper | | | |
| Lab 9: paper notes + pre-registration selesai | | | |

### Cara Memakai Checklist Ini

1. **Akhir setiap minggu**, buka tabel minggu yang baru selesai.
2. **Centang dengan jujur.** "Sudah" = bisa dilakukan tanpa bantuan. "Mulai" = bisa dengan catatan atau bantuan LLM. "Belum" = belum bisa.
3. **Jika ada "Belum",** selesaikan poin itu sebelum mengerjakan Komponen Mandiri minggu berikutnya. Poin "Belum" yang menumpuk adalah sinyal bahwa Anda perlu bicara dengan dosen.
4. **Di akhir semester,** tabel-tabel ini adalah ringkasan kompetensi Anda. Bawa ke sesi evaluasi akhir sebagai bukti pendukung.

Checklist ini melengkapi - bukan menggantikan - rubrik penilaian di Bab 11. Rubrik dipakai dosen untuk menilai; checklist dipakai Anda untuk memantau diri sendiri.

---

## E. Indeks Cepat - Di Mana Mencari Apa

- **Prasyarat Python/Kalkulus belum solid?** → Lampiran §F
- **Self-checklist mingguan (apa yang harus saya bisa)?** → Lampiran §G
- **Cara menulis pre-registration?** → Bab 9 §2.5 + Lampiran §C.1
- **Cara memilih GPU cloud?** → Bab 8 §2.2, §2.6
- **Matriks evaluasi tool baru?** → Bab 8 §2.1.1
- **Rubrik penilaian?** → [Rubrik Penilaian](11_Rubrik_Penilaian.md)
- **Panduan Dosen (pacing, emphasis, grading)?** → [Panduan Dosen](13_Panduan_Dosen.md)
- **Template laporan capstone?** → Lampiran §C.2
- **Memilih template capstone?** → Bab 10 §2.2
- **Membaca paper dalam tiga putaran?** → Bab 9 §2.2
- **Audit data leakage?** → Bab 4 §2.3
- **Etika data dan bias (fairness, negative results)?** → Bab 4 §2.6
- **Struktur config YAML?** → Bab 3 §2.3
- **Git workflow untuk riset (commit convention, branching)?** → Bab 3 §2.10
- **Adopsi repo eksternal dalam beberapa jam?** → Bab 6 §2.1-§2.3
- **Peer code review repo eksternal?** → Bab 6 Lab 6c
- **Verifikasi output LLM?** → Bab 5 §2.3
- **Komunikasi efektif dengan dosen pembimbing?** → Bab 2 §3.5
- **Diagnosis loss curve (decision tree)?** → Bab 1b §2.5
- **Template entri portofolio mandiri?** → Lampiran §C.6
- **Panduan presentasi Komponen Mandiri?** → Lampiran §C.7
- **Template weekly experiment log ringan?** → Lampiran §C.10
- **Format dan kriteria Komponen Mandiri?** → Lampiran §C.9
- **Rubrik Eksplorasi Mandiri & Komunikasi?** → [Rubrik Penilaian](11_Rubrik_Penilaian.md) §3 Kompetensi 10

---

*Modul ini selesai ketika Anda merasa cukup percaya diri untuk memulai proyek riset sendiri - bukan ketika setiap halaman sudah Anda baca. Semoga Anda membawa empat sikap itu lebih lama dari satu semester.*
