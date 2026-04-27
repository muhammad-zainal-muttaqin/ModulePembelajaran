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

Dokumen ini adalah panduan operasional untuk dosen pengampu, instruktur, atau fasilitator yang akan menjalankan modul. Anda akan menemukan filosofi modul dalam satu halaman, pacing rinci per minggu, apa yang harus ditekankan di setiap bab, cara membaca dan memakai rubrik penilaian, cara menilai portofolio, skenario kelas yang umum dan cara menanganinya, serta bacaan lanjutan tentang pedagogi mastery-based grading. Setelah membaca dokumen ini, Anda bisa memfasilitasi satu semester penuh tanpa menebak-nebak.

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

- **Minggu 5–6 (Bab 03):** Bab ini paling padat infrastruktur. Jika mahasiswa tertinggal, kurangi cakupan Lab 3b (RNN/LSTM) - lab breadth bisa dikerjakan paralel di minggu-minggu berikutnya.
- **Minggu 8 (Bab 05):** Jika mahasiswa sudah terbiasa dengan LLM, percepat Lab 5 dan habiskan lebih banyak waktu di Lab 5b (domain teks).
- **Minggu 13–14:** Mahasiswa seharusnya sudah punya semua keterampilan teknis. Tugas Anda di fase ini: baca protokol mereka, uji apakah klaim mereka bisa direproduksi, dan pastikan laporan tidak overclaim.

---

## 3. Emphasis Per-Bab

### Bab 00 - Pendahuluan (Minggu 1)

- **Kritis:** Kontrak Belajar - terutama klausul keenam (Breadth Check) dan ketujuh (eksperimen gagal dinilai setara). Mahasiswa harus paham bahwa mereka tidak akan dihukum karena hasil negatif.
- **Pitfall:** Mahasiswa cenderung menganggap kontrak sebagai formalitas. Minta mereka menulis satu paragraf: "Apa yang paling membuat saya ragu dari kontrak ini?" Jawabannya sering mengungkap miskonsepsi awal.
- **Refleksi berbobot:** Pertanyaan #3 - "Saat Anda menerima email PI seperti di pembuka bab ini hari ini, apa tiga langkah pertama yang akan Anda ambil?" Simpan jawaban ini; bandingkan di minggu 14.
- **Kaitan rubrik:** Semua kompetensi diperkenalkan; belum ada penilaian.
- **Waktu lab:** Tidak ada lab. Setup template_repo: 1-2 jam.

### Bab 01a - Fondasi Neural Network (Minggu 2)

- **Kritis:** Section 2.2 (MLP backprop 7-langkah). Ini fondasi untuk memahami *semua* training dynamics. Jika mahasiswa tidak bisa menurunkan chain rule untuk MLP 2-layer, mereka akan kesulitan mendiagnosis gradient flow di arsitektur yang lebih kompleks.
- **Pitfall:** Mahasiswa menghafal empat keluarga arsitektur sebagai taksonomi kaku, bukan sebagai asumsi tentang data. Diskusikan kasus hibrid: CNN + Transformer (ViT), CNN + RNN (video classification).
- **Refleksi berbobot:** Pertanyaan #2 - "Dataset mana yang paling sulit Anda tentukan arsitekturnya, dan mengapa?"
- **Kaitan rubrik:** Kompetensi 1 (Memahami sistem ML/DL). Target: Novice→Developing.
- **Waktu lab:** Lab 1c (MLP numpy): 3-5 jam.

### Bab 01b - Loss, Optimizer & Evaluasi (Minggu 3)

- **Kritis:** Section 2.5 (diagnosis loss curve). Mahasiswa harus bisa melihat loss curve dan langsung menyebutkan hipotesis. Drill ini dengan menunjukkan loss curve anonim dan minta diagnosis dalam 2 menit.
- **Pitfall:** "Ganti loss = pasti lebih baik." Focal loss bisa memperburuk performa jika kelas sudah seimbang. Tunjukkan counterexample konkret.
- **Refleksi berbobot:** Pertanyaan #1 - "Loss training turun, loss val stagnan. Hipotesis Anda, langkah test pertama Anda?"
- **Kaitan rubrik:** Kompetensi 1 (lanjutan), Kompetensi 3 (awal). Target: Developing.
- **Waktu lab:** Lab 1: 4-6 jam (lanjutan dari 01a).

