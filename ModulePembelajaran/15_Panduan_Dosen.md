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
| 11 | [W11 - Research Framing & Capstone Proposal](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone 3 Minggu](12_Capstone_3_Minggu.md) | 12-14 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| ▶ 15 | Panduan Dosen | – |

</details>

---

# 15 · Panduan Dosen

> *Modul ini bukan buku teks yang dibacakan dari depan kelas. Ia adalah tangga eksperimen yang membutuhkan fasilitator - seseorang yang tahu kapan memberi ruang untuk gagal, kapan mengajukan pertanyaan yang lebih tajam, dan kapan mundur agar mahasiswa menemukan sendiri jawabannya.*

---

## 0. Peta Bab

Dokumen ini adalah panduan operasional untuk dosen pengampu, instruktur, atau fasilitator yang akan menjalankan modul. Bagian ini memuat filosofi modul dalam satu halaman, pacing rinci per minggu, apa yang harus ditekankan di setiap bab, cara membaca dan memakai rubrik penilaian, cara menilai portofolio, skenario kelas yang umum dan cara menanganinya, serta bacaan lanjutan tentang pedagogi mastery-based grading. Setelah membaca dokumen ini, Anda bisa memfasilitasi satu semester penuh tanpa menebak-nebak.

---

## 1. Filosofi Modul dalam Satu Halaman

### Empat Sikap Riset Bukanlah Bab Tersendiri

Curiosity, Rigor, Skepticism, dan Ownership tidak diajarkan sebagai doktrin. Sikap-sikap ini ditanamkan secara tidak langsung melalui:

- **Cerita pembuka** di setiap bab - skenario riset yang menciptakan kebutuhan terhadap konsep.
- **Pitfall & miskonsepsi** - kesalahan nyata yang memicu refleksi.
- **Pertanyaan refleksi** di akhir bab - tiga pertanyaan terbuka yang memaksa mahasiswa mengartikulasikan pemahaman sendiri.
- **Komponen Mandiri** - pilihan jalur mingguan yang melatih inisiatif.

Mahasiswa tidak akan bisa menyebutkan definisi keempat sikap, tetapi pada akhir semester mereka seharusnya *menerapkannya tanpa disuruh*. Itu indikator keberhasilan.

### Peran Dosen: Fasilitator, Bukan Pemberi Ceramah

Modul ini dirancang agar mahasiswa membaca bab *sebelum* sesi tatap muka. Waktu kelas dipakai untuk:

- **Diskusi pitfall** - "Siapa yang pernah mengalami loss tidak turun dari epoch pertama? Apa yang kamu lakukan?"
- **Review protokol** - mahasiswa saling membaca `protocol.md` dan mengkritisi variabel, baseline, dan hipotesis.
- **Bedah hasil lab** - "Angkamu naik 1.7%. Coba lihat std dev-nya. Apakah itu signifikan?"
- **Presentasi Komponen Mandiri** - 10 menit per mahasiswa, dua arah: presenter menjelaskan, audiens bertanya.

Anda tidak perlu menjelaskan isi bab. Mahasiswa sudah membacanya. Tugas Anda adalah memastikan mereka *memahami implikasinya*.

### Empat Sikap dalam Tindakan

| Sikap | Tampak ketika dosen... | Tampak ketika mahasiswa... |
| --- | --- | --- |
| **Curiosity** | Bertanya "kenapa?" setelah setiap klaim mahasiswa | Menjalankan tiga seed tanpa disuruh |
| **Rigor** | Menolak hasil tanpa protokol tertulis | Menyimpan config bersama checkpoint |
| **Skepticism** | Curiga pada akurasi >95% | Memeriksa leakage lebih dulu sebelum senang |
| **Ownership** | Diam saat mahasiswa bertanya, menunggu mereka menjawab sendiri | Bisa menjelaskan setiap baris kode yang ditulis LLM |

---

## 2. Pacing 11 Minggu Bootcamp + 3 Minggu Capstone

Tabel di bawah adalah panduan mingguan. "Checkpoint" adalah bukti minimal bahwa mahasiswa siap lanjut ke minggu berikutnya.

Ritme sesi: 30 menit prior-week findings | 40 menit materi baru + demo | 10 menit rigor habit | 40 menit assignment walkthrough.

