# 11 · Rubrik Penilaian

> *Rubrik yang baik bukan alat menghakimi, melainkan cermin yang memantulkan arah. Tiap level menggambarkan kebiasaan yang dapat diamati - bukan nilai yang harus dicapai dengan cara apa pun.*

---

## 0. Peta Bab

Rubrik ini memetakan sembilan kompetensi ke empat level penguasaan dengan deskriptor yang dapat diobservasi, memberikan bobot nilai yang dapat disesuaikan dosen, dan menjelaskan cara rubrik dipakai sepanjang semester. Bagian akhir menyatukan rubrik dengan capstone project agar penilaian akhir bersandar pada bukti konkret, bukan kesan.

---

## 1. Empat Level Penguasaan

Empat level berlaku untuk semua kompetensi. Deskriptor spesifik diberikan per kompetensi di bagian 3.


| Level           | Inti deskriptor                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Novice**      | Bisa menjalankan prosedur saat diberi contoh langkah demi langkah; belum bisa menjelaskan pilihan desain.                                                         |
| **Developing**  | Bisa menjalankan prosedur secara mandiri pada kasus yang mirip contoh; mengenali nama pitfall tetapi belum sigap mendeteksinya.                                   |
| **Proficient**  | Bisa menerapkan kompetensi pada kasus baru; menjelaskan pilihan desain dengan alasan; mendeteksi pitfall umum sebelum menjadi masalah.                            |
| **Masterpiece** | Mampu menurunkan prinsip ke kasus yang belum pernah dilihat; menyusun penjelasan yang membantu orang lain belajar; melihat trade-off yang tidak disebut di modul. |


Level *Masterpiece* tidak diharapkan tercapai di semua kompetensi pada akhir semester. Ia dicantumkan sebagai arah, bukan target minimum.

---

## 2. Bobot Rekomendasi

Bobot berikut adalah saran yang dapat disesuaikan dosen menurut fokus kelas. Total 100%.


| #   | Kompetensi                           | Bobot |
| --- | ------------------------------------ | ----- |
| 1   | Memahami sistem ML/DL praktis        | 12%   |
| 2   | Menerjemahkan ide menjadi eksperimen | 12%   |
| 3   | Eksperimen reproduksibel             | 14%   |
| 4   | Validasi data & pra-pemrosesan       | 12%   |
| 5   | AI tools sebagai pendukung           | 8%    |
| 6   | Adopsi repository riset              | 10%   |
| 7   | Alat pendukung ringan                | 6%    |
| 8   | Platform & tool baru                 | 6%    |
| 9   | Pengembangan mandiri                 | 10%   |
| –   | **Capstone project**                 | 10%   |


Catatan: capstone dinilai **menggunakan rubrik yang sama**, tetapi dengan bobot tersendiri karena ia adalah integrasi lintas kompetensi. Rinciannya di bagian 5.

Skor per kompetensi dihitung dari level yang dicapai: Novice = 50, Developing = 70, Proficient = 85, Masterpiece = 95. Nilai akhir = Σ(bobot × skor) ÷ 100.

---

## 3. Rubrik Per Kompetensi

Setiap baris di bawah adalah kompetensi; setiap kolom adalah level. Deskriptor ditulis sebagai perilaku yang dapat diobservasi dosen saat mengevaluasi lab, laporan, atau diskusi.

### Kompetensi 1 - Memahami Sistem ML/DL Praktis


| Level       | Deskriptor                                                                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Menyebut nama arsitektur dan loss, tetapi ragu saat diminta memilih untuk kasus tertentu.                                                                             |
| Developing  | Memilih arsitektur/loss yang umum untuk jenis data tertentu (CNN untuk gambar, cross-entropy untuk klasifikasi), menjelaskan alasan singkat.                          |
| Proficient  | Membandingkan dua pilihan arsitektur/loss untuk satu kasus, menjelaskan trade-off (mis. focal loss pada kelas imbalance). Menjelaskan peran layer dalam representasi. |
| Masterpiece | Merumuskan pilihan arsitektur/loss yang tidak standar untuk dataset atau constraint yang tidak biasa, menjelaskan mengapa pilihan umum tidak cocok.                   |


### Kompetensi 2 - Menerjemahkan Ide Menjadi Eksperimen


| Level       | Deskriptor                                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Menjalankan instruksi "tambahkan focal loss" secara literal, tanpa menyiapkan baseline pembanding.                                        |
| Developing  | Mengidentifikasi variabel yang berubah dan menentukan satu baseline, tetapi belum merumuskan hipotesis yang dapat dipalsukan.             |
| Proficient  | Menyusun variabel, baseline, hipotesis (yang dapat dipalsukan), metrik sukses, dan protokol singkat sebelum menjalankan kode.             |
| Masterpiece | Mengantisipasi hasil alternatif ("jika akurasi naik > 2%, itu mungkin karena …"), merancang ablation pendukung untuk membedakan penyebab. |


### Kompetensi 3 - Eksperimen Reproduksibel


