<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| ▶ 00 | Pendahuluan | 1 |
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
| 15 | [Panduan Dosen](15_Panduan_Dosen.md) | – |

</details>

---

# 00 · Pendahuluan

> *Riset yang baik dimulai dari pertanyaan yang jujur. Modul ini mengajak Anda memperlakukan setiap instruksi sebagai awal dari pertanyaan - bukan akhir dari jawaban.*

---

## 0. Peta Bab

Modul ini adalah **bootcamp 11 minggu + capstone 3 minggu**. Bab ini memperkenalkan kosakata dasar modul, glosarium singkat, target outcome bootcamp, sembilan kompetensi yang dilatih sepanjang modul, empat sikap riset yang menjalin keseluruhan modul, tiga thread lintas minggu yang menjaga koherensi, ritme sesi mingguan, dan kontrak belajar yang disepakati sebelum melangkah ke materi teknis. Setelah menyelesaikan bab ini, Anda mengerti *mengapa* modul ini ada, *bagaimana* cara terbaik membacanya, dan *apa target realistis* di akhir bootcamp.

---

## 0.5 Sebelum Mulai: Bahasa dan Bekal Modul Ini

Prasyarat modul ini sengaja dijaga serendah mungkin, tetapi bukan tanpa prasyarat sama sekali. Sebelum membuka W1, luangkan 20 menit membaca bagian ini supaya istilah-istilah seperti `(F,)`, `(C, H, W)`, "loss", dan "gradient" tidak muncul tiba-tiba di halaman berikutnya.

> [!TIP]
> Jika Anda sudah terbiasa dengan PyTorch, NumPy, dan kalkulus dasar, lompat ke §0.5.6 (mini-glossary) untuk skim cepat dan lanjut ke §1. Subbagian §0.5.1-§0.5.5 ditujukan untuk pemula yang baru kali pertama menyentuh deep learning.

### 0.5.1 Shape Tensor: Cara Membaca Tuple

"Shape" sebuah tensor adalah daftar berapa banyak elemen di tiap sumbu, ditulis sebagai tuple Python:

| Tuple shape | Arti | Contoh data |
| --- | --- | --- |
| `(3,)` | satu sumbu, 3 elemen | satu vektor `[a, b, c]` |
| `(3, 4)` | dua sumbu, 3 baris × 4 kolom | matriks 3×4 |
| `(3, 4, 5)` | tiga sumbu | "kubus" 3×4×5 |
| `(B, F)` | B sampel, masing-masing F fitur | satu batch tabular |
| `(B, C, H, W)` | B gambar, C channel, tinggi H, lebar W | satu batch citra |

**Koma trailing.** `(3,)` dengan koma di belakang adalah tuple dengan satu elemen; `(3)` tanpa koma adalah angka biasa di Python. Karena shape selalu tuple, koma trailing wajib saat tensor hanya punya satu sumbu.

```python
import numpy as np
np.array([1, 2, 3]).shape       # (3,)   - satu sumbu, tiga elemen
np.array([[1, 2, 3]]).shape     # (1, 3) - dua sumbu, satu baris tiga kolom
```

### 0.5.2 Konvensi Huruf di Modul

Modul memakai huruf-huruf berikut secara konsisten. Hafalkan sekali; semua bab pakai yang sama.

| Huruf | Singkatan dari | Contoh konteks |
| --- | --- | --- |
| `N` | jumlah kelas (number of classes) atau jumlah sampel sesuai konteks | klasifikasi 10 kelas → output `(N,)` dengan N=10 |
| `F` | jumlah fitur (features) | data tabular 5 kolom → input `(F,)` dengan F=5 |
| `B` | ukuran batch (batch size) | 32 sampel sekaligus → batch `(B, F)` dengan B=32 |
| `C` | jumlah channel (channels) | RGB → C=3, grayscale → C=1 |
| `H`, `W` | tinggi (height) dan lebar (width) gambar | foto 224×224 → H=W=224 |
| `T` | panjang sequence atau timestep | kalimat 50 token → T=50 |

### 0.5.3 Arti Panah `->` di Shape Map

Setiap kali modul menulis `(F,) -> (1,)` atau `(C, H, W) -> (N,)`, panah `->` berarti **"dari shape A menjadi shape B lewat satu model atau operasi"**. Bukan shape sebelum dan sesudah satu layer, tetapi shape input dan shape output keseluruhan model.

Contoh konkret:

- `(F,) -> (1,)` artinya: **input** vektor F fitur, **output** satu skalar (mis. prediksi harga rumah).
- `(C, H, W) -> (N,)` artinya: **input** satu gambar, **output** vektor logit/probabilitas N kelas.
- Data tabular 100 baris × 5 kolom dalam memori berbentuk `(100, 5)`. Satu sampel saja berbentuk `(5,)`. Batch 32 sampel berbentuk `(32, 5)`.

### 0.5.4 Kalkulus Mini: Turunan dan Chain Rule

Anda tidak perlu menguasai kalkulus untuk memulai. Cukup dua intuisi dasar.

**Turunan = kemiringan.** Turunan fungsi `f(x)` di titik `x = a` mengukur seberapa cepat `f` berubah saat `x` digeser sedikit di sekitar `a`. Notasi: `df/dx`. Kalau `f(x) = x²`, maka `df/dx = 2x`. Di `x = 3`, turunan = 6, artinya saat `x` bergeser dari 3 ke 3.01, `f` bergeser kira-kira `6 × 0.01 = 0.06`.

**Chain rule = rantai turunan.** Kalau `y = f(g(x))`, maka turunannya `dy/dx = f'(g(x)) · g'(x)`. Bayangkan dua roda gigi: kalau roda dalam berputar 2× lebih cepat dari input, dan roda luar 3× lebih cepat dari roda dalam, total roda luar 6× lebih cepat dari input.

Inilah yang dilakukan **backpropagation**: mengambil rantai panjang turunan dari loss sampai ke setiap parameter, lalu merambatkannya mundur lewat chain rule. Detail derivasi 7-langkah ada di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual). Untuk W1-W2, intuisi "rantai turunan" sudah cukup.

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

Tiga hal yang akan Anda lakukan terus-menerus:

1. **Memeriksa shape.** `print(x.shape)` adalah debug pertama saat training error.
2. **Memindahkan ke device.** `model.to(device)` dan `x.to(device)` agar perhitungan berjalan di GPU/CPU yang konsisten.
3. **Memanggil `.backward()`.** Setelah `loss = criterion(model(x), y)`, panggilan `loss.backward()` menghitung semua gradient otomatis lewat chain rule.

Broadcasting (PyTorch dan NumPy) secara singkat: jika dua tensor punya shape yang kompatibel, operasi seperti `a + b` memperluas tensor kecil agar cocok dengan tensor besar tanpa menyalin memori. Aturan kompatibilitas: dua sumbu kompatibel jika ukurannya sama atau salah satu sama dengan 1.

> [!TIP]
> Resource eksternal yang ringan: [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html) (10 menit), [PyTorch 60-min Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) (panduan resmi). Tidak wajib sebelum W1, tetapi keduanya akan mempercepat W2-W3 jika Anda baru kali pertama pakai keduanya.

### 0.5.6 Mini-Glossary: 19 Istilah yang Akan Sering Muncul

Daftar ini bukan untuk dihafalkan, tetapi untuk di-skim sekali sehingga ketika istilah-istilah ini muncul di W1+ Anda tidak terjebak. Definisi penuh dengan contoh dan catatan ada di [Lampiran 14](14_Lampiran.md).

| Istilah | Arti singkat |
| --- | --- |
| **loss** | angka yang mengukur seberapa salah prediksi model; semakin kecil, semakin baik |
| **gradient** | turunan loss terhadap parameter; menunjuk arah penurunan loss |
| **optimizer** | algoritma yang memakai gradient untuk memperbarui parameter (mis. SGD, Adam, AdamW) |
| **baseline** | model atau hasil sederhana sebagai titik banding sebelum klaim peningkatan |
| **freeze** | mengunci sebagian bobot agar tidak ikut dilatih; biasanya pretrained backbone |
| **fine-tune** | melatih lanjutan pretrained model pada data baru, biasanya dengan learning rate kecil |
| **ablation** | eksperimen yang sengaja menghilangkan satu komponen untuk melihat kontribusinya |
| **leakage** | informasi test atau masa depan yang bocor ke training; menyebabkan akurasi palsu tinggi |
| **pre-registration** | pernyataan hipotesis dan protokol eksperimen yang ditulis sebelum eksperimen dijalankan |
| **hyperparameter** | parameter yang Anda set manual sebelum training (mis. learning rate, batch size); tidak dipelajari otomatis |
| **overfitting** | model menghafal data training, gagal generalisasi ke data baru |
| **epoch** | satu lewatan penuh atas seluruh dataset training |
| **batch** | sub-grup kecil dari dataset yang diproses sekaligus dalam satu langkah training |
| **seed** | angka acak yang dikunci agar hasil bisa direproduksi |
| **checkpoint** | file yang menyimpan bobot model dan state optimizer di titik tertentu |
| **augmentation** | transformasi data training (rotasi, crop, dll.) untuk memperluas variasi |
| **dropout** | teknik regularisasi: secara acak menonaktifkan sebagian neuron tiap forward saat training |
| **batch norm** | layer yang menormalisasi aktivasi per-batch agar distribusi stabil |
| **regularization** | teknik untuk mencegah overfitting (mis. dropout, weight decay, augmentation) |