| Minggu | Bab | Lab | Topik | Emphasis Dosen | Sikap Dominan | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 00 + 01 W1 | Lab 0 | Orientasi + tabular output heads | Tekankan kontrak belajar, target 60-70%, tiga thread cross-week. Minta tanda tangan kontrak. Mulai Lab 0 bersama. | Curiosity | Kontrak ditandatangani; Lab 0 smoke test jalan |
| 2 | 02 W2 | Lab 1 | Images, CNN, smoke test ritual | Demo three-level smoke test secara live. Tunjukkan run yang berhasil vs gagal. Backprop diperkenalkan konseptual saja. | Curiosity | Smoke test 3-level selesai; SimpleCNN forward pass jalan |
| 3 | 03 W3 | Lab 1 + Lab 2 | Loss, optimizer, galeri run | Mulai dari galeri 5 run - tanya diagnosis sebelum teori. Selesaikan Lab 1 (confusion matrix, error analysis). | Curiosity | Lab 1 checklist selesai; loss curve 5 pola bisa dibedakan |
| 4 | 04 W4 | Lab 3 | Reproducibility + experiment matrix | Wajibkan experiment matrix sebelum kode. Periksa timestamp `protocol.md`. Drill: git hash di checkpoint. | Rigor | Matrix tertulis sebelum run; 3 seed baseline selesai |
| 5 | 05 W5 | Lab 3b | Sequences RNN/LSTM | **Lab 3b wajib**. Tunjukkan gradient flow secara visual - jangan hanya ceritakan. Minta architecture justification statement. | Curiosity + Rigor | Lab 3b selesai; gradient plot ada; justification tertulis |
| 6 | 06 W6 | Lab 6 baru | Representations + temporal leakage | Demo leakage yang menipu: tampilkan F1 tinggi lalu tunjukkan validasi tanpa temporal guard. Delta harus dramatis. | Skepticism | Lab 6 temporal leakage: delta leaky vs causal terdokumentasi |
| 7 | 07 W7 | Lab 5b + Lab 6 | Text, transformers, repo adoption | 2×2 comparison frozen/fine-tune × [CLS]/mean-pool. Minta `repo_map.md` pertama. Synthesis note AI tools. | Ownership | repo_map.md terisi; 2×2 macro-F1 ada |
| 8 | 08 W8 | Foundation Map | Foundation models taxonomy | Drill model card reading - 7 pertanyaan wajib. Dorong skeptisisme pada benchmark claims. | Skepticism + Ownership | Foundation model map 3-4 model + selection memo |
| 9 | 09 W9 | Lab 8 | Multimodal + per-modality ablation | Tunjukkan ignored-modality problem secara empiris. "Hasil bagus" bukan cukup - ablation wajib. | Skepticism | 7 ablation conditions selesai; ignored-modality check done |
| 10 | 10 W10 | Lab 9 | Paper reading + implementation | 3-pass method eksplisit. Minta mahasiswa membawa paper yang sudah di-skim ke kelas. Paper-to-code steps. | Rigor + Curiosity | Three-pass notes + core method terimplementasi |
| 11 | 11 W11 | Proposal | Research framing + capstone proposal | **W11 adalah setup capstone**. 5 Whys drill. Oral defense 10-15 menit per mahasiswa. Sign off proposal sebelum W12. | Integrasi empat sikap | Proposal disetujui; pre-registration di-commit |
| 12 | 12 Capstone | Capstone W12 | Scope, EDA, baseline reproducible | Cek: data tersedia? Baseline running? Leakage audit? Jangan biarkan mulai W13 tanpa baseline clean. | Rigor | `eda.md` + baseline 3-seed + git hash checkpoint |
| 13 | 12 Capstone | Capstone W13 | Main experiment + ablation | Cek: intervention vs baseline adil? Ablation menjawab interpretasi? Baca draft interpretation. | Skepticism + Rigor | Comparison table + ablation + interpretation draft |
| 14 | 12 Capstone | Capstone W14 | Analysis, report, demo, presentasi | Baca laporan: apakah limitasi dinyatakan jujur? Demo menampilkan failure case? Repo bisa di-clone? | Ownership | Laporan + repo + demo terkumpul |

### Catatan Pacing

- **W1 dan W2 (§1.5 baru):** masing-masing bab memiliki section §1.5 baru ("MLP dari Pintu Depan" di W1 dan "Citra Sebagai Tensor: Dari Pixel ke 4D" di W2). Tambahkan ~20-30 menit ke estimasi waktu membaca untuk dua bab ini. Jika sesi tatap muka 2 jam, kurangi satu pitfall discussion atau tunda demo smoke test yang kedua ke sesi berikutnya.
- **W4 (Reproducibility):** minggu paling padat infrastruktur (config YAML, seed, checkpoint, experiment matrix, komunikasi PI). Jangan tambahkan lab breadth di minggu ini; biarkan Lab 3b masuk W5 sebagai mandatory dan Lab 6b/7b paralel di pekan-pekan berikutnya.
- **W5 (LSTM):** paling padat secara konseptual - lihat §1.5 baru (BPTT primer, vanishing gradient numerik, LSTM annotated). Estimasikan mahasiswa butuh 1-2 jam membaca sebelum sesi. Jika waktu kelas hanya 2 jam, pisahkan: sesi pertama = §2.1-2.2 (RNN + vanishing), sesi kedua = §2.3-2.4 (LSTM + GRU).
- **W7 (Text + Repo Adoption):** padat karena mengintegrasikan AI tools, transformers, dan repo adoption dari modul lama. Jika mahasiswa terbebani, prioritaskan `repo_map.md` dan 2×2 frozen/fine-tune; demo Streamlit boleh dikerjakan paralel.
- **W12-W14 (Capstone):** mahasiswa seharusnya sudah punya semua keterampilan teknis. Tugas Anda di fase ini: baca protokol mereka, uji apakah klaim mereka bisa direproduksi, dan pastikan laporan tidak overclaim.

