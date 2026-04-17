# 00 · Pendahuluan

> *Riset yang baik dimulai dari pertanyaan yang jujur. Modul ini mengajak Anda memperlakukan setiap instruksi sebagai awal dari pertanyaan - bukan akhir dari jawaban.*

---

## 0. Peta Bab

Bab ini memperkenalkan sembilan kompetensi yang akan Anda bangun selama satu semester, empat sikap riset yang menjalin keseluruhan modul, dan kontrak belajar yang disepakati sebelum melangkah ke materi teknis. Setelah menyelesaikan bab ini, Anda mengerti *mengapa* modul ini ada dan *bagaimana* cara terbaik membacanya, bukan hanya daftar topik yang akan datang.

---

## 1. Satu Email dari Dosen Pembimbing

Bayangkan Anda baru saja bergabung di laboratorium riset dosen Anda sebagai asisten. Pada hari ketiga, Anda menerima pesan singkat:

> "Tolong coba ubah loss-nya jadi focal, lalu freeze conv1 pada backbone. Bandingkan dengan baseline. Saya butuh hasilnya hari Kamis."

Dua kalimat. Tujuh hari lagi menuju Kamis. Di layar Anda terbuka repository dengan tiga puluh file Python, README satu paragraf, dan sebuah paper yang belum sempat Anda baca. Apa yang harus Anda lakukan pertama kali?

Jawaban yang terdengar percaya diri - "ya, saya coba" - sering kali menyembunyikan pertanyaan-pertanyaan yang belum dijawab:

- *Focal loss* yang mana? Ada banyak varian, masing-masing dengan parameter berbeda.
- Apa definisi "baseline" di sini? Konfigurasi mana yang dianggap patokan?
- "Bandingkan" pada metrik apa? Akurasi, F1, atau loss validasi?
- Bagaimana menjamin hasil eksperimen kedua tidak berbeda hanya karena random seed?
- Berapa lama satu training run? Apakah cukup waktu untuk mengulang beberapa kali?
- Apakah Anda memahami arsitektur backbone cukup baik untuk membekukan layer yang benar?

Setiap pertanyaan di atas menunjuk ke satu kompetensi yang berbeda. Modul ini ada untuk membangun kompetensi-kompetensi tersebut secara sistematis, sehingga email seperti itu tidak lagi mengintimidasi - sebaliknya, menjadi titik awal eksperimen yang rapi, hasil yang dapat dipertahankan, dan laporan yang menjelaskan lebih dari sekadar angka.

---

## 2. Sembilan Kompetensi Inti

Email di atas menyentuh sembilan kompetensi yang menjadi tulang punggung modul. Setiap kompetensi dibahas satu bab penuh dengan satu lab pendamping.

1. **Memahami sistem ML/DL secara praktis** (Bab 01). Mengetahui apa yang dilakukan arsitektur, loss, optimizer, dan evaluasi cukup dalam untuk menilai di mana perubahan bermakna.
2. **Menerjemahkan ide menjadi eksperimen** (Bab 02). Mengubah instruksi terbuka menjadi rancangan konkret dengan variabel, baseline, hipotesis, dan metrik.
3. **Eksperimen reproduksibel** (Bab 03). Menulis konfigurasi, mengunci seed, mencatat jejak, dan menyusun ablation yang bisa diverifikasi orang lain.
4. **Validasi data dan pra-pemrosesan** (Bab 04). Memeriksa data sebelum mempercayai hasilnya - mulai dari distribusi kelas hingga *leakage* yang tersembunyi.
5. **AI tools sebagai pendukung** (Bab 05). Memakai LLM dan Copilot untuk mempercepat kerja tanpa menyerahkan pemahaman dan tanggung jawab.
6. **Adopsi repository riset asing** (Bab 06). Membaca kode orang lain dengan cepat, menyiapkan lingkungan, dan memodifikasi secara minimal-invasif.
7. **Membuat alat pendukung riset ringan** (Bab 07). Merangkai demo Streamlit, UI anotasi Gradio, atau visualizer sederhana agar hasil dapat diinspeksi.
8. **Mengadopsi platform dan tool baru** (Bab 08). Menjalankan eksperimen di RunPod atau lingkungan remote, serta mengelola data dan checkpoint lintas mesin.
9. **Berkembang mandiri** (Bab 09). Membaca paper secara terarah, menyusun pertanyaan yang baik, dan merancang eksperimen lanjutan dengan pre-registration singkat.

