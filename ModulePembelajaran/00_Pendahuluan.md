<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| #    | Modul                                                                                  | Minggu |
| ---- | -------------------------------------------------------------------------------------- | ------ |
| ▶ 00 | Pendahuluan                                                                            | 1      |
| 01   | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md)                           | 1      |
| 02   | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md)                        | 2      |
| 03   | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md)                    | 3      |
| 04   | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4      |
| 05   | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md)                              | 5      |
| 06   | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md)   | 6      |
| 07   | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md)    | 7      |
| 08   | [W8 - Foundation Models](08_W8_Foundation_Models.md)                                   | 8      |
| 09   | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md)                             | 9      |
| 10   | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md)                        | 10     |
| 11   | [W11 - Research Framing](11_W11_Research_Framing.md)                                   | 11     |
| 12   | [Capstone - Proyek Riset](12_Capstone.md)                                              | 12-15  |
| 13   | [Rubrik Penilaian](13_Rubrik_Penilaian.md)                                             | –      |
| 14   | [Lampiran](14_Lampiran.md)                                                             | –      |
| 15   | [Panduan Instruktur](15_Panduan_Instruktur.md)                                         | –      |

</details>

---

# 00 · Pendahuluan

> *Riset yang baik dimulai dari pertanyaan yang jujur. Modul ini mengajak Anda memperlakukan setiap instruksi sebagai awal dari pertanyaan - bukan akhir dari jawaban.*

---

## 0. Peta Bab

Modul ini adalah **bootcamp 11 minggu + capstone 4 minggu**. Bab ini memperkenalkan kosakata dasar, glosarium singkat, target hasil bootcamp, sembilan kompetensi inti, empat sikap riset, tiga alur lintas minggu, ritme sesi, dan kontrak belajar sebelum materi teknis dimulai. Setelah menyelesaikan bab ini, Anda memahami tujuan modul, cara membacanya, dan target realistis di akhir bootcamp.

---

## 0.5 Sebelum Mulai: Bahasa dan Prasyarat Modul Ini

Prasyarat modul ini dibuat seringan mungkin, tetapi tetap ada beberapa istilah dasar yang perlu dikenali sejak awal. Sebelum membuka W1, luangkan 20 menit untuk membaca bagian ini agar notasi seperti `(F,)`, `(C, H, W)`, "loss", dan "gradient" tidak terasa asing di halaman berikutnya.

> [!TIP]
> Jika Anda sudah terbiasa dengan PyTorch, NumPy, dan kalkulus dasar, lompat ke §0.5.6 (glosarium singkat) untuk baca sekilas, lalu lanjut ke §1. Subbagian §0.5.1-§0.5.5 ditujukan untuk pemula yang baru pertama kali belajar deep learning.

### 0.5.1 Shape Tensor: Cara Membaca Tuple

"Shape" sebuah tensor adalah daftar berapa banyak elemen di tiap sumbu, ditulis sebagai tuple Python:


| Tuple shape    | Arti                                   | Contoh data             |
| -------------- | -------------------------------------- | ----------------------- |
| `(3,)`         | satu sumbu, 3 elemen                   | satu vektor `[a, b, c]` |
| `(3, 4)`       | dua sumbu, 3 baris × 4 kolom           | matriks 3×4             |
| `(3, 4, 5)`    | tiga sumbu                             | "kubus" 3×4×5           |
| `(B, F)`       | B sampel, masing-masing F fitur        | satu batch tabular      |
| `(B, C, H, W)` | B gambar, C channel, tinggi H, lebar W | satu batch citra        |


**Koma akhir.** `(3,)` dengan koma di belakang adalah tuple dengan satu elemen; `(3)` tanpa koma adalah angka biasa di Python. Karena shape selalu tuple, koma akhir wajib saat tensor hanya punya satu sumbu.

```python
import numpy as np
np.array([1, 2, 3]).shape       # (3,)   - satu sumbu, tiga elemen
np.array([[1, 2, 3]]).shape     # (1, 3) - dua sumbu, satu baris tiga kolom
```