### Peta `<details>Pendalaman</summary>` - Opsional vs Wajib

Setiap bab punya collapsible `<details><summary>Pendalaman</summary>` untuk material lanjutan. Tabel berikut membantu Anda memutuskan mana yang perlu disampaikan di kelas.

| Bab | Topik Pendalaman | Rekomendasi |
|---|---|---|
| W1 §2.4 | Derivasi backprop manual 7-langkah | Opsional: mahasiswa yang ingin bukti matematis. Lampiran A.1 lebih lengkap. |
| W2 §2.3 | Depthwise separable convolution, dilated conv | Opsional: hanya jika ada yang bertanya tentang efisiensi model. |
| W3 §2.3 | Cosine annealing, OneCycleLR scheduler | Opsional di W3; wajib di W4 saat experiment matrix dibahas. |
| W5 §2.4 | GRU gate equations | Opsional: cukup sebutkan GRU sebagai "LSTM lebih ringan". Detail tidak wajib. |
| W7 Part 2 (D1-D7) | Advanced repo adoption (D1-D7, ~600 baris) | Opsional selama bootcamp; wajib untuk capstone yang mengadopsi repo besar. Arahkan mahasiswa ke sini saat W12. |
| W8 §2.3 | PEFT library details, LoRA hyperparameter sweep | Opsional: hanya jika ada yang melakukan fine-tuning LLM di capstone. |
| W10 §2.6 | Rutinitas mingguan lengkap | Opsional selama kelas (sudah diberi callout); dibahas saat sesi terakhir W11 sebagai "bekal setelah lulus". |

Konten di luar `<details>` adalah **core content** - wajib untuk semua mahasiswa. Konten di dalam `<details>` adalah pengayaan; tidak muncul di rubrik secara langsung kecuali jika mahasiswa memilihnya sebagai Komponen Mandiri.

---

## 3. Emphasis Per-W

### W1 - Pendahuluan + Tabular & Output Heads

- **Kritis:** Kontrak Belajar di Pendahuluan - klausul keenam (Breadth Check) dan ketujuh (eksperimen gagal dinilai setara). Mahasiswa harus paham mereka tidak akan dihukum karena hasil negatif. Lab 0 (tabular MLP) sebagai onboarding template_repo.
- **Pitfall:** Kontrak dianggap formalitas. Minta paragraf: "Apa yang paling membuat saya ragu dari kontrak ini?" Jawaban sering mengungkap miskonsepsi awal. Untuk Lab 0: mahasiswa tergoda langsung lompat ke CNN tanpa MLP tabular dulu.
- **Refleksi berbobot:** Pertanyaan capstone-style di akhir bab - simpan jawaban, bandingkan di W14.
- **Kaitan rubrik:** Kompetensi 1 diperkenalkan; belum ada penilaian sumatif.
- **Waktu lab:** Setup template_repo (1-2 jam) + Lab 0 (2-3 jam).

### W2 - Images, CNN & Smoke Test

- **Kritis:** Three-level smoke test ritual (§2.3). Demo live: tunjukkan run yang berhasil vs gagal di proyektor. Backprop diperkenalkan konseptual; derivasi 7-langkah ada di Lampiran A.1 untuk dibaca setelah mahasiswa sudah punya gambaran training.
- **Pitfall:** Mahasiswa skip smoke test karena "kelihatannya jalan". Tunjukkan kasus di mana training tampak normal di awal tapi diam-diam memuat label salah.
- **Refleksi berbobot:** Pertanyaan tentang shape mismatch: "Apa indikator pertama bahwa input/output shape tidak sesuai?"
- **Kaitan rubrik:** Kompetensi 1 (Memahami sistem ML/DL). Target: Novice→Developing.
- **Waktu lab:** Lab 1 (CNN baseline): 4-6 jam. Lab 1c (MLP numpy, breadth opsional): 3-5 jam.

### W3 - Loss, Optimizer & Evaluasi

- **Kritis:** Galeri 5 run (§1.5) sebagai pintu masuk - tanya diagnosis sebelum teori. Drill diagnostic loss curve: tunjukkan curve anonim, minta diagnosis dalam 2 menit.
- **Pitfall:** "Ganti loss = pasti lebih baik." Focal loss bisa memperburuk performa jika kelas sudah seimbang. Tunjukkan counterexample.
- **Refleksi berbobot:** "Loss training turun, loss val stagnan. Hipotesis Anda, langkah test pertama Anda?"
- **Kaitan rubrik:** Kompetensi 1 (lanjutan), Kompetensi 3 (awal). Target: Developing.
- **Waktu lab:** Lab 1 lanjut + Lab 2 (focal loss + freeze ablation): 5-7 jam.

