<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| 05 | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md) | 5 |
| 06 | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) | 6 |
| 07 | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md) | 7 |
| 08 | [W8 - Foundation Models](08_W8_Foundation_Models.md) | 8 |
| 09 | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) | 9 |
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| ▶ 11 | W11 - Research Framing & Capstone Proposal | 11 |
| 12 | [Capstone 3 Minggu](12_Capstone_3_Minggu.md) | 12-14 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Dosen](15_Panduan_Dosen.md) | – |

</details>

---

# 11 · W11 - Research Framing & Capstone Proposal

> *Hipotesis yang baik adalah janji kepada diri sendiri: ini yang akan saya uji, ini yang akan saya hitung, ini yang akan saya akui sebagai kegagalan. Tanpa janji itu, eksperimen adalah ekspedisi, bukan penelitian.*

**Big Map row:** konsolidasi
**Rigor habit:** 5 Whys, literature-to-experiment synthesis, proposal defense
**Lab utama:** Capstone proposal 1-page + oral defense

---

## 0. Peta Bab

W11 adalah minggu terakhir bootcamp sebelum capstone. Tujuannya satu: Anda keluar dengan **proposal capstone yang disetujui** - dipertahankan secara lisan, dengan pre-registration tertulis.

- **2.1** 5 Whys: dari topik ke pertanyaan falsifiable
- **2.2** Literature-to-experiment synthesis
- **2.3** Baseline selection: mengapa ini, bukan itu?
- **2.4** Pre-execution review checklist
- **2.5** Capstone proposal one-pager
- **2.6** Oral defense format
- **Lampiran C.13** - Template Capstone Proposal One-Pager

---

## 1. Motivasi: Sebelum Anda Menyentuh Kode Capstone

Kapstone tidak dimulai di W12 ketika Anda membuka notebook. Capstone dimulai di W11, ketika Anda menutup ide yang kabur menjadi proposal yang konkret.

Dua mahasiswa dengan topik serupa ("model untuk klasifikasi sinyal ECG"):

**Mahasiswa A** memulai W12 langsung dengan download dataset, buat CNN, training. Minggu 14: "model saya mencapai 85% akurasi tapi saya tidak yakin apakah baseline yang tepat dan tidak tahu apa yang ingin saya tunjukkan."

**Mahasiswa B** menghabiskan W11 untuk: identifikasi pertanyaan spesifik ("apakah LSTM lebih baik dari CNN 1D pada dependensi panjang dalam ECG arrhythmia?"), pilih baseline yang defensible (CNN 1D dari paper 2020), tulis experiment matrix, estimasi compute, lakukan pre-execution review, tulis pre-registration, dan defend oral. W12-14: eksekusi bersih karena sudah tahu apa yang diukur.

W11 adalah investasi satu minggu yang menentukan kualitas tiga minggu capstone.

---

## 2. Konsep Inti

### 2.1 5 Whys: Dari Topik ke Pertanyaan Falsifiable

Teknik 5 Whys dari lean manufacturing juga efektif untuk research framing. Mulai dari topik yang luas, tanya "mengapa ini menarik?" berulang kali sampai menemukan pertanyaan yang konkret dan falsifiable.

**Contoh:**

> Topik awal: "Saya tertarik pada klasifikasi sinyal ECG."

1. **Why?** Karena arrhythmia sulit dideteksi oleh dokter umum.
2. **Why?** Karena ECG reading membutuhkan keahlian spesifik dan banyak noise.
3. **Why is that a research problem?** Karena model ML yang ada sering dilatih dengan dataset besar yang tidak tersedia di fasilitas kecil.
4. **So what?** Mungkin teknik yang efisien dengan data terbatas bisa membantu.
5. **Specifically?** Apakah few-shot learning atau transfer from pretrained ECG models lebih efisien daripada training from scratch dengan 500 labeled samples?

**Pertanyaan akhir:** *"Apakah fine-tuning ECG-pretrained model (mis. Wav2Vec untuk ECG) lebih baik dari CNN 1D trained from scratch pada dataset arrhythmia lokal dengan 500 sampel, diukur dengan F1 weighted?"*