---

## 1. Satu Email dari Dosen Pembimbing

Bayangkan Anda baru bergabung di laboratorium riset sebagai asisten. Pada hari ketiga, Anda menerima pesan singkat:

> "Tolong train model klasifikasi gambar ini, laporkan akurasinya hari Kamis. Bagaimana cara memastikan hasilnya bisa dipercaya?"

Email ini terdengar sederhana, tetapi setiap fragmen memuat keputusan: dataset yang mana, "akurasi" pada split mana, bagaimana memastikan dua run tidak berbeda hanya karena seed acak, dan kapan angka layak dilaporkan.

Setiap pertanyaan itu mengacu pada kompetensi berbeda. Modul ini membangun kompetensi-kompetensi tersebut secara sistematis, sehingga email semacam itu menjadi titik awal eksperimen yang terstruktur, bukan sumber kepanikan.

> [!NOTE]
> Versi yang lebih jargon-heavy dari email ini, *"ubah loss jadi focal, freeze conv1 pada backbone, bandingkan dengan baseline"*, justru menjadi pintu masuk W3 ketika Anda sudah punya bekal untuk membongkar setiap istilahnya. Untuk sekarang, email sederhana di atas sudah cukup memicu pertanyaan-pertanyaan inti.

---

## 2. Target Outcome: 60-70% Siap Mengerjakan Topik Riset Lab

Bootcamp ini **bukan** dirancang untuk membuat Anda menjadi ahli penuh di setiap arah riset yang mungkin dijalankan lab. Targetnya lebih realistis dan lebih berguna:

> Di akhir bootcamp, Anda diharapkan **60-70% siap** mengerjakan topik riset lab secara mandiri.

Itu artinya Anda harus bisa:

- mengidentifikasi tipe tugas dan framing tensor shape
- memilih keluarga model baseline yang masuk akal
- fine-tune atau mengadaptasi pretrained model atau repo riset eksternal
- merancang perbandingan terkontrol berskala kecil
- mengenali perilaku training yang mencurigakan
- menginspeksi data dan mengantisipasi leakage
- membaca paper secara terstruktur
- menulis pre-registration dan mempertahankan hipotesis falsifiable

Itu **bukan** berarti pada akhir bootcamp Anda harus:

- menguasai literatur domain secara mendalam
- mengetahui paper baseline terkuat di setiap spesialisasi
- memahami internal setiap model pada tingkat riset
- menyelesaikan masalah deployment, distillation, atau multimodal fusion dari nol
- merancang agenda riset siap publikasi tanpa supervisi

Sisa 30-40% berasal dari: paper reading lanjutan, panduan PI/dosen pembimbing, adopsi repo yang ditargetkan, debugging spesifik domain, dan capstone serta kerja mandiri setelahnya.

Transisi yang dimaksudkan:

- **Bootcamp (Minggu 1-11):** bangun peta, workflow, dan kebiasaan
- **Capstone (Minggu 12-14):** terapkan dalam satu masalah yang dibatasi
- **RA research:** lanjutkan belajar mandiri pada masalah di lab

---

## 3. Sembilan Kompetensi Inti

Email pembuka di atas menyentuh sembilan kompetensi yang menjadi tulang punggung modul. Setiap kompetensi dibangun lintas beberapa minggu, bukan satu bab tunggal.