### W4 - Reproducibility & Experiment Matrix

- **Kritis:** Wajibkan experiment matrix sebelum kode. Periksa timestamp `protocol.md` - jika setelah hasil training, itu rasionalisasi bukan protokol. §3.5 (Komunikasi Efektif PI dengan SQRC) drill role-play. §2.6 (Etika Data) singgung negative results sebagai kewajiban.
- **Pitfall:** Mahasiswa mengira `set_seed(42)` cukup. Tunjukkan non-determinisme CUDA: dua run dengan seed sama bisa berbeda 0.5% akurasi. Solusi: `torch.backends.cudnn.deterministic = True`.
- **Refleksi berbobot:** Pertanyaan #4 (koneksi ke capstone) - minta mahasiswa membacakan draft 3 bagian protokol.
- **Kaitan rubrik:** Kompetensi 2 + Kompetensi 3. Target: Developing→Proficient.
- **Waktu lab:** Lab 3 (config + logging): 5-7 jam.

### W5 - Sequences: RNN & LSTM

- **Kritis:** **Lab 3b wajib**. Tunjukkan gradient flow secara visual (log-plot vanishing gradient) - jangan hanya ceritakan. Minta architecture justification statement: kenapa LSTM, bukan vanilla RNN.
- **Pitfall:** Mahasiswa menghafal LSTM gates tanpa menghubungkan ke gradient flow. Minta gambar gate sambil menjelaskan kenapa cell state tidak vanish.
- **Refleksi berbobot:** "Dataset mana yang secara default akan Anda tangani dengan LSTM, dan mana yang Transformer? Kapan ragu?"
- **Kaitan rubrik:** Kompetensi 1 breadth (RNN/LSTM family). Target: Developing.
- **Waktu lab:** Lab 3b (RNN vs LSTM): 4-6 jam mandatory.

### W6 - Representations & Temporal Leakage

- **Kritis:** Demo leakage yang menipu: §0.6 menunjukkan delta dramatis 0.92 → 0.63. Tampilkan F1 tinggi dulu, lalu reveal validasi tanpa temporal guard. Lab 6c (peer code review) sebagai aktivitas berpasangan.
- **Pitfall:** EDA sebagai ritual (`df.describe()`, histogram, selesai). Minta mahasiswa menulis pertanyaan *sebelum* melihat data.
- **Refleksi berbobot:** "Anda mendapat akurasi 99% pada dataset baru. Apa tiga hal pertama yang Anda periksa?"
- **Kaitan rubrik:** Kompetensi 4 (Validasi data) + Kompetensi 6 (peer review). Target: Developing→Proficient.
- **Waktu lab:** Lab 6 (temporal leakage): 6-8 jam. Lab 6c pair review: 2 jam.

### W7 - Text, Transformers & Repo Adoption

- **Kritis:** 2×2 comparison frozen/fine-tune × [CLS]/mean-pool. Minta `repo_map.md` pertama: entry point → model → loss → config. Synthesis note AI tools dengan verifikasi (LLM interaction log Lampiran C.3).
- **Pitfall:** Mahasiswa menyalin kode LLM yang terlihat benar tetapi mengandung bug halus (mis. normalisasi sebelum split). Latihan: beri kode LLM bermasalah, minta menemukan bug. Untuk repo adoption: 2 jam membaca README lalu tidak berani menyentuh kode - dorong `grep` dulu.
- **Refleksi berbobot:** "Apa perbedaan strategi membaca repo riset dengan membaca repo software engineering?"
- **Kaitan rubrik:** Kompetensi 5 (AI tools) + Kompetensi 6 (Adopsi repo). Target: Developing→Proficient.
- **Waktu lab:** Lab 5b (IndoNLU teks): 3-4 jam. Lab 6 (repo adoption): 5-7 jam. Lab 6b (Transformer-mini breadth): 4-6 jam opsional.

### W8 - Foundation Models

- **Kritis:** Model card literacy - 7 pertanyaan wajib (§2). §2.1.1 matriks evaluasi tool 5 dimensi: aturan <12 curigai, 12-18 coba kecil, >18 adopsi. Dorong skeptisisme pada benchmark claims ("SOTA di benchmark X").
- **Pitfall:** Mahasiswa langsung memilih model terbesar atau ter-popular. Drill: "kapan adapter cukup vs full fine-tuning?" sebelum menyentuh GPU.
- **Refleksi berbobot:** "Anda menemukan model baru yang klaim SOTA. Bagaimana memverifikasi?"
- **Kaitan rubrik:** Kompetensi 8 (Platform & tool baru, foundation map). Target: Developing.
- **Waktu lab:** Foundation Model Map + selection memo: 4-5 jam.