### Bab 02 - Ide ke Eksperimen (Minggu 4)

- **Kritis:** Lima pertanyaan sebelum menyentuh kode (Section 2.1). Latih refleks ini: setiap kali mahasiswa ingin menjalankan sesuatu, tanya "protokolnya mana?"
- **Pitfall:** Mahasiswa menulis protokol *setelah* eksperimen, menyesuaikan narasi dengan hasil. Periksa timestamp `protocol.md`. Jika timestamp setelah hasil training, itu bukan protokol - itu rasionalisasi.
- **Refleksi berbobot:** Pertanyaan #4 (koneksi ke capstone) - minta mahasiswa membacakan draft 3 bagian protokol mereka.
- **Kaitan rubrik:** Kompetensi 2 (Menerjemahkan ide ke eksperimen). Target: Developing→Proficient.
- **Waktu lab:** Lab 2: 5-7 jam (implementasi loss + ablation + laporan).

### Bab 03 - Eksperimen Reproduksibel (Minggu 5–6)

- **Kritis:** Config YAML sebagai sumber kebenaran, git hash di checkpoint. Latihan: beri mahasiswa folder eksperimen tanpa config, minta mereka mereproduksi hasilnya. Mereka akan gagal - dan pelajaran itu melekat.
- **Pitfall:** Mahasiswa mengira `set_seed(42)` cukup. Tunjukkan non-determinisme CUDA: dua run dengan seed sama bisa berbeda 0.5% akurasi. Solusi: `torch.backends.cudnn.deterministic = True`.
- **Refleksi berbobot:** Pertanyaan #2 - "Anda menemukan folder `experiments/` seperti di Section 1. Apa tiga pertanyaan pertama yang Anda ajukan untuk menyelamatkan situasi?"
- **Kaitan rubrik:** Kompetensi 3 (Eksperimen reproduksibel). Target: Developing→Proficient.
- **Waktu lab:** Lab 3: 5-7 jam. Lab 3b (breadth): 3-4 jam.

### Bab 04 - Validasi Data (Minggu 7)

- **Kritis:** Data leakage sebagai musuh utama. Tunjukkan contoh nyata dari riset: paper yang di-retract karena leakage. Mahasiswa harus bisa membedakan tiga jenis leakage (temporal, group, preprocessing).
- **Pitfall:** EDA sebagai ritual (`df.describe()`, histogram, selesai). Minta mahasiswa menulis pertanyaan *sebelum* melihat data, lalu menjawabnya dengan EDA. Bukan sebaliknya.
- **Refleksi berbobot:** Pertanyaan #1 - "Anda mendapat akurasi 99% pada dataset baru. Apa tiga hal pertama yang Anda periksa?"
- **Kaitan rubrik:** Kompetensi 4 (Validasi data). Target: Developing→Proficient.
- **Waktu lab:** Lab 4: 6-8 jam (EDA + leakage audit + label inspection).

### Bab 05 - AI Tools Sebagai Pendukung (Minggu 8)

- **Kritis:** Protokol verifikasi LLM (baca baris per baris, uji kasus batas, uji minimal). Jangan debat "apakah LLM boleh dipakai" - fokus pada "bagaimana memakai LLM tanpa kehilangan pemahaman."
- **Pitfall:** Mahasiswa menyalin kode LLM yang terlihat benar tetapi mengandung bug halus. Latihan: beri kode LLM dengan bug (mis. normalisasi diterapkan sebelum split), minta mahasiswa menemukannya.
- **Refleksi berbobot:** Pertanyaan #3 - "Kapan terakhir kali Anda menyalin kode tanpa membacanya? Apa yang Anda pelajari dari kejadian itu?"
- **Kaitan rubrik:** Kompetensi 5 (AI tools). Target: Developing→Proficient.
- **Waktu lab:** Lab 5: 4-5 jam. Lab 5b (domain teks): 3-4 jam.

### Bab 06 - Adopsi Repo Riset (Minggu 9)