1. **Memahami sistem ML/DL dalam praktiknya** (W1-W3). Mengetahui apa yang dilakukan arsitektur, loss, optimizer, dan evaluasi cukup dalam untuk menilai di mana perubahan bermakna.
2. **Menerjemahkan ide menjadi eksperimen** (W3-W4). Mengubah instruksi terbuka menjadi rancangan konkret dengan variabel, baseline, hipotesis, dan metrik.
3. **Eksperimen reproduksibel** (W4). Menulis konfigurasi, mengunci seed, mencatat jejak, dan menyusun ablation yang bisa diverifikasi orang lain.
4. **Validasi data dan kewaspadaan leakage** (W6). Memeriksa data sebelum mempercayai hasilnya, mulai dari distribusi kelas hingga *temporal leakage* yang tersembunyi.
5. **AI tools sebagai pendukung** (W7-W8). Memakai LLM dan coding copilot untuk mempercepat kerja tanpa menyerahkan pemahaman dan tanggung jawab.
6. **Adopsi repository riset asing** (W7, W9). Membaca kode orang lain dengan cepat, menyiapkan lingkungan, dan memodifikasi secara minimal-invasif.
7. **Foundation model dan adaptation strategy** (W8). Mengenali kapan sebuah pretrained model layak diadopsi, kapan frozen, kapan LoRA, kapan full fine-tuning.
8. **Multimodal reasoning** (W9). Menganalisis fusion strategy, per-modality ablation, dan missing-modality fallback.
9. **Berkembang mandiri** (W10-W11). Membaca paper secara terarah, menyusun pertanyaan yang baik, dan merancang eksperimen lanjutan berikut pre-registration-nya.

Anda tidak perlu menguasai kesembilan kompetensi di minggu pertama. Modul dirancang sebagai tangga: setiap minggu mengandalkan kebiasaan yang dibangun di minggu sebelumnya.

> [!TIP]
> Urutan tangga ini disengaja. Anda akan menyentuh **kompetensi 1-3 di W1-W4**, kompetensi 4 di W6, kompetensi 5-7 di W7-W8, dan kompetensi 8-9 di W9-W11. Jangan khawatir kalau kompetensi 4-9 belum kebayang sekarang. Bahkan dosen pun mengasah kompetensi 9 (berkembang mandiri) sepanjang karier.

---

## 4. Empat Sikap Riset

Kompetensi teknis tidak akan bertahan lama tanpa sikap yang benar. Empat sikap berikut muncul berulang sepanjang modul, sering kali tanpa disebut eksplisit, melalui pilihan contoh dan pertanyaan refleksi.

**Curiosity** - rasa ingin tahu yang gelisah. Ketika angka akurasi meloncat dari 78% ke 80% setelah Anda mengganti loss, sikap ini yang bertanya: "apakah kenaikan ini konsisten jika aku jalankan tiga kali dengan seed berbeda, atau sekadar kebetulan?" Curiosity menuntunmu ke eksperimen tambahan sebelum menulis laporan.

**Rigor** - disiplin dalam prosedur. Bukan sekadar "rapi", tetapi taat pada aturan seperti: satu variabel berubah pada satu waktu, seluruh konfigurasi disimpan bersama checkpoint, setiap angka di laporan dapat dilacak kembali ke run mana. Rigor melelahkan di awal dan menyelamatkan Anda berjam-jam di akhir.

**Skepticism** - kesediaan untuk tidak mempercayai angka sendiri. Akurasi 99% pada hari pertama bukan kabar baik, itu lampu merah. Hampir selalu ada *leakage*, label yang bocor, atau data test yang tercampur dengan training. Skeptisisme memaksamu memeriksa sebelum berbangga.

**Ownership** - rasa memiliki yang melampaui alat. LLM mungkin menulis separuh kode Anda; repository orang lain mungkin menyediakan arsitektur; RunPod mungkin menjalankan training. Tetapi saat dosen bertanya mengapa pilihan tertentu diambil, jawabannya tetap tanggung jawab Anda. Ownership berarti Anda bisa menjelaskan setiap keputusan yang namamu tercantum padanya.

Keempat sikap tidak diajarkan sebagai doktrin. Anda akan mengenalinya dalam pitfall yang dibahas, dalam checklist yang diulang, dan dalam pertanyaan refleksi di akhir tiap bab.

---

## 5. Tiga Thread Lintas Minggu

Agar bootcamp tidak terasa seperti sebelas topik terputus, tiga thread berjalan terus menerus dari Minggu 1 sampai Minggu 11.

### 5.1 Big Map

Setiap minggu kembali ke pertanyaan yang sama:

> Tensor shape apa yang masuk, shape apa yang keluar, dan keluarga model apa yang secara alami cocok untuk pemetaan itu?