Anda tidak perlu menguasai kesembilan kompetensi di minggu pertama. Modul dirancang sebagai tangga: setiap bab mengandalkan kebiasaan yang dibangun di bab sebelumnya.

---

## 3. Empat Sikap Riset

Kompetensi teknis tidak akan bertahan lama tanpa sikap yang benar. Empat sikap berikut muncul berulang sepanjang modul, sering kali tanpa disebut eksplisit, melalui pilihan contoh dan pertanyaan refleksi.

**Curiosity** - rasa ingin tahu yang gelisah. Ketika angka akurasi meloncat dari 78% ke 80% setelah Anda mengganti loss, sikap ini yang bertanya: "apakah kenaikan ini konsisten jika aku jalankan tiga kali dengan seed berbeda, atau sekadar kebetulan?" Curiosity menuntunmu ke eksperimen tambahan sebelum menulis laporan.

**Rigor** - disiplin dalam prosedur. Bukan sekadar "rapi", tetapi taat pada aturan seperti: satu variabel berubah pada satu waktu, seluruh konfigurasi disimpan bersama checkpoint, setiap angka di laporan dapat dilacak kembali ke run mana. Rigor melelahkan di awal dan menyelamatkan Anda berjam-jam di akhir.

**Skepticism** - kesediaan untuk tidak mempercayai angka sendiri. Akurasi 99% pada hari pertama bukan kabar baik - itu lampu merah. Hampir selalu ada *leakage*, label yang bocor, atau data test yang tercampur dengan training. Skeptisisme memaksamu memeriksa sebelum berbangga.

**Ownership** - rasa memiliki yang melampaui alat. LLM mungkin menulis separuh kode Anda; repository orang lain mungkin menyediakan arsitektur; RunPod mungkin menjalankan training. Tetapi saat dosen bertanya mengapa pilihan tertentu diambil, jawabannya tetap tanggung jawab Anda. Ownership berarti Anda bisa menjelaskan setiap keputusan yang namamu tercantum padanya.

Keempat sikap tidak diajarkan sebagai doktrin. Anda akan mengenalinya dalam pitfall yang dibahas, dalam checklist yang diulang, dan dalam pertanyaan refleksi di akhir tiap bab. Pada akhir semester, Anda diharapkan melihat diri Anda sendiri sedang menerapkannya - bukan karena disuruh, tetapi karena Anda sudah merasakan harganya ketika sikap itu absen.

---

## 4. Kontrak Belajar

Modul ini bekerja paling baik ketika Anda dan modul menyepakati empat hal berikut.

**Pertama**, Anda mengerjakan setiap lab pada minggu yang sama dengan membacanya. Menunda lab berarti menunda pemahaman, dan bab berikutnya akan terasa seperti deretan istilah yang tidak tersambung.

**Kedua**, Anda menulis catatan eksperimen sendiri. Bukan menyalin output, tetapi menjawab: apa yang aku jalankan, apa yang terjadi, apa arti hasilnya, dan apa yang akan kulakukan selanjutnya. Format catatan ada di `12_Lampiran.md`.

**Ketiga**, Anda boleh - dan didorong - memakai LLM, Copilot, dan pencarian web. Tetapi sebelum memasukkan kode yang Anda tidak mengerti, Anda berhenti sebentar, baca baris demi baris, dan pastikan Anda bisa menjelaskan fungsinya tanpa bantuan. Bab 05 membahas protokol ini lebih dalam.

**Keempat**, Anda mengajukan pertanyaan. Pertanyaan yang baik bukan tanda kelemahan - sebaliknya, pertanyaan yang dirumuskan dengan cermat adalah salah satu kompetensi yang dinilai di rubrik (Bab 11). Jika sesuatu terasa kabur setelah membaca dua kali, tulis pertanyaan Anda seringkas mungkin, sertakan konteks, dan bawa ke sesi tatap muka atau forum yang disediakan.

---

## 5. Lab dan Proyek yang Menumbuh

Lab dalam modul ini bukan kumpulan latihan terpisah. Sembilan lab berbagi satu dataset dan satu basis kode yang berkembang bersama Anda.