- **Kritis:** Strategi membaca repo asing: temukan entry point → model → loss → config. Drill: beri repo GitHub acak, minta mahasiswa memetakan empat komponen itu dalam 30 menit.
- **Pitfall:** Mahasiswa menghabiskan 2 jam membaca README lalu tidak berani menyentuh kode. Dorong mereka untuk menjalankan `grep` sebelum membaca - temukan file yang relevan dulu, baru baca.
- **Refleksi berbobot:** Pertanyaan #2 - "Apa perbedaan strategi membaca repo riset dengan membaca repo software engineering?"
- **Kaitan rubrik:** Kompetensi 6 (Adopsi repo). Target: Developing→Proficient.
- **Waktu lab:** Lab 6: 5-7 jam. Lab 6b (Transformer breadth): 4-6 jam.

### Bab 07 - Alat Pendukung Ringan (Minggu 10)

- **Kritis:** Tool harus menunjukkan *failure case*, bukan hanya sukses. Demo yang hanya menampilkan prediksi benar tidak informatif. Minta mahasiswa menampilkan confusion matrix, sampel paling salah, dan distribusi confidence.
- **Pitfall:** Mahasiswa menghabiskan 6 jam membuat UI cantik tapi lupa menambahkan penjelasan tentang apa yang dilihat pengguna.
- **Refleksi berbobot:** Pertanyaan #1 - "Tool Anda menunjukkan akurasi 78%. Tanpa penjelasan, apa yang mungkin disimpulkan pengguna?"
- **Kaitan rubrik:** Kompetensi 7 (Alat ringan). Target: Developing.
- **Waktu lab:** Lab 7: 4-6 jam. Lab 7b (Autoencoder breadth): 3-5 jam.

### Bab 08 - Platform & Tool Baru (Minggu 11)

- **Kritis:** Mematikan pod setelah selesai. Ini bukan lelucon - tagihan $400 terjadi karena pod tidak dimatikan. Drill: sebelum sesi berakhir, semua mahasiswa menunjukkan bukti pod sudah mati.
- **Pitfall:** Mahasiswa langsung integrasi tanpa mengikuti 5 langkah adopsi. Paksakan Langkah 1-2 (quickstart + replikasi tutorial) sebelum menyentuh proyek sendiri.
- **Refleksi berbobot:** Pertanyaan #3 - "Anda menemukan tool baru yang belum ada di modul. Bagaimana Anda mengevaluasinya?"
- **Kaitan rubrik:** Kompetensi 8 (Platform & tool baru). Target: Developing.
- **Waktu lab:** Lab 8: 3-5 jam (setup + training + shutdown).

### Bab 09 - Pengembangan Mandiri (Minggu 12)

- **Kritis:** Pre-registration dan paper reading. Di titik ini mahasiswa seharusnya sudah bisa menulis pre-registration tanpa template. Minta mereka menulis dengan narasi bebas dulu, baru dicocokkan dengan template.
- **Pitfall:** 3-pass reading method dipakai sebagai ritual, bukan alat. Pass 1 tanpa pertanyaan adalah membaca cepat, bukan skim. Minta mahasiswa menuliskan satu pertanyaan *sebelum* Pass 1.
- **Refleksi berbobot:** Pertanyaan #2 - "Setelah membaca satu paper, apa eksperimen pertama yang akan Anda jalankan?"
- **Kaitan rubrik:** Kompetensi 9 (Pengembangan mandiri). Target: Developing→Proficient.
- **Waktu lab:** Lab 9: 4-6 jam.

### Bab 10 - Capstone (Minggu 13–14)

- **Kritis:** Minggu 13 untuk checkpoint: apakah mahasiswa punya data, baseline, dan protokol yang jelas? Jangan biarkan mereka mulai training tanpa ketiganya.
- **Pitfall:** Mahasiswa mengambil proyek terlalu besar. Batas sehat: satu dataset, satu pertanyaan riset, maksimal 4 ablation. "Membandingkan 5 arsitektur pada 3 dataset" bukan capstone - itu tesis.
- **Refleksi:** Tidak ada refleksi terstruktur. Gantikan dengan sesi "post-mortem" 15 menit per mahasiswa: apa yang berhasil, apa yang gagal, apa yang akan kamu lakukan berbeda.
- **Waktu:** 15-20 jam per mahasiswa (setara 2 minggu penuh).

---

## 4. Cara Membaca Rubrik

### Empat Level Penguasaan

Rubrik di Bab 11 menggunakan empat level yang berlaku untuk semua kompetensi:

| Level | Skor | Inti |
| --- | --- | --- |
| **Novice** | 50 | Bisa menjalankan prosedur dengan contoh langkah demi langkah; belum bisa menjelaskan pilihan desain. |
| **Developing** | 70 | Bisa menjalankan secara mandiri pada kasus mirip contoh; mengenali nama pitfall tetapi belum sigap mendeteksinya. |
| **Proficient** | 85 | Bisa menerapkan pada kasus baru; menjelaskan pilihan desain dengan alasan; mendeteksi pitfall sebelum menjadi masalah. |
| **Masterpiece** | 95 | Menerapkan prinsip ke kasus yang belum pernah dilihat; menyusun penjelasan yang membantu orang lain belajar. |

**Target realistis:** Mahasiswa rata-rata mencapai Developing di sebagian besar kompetensi pada akhir semester. Proficient di 2-3 kompetensi adalah hasil yang sangat baik. Masterpiece jarang dan tidak diharapkan di semua kompetensi.

### Tiga Titik Evaluasi

1. **Minggu 6 (setelah Lab 3).** Tinjauan formatif. Fokus: Kompetensi 1-3. Tujuan: deteksi dini mahasiswa yang tertinggal. Belum ada nilai.
2. **Minggu 10 (setelah Lab 6).** Tinjauan formatif kedua. Fokus: Kompetensi 4-6 + cek ulang Kompetensi 1-3.
3. **Minggu 14 (setelah Capstone).** Evaluasi sumatif. Semua kompetensi dinilai berdasarkan artefak dari seluruh semester.

### Cara Menentukan Level dari Artefak

- Jangan menilai dari kesan diskusi lisan. Minta bukti konkret: notebook, commit history, `protocol.md`, `experiment_log.md`, portofolio.
- Satu artefak bisa menjadi bukti untuk beberapa kompetensi sekaligus. Misalnya, folder `experiments/focal_gamma2_seed42/` yang berisi `config.yaml`, `ckpt_best.pt`, dan `summary.json` adalah bukti untuk Kompetensi 2 (protokol), 3 (reproduksibilitas), dan 6 (modifikasi terstruktur).
- Jika ragu antara dua level, pilih yang lebih rendah dan catat apa yang kurang untuk level berikutnya. Ini lebih membantu daripada inflasi nilai.

### Mahasiswa yang Tertinggal

Jika pada titik tinjauan seorang mahasiswa masih Novice di lebih dari setengah kompetensi yang sudah dilatih:

1. Identifikasi pola: apakah masalahnya di konsep (tidak paham) atau di eksekusi (paham tapi tidak mengerjakan)?
2. Konsep: beri reading tambahan dari Bacaan Lanjutan + sesi tanya jawab 30 menit.
3. Eksekusi: periksa catatan eksperimen. Sering kali masalahnya bukan kemampuan tetapi kebiasaan menunda.
4. Jika masalah berlanjut, arahkan ke jalur cepat 10 minggu (Bab 00 Section 5c) dan fokuskan pada kompetensi yang paling relevan dengan Capstone.

---

## 5. Cara Menilai Portofolio

### Struktur Portofolio

Portofolio mahasiswa ada di `notebooks/portofolio_mandiri.ipynb` - 8 entri (Pekan 4-12), satu per minggu mulai Bab 02. Setiap entri berisi:

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

- **Batch per kompetensi, bukan per mahasiswa.** Baca semua entri Pekan 4 (Kompetensi 2) dulu, baru lanjut ke Pekan 5. Ini lebih cepat dan lebih konsisten daripada menilai per mahasiswa.
- **Fokus pada progres, bukan absolut.** Mahasiswa yang entri Pekan 4-nya Novice tapi Pekan 12-nya Proficient lebih baik daripada yang stagnan di Developing sepanjang semester.
- **Portofolio + Capstone = gambaran utuh.** Jangan menilai portofolio secara terpisah dari Capstone. Sering kali kelemahan di portofolio dijawab di Capstone.

---

## 6. Skenario Kelas

### Skenario 1: Mahasiswa Tidak Pernah Mengerjakan Komponen Mandiri

**Gejala:** Portofolio kosong di minggu 6. Mahasiswa hadir dan mengerjakan lab wajib, tetapi Komponen Mandiri diabaikan.

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