Ini falsifiable. Ada kondisi kegagalan yang jelas. Ada metrik spesifik. Ada baseline yang defensible.

### 2.2 Literature-to-Experiment Synthesis

Dari paper yang dibaca di W10, ekstrak lima elemen:

| Elemen | Pertanyaan | Contoh dari paper focal loss |
|---|---|---|
| **Klaim** | Apa yang paper klaim? | Focal loss mengurangi kontribusi easy examples |
| **Baseline** | Apa yang dibandingkan? | Cross-entropy pada detection tasks |
| **Intervention** | Apa yang berubah? | Modulating factor (1-p)^γ pada CE |
| **Metrik** | Apa yang diukur? | AP pada COCO detection benchmark |
| **Simplest faithful experiment** | Versi paling kecil yang masih tes klaim utama? | Binary classification dengan kelas imbalanced |

Dari lima elemen ini, rancang experiment matrix untuk capstone Anda. Setiap baris matrix harus bisa dijawab dengan satu run.

### 2.3 Baseline Selection: Mengapa Ini, Bukan Itu?

Baseline yang buruk merusak seluruh eksperimen. Tiga kriteria baseline yang defensible:

1. **Reproduksibel.** Ada code, ada config, ada angka yang bisa diverifikasi dari paper atau dokumentasi.
2. **Relevan.** Baseline seharusnya adalah "pendekatan terbaik yang diketahui sebelum kontribusi Anda".
3. **Fair.** Baseline dan intervention harus berbagi kondisi yang sama - dataset, split, metric, seed.

Tulis **baseline selection memo** satu paragraf: "Saya memilih X sebagai baseline karena [alasan 1] dan [alasan 2]. Alternatif Y tidak dipilih karena [alasan]. Alternatif Z tidak dipilih karena [alasan]."

### 2.4 Pre-Execution Review Checklist

Sebelum mulai capstone, jalankan review ini:

- [ ] **Fairness of comparison.** Apakah baseline dan intervention dalam kondisi identik kecuali satu variabel?
- [ ] **Hidden assumptions.** Apa yang Anda asumsikan tapi tidak eksplisit? (Dataset representatif, metrik relevan, dll.)
- [ ] **Missing dependencies.** Apakah ada library, data, atau compute yang belum tersedia?
- [ ] **Likely failure points.** Apa tiga hal yang paling mungkin menggagalkan rencana ini? Apa fallback-nya?
- [ ] **Data risks.** Apakah data tersedia? Apakah ada leakage risk?
- [ ] **Compute risks.** Berapa lama training? Apakah ada dalam budget RunPod Anda?
- [ ] **Scope sanity check.** Apakah ini bisa selesai dalam 3 minggu? Jika tidak, pangkas.

### 2.5 Capstone Proposal One-Pager

