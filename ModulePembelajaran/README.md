# Modul Pembelajaran Asisten Dosen AI

Modul ini dirancang untuk mahasiswa S1 yang ingin belajar *riset* machine learning dan deep learning - bukan sekadar menjalankan model, tetapi memahami mengapa eksperimen dirancang seperti itu, bagaimana hasilnya dipercaya, dan apa yang harus dilakukan ketika instruksi dari dosen pembimbing masih terbuka.

**Versi web interaktif:** [muhammad-zainal-muttaqin.github.io/ModulePembelajaran](https://muhammad-zainal-muttaqin.github.io/ModulePembelajaran/) - SPA untuk membaca 15 bab (termasuk Panduan Dosen), mengisi jurnal refleksi, melacak progres 14 minggu, self-assess 9 kompetensi, dan menggenerate protokol eksperimen. Sumber website di [`website/`](website/).

Satu semester berjalan **11 minggu bootcamp + 3 minggu capstone**. Setiap minggu membawa satu *rigor habit* baru yang dibangun di atas yang sebelumnya, satu atau lebih lab, dan satu thread yang menghubungkan ke Big Map keseluruhan. Di akhir bootcamp, mahasiswa mempertahankan proposal capstone secara lisan sebelum 3 minggu eksekusi capstone dimulai.

---

## Untuk Siapa Modul Ini

Modul ini menyasar mahasiswa semester 4–6 yang sudah:

- Menulis program Python tingkat menengah (fungsi, kelas, modul, virtual environment).
- Mengenal dasar kalkulus turunan dan aljabar linear (perkalian matriks, gradien).
- Pernah setidaknya sekali menjalankan model ML (regresi atau klasifikasi scikit-learn).

Jika dua prasyarat pertama belum solid, kerjakan lebih dulu *primer* pada [Lampiran F - Prasyarat](14_Lampiran.md#f-prasyarat). Modul tidak mengulang dasar Python atau kalkulus di dalam bab utama.

---

## Peta 11+3 Minggu

### Bootcamp (Minggu 1-11)

| Minggu | Topik | Bab | Lab utama | Rigor Habit |
|---|---|---|---|---|
| 1 | Tabular, output heads, observasi pertama | [01](01_W1_Tabular_Output_Heads.md) | Lab 0 | Observation before conclusion |
| 2 | Images, CNN, smoke test ritual | [02](02_W2_Images_CNN_Smoke_Test.md) | Lab 1 | Three-level smoke test |
| 3 | Loss, optimizer, galeri run (example-first) | [03](03_W3_Loss_Optimizer_Evaluasi.md) | Lab 1 + Lab 2 | Change one thing at a time |
| 4 | Reproducibility + experiment matrix | [04](04_W4_Reproducibility_Experiment_Matrix.md) | Lab 3 | Experiment matrix before coding |
| 5 | Sequences: RNN vs LSTM, gradient flow | [05](05_W5_Sequences_RNN_LSTM.md) | Lab 3b (wajib) | Long-sequence diagnosis |
| 6 | Representations + temporal leakage demo | [06](06_W6_Representations_Temporal_Leakage.md) | Lab 6 (leakage) | Validate preprocessing |
| 7 | Text, Transformers, repo adoption | [07](07_W7_Text_Transformers_Repo_Adoption.md) | Lab 5b + Lab 6 | Verify AI code + repo map |
| 8 | Foundation models taxonomy + adaptation choice | [08](08_W8_Foundation_Models.md) | FM Map | Model-card literacy |
| 9 | Multimodal reasoning + per-modality ablation | [09](09_W9_Multimodal_Reasoning.md) | Lab 8 | Per-modality ablation |
| 10 | Paper reading 3-pass + paper-to-code | [10](10_W10_Paper_Reading.md) | Lab 9 | Three-pass reading |
| 11 | Research framing + capstone proposal defense | [11](11_W11_Research_Framing.md) | Proposal oral | 5 Whys + proposal defense |

### Capstone (Minggu 12-14)

| Minggu | Fase | Bab | Required outputs |
|---|---|---|---|
| 12 | Scope, EDA, Baseline reproducible | [12](12_Capstone_3_Minggu.md) | `prereg.md`, `eda.md`, baseline 3-seed |
| 13 | Main experiment + focused ablation | [12](12_Capstone_3_Minggu.md) | Comparison table, ablation, curves |
| 14 | Analysis, report, demo, presentation | [12](12_Capstone_3_Minggu.md) | Final report, repo, demo, presentasi |

---

## Cara Memakai Modul

Modul dimaksudkan dibaca **berurutan** pertama kali, karena bab-bab awal membangun kosakata dan kebiasaan yang dipakai bab-bab berikutnya. Setelah sekali menamatkan, setiap bab berdiri sendiri sebagai rujukan.

Setiap bab mengikuti ritme tetap:

1. **Peta Bab** - gambaran isi dalam tiga kalimat.
2. **Motivasi** - satu skenario riset yang menciptakan kebutuhan terhadap konsep.
3. **Konsep Inti** - penjelasan pedagogis dengan contoh konkret.
4. **Worked Example** - satu kasus yang dituntaskan penuh.
5. **Pitfalls & Miskonsepsi** - kesalahan umum dan cara mendeteksinya.
6. **Lab Hands-on** - notebook yang harus diselesaikan.
7. **Refleksi** - tiga pertanyaan terbuka untuk menguji pemahaman.
8. **Bacaan Lanjutan** - kurasi singkat, masing-masing dengan alasan.

Kerjakan lab pada minggu yang sama dengan membaca materinya. Menunda lab membuat konsep berikutnya terasa seperti deretan istilah tanpa pijakan.

---

## Filosofi Singkat

Modul ini dibangun di atas empat sikap yang dianggap lebih penting daripada penguasaan framework apapun:

- **Curiosity** - bertanya "mengapa model berperilaku seperti ini?" sebelum menerima hasil.
- **Rigor** - mengubah satu variabel pada satu waktu, mencatat apa yang diubah, menyimpan cukup informasi agar orang lain dapat mengulangi.
- **Skepticism** - tidak percaya pada angka akurasi sebelum memeriksa dari mana angka itu berasal.
- **Ownership** - memikul tanggung jawab atas hasil akhir, termasuk ketika sebagian kode ditulis oleh LLM atau dicontek dari repository orang lain.

Keempat sikap ini tidak dibahas dalam bab khusus, tetapi dirangkai ke dalam cerita pembuka, pitfall, dan pertanyaan refleksi di setiap bab. Tujuannya sederhana: sikap dipelajari melalui pembiasaan, bukan ceramah.

---

## Struktur Folder

```
ModulePembelajaran/
├── README.md
├── 00_Pendahuluan.md                          Orientasi, target outcome 60-70%, threads, rhythm
├── 01_W1_Tabular_Output_Heads.md              W1: MLP as shape transformer, output heads (NEW)
├── 02_W2_Images_CNN_Smoke_Test.md             W2: CNN, three-level smoke test
├── 03_W3_Loss_Optimizer_Evaluasi.md           W3: Example-first, loss/opt/eval
├── 04_W4_Reproducibility_Experiment_Matrix.md W4: Experiment matrix, YAML/seed/checkpoint
├── 05_W5_Sequences_RNN_LSTM.md                W5: RNN vs LSTM, gradient flow (rewrote)
├── 06_W6_Representations_Temporal_Leakage.md  W6: Representations + temporal leakage
├── 07_W7_Text_Transformers_Repo_Adoption.md   W7: Text, transformers, repo adoption (merged)
├── 08_W8_Foundation_Models.md                 W8: Foundation models taxonomy (NEW)
├── 09_W9_Multimodal_Reasoning.md              W9: Multimodal fusion + ablation (NEW)
├── 10_W10_Paper_Reading.md                    W10: 3-pass reading + paper-to-code
├── 11_W11_Research_Framing.md                 W11: Research framing + capstone proposal (NEW)
├── 12_Capstone_3_Minggu.md                    W12-14: Capstone 3 phases
├── 13_Rubrik_Penilaian.md                     Rubrik + sub-rubrik capstone phases
├── 14_Lampiran.md                             Glosarium + A.1 backprop + C.12-C.15 + H
├── 15_Panduan_Dosen.md                        Pacing 11+3, emphasis per-week
└── template_repo/                             Skeleton repo riset
```

---

## Untuk Dosen Pengampu

Baca `15_Panduan_Dosen.md` untuk panduan operasional lengkap: filosofi modul, pacing 11+3 minggu, emphasis per-bab, cara membaca rubrik, cara menilai portofolio, dan skenario kelas yang umum. Rubrik evaluasi ada di `13_Rubrik_Penilaian.md`. Tabel migrasi dari modul 14-minggu lama tersedia di `14_Lampiran.md` §H.

---

## Langkah Selanjutnya

Mulai dari [00 - Pendahuluan](00_Pendahuluan.md). Bab tersebut menjelaskan mengapa sembilan kompetensi ini dipilih, dan kontrak kecil yang perlu dipahami sebelum masuk ke materi teknis.