**Gejala:** Mahasiswa masih di Bab 02 saat kelas sudah di Bab 04.

**Tindakan:**
1. Identifikasi apakah ketertinggalan karena konsep atau karena waktu.
2. Jika konsep: arahkan ke jalur cepat 10 minggu (Bab 00 §5c). Bab 04-07 adalah "Pilih-2", bukan wajib. Pilih dua yang paling relevan dengan Capstone mereka.
3. Jika waktu: negosiasikan cakupan. Lebih baik mengerjakan 6 bab dengan dalam daripada 10 bab dengan dangkal.
4. Breadth Check (4 dari 5 arsitektur) tetap wajib, tetapi bisa dikerjakan paralel.

### Skenario 4: Mahasiswa Mengeluh "Instruksi PI Tidak Jelas" (Bab 02)

**Gejala:** Mahasiswa mengatakan "dosen pembimbing saya tidak pernah jelas." Mereka tidak bisa memulai eksperimen karena menunggu instruksi sempurna.

**Tindakan:**
1. Arahkan ke Bab 02 §3.1 (membaca instruksi secara kritis) dan §3.5 (komunikasi dengan PI).
2. Latih refleks SQRC: minta mereka menulis asumsi, bukan menunggu jawaban.
3. Role-play: Anda berperan sebagai PI yang sibuk dan memberi instruksi ambigu. Minta mahasiswa merespon dengan satu kalimat konfirmasi + asumsi.
4. Tekankan bahwa 80% pekerjaan asisten riset adalah mengklarifikasi, bukan mengeksekusi.

### Skenario 5: Semua Mahasiswa Memakai LLM untuk Mengerjakan Lab

**Gejala:** Kode di semua notebook mirip (gaya variabel, komentar, struktur), dan mahasiswa tidak bisa menjelaskan bagian tertentu.

**Tindakan:**
1. Jangan larang LLM. Alihkan ke Bab 05: "Anda boleh pakai LLM, tetapi Anda harus bisa menjelaskan setiap baris."
2. Uji lisan: panggil mahasiswa secara acak, minta mereka menjelaskan satu fungsi yang mereka submit. Jika tidak bisa, minta mereka menulis ulang dengan gaya sendiri.
3. Normalisasi: gunakan LLM interaction log (Lampiran C.3). Minta mahasiswa mencatat prompt yang mereka pakai. Transparansi lebih efektif daripada larangan.
4. Tekankan bahwa nilai datang dari pemahaman, bukan dari kode yang jalan.

---

## 7. Bacaan Lanjutan untuk Dosen

- **Dan Levy - *Teaching Effectively with Zoom*** (2020). Meskipun berfokus pada pengajaran online, bab tentang "memfasilitasi diskusi, bukan memberi ceramah" berlaku untuk kelas tatap muka.
- **Linda Nilson - *Specifications Grading*** (2014). Buku referensi tentang mastery-based grading. Rubrik modul ini (4 level, 3 titik evaluasi) adalah adaptasi dari spec grading.
- **David Perkins - *Making Learning Whole*** (2009). Tentang "teaching for understanding" melalui tujuh prinsip; relevan untuk memahami mengapa modul ini menolak mengajarkan sikap sebagai bab terpisah.
- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Baca sebelum mengajar Bab 01a dan 01b. Esai pendek ini adalah companion piece untuk Section 2.5 (loss curve diagnosis).
- **Jupyter Notebook untuk pengajaran:** Jika mahasiswa kesulitan dengan notebook, pertimbangkan untuk menggunakan JupyterBook atau nbgrader untuk distribusi dan penilaian otomatis.

---

## 8. Penutup

Modul ini dibangun dengan keyakinan bahwa asisten riset yang baik bukanlah yang paling cepat menulis kode, melainkan yang paling jujur pada data, paling disiplin dalam mencatat, dan paling berani mengakui ketidaktahuan. Jika Anda sebagai dosen membawa keyakinan yang sama ke dalam kelas - memperlakukan setiap pertanyaan mahasiswa sebagai awal eksplorasi, bukan akhir jawaban - modul ini akan bekerja.

Selamat mengajar. Mulailah dengan Bab 00, dan biarkan mahasiswa menemukan sendiri mengapa curiosity, rigor, skepticism, dan ownership lebih penting daripada framework apapun.