Template tersedia di [Lampiran C.13](14_Lampiran.md#c13-capstone-proposal-one-pager). Lima bagian wajib:

**1. Pertanyaan penelitian (1 kalimat)**
Harus falsifiable. Ada kondisi kegagalan yang eksplisit.

**2. Baseline dan intervention (2-3 kalimat)**
Apa baseline? Apa yang diubah? Mengapa perubahan ini relevan untuk pertanyaan?

**3. Experiment matrix (tabel)**
Semua run yang direncanakan, dengan konfigurasi dan expected outcome.

**4. Metrik sukses dan kegagalan (2-3 kalimat)**
Apa yang harus terjadi untuk hipotesis dianggap dikonfirmasi? Apa yang harus terjadi untuk dianggap disangkal?

**5. Feasibility dan risiko (bullet points)**
Data tersedia?, compute estimates, fallback jika rencana utama gagal.

**Contoh one-pager yang konkret** (template yang bisa langsung disalin):

---
*Judul: Augmentasi Warna vs Augmentasi Geometri pada Klasifikasi Dermoskopi dengan Data Terbatas*

**1. Pertanyaan penelitian**
Apakah augmentasi warna (Color Jitter + Random Erasing) mengungguli augmentasi geometri (RandomHFlip + RandomRotation) pada ResNet-18 fine-tune untuk klasifikasi 7 kelas dermoskopi HAM10000 dengan subset 500 sampel berlabel per kelas, diukur dengan macro F1 pada test set?

**2. Baseline dan intervention**
Baseline: ResNet-18 fine-tune hanya dengan RandomHFlip + RandomRotation (augmentasi geometri standar). Intervention: ganti seluruh augmentasi dengan Color Jitter (brightness=0.4, contrast=0.4, saturation=0.4) + Random Erasing (p=0.5). Pemilihan karena lesi kulit sangat sensitif terhadap variasi warna pencahayaan kamera dermoskopi.

**3. Experiment matrix**

| Run | Augmentasi | Seeds | Expected F1 |
|---|---|---|---|
| Baseline | Geometric | 42, 1337, 0 | ~0.70 |
| Intervention | Color | 42, 1337, 0 | hipotesis: >0.70 |
| Ablasi: kombinasi | Geometric + Color | 42 saja | referensi |

**4. Metrik sukses dan kegagalan**
Sukses: intervention macro F1 > baseline + 0.03 pada semua 3 seed. Gagal: selisih < 0.02 atau arah tidak konsisten antar seed (variasi seed > selisih efek).

**5. Feasibility dan risiko**
- Data: HAM10000 tersedia publik (7470 sampel). Subset 500×7 = 3500 diambil stratified.
- Compute: ResNet-18 fine-tune 30 epoch ~15 menit/run × 7 run = ~2 jam GPU total. RTX 3060 lokal cukup.
- Risiko utama: class imbalance HAM10000 (NV 67%, AKIEC 3%). Fallback: gunakan weighted sampling alih-alih stratified jika baseline F1 < 0.60.

---

> [!IMPORTANT]
> Proposal harus disetujui oleh dosen/PI sebelum W12 dimulai. Jangan mulai coding capstone sebelum proposal di-sign off.

### 2.6 Oral Defense Format

10-15 menit presentasi + Q&A.

> [!TIP]
> **Strategi batch untuk kelas besar.** Dengan 30 mahasiswa, oral defense individual membutuhkan sekitar 8-10 jam. Dua strategi yang berhasil:
>
> - **Gelombang dua hari:** 5 mahasiswa di akhir W11, 25 mahasiswa di awal W12 (hari 1-2). Gelombang pertama memberi dosen umpan balik lebih awal; gelombang kedua mendapat contoh dari sesama.
> - **Zoom asinkron:** mahasiswa merekam presentasi 10 menit + slide, kirim via LMS. Dosen menonton dan memberi feedback tertulis. Q&A dilakukan via komentar atau sesi 5 menit tersinkronisasi. Kurang interaktif tetapi skalabel untuk kelas >25 orang.
>
> Yang penting: proposal **wajib disetujui** sebelum W12. Format pertahanannya fleksibel; deadline-nya tidak.

**Struktur presentasi (10 menit):**

1. Pertanyaan penelitian (1 menit) - satu slide, satu kalimat falsifiable.
2. Motivasi (1 menit) - mengapa pertanyaan ini penting?
3. Background (2 menit) - paper apa yang Anda baca, apa yang sudah diketahui?
4. Proposed experiment (3 menit) - baseline, intervention, metrik, matrix.
5. Feasibility (2 menit) - data, compute, risiko, fallback.
6. What would surprise you? (1 menit) - tanda bahwa Anda sudah berpikir tentang kemungkinan hasilnya.

**Q&A yang harus Anda siapkan jawabannya:**
- "Mengapa baseline ini, bukan Y?"
- "Bagaimana jika hasilnya negatif - apakah itu tetap informative?"
- "Apa yang akan Anda lakukan di minggu pertama?"
- "Apakah scope ini realistis untuk 3 minggu?"

---

## 3. Pitfalls & Miskonsepsi

**"Proposal adalah formalitas."** Tidak. Proposal yang buruk menyebabkan capstone yang buruk - bukan karena nilainya, tetapi karena 3 minggu tanpa arah yang jelas adalah 3 minggu terbuang.

**"Saya akan figure it out setelah mulai."** Tanda capstone yang akan bermasalah. W12 sangat pendek (1 minggu) untuk EDA + baseline. Tanpa proposal yang jelas, W12 habis untuk memutuskan apa yang harus dikerjakan.

**"Hipotesis saya terlalu sederhana."** Lebih baik hipotesis sederhana yang bisa dijawab dengan bersih, daripada hipotesis ambisius yang tidak bisa diuji dalam 3 minggu. Scopenya kecil tidak apa-apa.

**"Hasil negatif akan merusak nilai saya."** Tidak. Hasil negatif yang jujur dan didokumentasikan dengan baik dinilai setara dengan hasil positif. Yang dinilai adalah kualitas proses, bukan arah hasil.

---

## 4. Deliverables W11

1. **Capstone proposal one-pager** (template: [Lampiran C.13](14_Lampiran.md#c13-capstone-proposal-one-pager))
2. **Pre-registration document** (template: `template_repo/docs/prereg_template.md`)
3. **Baseline selection memo** (1 paragraf)
4. **Experiment matrix** (tabel dalam proposal)
5. **Feasibility/risk memo** (bullet points dalam proposal)
6. **Short synthesis memo** - bagaimana berbagai views (AI, peer, paper) disintesis menjadi proposal ini
7. **Oral defense** (10-15 menit + Q&A)

---

## 5. Komponen Mandiri (W11)

Ini adalah entri portofolio terakhir (entri ke-8, W11). Setelah mengisinya, kerjakan juga sel "Refleksi Portofolio" di `notebooks/portofolio_mandiri.ipynb`.

| Jalur | Tugas |
|---|---|
| **Implementasi** | Jalankan satu mini-eksperimen (1 run, 1 jam max) untuk memvalidasi feasibility baseline Anda. Apakah pipeline berjalan? |
| **Analisis** | Baca kembali 8 entri portofolio. Apa pola yang Anda lihat? Kompetensi mana yang paling berkembang, mana yang masih lemah? |
| **Desain** | Tulis "capstone pre-mortem": apa tiga skenario di mana capstone Anda gagal? Apa tanda-tanda awalnya? |
| **Arsitektur Baru** | Tidak dianjurkan di W11 - fokus pada proposal dan pre-registration. |

**Deliverable:** Entri portofolio W11 + Refleksi Portofolio + Capstone proposal + Oral defense.

---

## 6. Refleksi

1. **5 Whys latihan.** Ambil topik: "Saya ingin mendeteksi emosi dari audio." Jalankan 5 Whys. Pada langkah keberapa Anda mendapat pertanyaan yang falsifiable?
2. **Scope vs ambisi.** Anda punya 3 minggu dan GPU budget $30. Apa yang realistis? Tulis dua versi scope: scope minimum yang tetap informatif, dan scope ideal jika waktu dan compute tidak terbatas.
3. **Kontrak dengan diri sendiri.** Tulis satu kalimat yang mendeskripsikan "capstone yang berhasil" bagi Anda - bukan hanya dari sisi akademis, tapi dari sisi apa yang ingin Anda pelajari.

---

## 7. Bacaan Lanjutan

- **Lampiran C.13** - Template Capstone Proposal One-Pager.
- **`template_repo/docs/prereg_template.md`** - Template pre-registration yang sudah ada di repo.
- **Schwartz - *The Importance of Stupidity in Scientific Research*** (2008, 2 halaman). Tentang mengapa merasa "bingung" di depan pertanyaan yang sulit adalah tanda progress, bukan kegagalan.

---

## Lanjut ke Capstone

Proposal sudah disetujui. Pre-registration sudah di-commit. Sekarang fase kerja tiga minggu dimulai.

Buka [Capstone 3 Minggu](12_Capstone_3_Minggu.md) ketika siap.