### W9 - Multimodal Reasoning

- **Kritis:** Per-modality ablation. Tunjukkan ignored-modality problem secara empiris: model "sukses" tanpa benar-benar memakai salah satu modalitas. "Hasil bagus" bukan cukup; ablation 7-condition wajib.
- **Pitfall:** Fusion strategi dipilih berdasar trend, bukan analisis. Minta justifikasi sebelum implementasi.
- **Refleksi berbobot:** "Modalitas mana yang seharusnya paling kontributif untuk dataset Anda? Apakah hasil ablation memvalidasi intuisi itu?"
- **Kaitan rubrik:** Kompetensi 1 breadth (multimodal) + Kompetensi 4 (skeptisisme). Target: Developing→Proficient.
- **Waktu lab:** Lab 8 (multimodal ablation 7 kondisi): 6-8 jam.

### W10 - Paper Reading & Implementation

- **Kritis:** 3-pass method eksplisit. Minta mahasiswa membawa paper yang sudah di-skim ke kelas. Paper-to-code workflow: dari klaim → kode minimum yang mereproduksi.
- **Pitfall:** 3-pass dipakai sebagai ritual, bukan alat. Pass 1 tanpa pertanyaan adalah membaca cepat. Minta tulisan satu pertanyaan *sebelum* Pass 1.
- **Refleksi berbobot:** "Setelah membaca satu paper, apa eksperimen pertama yang akan Anda jalankan?"
- **Kaitan rubrik:** Kompetensi 9 (paper reading + reproduksi). Target: Developing→Proficient.
- **Waktu lab:** Lab 9 (paper-to-code): 6-8 jam. Komponen Mandiri W10 = entri portofolio terakhir + Refleksi Portofolio.

### W11 - Research Framing & Capstone Proposal

- **Kritis:** **W11 adalah setup capstone**. 5 Whys drill di kelas. Oral defense 10-15 menit per mahasiswa di akhir minggu. Sign off proposal sebelum W12 - jangan biarkan mahasiswa mulai capstone tanpa proposal disetujui.
- **Pitfall:** Mahasiswa mengambil proyek terlalu besar. Batas sehat: satu dataset, satu pertanyaan riset, maksimal 4 ablation. "Membandingkan 5 arsitektur pada 3 dataset" bukan capstone - itu tesis.
- **Refleksi berbobot:** "Setelah 5 Whys, apa pertanyaan riset yang tersisa? Falsifiable?"
- **Kaitan rubrik:** Integrasi semua kompetensi (proposal + oral defense). Target: Proficient.
- **Waktu lab:** W11 menggantikan lab dengan deliverable proposal + pre-registration. Estimasi 8-12 jam termasuk revisi pasca oral defense.

### W12-W14 - Capstone

- **Kritis:** W12 checkpoint: data tersedia? Baseline running? Leakage audit? Jangan biarkan mulai W13 tanpa baseline clean. W13: intervention vs baseline adil? Ablation menjawab interpretasi? W14: limitasi dinyatakan jujur? Demo menampilkan failure case? Repo bisa di-clone?
- **Pitfall:** Mahasiswa terlalu fokus eksperimen, tidak punya waktu untuk laporan. Tegakkan: laporan ditulis paralel, bukan di akhir.
- **Refleksi:** Tidak ada refleksi terstruktur. Gantikan dengan sesi "post-mortem" 15 menit per mahasiswa: apa yang berhasil, apa yang gagal, apa yang akan dilakukan berbeda.
- **Kaitan rubrik:** Semua kompetensi dinilai sumatif berdasarkan artefak capstone.
- **Waktu:** 15-20 jam per mahasiswa per minggu (3 minggu penuh = 45-60 jam).

---

## 4. Cara Membaca Rubrik

### Empat Level Penguasaan

Rubrik di [13_Rubrik_Penilaian.md](13_Rubrik_Penilaian.md) menggunakan empat level yang berlaku untuk semua kompetensi:

| Level | Skor | Inti |
| --- | --- | --- |
| **Novice** | 50 | Bisa menjalankan prosedur dengan contoh langkah demi langkah; belum bisa menjelaskan pilihan desain. |
| **Developing** | 70 | Bisa menjalankan secara mandiri pada kasus mirip contoh; mengenali nama pitfall tetapi belum sigap mendeteksinya. |
| **Proficient** | 85 | Bisa menerapkan pada kasus baru; menjelaskan pilihan desain dengan alasan; mendeteksi pitfall sebelum menjadi masalah. |
| **Masterpiece** | 95 | Menerapkan prinsip ke kasus yang belum pernah dilihat; menyusun penjelasan yang membantu orang lain belajar. |