### 0.5.2 Konvensi Huruf di Modul

Modul memakai huruf-huruf berikut secara konsisten. Hafalkan sekali; semua bab pakai yang sama.


| Huruf    | Singkatan dari                                                     | Contoh konteks                                   |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `N`      | jumlah kelas (number of classes) atau jumlah sampel sesuai konteks | klasifikasi 10 kelas → output `(N,)` dengan N=10 |
| `F`      | jumlah fitur (features)                                            | data tabular 5 kolom → input `(F,)` dengan F=5   |
| `B`      | ukuran batch (batch size)                                          | 32 sampel sekaligus → batch `(B, F)` dengan B=32 |
| `C`      | jumlah channel (channels)                                          | RGB → C=3, grayscale → C=1                       |
| `H`, `W` | tinggi (height) dan lebar (width) gambar                           | foto 224×224 → H=W=224                           |
| `T`      | panjang sequence atau timestep                                     | kalimat 50 token → T=50                          |


### 0.5.3 Arti Panah `->` di Shape Map

Setiap kali modul menulis `(F,) -> (1,)` atau `(C, H, W) -> (N,)`, panah `->` berarti **"dari shape A menjadi shape B lewat satu model atau operasi"**. Bukan shape sebelum dan sesudah satu layer, tetapi shape input dan shape output keseluruhan model.

Contoh konkret:

- `(F,) -> (1,)` artinya: **input** vektor F fitur, **output** satu skalar (mis. prediksi harga rumah).
- `(C, H, W) -> (N,)` artinya: **input** satu gambar, **output** vektor logit/probabilitas N kelas.
- Data tabular 100 baris × 5 kolom dalam memori berbentuk `(100, 5)`. Satu sampel saja berbentuk `(5,)`. Batch 32 sampel berbentuk `(32, 5)`.

### 0.5.4 Kalkulus Mini: Turunan dan Chain Rule

Anda tidak perlu menguasai kalkulus untuk memulai. Cukup dua pemahaman dasar.

**Turunan = kemiringan.** Turunan fungsi `f(x)` di titik `x = a` mengukur seberapa cepat `f` berubah saat `x` digeser sedikit di sekitar `a`. Notasi: `df/dx`. Kalau `f(x) = x²`, maka `df/dx = 2x`. Di `x = 3`, turunan = 6, artinya saat `x` bergeser dari 3 ke 3.01, `f` bergeser kira-kira `6 × 0.01 = 0.06`.

**Chain rule = rantai turunan.** Kalau `y = f(g(x))`, maka turunannya `dy/dx = f'(g(x)) · g'(x)`. Bayangkan dua roda gigi: kalau roda dalam berputar 2× lebih cepat dari input, dan roda luar 3× lebih cepat dari roda dalam, total roda luar 6× lebih cepat dari input.

Inilah yang dilakukan **backpropagation**: mengambil rantai panjang turunan dari loss sampai ke setiap parameter, lalu merambatkannya mundur melalui chain rule. Detail derivasi 7-langkah ada di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual). Untuk W1-W2, cukup paham bahwa "rantai turunan" itulah cara kerjanya.

### 0.5.5 PyTorch Tensor: Primer 3 Menit