- **Lab 1 (Bab 01)** membangun baseline CNN pada CIFAR-10 yang dapat training penuh.
- **Lab 2 (Bab 02)** menambahkan focal loss dan mekanisme freeze layer, menjalankan ablation pertama.
- **Lab 3 (Bab 03)** memindahkan konfigurasi ke YAML, menambahkan logging TensorBoard, dan menyimpan checkpoint dengan metadata lengkap.
- **Lab 4 (Bab 04)** memperluas dataset ke domain medis (PathMNIST), melakukan EDA, dan mengaudit pipeline dari *leakage*.
- **Lab 5 (Bab 05)** memakai LLM untuk membangun satu fitur baru pada basis kode, lalu mencatat proses verifikasi.
- **Lab 6 (Bab 06)** meng-clone sebuah reference implementation dari komunitas, menyiapkan lingkungan, dan menambahkan satu eksperimen kecil.
- **Lab 7 (Bab 07)** membungkus model dalam demo Streamlit dan antarmuka Gradio untuk inspeksi prediksi.
- **Lab 8 (Bab 08)** memindahkan training ke RunPod, mengatur port forwarding, dan mengelola checkpoint jarak jauh.
- **Lab 9 (Bab 09)** membaca satu paper pendek, menuliskan ringkasan terstruktur, dan merancang satu eksperimen lanjutan berikut *pre-registration*-nya.

Pada minggu 13–14, Anda menyelesaikan **capstone project** yang mengintegrasikan minimal enam kompetensi dan keempat sikap. Detail ada di `10_Capstone_Project.md`.

---

## 6. Pitfalls Sejak Awal

Beberapa kesalahan yang dapat mencegah Anda berkembang, bahkan sebelum bab teknis dimulai:

**Mengerjakan lab hanya sampai kode jalan.** Lab selesai bukan saat training tidak error, tetapi saat Anda bisa menjelaskan mengapa angka yang keluar masuk akal. Jika hasil mengejutkan Anda, itu sinyal untuk berhenti dan menyelidiki - bukan untuk lanjut ke lab berikutnya.

**Menyalin kode LLM tanpa dibaca.** Ini berbahaya bukan karena kodenya sering salah, tetapi karena ketika kodenya benar, Anda melewatkan kesempatan memahami. Ketika nanti kodenya salah, Anda tidak akan tahu caranya mencari. Protokol verifikasi LLM dibahas di Bab 05.

**Menunda pembuatan catatan eksperimen.** Memori manusia tidak bisa merekam dua puluh run ablation yang serupa. Menunda catatan berarti pada hari pelaporan Anda akan menjalankan ulang eksperimen hanya untuk mengingat hasilnya.

**Mengabaikan data.** Godaan untuk langsung *training* tanpa memeriksa data selalu ada, terutama ketika dataset kelihatannya "sudah dibersihkan orang lain". Bab 04 menunjukkan contoh-contoh nyata di mana kelalaian ini mengubur eksperimen berbulan-bulan.

---

## 7. Refleksi

Sebelum melangkah ke Bab 01, luangkan waktu sepuluh menit untuk menulis jawaban singkat atas tiga pertanyaan berikut. Simpan di catatan pribadi Anda; kita akan merujuknya kembali di minggu 14.

1. Dari sembilan kompetensi, mana yang Anda duga paling asing? Apa yang Anda harapkan berubah pada akhir semester?
2. Dari empat sikap riset, mana yang sudah Anda rasakan secara alami, dan mana yang terasa paling sulit untuk Anda lakukan secara konsisten?
3. Ketika Anda menerima email PI seperti di pembuka bab ini *hari ini*, apa tiga langkah pertama yang akan Anda ambil? Bandingkan dengan jawaban Anda nanti di minggu 14.

---

## 8. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (blog, 2019). Esai pendek tentang bagaimana seorang peneliti berpengalaman memulai proyek. Relevan sebelum Bab 01 karena menanamkan ritme "verify everything before you scale".
- **Goodfellow, Bengio, Courville - *Deep Learning*** (Bab 1 & 5). Fondasi konseptual yang sengaja tidak diulang di modul ini; baca bab 1 untuk konteks sejarah, bab 5 untuk kerangka pikir machine learning.
- **The Turing Way - *A Handbook for Reproducible Research*** (bagian *Reproducibility*). Dibaca ringan minggu 1–2; penuh analogi yang akan kembali di Bab 03.

---

## Lanjut ke Bab 01

Setelah menyelesaikan refleksi, buka [Bab 01 - Memahami ML/DL](01_Memahami_ML_DL.md). Bab tersebut memperkenalkan empat keluarga arsitektur yang paling sering Anda temui di paper dan repository - tidak sebagai daftar definisi, tetapi sebagai *keputusan desain* yang dibingkai oleh pertanyaan: data seperti apa yang sedang kita olah, dan struktur apa yang paling alami mengikutinya?