**Target realistis:** Mahasiswa rata-rata mencapai Developing di sebagian besar kompetensi pada akhir semester. Proficient di 2-3 kompetensi adalah hasil yang sangat baik. Masterpiece jarang dan tidak diharapkan di semua kompetensi.

### Tiga Titik Evaluasi

1. **W4 (akhir Lab 3).** Tinjauan formatif pertama. Fokus: Kompetensi 1-3. Tujuan: deteksi dini mahasiswa yang tertinggal. Belum ada nilai.
2. **W7 (akhir Lab 6).** Tinjauan formatif kedua. Fokus: Kompetensi 4-6 + cek ulang Kompetensi 1-3.
3. **W14 (akhir Capstone).** Evaluasi sumatif. Semua kompetensi dinilai berdasarkan artefak dari seluruh semester.

### Cara Menentukan Level dari Artefak

- Jangan menilai dari kesan diskusi lisan. Minta bukti konkret: notebook, commit history, `protocol.md`, `experiment_log.md`, portofolio.
- Satu artefak bisa menjadi bukti untuk beberapa kompetensi sekaligus. Misalnya, folder `experiments/focal_gamma2_seed42/` yang berisi `config.yaml`, `ckpt_best.pt`, dan `summary.json` adalah bukti untuk Kompetensi 2 (protokol), 3 (reproduksibilitas), dan 6 (modifikasi terstruktur).
- Jika ragu antara dua level, pilih yang lebih rendah dan catat apa yang kurang untuk level berikutnya. Ini lebih membantu daripada inflasi nilai.

### Mahasiswa yang Tertinggal

Jika pada titik tinjauan seorang mahasiswa masih Novice di lebih dari setengah kompetensi yang sudah dilatih:

1. Identifikasi pola: apakah masalahnya di konsep (tidak paham) atau di eksekusi (paham tapi tidak mengerjakan)?
2. Konsep: beri reading tambahan dari Bacaan Lanjutan + sesi tanya jawab 30 menit.
3. Eksekusi: periksa catatan eksperimen. Sering kali masalahnya bukan kemampuan tetapi kebiasaan menunda.
4. Jika masalah berlanjut, arahkan ke jalur cepat (Pendahuluan §5c) dan fokuskan pada kompetensi yang paling relevan dengan Capstone.

---

## 5. Cara Menilai Portofolio

### Struktur Portofolio

Portofolio mahasiswa ada di `notebooks/portofolio_mandiri.ipynb` - 7 entri (W4-W10), satu per minggu Komponen Mandiri. Setiap entri berisi:

- **Setup:** Konteks dan pertanyaan yang mendorong eksplorasi.
- **Temuan:** Apa yang ditemukan (dengan bukti: kode, plot, tabel).
- **Kejutan:** Apa yang tidak sesuai ekspektasi.
- **Yang Akan Diubah:** Jika mengulangi, apa yang akan dilakukan berbeda.
- **Koneksi:** Kaitan dengan materi bab atau pekan sebelumnya.

### Kriteria Penilaian per Entri

| Aspek | Novice | Developing | Proficient | Masterpiece |
| --- | --- | --- | --- | --- |
| **Pilihan jalur** | Memilih tanpa alasan | Alasan singkat ("saya tertarik") | Dikaitkan dengan gap skill atau pertanyaan riset | Pilihan membentuk narasi lintas pekan |
| **Bukti eksekusi** | Tidak ada bukti konkret | Kode atau plot ada, tidak terinterpretasi | Kode/plot + 1 paragraf interpretasi | Interpretasi mencakup "apa yang TIDAK bisa disimpulkan" |
| **Refleksi** | "Berjalan lancar" tanpa detail | Satu kejutan atau kesulitan disebut | Kejutan + mengapa terjadi + apa yang diubah | Kejutan dihubungkan ke konsep dari bab lain |
| **Koneksi** | Tidak ada koneksi ke materi | Koneksi disebut ("ini adalah implementasi dari...") | Koneksi spesifik ke section bab | Koneksi mensintesis dua bab atau lebih |

### Cara Mendeteksi Entri "Copy-Paste dari Lab"

Entri yang hanya mengulang output lab (`accuracy = 0.78`, `loss turun`) tanpa interpretasi tambahan otomatis Novice. Ciri entri copy-paste:
- Tidak ada kejutan ("semua berjalan sesuai harapan").
- Tidak ada koneksi ke materi ("saya menjalankan Lab X" tanpa menjelaskan apa yang dipelajari).
- Kode identik dengan lab notebook (periksa diff terhadap notebook asli).

### Cara Memberi Feedback yang Actionable

Hindari:
- "Bagus!" (tidak informatif)
- "Kurang dalam" (tidak spesifik)
- "Perlu ditingkatkan" (tidak ada arah)