| Level       | Deskriptor                                                                                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Menjalankan training tanpa seed tetap; konfigurasi tersebar antara kode dan argumen CLI.                                                                                                  |
| Developing  | Memakai seed tetap, menyimpan konfigurasi YAML, dan mencatat hasil utama. Log tidak selalu terhubung ke konfigurasi.                                                                      |
| Proficient  | Checkpoint menyertakan konfigurasi, seed, dan git commit hash. Hasil ablation tersimpan dalam format yang dapat dibaca ulang (CSV). Orang lain dapat mereproduksi run utama.              |
| Masterpiece | Merancang kerangka eksperimen yang mencegah eksekusi tanpa metadata (mis. validator pra-training), menulis dokumentasi yang cukup agar tim baru menjalankan eksperimen pada hari pertama. |


### Kompetensi 4 - Validasi Data & Pra-pemrosesan


| Level       | Deskriptor                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Langsung memakai dataset apa adanya; melihat distribusi label hanya ketika diingatkan.                                                                  |
| Developing  | Melakukan EDA dasar, memeriksa distribusi kelas, menyadari imbalance dan kebutuhan normalisasi.                                                         |
| Proficient  | Mendeteksi *leakage* temporal atau ID, memverifikasi pipeline hanya fit pada data training, mengaudit sampel individual untuk label salah.              |
| Masterpiece | Menemukan bentuk *leakage* yang tidak dibahas modul (mis. fitur turunan yang memuat target), mendokumentasikan protokol audit yang dapat dipakai ulang. |


### Kompetensi 5 - AI Tools Sebagai Pendukung


| Level       | Deskriptor                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Menyalin output LLM tanpa modifikasi; tidak dapat menjelaskan kode yang ditempel.                                                                                            |
| Developing  | Memakai LLM untuk boilerplate, lalu membaca dan memodifikasi kodenya. Mencatat prompt tetapi tidak rutin.                                                                    |
| Proficient  | Menjalankan protokol verifikasi pada output LLM (baca baris per baris, uji kasus batas, uji minimal). Memisahkan tugas yang cocok untuk LLM dari yang tidak.                 |
| Masterpiece | Mengajarkan rekan cara memakai LLM sebagai *rubber duck*; merancang prompt yang menghasilkan kode ringkas dan dapat diverifikasi, bukan kode panjang yang tampak meyakinkan. |


### Kompetensi 6 - Adopsi Repository Riset


| Level       | Deskriptor                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Novice      | Clone repo, mengikuti README, berhenti saat ada error setup yang tidak terduga.                                                                                                |
| Developing  | Mengatasi setup umum (dependency conflict, path), menemukan file model dan loss dengan bantuan `grep`.                                                                         |
| Proficient  | Memetakan entry point → model → loss → config dalam satu jam; menambahkan argumen CLI atau loss baru dengan modifikasi minimal-invasif.                                        |
| Masterpiece | Memperbaiki repo orang lain (dokumentasi kecil, perbaikan bug, arg baru) dan men-submit pull request yang diterima; menjelaskan arsitektur repo kepada rekan dalam < 15 menit. |


### Kompetensi 7 - Alat Pendukung Ringan


| Level       | Deskriptor                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Membuat demo yang hanya menampilkan output mentah tanpa konteks interpretasi.                                                                     |
| Developing  | Demo Streamlit/Gradio berfungsi; visualisasi loss/accuracy dapat dibaca.                                                                          |
| Proficient  | Tool dirancang agar dosen/rekan bisa mengeksplorasi hasil tanpa harus bertanya; demo menunjukkan *confusion* atau *failure case* yang informatif. |
| Masterpiece | Tool membantu menemukan insight baru tentang data atau model yang tidak terlihat di log; reusable lintas eksperimen.                              |


### Kompetensi 8 - Platform & Tool Baru


| Level       | Deskriptor                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Novice      | Menjalankan tutorial RunPod langkah demi langkah, tersendat saat menyimpang dari tutorial.                                                 |
| Developing  | Menjalankan eksperimen sederhana di RunPod, mengatur port forwarding TensorBoard.                                                          |
| Proficient  | Mengelola biaya GPU, menyinkronkan data dan checkpoint antar mesin, memulihkan training dari checkpoint remote.                            |
| Masterpiece | Mengadopsi platform/tool baru (bukan RunPod) secara mandiri dari dokumentasinya; menulis panduan ringkas untuk rekan yang akan memakainya. |


### Kompetensi 9 - Pengembangan Mandiri


| Level       | Deskriptor                                                                                                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Novice      | Membaca paper secara linear; ringkasan paper hanya menyatakan ulang abstrak.                                                                                                                 |
| Developing  | Membuat catatan terstruktur (masalah, kontribusi, metode, hasil, limitasi).                                                                                                                  |
| Proficient  | Merumuskan pertanyaan lanjutan yang dapat dipalsukan; menulis pre-registration singkat sebelum eksperimen.                                                                                   |
| Masterpiece | Menghubungkan dua/tiga paper untuk menemukan gap, mengusulkan eksperimen yang masuk akal untuk mengeksplorasi gap tersebut, mendiskusikan hasil yang mungkin *dan* alternatif penjelasannya. |