| Minggu | Big Map row |
|---|---|
| W1 | `(F,) -> (1,)`, `(1,)`, `(N,)` (tabular) |
| W2-W3 | `(C, H, W) -> (N,)` (citra) |
| W4 | sama seperti W2-W3, fokus workflow |
| W5 | `(T, F) -> (1,)`, `(N,)`, `(T'', 1)` (sequence) |
| W6 | sama seperti W5, fokus representasi & leakage |
| W7 | `(T,) -> (N,)`, `(1,)`, `(T, N)` (teks) |
| W8 | input apapun dengan pretrained priors |
| W9 | multiple tensors -> shared prediction (multimodal) |
| W10-W11 | sintesis lintas keluarga |

Peta ini tumbuh setiap minggu sehingga Anda perlahan melihat deep learning sebagai satu lanskap, bukan banyak teknik yang terputus.

### 5.2 Research Practice Ladder

Setiap minggu memperkenalkan satu kebiasaan riset yang tetap aktif setelahnya. Bootcamp terasa kumulatif, bukan reset setiap Senin. Kolom "contoh operasional" memberi gambaran konkret seperti apa kebiasaan itu terlihat dalam pekerjaan sehari-hari.

| Minggu | Rigor habit | Contoh operasional |
|---|---|---|
| W1 | Observasi sebelum kesimpulan | Sebelum bilang "model A lebih baik", tulis dulu apa yang dilihat di kurva (angka, bentuk), baru tafsirkan. |
| W2 | Three-level smoke test | Sebelum training 30 epoch, jalankan import test → dummy forward → overfit one batch. Stop kalau salah satu gagal. |
| W3 | Change one thing at a time | Saat membandingkan focal vs CE, samakan optimizer, lr, seed, augmentasi. Hanya loss yang berubah. |
| W4 | Reproducibility, traceability, experiment matrix | Setiap run punya `config.yaml + git_hash + seed`; semua ablation tertulis di matrix sebelum eksekusi. |
| W5 | Long-sequence diagnosis dan justifikasi arsitektur | Saat training LSTM tidak konvergen, plot gradient norm per-layer dulu sebelum tweak hyperparameter. |
| W6 | Validasi preprocessing dan kewaspadaan leakage | Hitung mean/std HANYA dari train; jangan pernah lihat test sebelum angka final. |
| W7 | Verifikasi kode AI, inspeksi tokenisasi, repo primer | Sebelum commit kode dari LLM, baca baris demi baris dan jalankan minimal smoke test sederhana. |
| W8 | Model-card literacy, adaptation choice, fair baseline | Sebelum fine-tune, baca model card: dataset asal, lisensi, batas penggunaan, evaluasi yang sudah ada. |
| W9 | Per-modality ablation dan multimodal failure analysis | Setelah multimodal model jalan, jalankan run dengan satu modality di-zero atau di-acak; jika metric tidak turun, modality itu diabaikan. |
| W10 | Three-pass paper reading dan paper-to-code translation | Pass 1 (judul-abstrak-kesimpulan), pass 2 (figur dan tabel), pass 3 (rumus). Stop di pass 1 jika tidak relevan. |
| W11 | 5 Whys, literature-to-experiment, proposal defense | Tulis hipotesis falsifiable (`Δ ≥ X dengan p < Y`), bukan "saya pikir model A lebih baik". |

### 5.3 Representation Choice

Thread ketiga, lebih senyap tapi penting, berulang lintas minggu:

> Representasi apa yang sedang saya pakai, dan mengapa yang ini?

Bentuknya berubah-ubah:

- engineered features (W6)
- extracted frozen features (W7-W8)
- learned task-specific representations (W2-W5)
- foundation-model hidden states (W8)
- teacher-model atau auxiliary representations (W8)
- multi-stream / fused representations (W9)

Thread ini matters karena banyak masalah riset lanjutan sebenarnya adalah masalah pemilihan representasi yang menyamar sebagai pertanyaan arsitektur.

---

## 6. Ritme Sesi Mingguan

Setiap minggu mengikuti format yang stabil 2 jam (120 menit):

| Segmen | Durasi | Tujuan |
|---|---|---|
| Prior-week findings | 30 menit | Mahasiswa membagikan temuan minggu sebelumnya |
| New technical material | 40 menit | Konsep + live demo singkat |
| Rigor habit of the week | 10 menit | Kebiasaan riset eksplisit yang dikaitkan ke assignment |
| Assignment walkthrough | 40 menit | Langkah pertama bersama; mahasiswa lanjut mandiri di rumah |

