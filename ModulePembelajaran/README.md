# Modul Pembelajaran Asisten Dosen AI

Modul ini dirancang untuk mahasiswa S1 yang ingin belajar *riset* machine learning dan deep learning - bukan sekadar menjalankan model, tetapi memahami mengapa eksperimen dirancang seperti itu, bagaimana hasilnya dipercaya, dan apa yang harus dilakukan ketika instruksi dari dosen pembimbing masih terbuka.

**Versi web interaktif:** [muhammad-zainal-muttaqin.github.io/ModulePembelajaran](https://muhammad-zainal-muttaqin.github.io/ModulePembelajaran/) - SPA untuk membaca 14 bab (termasuk Panduan Dosen), mengisi jurnal refleksi, melacak progres 14 minggu, self-assess 9 kompetensi, dan menggenerate protokol eksperimen. Sumber website di [`website/`](website/).

Satu semester berjalan 14 minggu. Setiap minggu membawa satu potong kompetensi baru, satu *lab* yang menambah satu lapis pada proyek yang sama, dan satu sikap riset yang dibangun perlahan. Di akhir semester, mahasiswa menyelesaikan *capstone* yang mengintegrasikan keseluruhannya.

---

## Untuk Siapa Modul Ini

Modul ini menyasar mahasiswa semester 4–6 yang sudah:

- Menulis program Python tingkat menengah (fungsi, kelas, modul, virtual environment).
- Mengenal dasar kalkulus turunan dan aljabar linear (perkalian matriks, gradien).
- Pernah setidaknya sekali menjalankan model ML (regresi atau klasifikasi scikit-learn).

Jika dua prasyarat pertama belum solid, kerjakan lebih dulu *primer* pada [Lampiran F - Prasyarat](12_Lampiran.md#f-prasyarat). Modul tidak mengulang dasar Python atau kalkulus di dalam bab utama.

---

## Peta 14 Minggu


| Minggu | Topik                                 | Bab | Lab      | Sikap Dominan         |
| ------ | ------------------------------------- | --- | -------- | --------------------- |
| 1      | Orientasi & kontrak belajar           | 00   | –        | Curiosity             |
| 2      | Fondasi neural network                | 01a  | Lab 1c   | Curiosity             |
| 3      | Loss, optimizer, evaluasi             | 01b  | Lab 1    | Curiosity             |
| 4      | Menerjemahkan ide menjadi eksperimen  | 02  | Lab 2    | Curiosity → Rigor     |
| 5–6    | Eksperimen reproduksibel              | 03  | Lab 3    | Rigor                 |
| 7      | Validasi data & pra-pemrosesan        | 04  | Lab 4    | Skepticism            |
| 8      | AI tools sebagai pendukung            | 05  | Lab 5    | Ownership             |
| 9      | Adopsi repository riset               | 06  | Lab 6    | Ownership + Curiosity |
| 10     | Alat pendukung riset ringan           | 07  | Lab 7    | Ownership             |
| 11     | Platform & tool baru (RunPod, remote) | 08  | Lab 8    | Ownership + Curiosity |
| 12     | Pengembangan mandiri & membaca paper  | 09  | Lab 9    | Integrasi empat sikap |
| 13–14  | Capstone project                      | 10  | Capstone | Integrasi empat sikap |


Minggu 13–14 adalah eksekusi capstone. Laporan akhir dan demo dikumpulkan pada akhir minggu 14.

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

Kerjakan lab pada minggu yang sama dengan bacanya. Menunda lab membuat konsep berikutnya terasa seperti deretan istilah tanpa pijakan.

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
├── README.md                          (dokumen ini)
├── 00_Pendahuluan.md                  Orientasi, mindset, kontrak belajar
├── 01a_Fondasi_Neural_Network.md      Tensor I/O, MLP backprop, arsitektur, layer
├── 01b_Loss_Optimizer_Evaluasi.md     Loss, optimizer, evaluasi, representasi, diagnosis
├── 02_Ide_Ke_Eksperimen.md            Menerjemahkan instruksi menjadi eksperimen
├── 03_Eksperimen_Reproduksibel.md     Config, seed, logging, ablation
├── 04_Validasi_Data.md                EDA, leakage, audit pipeline
├── 05_AI_Tools_Sebagai_Pendukung.md   LLM/Copilot sebagai rubber duck
├── 06_Adopsi_Repo_Riset.md            Membaca dan memodifikasi repository asing
├── 07_Alat_Pendukung_Ringan.md        Streamlit, Gradio, visualizer
├── 08_Platform_Dan_Tool_Baru.md       RunPod, SSH, manajemen checkpoint
├── 09_Pengembangan_Mandiri.md         Baca paper, formulasi pertanyaan, pre-registration
├── 10_Capstone_Project.md             Proyek akhir: tiga template pilihan
├── 11_Rubrik_Penilaian.md             Rubrik per-outcome dengan level mastery
├── 13_Panduan_Dosen.md                Panduan operasional untuk dosen pengampu
├── 12_Lampiran.md                     Glosarium ID↔EN, checklist, template
└── template_repo/                     Skeleton repositori riset untuk di-fork
```

---

## Untuk Dosen Pengampu

Baca `13_Panduan_Dosen.md` untuk panduan operasional lengkap: filosofi modul, pacing 14 minggu, emphasis per-bab, cara membaca rubrik, cara menilai portofolio, dan skenario kelas yang umum. Rubrik evaluasi ada di `11_Rubrik_Penilaian.md`. Rubrik memetakan setiap *expected outcome* ke bab, lab, dan empat level penguasaan (novice, developing, proficient, masterpiece) dengan deskriptor yang dapat diobservasi. Bobot nilai dapat disesuaikan; deskriptor sebaiknya dipertahankan agar standar tetap lintas angkatan.

---

## Langkah Selanjutnya

Mulai dari [00 - Pendahuluan](00_Pendahuluan.md). Bab tersebut menjelaskan mengapa sembilan kompetensi ini dipilih, dan kontrak kecil yang perlu dipahami sebelum masuk ke materi teknis.