---

## 4. Cara Rubrik Dipakai Sepanjang Semester

Rubrik dievaluasi di **tiga titik**, bukan hanya akhir semester.

**Titik 1 - Minggu 6 (setelah Lab 3).** Dosen dan mahasiswa bersama-sama meninjau pencapaian awal untuk kompetensi 1–3. Tujuannya bukan memberi nilai, tetapi menentukan apakah mahasiswa siap melangkah ke kompetensi yang lebih menuntut. Jika ada kompetensi yang masih Novice, materi pendukung diberikan sebelum Bab 04.

**Titik 2 - Minggu 10 (setelah Lab 6).** Tinjauan kedua mencakup kompetensi 4–6. Pada titik ini, mahasiswa diharapkan sudah Developing atau lebih untuk kompetensi 1–3. Diskusi berfokus pada pola kerja: apakah catatan eksperimen konsisten, apakah verifikasi pipeline dilakukan rutin, dan apakah interaksi dengan LLM sudah teratur.

**Titik 3 - Akhir minggu 14 (setelah capstone).** Evaluasi menyeluruh untuk semua kompetensi, menggunakan bukti dari lab, laporan capstone, dan demo. Level final dicatat per kompetensi, lalu digabungkan dengan bobot menjadi nilai akhir.

---

## 5. Rubrik Capstone

Capstone menilai **integrasi** kompetensi dan penerapan sikap riset pada proyek empat minggu. Lima dimensi, masing-masing dengan empat level.


| Dimensi               | Novice                                           | Developing                                    | Proficient                                                                                                                              | Masterpiece                                                                                    |
| --------------------- | ------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Kedalaman teknis**  | Model berjalan; evaluasi dangkal.                | Metrik utama dilaporkan; ablation terbatas.   | Multi-metrik, ≥ 2 ablation bermakna, interpretasi hasil.                                                                                | Ablation mengisolasi penyebab secara eksplisit; hasil disertai uji signifikansi.               |
| **Reproduksibilitas** | Kode ada tetapi sulit dijalankan.                | Konfigurasi dan seed lengkap; README dasar.   | Satu perintah untuk mereproduksi hasil utama; dependency terkunci.                                                                      | Ada smoke test otomatis; dokumentasi cukup untuk tim baru.                                     |
| **Kualitas data**     | Dataset dipakai apa adanya.                      | EDA ada; satu isu data dicatat.               | Audit leakage, label quality, sample inspection.                                                                                        | Menemukan isu yang mengubah arah proyek; didokumentasikan rapi.                                |
| **Komunikasi**        | Laporan deskriptif; narasi lemah.                | Struktur latar–metode–hasil–diskusi jelas.    | Narasi runtut; grafik terpilih dengan alasan; limitasi dinyatakan.                                                                      | Laporan dapat dibaca peneliti lain dalam 30 menit; diskusi membedakan bukti dari spekulasi.    |
| **Sikap riset**       | Ketergantungan tinggi pada LLM tanpa verifikasi. | Menerapkan satu sikap konsisten (mis. rigor). | Empat sikap terlihat di titik-titik yang tepat (curiosity di desain, rigor di eksekusi, skeptisisme di validasi, ownership di laporan). | Sikap tampak pada keputusan sulit - misalnya menolak hasil menggoda karena belum ter-ablation. |


Level capstone berkontribusi 10% ke nilai akhir dengan pemetaan yang sama (Novice = 50, Developing = 70, Proficient = 85, Masterpiece = 95), dirata-rata lintas lima dimensi.

---

## 6. Prinsip Penilaian

Tiga prinsip menjaga rubrik tetap adil dan konsisten.

**Bukti mengalahkan kesan.** Level ditetapkan berdasarkan artefak konkret - notebook, laporan, commit history, catatan eksperimen - bukan memori dari diskusi lisan.

**Kemajuan dihargai.** Mahasiswa yang memulai semester di level Novice pada banyak kompetensi dan mencapai Developing konsisten pada akhir semester telah memenuhi tujuan modul. Masterpiece tidak disyaratkan untuk nilai tertinggi kecuali pada kompetensi spesifik yang ditekankan dosen pengampu.

**Refleksi diperhitungkan.** Sebagian penilaian sikap datang dari catatan refleksi mahasiswa sendiri. Refleksi yang jujur - termasuk mengakui kesalahan - lebih bernilai daripada refleksi yang menyajikan kesuksesan tanpa kesulitan.

---

## 7. Untuk Mahasiswa

Rubrik ini bukan kejutan di akhir semester. Setiap awal bab, Anda akan tahu kompetensi apa yang sedang dilatih dan level mana yang wajar dicapai pada minggu itu. Jika Anda merasa tertinggal, bicarakan dengan dosen pada titik tinjauan terdekat - lebih cepat selalu lebih baik daripada menunggu akhir semester.

Baca `10_Capstone_Project.md` di akhir modul untuk memahami bagaimana seluruh kompetensi akan diuji secara terintegrasi.