Format ini memastikan setiap sesi:
1. menutup loop minggu sebelumnya,
2. membuka konsep baru,
3. menanamkan satu kebiasaan riset eksplisit, dan
4. memberi momentum awal untuk assignment minggu itu.

---

## 7. Kontrak Belajar

Modul ini bekerja paling baik ketika Anda dan modul menyepakati hal-hal berikut.

1. **Mengerjakan lab pada minggu yang sama dengan membacanya.** Menunda lab berarti menunda pemahaman, dan minggu berikutnya akan terasa seperti deretan istilah yang tidak tersambung.
2. **Menulis catatan eksperimen sendiri.** Bukan menyalin output, tetapi menjawab: apa yang aku jalankan, apa yang terjadi, apa arti hasilnya, dan apa yang akan kulakukan selanjutnya. Format catatan ada di `14_Lampiran.md`.
3. **Memakai LLM, coding copilot, dan pencarian web - dengan tanggung jawab.** Sebelum memasukkan kode yang tidak Anda mengerti, baca baris demi baris dan pastikan Anda bisa menjelaskan fungsinya tanpa bantuan. Bab W7 membahas protokol ini lebih dalam.
4. **Mengajukan pertanyaan.** Pertanyaan yang dirumuskan dengan cermat adalah salah satu kompetensi yang dinilai di rubrik. Jika sesuatu terasa kabur setelah membaca dua kali, tulis pertanyaan seringkas mungkin dan bawa ke sesi tatap muka.
5. **Komponen Mandiri mingguan, mulai W4.** Catat di `notebooks/portofolio_mandiri.ipynb`; presentasi 10 menit di awal sesi berikutnya. Format dan kriteria: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).
6. **Breadth Check sebelum Capstone.** Tunjukkan forward pass berjalan dari **empat dari lima keluarga arsitektur**: MLP (Lab 0/1c), CNN (Lab 1), RNN/LSTM (Lab 3b), Transformer (Lab 6b/W7), Autoencoder (Lab 7b). Ini memastikan Anda keluar sebagai asisten yang bisa mengenali dan memodifikasi keluarga NN yang muncul di paper lintas domain, bukan hanya spesialis CIFAR-10.
7. **Eksperimen yang gagal tetapi didokumentasikan dengan baik dinilai setara dengan yang berhasil.** Yang dievaluasi adalah kualitas pemikiran, analisis, dan dokumentasi Anda, bukan apakah hipotesis terkonfirmasi. Hasil negatif yang dijelaskan dengan jujur lebih bernilai daripada hasil positif yang tidak bisa dipertanggungjawabkan.
8. **Application-first, theory-grounded.** Modul memperkenalkan ide melalui run konkret dan perbandingan terlebih dahulu. Teori berat (derivasi backprop manual, optimizer theory long-form) tersedia di Lampiran A untuk dibaca setelah Anda punya sesuatu yang nyata untuk diinterpretasi.

---

## 8. Lab dan Proyek yang Menumbuh

Lab dalam modul ini bukan kumpulan latihan terpisah. Lab-lab utama berbagi basis kode dan dataset yang berkembang bersama Anda lintas minggu.

**Lab Inti (wajib):**

- **Lab 0 (W1)** - Tabular MLP: train MLP pada satu dataset tabular shared dengan tiga formulasi tugas (regression, binary classification, multiclass).
- **Lab 1 (W2-W3)** - Baseline CNN: bangun classifier citra dari nol + pretrained fine-tune; jalankan three-level smoke test ritual.
- **Lab 2 (W3)** - 3-condition ablation: jalankan satu perbandingan terkontrol (mis. AdamW vs SGD, augmentasi on/off) dengan curve interpretation dan confusion matrix.
- **Lab 3 (W4)** - Reproducibility: pindahkan konfigurasi ke YAML, kunci seed, simpan checkpoint dengan metadata + git hash, refactor jadi struktur eksperimen reproduksibel.
- **Lab 3b (W5)** - RNN vs LSTM: bandingkan vanilla RNN dan LSTM/GRU pada tugas sequence dengan dependensi panjang; visualisasikan gradient flow.
- **Lab 4 (W4 ekstensi atau W6)** - EDA + leakage audit: PathMNIST atau dataset baru; audit pipeline dari leakage.
- **Lab 6 - Temporal Leakage (W6)** - Sensor/timeseries dataset; bangun causal feature, sengaja patahkan kausalitas, tunjukkan inflasi metric yang invalid.
- **Lab 5b (W7)** - Klasifikasi sentimen IndoNLU SmSA: 2x2 perbandingan frozen vs fine-tune, [CLS] vs mean pool.
- **Lab 6 - Repo Adoption (W7)** - Clone repo riset, modifikasi minimal-invasive, tulis `repo_map.md`.
- **Lab 8 - Multimodal Ablation (W9)** - Reproduce/adopt multimodal repo, per-modality ablation, missing-modality test, repo map kedua.
- **Lab 9 - Paper Implementation (W10)** - Pilih satu paper dari curated menu, three-pass read, implement core method, satu ablation kecil.