Pakai format: **Satu hal yang sudah baik + satu hal yang bisa dipertajam.**
Contoh: "Analisis F1 per kelas sudah baik karena kamu menghubungkan penurunan ke jumlah sampel. Satu hal: coba tuliskan apa yang TIDAK kamu yakini dari hasil ini - itu akan memperkuat bagian Kejutan."

### Tips Grading Portofolio

- **Batch per kompetensi, bukan per mahasiswa.** Baca semua entri W4 (Kompetensi 2) dulu, baru lanjut ke W5. Ini lebih cepat dan lebih konsisten daripada menilai per mahasiswa.
- **Fokus pada progres, bukan absolut.** Mahasiswa yang entri W4-nya Novice tapi W10-nya Proficient lebih baik daripada yang stagnan di Developing sepanjang semester.
- **Portofolio + Capstone = gambaran utuh.** Jangan menilai portofolio secara terpisah dari Capstone. Sering kali kelemahan di portofolio dijawab di Capstone.

---

## 6. Skenario Kelas

### Skenario 1: Mahasiswa Tidak Pernah Mengerjakan Komponen Mandiri

**Gejala:** Portofolio kosong di W6. Mahasiswa hadir dan mengerjakan lab wajib, tetapi Komponen Mandiri diabaikan.

**Tindakan:**
1. Periksa apakah mahasiswa paham bahwa Komponen Mandiri adalah bagian dari penilaian (Kompetensi 10).
2. Tanyakan apakah kebingungan memilih jalur atau kesulitan waktu. Sering kali masalahnya adalah "tidak tahu harus mulai dari mana."
3. Solusi: arahkan ke satu jalur yang paling sesuai dengan minat mereka dan minta satu entri pendek (cukup 15 menit) minggu itu juga. Momentum awal lebih penting daripada kualitas.
4. Jika berlanjut, aktifkan Kompetensi 10 sebagai trigger: portofolio kosong = 0 di kompetensi itu, yang mempengaruhi nilai akhir secara signifikan.

### Skenario 2: Hasil Lab Bagus tapi Mahasiswa Tidak Bisa Menjelaskan

**Gejala:** Notebook lab selesai, akurasi sesuai ekspektasi, tetapi saat ditanya "mengapa Anda memilih learning rate ini?" mahasiswa tidak bisa menjawab.

**Tindakan:**
1. Ini tanda kurang refleksi, bukan kurang kemampuan. Mahasiswa mengerjakan lab sebagai checklist, bukan sebagai eksplorasi.
2. Minta mahasiswa menulis refleksi tambahan: "Pilih satu keputusan desain di lab ini. Jelaskan mengapa Anda memilihnya, dan apa yang akan terjadi jika Anda memilih sebaliknya."
3. Di sesi berikutnya, tanya refleksi itu secara lisan. Mahasiswa yang sudah menulis akan lebih siap menjawab.

### Skenario 3: Mahasiswa Tertinggal 2 Minggu

**Gejala:** Mahasiswa masih di W3 saat kelas sudah di W5.

**Tindakan:**
1. Identifikasi apakah ketertinggalan karena konsep atau karena waktu.
2. Jika konsep: arahkan ke jalur cepat (Pendahuluan §5c). W6-W9 punya komponen opsional (Lab 6b, 6c, 7b breadth) - prioritaskan core content yang paling relevan dengan Capstone mereka.
3. Jika waktu: negosiasikan cakupan. Lebih baik mengerjakan W1-W7 + W11 + Capstone dengan dalam daripada semua minggu dengan dangkal.
4. Breadth Check (4 dari 5 arsitektur) tetap wajib, tetapi bisa dikerjakan paralel.

### Skenario 4: Mahasiswa Mengeluh "Instruksi PI Tidak Jelas" (W4)

**Gejala:** Mahasiswa mengatakan "dosen pembimbing saya tidak pernah jelas." Mereka tidak bisa memulai eksperimen karena menunggu instruksi sempurna.

**Tindakan:**
1. Arahkan ke W4 §3.5 (Komunikasi Efektif dengan Dosen Pembimbing - kerangka SQRC + matriks saluran).
2. Latih refleks SQRC: minta mereka menulis asumsi, bukan menunggu jawaban.
3. Role-play: Anda berperan sebagai PI yang sibuk dan memberi instruksi ambigu. Minta mahasiswa merespon dengan satu kalimat konfirmasi + asumsi.
4. Tekankan bahwa 80% pekerjaan asisten riset adalah mengklarifikasi, bukan mengeksekusi.

### Skenario 5: Kelas Berjuang di W5 LSTM

**Gejala:** Di tengah W5, banyak mahasiswa tampak diam saat diajak diskusi, pertanyaan refleksi kosong, atau notebook Lab 3b tidak dimulai. Beberapa mahasiswa mengaku "paham di permukaan tapi tidak bisa jelasin kenapa LSTM lebih baik."