PyTorch adalah library deep learning yang dipakai sepanjang modul. Konsep paling dasar: **tensor** = array multi-dimensi dengan dukungan GPU dan autograd.

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
x.shape          # torch.Size([3])  - sama dengan tuple (3,)
x.dtype          # torch.float32
x.float()        # konversi ke float32 (jika belum)
x.to('cuda')     # pindahkan ke GPU jika tersedia
```

Tiga hal ini dikerjakan terus-menerus:

1. **Memeriksa shape.** `print(x.shape)` adalah debug pertama saat training error.
2. **Memindahkan ke device.** `model.to(device)` dan `x.to(device)` agar perhitungan berjalan di GPU/CPU yang konsisten.
3. **Memanggil `.backward()`.** Setelah `loss = criterion(model(x), y)`, panggilan `loss.backward()` menghitung semua gradient otomatis melalui chain rule.

Broadcasting (PyTorch dan NumPy) secara singkat: jika dua tensor punya shape yang kompatibel, operasi seperti `a + b` memperluas tensor kecil agar cocok dengan tensor besar tanpa menyalin memori. Aturan kompatibilitas: dua sumbu kompatibel jika ukurannya sama atau salah satu sama dengan 1.

> [!TIP]
> Sumber belajar ringan: [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html) (10 menit), [PyTorch 60-min Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) (panduan resmi). Tidak wajib sebelum W1, tetapi keduanya akan mempercepat W2-W3 jika Anda baru pertama kali memakai PyTorch dan NumPy.

### 0.5.6 Glosarium Singkat

Sembilan belas istilah inti yang muncul berulang sejak W1 - loss, gradient, optimizer, baseline, freeze, fine-tune, ablation, leakage, pre-registration, hyperparameter, overfitting, epoch, batch, seed, checkpoint, augmentation, dropout, batch norm, regularization - sudah tercatat lengkap dengan definisi dan contoh di [Lampiran A](14_Lampiran.md#a-glosarium-indonesia--inggris). Baca sekilas sekali sebelum W1; tidak perlu menghafal, kembali saat butuh.


---

## 1. Satu Email dari Dosen Pembimbing

Bayangkan Anda baru bergabung di laboratorium riset sebagai asisten. Pada hari ketiga, Anda menerima pesan singkat:

> "Tolong uji focal loss dan freeze blok awal pada backbone. Bandingkan dengan baseline yang adil, lalu kirim ringkasan hasil hari Kamis."

Email dua kalimat ini terdengar sederhana, tetapi setiap fragmen menyimpan keputusan yang tidak disebut: focal loss versi apa, nilai `gamma` berapa, blok awal mana yang di-freeze, baseline seperti apa yang adil, metrik mana yang menentukan, bagaimana memastikan dua run tidak berbeda hanya karena seed acak, dan kapan angka layak dilaporkan.

Semua keputusan itu ada di tangan Anda. Modul ini melatih Anda membuat keputusan-keputusan tersebut secara sistematis, sehingga email semacam itu menjadi titik awal eksperimen yang terstruktur, bukan sumber kepanikan.

---

## 2. Target Hasil: 60-70% Siap Mengerjakan Topik Riset Lab

Bootcamp ini **bukan** dirancang untuk membuat Anda menjadi ahli penuh di setiap arah riset yang mungkin dijalankan lab. Targetnya lebih realistis dan lebih berguna:

> Di akhir bootcamp, Anda diharapkan **60-70% siap** mengerjakan topik riset lab secara mandiri.

Artinya, Anda sudah mampu mengidentifikasi tipe tugas dan memilih keluarga model baseline yang masuk akal, melakukan fine-tune atau mengadaptasi pretrained model maupun repo riset eksternal, merancang perbandingan terkontrol berskala kecil, mengenali perilaku training yang mencurigakan, menginspeksi data dan mengantisipasi leakage, membaca paper secara terstruktur, serta menulis pre-registration dan mempertahankan hipotesis falsifiable.

Ini **bukan** berarti Anda sudah menguasai literatur domain secara mendalam atau mengetahui paper baseline terkuat di setiap spesialisasi. Anda tidak diharapkan memahami internal setiap model pada tingkat riset, menyelesaikan masalah deployment, distillation, atau multimodal fusion dari nol, apalagi merancang agenda riset siap publikasi tanpa supervisi.

Sisa 30-40% berasal dari: pembacaan paper lanjutan, panduan PI/dosen pembimbing, adopsi repo yang ditargetkan, debugging spesifik domain, dan capstone serta kerja mandiri setelahnya.

Transisi yang dimaksudkan: Bootcamp (Minggu 1–11) membangun peta, alur kerja, dan kebiasaan; Capstone (Minggu 12–15) menerapkannya dalam satu masalah yang dibatasi; dan kerja riset RA melanjutkan belajar mandiri pada masalah di lab.

---

## 3. Sembilan Kompetensi Inti

Email pembuka tadi tidak berdiri sendiri; ia bergantung pada sembilan kompetensi yang menjadi tulang punggung modul. Sembilan kompetensi itu mengelompok dalam tiga gelombang yang saling menumpu.

**Gelombang pertama (W1-W4)** melatih cara memahami sistem ML/DL dalam praktiknya, menerjemahkan instruksi terbuka menjadi eksperimen konkret, dan menjalankan eksperimen yang bisa direproduksi orang lain. Tanpa fondasi ini, kompetensi berikutnya kehilangan pijakan - sulit mengaudit data jika belum bisa membaca kurva loss, sulit menilai foundation model jika belum pernah merancang ablation yang adil.

**Gelombang kedua (W6-W8)** menambahkan kewaspadaan terhadap data dan kemampuan membaca pekerjaan orang lain: validasi data dan deteksi leakage, pemakaian LLM dan coding copilot dengan tanggung jawab, adopsi repositori riset yang belum dikenal, serta literasi foundation model beserta strategi adaptasinya (frozen, LoRA, full fine-tuning).

**Gelombang ketiga (W9-W11)** mengarah ke kemandirian riset: penalaran multimodal (strategi fusion, ablation per modalitas, fallback saat modalitas hilang), pembacaan paper terarah, dan perancangan eksperimen lanjutan beserta pre-registration-nya. Bahkan dosen pun mengasah kompetensi terakhir ini sepanjang karier.

> [!TIP]
> Daftar lengkap sembilan kompetensi dengan deskripsi per kompetensi tersedia di [Lampiran C.16](14_Lampiran.md#c16-sembilan-kompetensi). Tidak perlu khawatir kalau kompetensi gelombang kedua dan ketiga belum kebayang sekarang - modul disusun bertahap, setiap minggu bertumpu pada kebiasaan minggu sebelumnya.

---

## 4. Empat Sikap Riset

Kompetensi teknis cepat tumpul kalau tidak dibiasakan bersama sikap riset yang tepat. Empat sikap berikut ditanamkan sepanjang modul lewat pilihan contoh dan pertanyaan refleksi, sering kali tanpa disebut secara eksplisit.

**Curiosity** - rasa ingin tahu yang gelisah. Ketika angka akurasi meloncat dari 78% ke 80% setelah Anda mengganti loss, sikap ini yang bertanya: "apakah kenaikan ini konsisten jika aku jalankan tiga kali dengan seed berbeda, atau sekadar kebetulan?" Curiosity menuntun Anda ke eksperimen tambahan sebelum menulis laporan.

**Rigor** - disiplin dalam prosedur. Bukan sekadar "rapi", tetapi taat pada aturan seperti: satu variabel berubah pada satu waktu, seluruh konfigurasi disimpan bersama checkpoint, setiap angka di laporan dapat dilacak kembali ke run mana. Rigor melelahkan di awal dan menyelamatkan Anda berjam-jam di akhir.

**Skepticism** - kesediaan untuk tidak mempercayai angka sendiri. Akurasi 99% pada hari pertama bukan kabar baik, itu lampu merah. Hampir selalu ada *leakage*, label yang bocor, atau data test yang tercampur dengan training. Skeptisisme memaksa Anda memeriksa sebelum berbangga.

**Ownership** - rasa memiliki yang melampaui alat. LLM mungkin menulis separuh kode Anda; repositori orang lain mungkin menyediakan arsitektur; RunPod mungkin menjalankan training. Tetapi saat dosen bertanya mengapa pilihan tertentu diambil, jawabannya tetap tanggung jawab Anda. Ownership berarti Anda bisa menjelaskan setiap keputusan yang nama Anda tercantum padanya.

Keempat sikap tidak diajarkan sebagai doktrin. Sikap-sikap itu muncul dalam pitfall yang dibahas, dalam checklist yang diulang, dan dalam pertanyaan refleksi di akhir tiap bab.

---

## 5. Tiga Alur Lintas Minggu

Agar bootcamp tidak terasa seperti sebelas topik terputus, tiga alur berjalan dari W1 sampai W11 tanpa disebut sebagai bab tersendiri.

**Big Map** mengembalikan setiap minggu ke pertanyaan yang sama: *tensor shape apa yang masuk, shape apa yang keluar, dan keluarga model apa yang secara alami cocok untuk pemetaan itu?* W1 mulai dari tabular `(F,) → (1,)`, W2-W3 pindah ke citra `(C, H, W) → (N,)`, W5 ke sequence `(T, F) → (N,)`, W7 ke teks, dan W9 ke multimodal. Peta ini bertambah lengkap setiap minggu sehingga deep learning perlahan terlihat sebagai satu lanskap, bukan banyak teknik yang terputus. Tabel rangkuman lintas W1-W11 ada di [Lampiran C.17](14_Lampiran.md#c17-big-map).

**Alur Praktik Riset** memperkenalkan satu kebiasaan riset baru setiap minggu yang tetap dipakai setelahnya. W1 menanamkan *observasi sebelum kesimpulan*, W2 menambah *smoke test tiga level*, W3 mengunci prinsip *ubah satu hal pada satu waktu*, W4 menggabungkan ketiganya dengan matriks eksperimen dan reproduksibilitas, lalu W5-W11 melapisi diagnosis sequence, validasi preprocessing, verifikasi kode AI, hingga framing riset. Bootcamp dibuat kumulatif, bukan mulai ulang setiap Senin. Tabel kebiasaan per minggu beserta contoh operasionalnya ada di [Lampiran C.18](14_Lampiran.md#c18-kebiasaan-riset).

**Representation Choice** adalah alur paling senyap tetapi sering menentukan: *representasi apa yang sedang saya pakai, dan mengapa yang ini?* Bentuknya berubah-ubah - engineered features di W6, extracted frozen features di W7-W8, learned task-specific representations di W2-W5, foundation-model hidden states di W8, lalu multi-stream atau fused representations di W9. Banyak masalah riset lanjutan sebenarnya berawal dari pilihan representasi, meskipun di permukaan tampak seperti pertanyaan arsitektur.

---

## 6. Ritme Sesi Mingguan

Setiap minggu mengikuti format yang stabil 2 jam (120 menit):


| Segmen                  | Durasi   | Tujuan                                                     |
| ----------------------- | -------- | ---------------------------------------------------------- |
| Temuan minggu sebelumnya     | 30 menit | Mahasiswa membagikan temuan minggu sebelumnya              |
| Materi teknis baru  | 40 menit | Konsep + live demo singkat                                 |
| Kebiasaan riset minggu ini | 10 menit | Kebiasaan riset eksplisit yang dikaitkan ke tugas          |
| Pendampingan tugas  | 40 menit | Langkah pertama bersama; mahasiswa lanjut mandiri di rumah |


Format ini memastikan setiap sesi:

1. menuntaskan tindak lanjut minggu sebelumnya,
2. membuka konsep baru,
3. menanamkan satu kebiasaan riset eksplisit, dan
4. memberi momentum awal untuk tugas minggu itu.

---

## 7. Kontrak Belajar

Modul ini paling efektif jika tiga komitmen berikut dipegang sepanjang bootcamp.

**Komitmen waktu dan ritme.** Lab dikerjakan pada minggu yang sama dengan bacaannya - menundanya berarti menunda pemahaman, dan minggu berikutnya akan terasa seperti deretan istilah yang tidak tersambung. Mulai W4, satu Komponen Mandiri mingguan dipilih dari empat jalur (Implementasi, Analisis, Desain, Arsitektur Baru), dicatat di `notebooks/portofolio_mandiri.ipynb`, lalu dipresentasikan 10 menit di awal sesi berikutnya.

**Akuntabilitas pemikiran.** Catatan eksperimen ditulis sendiri, bukan disalin dari output - menjawab apa yang dijalankan, apa yang terjadi, apa arti hasilnya, dan langkah berikutnya. LLM, coding copilot, dan pencarian web boleh dipakai dengan tanggung jawab: kode yang tidak Anda mengerti dibaca baris demi baris sebelum di-commit. Pertanyaan yang dirumuskan dengan cermat adalah kompetensi yang dinilai di rubrik; jika sesuatu terasa kabur setelah dua bacaan, tulis pertanyaan seringkas mungkin dan bawa ke sesi. Eksperimen yang gagal tetapi didokumentasikan dengan baik dinilai setara dengan yang berhasil - yang dievaluasi adalah kualitas pemikiran, bukan apakah hipotesis terkonfirmasi.

**Breadth dan urutan belajar.** Sebelum Capstone, tunjukkan forward pass berjalan dari empat dari lima keluarga arsitektur (MLP, CNN, RNN/LSTM, Transformer, Autoencoder) - ini memastikan Anda lulus sebagai asisten yang bisa mengenali dan memodifikasi keluarga NN yang muncul di paper lintas domain, bukan hanya spesialis CIFAR-10. Modul memperkenalkan ide melalui run konkret terlebih dahulu, baru topangan teori; derivasi berat seperti backprop manual ada di Lampiran A untuk dibaca setelah Anda punya hasil konkret untuk diinterpretasi.

> [!TIP]
> Delapan klausul Kontrak Belajar dalam bentuk checklist (cocok untuk dicetak dan ditempel) tersedia di [Lampiran C.19](14_Lampiran.md#c19-kontrak-belajar).

---

## 8. Lab dan Proyek yang Berkembang Bertahap

Lab dalam modul ini bukan kumpulan latihan terpisah. Lab inti memakai basis kode dan dataset yang sama, lalu bertambah kompleks dari minggu ke minggu - dari MLP tabular di W1, CNN baseline di W2, ablation terkontrol di W3, refactor reproduksibel di W4, hingga adopsi repo eksternal dan implementasi paper di W7-W10. Lab breadth (MLP numpy from-scratch, Transformer-mini, Autoencoder) memenuhi Kontrak Belajar poin 6 sehingga Anda mengenal empat dari lima keluarga arsitektur sebelum Capstone.

Mulai W4, setiap minggu menyertakan satu **Komponen Mandiri** dari empat jalur (Implementasi, Analisis, Desain, Arsitektur Baru) yang dipilih sesuai gaya belajar - kerjakan mandiri di luar sesi, catat di `notebooks/portofolio_mandiri.ipynb`, presentasikan 10 menit di sesi berikutnya. Portofolio berisi 8 entri (W4-W11) dan ditutup dengan refleksi perjalanan belajar. Pada W12-W15, proyek capstone mengintegrasikan minimal enam kompetensi dan keempat sikap; detail di [12_Capstone.md](12_Capstone.md).

> [!TIP]
> Daftar lengkap lab inti, lab breadth, dan tabel empat jalur Komponen Mandiri ada di [Lampiran C.20](14_Lampiran.md#c20-indeks-lab). Template entri portofolio: [C.6](14_Lampiran.md#c6-template-entri-portofolio-mandiri); panduan presentasi 10 menit: [C.7](14_Lampiran.md#c7-panduan-slot-presentasi-komponen-mandiri-10-menit).


---

## 9. Peta Dependensi Konsep

Modul ini disusun sebagai urutan linier W1 → W11. Setiap minggu bergantung pada lab dan kebiasaan riset minggu sebelumnya - W7 (text + repo adoption) menuntut alur kerja reproduksibel dari W4 dan matriks eksperimen dari W5; W10 (paper reading) menuntut kemampuan membaca repo dari W7; W12-W15 (capstone) menuntut seluruh pipeline matang. *Selesai* di sini berarti lab utamanya sudah dijalankan dan ide utamanya bisa dijelaskan tanpa membuka catatan.

> [!NOTE]
> Dependensi linier W1→W11 memang disengaja. Berbeda dengan modul lama yang punya bab paralel, struktur bootcamp memastikan setiap kebiasaan riset baru bertumpu pada kebiasaan minggu sebelumnya - hindari melompat. Tabel prasyarat per minggu beserta rantai lab breadth arsitektur (MLP → CNN → RNN/LSTM → Transformer → Autoencoder) tersedia di [Lampiran C.21](14_Lampiran.md#c21-peta-dependensi).

---

## 10. Pitfalls Sejak Awal

Beberapa kesalahan yang dapat mencegah Anda berkembang, bahkan sebelum bab teknis dimulai:

**Mengerjakan lab hanya sampai kode jalan.** Lab selesai bukan saat training tidak error, tetapi saat Anda bisa menjelaskan mengapa angka yang keluar masuk akal. Jika hasil mengejutkan Anda, itu sinyal untuk berhenti dan menyelidiki, bukan untuk lanjut ke lab berikutnya.

**Menyalin kode LLM tanpa dibaca.** Ini berbahaya bukan karena kodenya sering salah, tetapi karena ketika kodenya benar, Anda melewatkan kesempatan memahami. Ketika nanti kodenya salah, Anda tidak akan tahu caranya mencari. Protokol verifikasi LLM dibahas di W7.

**Menunda pembuatan catatan eksperimen.** Memori manusia tidak bisa merekam dua puluh run ablation yang serupa. Jika catatan ditunda, Anda bisa terpaksa menjalankan ulang eksperimen hanya untuk mengingat hasilnya.

**Mengabaikan data.** Godaan untuk langsung *training* tanpa memeriksa data selalu ada, terutama ketika dataset kelihatannya "sudah dibersihkan orang lain". W6 menunjukkan contoh konkret ketika kelalaian seperti ini membuat eksperimen berbulan-bulan harus diulang.

**Berharap menjadi ahli penuh di akhir minggu 11.** Target adalah 60-70% siap, bukan 100%. Sisa 30-40% terbentuk dari kerja mandiri setelah bootcamp. Tekanan untuk "menguasai semuanya" justru memperlambat.

---

## 11. Refleksi

Sebelum melangkah ke W1, luangkan waktu sepuluh menit untuk menulis jawaban singkat atas tiga pertanyaan berikut. Simpan di catatan pribadi Anda; kita akan merujuknya kembali di Minggu 14.

1. Dari sembilan kompetensi, mana yang Anda duga paling belum dikenal? Apa yang Anda harapkan berubah pada akhir bootcamp?
2. Dari empat sikap riset, mana yang sudah Anda rasakan secara alami, dan mana yang terasa paling sulit untuk Anda lakukan secara konsisten?
3. Saat Anda menerima email PI seperti di pembuka bab ini *hari ini*, apa tiga langkah pertama yang akan Anda ambil? Bandingkan dengan jawaban Anda nanti di minggu 14.

---

## 12. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (blog, 2019). Esai pendek tentang bagaimana seorang peneliti berpengalaman memulai proyek. Relevan sebelum W2 karena menanamkan ritme "verify everything before you scale".
- **Goodfellow, Bengio, Courville - *Deep Learning*** (Bab 1 & 5). Fondasi konseptual yang sengaja tidak diulang di modul ini; baca bab 1 untuk konteks sejarah, bab 5 untuk kerangka pikir machine learning.
- **The Turing Way - *A Handbook for Reproducible Research*** (bagian *Reproducibility*). Dibaca ringan minggu 1-2; penuh analogi yang akan kembali di W4.

---

## Lanjut ke W1

Setelah menyelesaikan refleksi, buka [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md). Bab tersebut memperkenalkan MLP sebagai *pengubah bentuk tensor*, output head + loss matching, dan ritme observasi sebelum interpretasi - bukan sebagai daftar definisi, melainkan sebagai keputusan desain yang dimulai dari pertanyaan: data seperti apa yang sedang kita olah, dan struktur apa yang paling cocok untuk data itu?