**Lab Breadth (memenuhi Kontrak Belajar poin 6):**

- **Lab 1c** (MLP numpy from-scratch, breadth)
- **Lab 6b** (Transformer-mini from-scratch, breadth, optional di W7)
- **Lab 7b** (Autoencoder + denoising AE + t-SNE, breadth)

Pada minggu 12-14, Anda menyelesaikan **capstone project** yang mengintegrasikan minimal enam kompetensi dan keempat sikap. Detail ada di `12_Capstone_3_Minggu.md`.

Mulai W4, setiap bab juga memiliki satu **Komponen Mandiri** - pilihan jalur eksplorasi mingguan yang Anda kerjakan secara independen dan catat di `notebooks/portofolio_mandiri.ipynb`. Portfolio berisi 8 entri (W4-W11) dan ditutup dengan refleksi trajektori belajar. Template entri dan panduan presentasi 10 menit ada di `14_Lampiran.md` bagian C.6 dan C.7.

**Empat jalur Komponen Mandiri:**

| Jalur | Inti kegiatan | Contoh konkret | Artefak portfolio |
| --- | --- | --- | --- |
| **Implementasi** | Tambah/ubah/uji kode di repo eksperimen | Augmentasi baru, scheduler tambahan, flag CLI penukar komponen | Cuplikan kode + benchmark before/after + 1 paragraf interpretasi |
| **Analisis** | Selidiki perilaku model/data/hasil | Confusion matrix per-kelas, Grad-CAM, studi variansi seed, audit kesalahan | Visualisasi + 2-3 temuan + hipotesis turunan |
| **Desain** | Rancang eksperimen baru tanpa wajib jalankan | Pre-registration, grid ablation belum jalan, protokol evaluasi baru | Protokol terstruktur + justifikasi + estimasi cost |
| **Arsitektur Baru** | Replikasi/adaptasi keluarga arsitektur belum di-cover lab wajib | GRU di atas Lab 3b, multi-head di atas Lab 6b, VAE di atas Lab 7b | Forward pass + learning curve + perbedaan vs arsitektur lain. Template `14_Lampiran.md` C.8 |

---

## 9. Peta Dependensi Konsep

Modul ini dirancang sebagai tangga linier W1 → W11. Tabel berikut menunjukkan minggu mana yang harus Anda selesaikan sebelum minggu tertentu. "Selesai" berarti lab utamanya sudah dijalankan dan Anda bisa menjelaskan ide utamanya.

| Minggu | Prasyarat minimum | Konsep kunci |
| --- | --- | --- |
| **W1** Tabular | - (entry point) | - |
| **W2** Images & CNN | W1 | Tensor I/O, output head + loss matching |
| **W3** Loss/Opt/Eval | W2 | Smoke test ritual, baseline yang berjalan |
| **W4** Reproducibility | W3 | Pipeline training penuh; bisa baca loss curve |
| **W5** Sequences | W4 | Workflow disiplin; eksperimen matrix |
| **W6** Representations & Leakage | W5 | Sequence model; pemikiran tentang split data |
| **W7** Text & Repo Adoption | W4, W6 | Reproducibility; pemahaman representasi |
| **W8** Foundation Models | W7 | Pengalaman fine-tuning pretrained text/image model |
| **W9** Multimodal | W8 | Pemahaman foundation model dan adaptation |
| **W10** Paper Reading | W4, W7 | Bisa baca repo; bisa menjalankan eksperimen reproduksibel |
| **W11** Research Framing | W10 | Pengalaman menerjemahkan paper jadi kode |
| **W12-14** Capstone | W1-W11 | Seluruh pipeline + research framing matang |