W5 secara konsisten menjadi titik paling curam di modul - BPTT, vanishing gradient, dan gate mechanism LSTM semuanya baru dalam satu minggu.

**Tindakan:**

1. **Diagnosis cepat di awal sesi W5.** Beri pertanyaan anchor: "Tanpa membuka catatan, jelaskan dalam satu kalimat mengapa vanilla RNN kesulitan dengan sequence panjang." Jika lebih dari setengah kelas diam, W5 perlu diperlambat.

2. **Pisahkan sesi konseptual dari implementasi.** Sesi pertama: fokus §2.1-2.2 (RNN + vanishing gradient numerik - contoh 0.5^10 = 0.001 ada di bab). Tunjukkan gradient flow plot secara live dari Lab 3b sebelum mahasiswa mengerjakan sendiri. Sesi kedua: §2.3-2.4 (LSTM gate + cell state). Lab 3b dikerjakan sebagai homework setelah dua sesi itu.

3. **Gunakan §1.5 BPTT primer.** Bagian §1.5 di W5 berisi derivasi BPTT dengan contoh numerik - bukan sekadar rumus. Minta mahasiswa membaca ulang §1.5 sebelum Lab 3b. Jika mereka masih stuck di forward pass LSTM, arahkan ke "satu timestep manual" di §2.3 (hidden_size=4, hitung i_t, f_t, o_t, c_t satu per satu).

4. **Jangan skip Lab 3b.** Lab ini wajib (Breadth Check Kompetensi 1). Jika waktu habis, pangkas satu analisis lain (misalnya analisis lanjutan dari Lab 2), bukan Lab 3b. Gradient flow plot vanishing vs LSTM adalah bukti visual yang tidak bisa diganti narasi.

5. **Frame ulang kesulitan.** Katakan langsung: "W5 memang paling sulit. Jika Anda merasa pusing, itu normal. Yang perlu Anda bawa keluar dari W5 bukan hafalan gate equations, melainkan dua hal: (1) kenapa vanilla RNN gagal di sequence panjang, dan (2) cell state adalah 'jalan tol' yang melindungi gradient."

### Skenario 6: Semua Mahasiswa Memakai LLM untuk Mengerjakan Lab (W7+)

**Gejala:** Kode di semua notebook mirip (gaya variabel, komentar, struktur), dan mahasiswa tidak bisa menjelaskan bagian tertentu.

**Tindakan:**
1. Jangan larang LLM. Alihkan ke W7 (AI tools sebagai pendukung): "Anda boleh pakai LLM, tetapi Anda harus bisa menjelaskan setiap baris."
2. Uji lisan: panggil mahasiswa secara acak, minta mereka menjelaskan satu fungsi yang mereka submit. Jika tidak bisa, minta mereka menulis ulang dengan gaya sendiri.
3. Normalisasi: gunakan LLM interaction log (Lampiran C.3). Minta mahasiswa mencatat prompt yang mereka pakai. Transparansi lebih efektif daripada larangan.
4. Tekankan bahwa nilai berasal dari pemahaman, bukan dari kode yang jalan.

---

## 7. Bacaan Lanjutan untuk Dosen

- **Dan Levy - *Teaching Effectively with Zoom*** (2020). Meskipun berfokus pada pengajaran online, bab tentang "memfasilitasi diskusi, bukan memberi ceramah" berlaku untuk kelas tatap muka.
- **Linda Nilson - *Specifications Grading*** (2014). Buku referensi tentang mastery-based grading. Rubrik modul ini (4 level, 3 titik evaluasi) adalah adaptasi dari spec grading.
- **David Perkins - *Making Learning Whole*** (2009). Tentang "teaching for understanding" melalui tujuh prinsip; relevan untuk memahami mengapa modul ini menolak mengajarkan sikap sebagai bab terpisah.
- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Baca sebelum mengajar W2 dan W3. Esai pendek ini adalah companion piece untuk W3 §2.5 (loss curve diagnosis).
- **Jupyter Notebook untuk pengajaran:** Jika mahasiswa kesulitan dengan notebook, pertimbangkan untuk menggunakan JupyterBook atau nbgrader untuk distribusi dan penilaian otomatis.

---

## 8. Penutup

Modul ini dibangun dengan keyakinan bahwa asisten riset yang baik bukanlah yang paling cepat menulis kode, melainkan yang paling jujur pada data, paling disiplin dalam mencatat, dan paling berani mengakui ketidaktahuan. Jika Anda sebagai dosen membawa keyakinan yang sama ke dalam kelas - memperlakukan setiap pertanyaan mahasiswa sebagai awal eksplorasi, bukan akhir jawaban - modul ini akan efektif.

Selamat mengajar. Mulailah dengan Pendahuluan, dan biarkan mahasiswa menyadari sendiri mengapa curiosity, rigor, skepticism, dan ownership lebih penting daripada framework apapun.