> [!NOTE]
> Dependensi linier W1→W11 by design. Berbeda dengan modul lama yang punya bab paralel, struktur bootcamp memastikan setiap kebiasaan riset baru dilatih di atas kebiasaan minggu sebelumnya. Hindari melompat: misalnya, W7 (text + repo adoption) menuntut workflow reproducibility dari W4 dan eksperimen matrix dari W5.

**Rantai lab breadth arsitektur**: Lab 0 (MLP tabular, W1) atau Lab 1c (MLP numpy, opsional) → Lab 1 (CNN, W2) → Lab 3b (RNN/LSTM, W5) → Lab 5b/Lab 6b (Transformer, W7) → Lab 7b (Autoencoder, breadth opsional). Empat dari lima keluarga sudah tercakup oleh lab wajib W1-W7; Lab 7b melengkapi keluarga Autoencoder untuk Breadth Check di Kontrak Belajar.

---

## 10. Pitfalls Sejak Awal

Beberapa kesalahan yang dapat mencegah Anda berkembang, bahkan sebelum bab teknis dimulai:

**Mengerjakan lab hanya sampai kode jalan.** Lab selesai bukan saat training tidak error, tetapi saat Anda bisa menjelaskan mengapa angka yang keluar masuk akal. Jika hasil mengejutkan Anda, itu sinyal untuk berhenti dan menyelidiki, bukan untuk lanjut ke lab berikutnya.

**Menyalin kode LLM tanpa dibaca.** Ini berbahaya bukan karena kodenya sering salah, tetapi karena ketika kodenya benar, Anda melewatkan kesempatan memahami. Ketika nanti kodenya salah, Anda tidak akan tahu caranya mencari. Protokol verifikasi LLM dibahas di W7.

**Menunda pembuatan catatan eksperimen.** Memori manusia tidak bisa merekam dua puluh run ablation yang serupa. Menunda catatan berarti pada hari pelaporan Anda akan menjalankan ulang eksperimen hanya untuk mengingat hasilnya.

**Mengabaikan data.** Godaan untuk langsung *training* tanpa memeriksa data selalu ada, terutama ketika dataset kelihatannya "sudah dibersihkan orang lain". W6 menunjukkan contoh konkret di mana kelalaian ini mengubur eksperimen berbulan-bulan.

**Berharap menjadi ahli penuh di akhir minggu 11.** Target adalah 60-70% siap, bukan 100%. Sisa 30-40% terbentuk dari kerja mandiri setelah bootcamp. Tekanan untuk "menguasai semuanya" justru memperlambat.

---

## 11. Refleksi

Sebelum melangkah ke W1, luangkan waktu sepuluh menit untuk menulis jawaban singkat atas tiga pertanyaan berikut. Simpan di catatan pribadi Anda; kita akan merujuknya kembali di Minggu 14.

1. Dari sembilan kompetensi, mana yang Anda duga paling asing? Apa yang Anda harapkan berubah pada akhir bootcamp?
2. Dari empat sikap riset, mana yang sudah Anda rasakan secara alami, dan mana yang terasa paling sulit untuk Anda lakukan secara konsisten?
3. Saat Anda menerima email PI seperti di pembuka bab ini *hari ini*, apa tiga langkah pertama yang akan Anda ambil? Bandingkan dengan jawaban Anda nanti di minggu 14.

---

## 12. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (blog, 2019). Esai pendek tentang bagaimana seorang peneliti berpengalaman memulai proyek. Relevan sebelum W2 karena menanamkan ritme "verify everything before you scale".
- **Goodfellow, Bengio, Courville - *Deep Learning*** (Bab 1 & 5). Fondasi konseptual yang sengaja tidak diulang di modul ini; baca bab 1 untuk konteks sejarah, bab 5 untuk kerangka pikir machine learning.
- **The Turing Way - *A Handbook for Reproducible Research*** (bagian *Reproducibility*). Dibaca ringan minggu 1-2; penuh analogi yang akan kembali di W4.

---

## Lanjut ke W1

Setelah menyelesaikan refleksi, buka [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md). Bab tersebut memperkenalkan MLP sebagai *shape transformer*, output head + loss matching, dan ritme observasi sebelum interpretasi - tidak sebagai daftar definisi, tetapi sebagai keputusan desain yang dibingkai oleh pertanyaan: data seperti apa yang sedang kita olah, dan struktur apa yang paling alami mengikutinya?
