<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| ▶ 03 | W3 - Loss, Optimizer & Evaluasi | 3 |
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

# 03 · W3 - Loss, Optimizer & Evaluasi

> *Training selesai, kurva loss muncul di layar. Inilah momen di mana banyak pemula berhenti karena tidak tahu harus membaca apa. Loss curve bukan sekadar "turun = bagus, naik = buruk" - ia adalah sinyal diagnostik yang bisa memberi tahu apa yang salah bahkan sebelum Anda memeriksa kode.*

**Big Map row:** `(C, H, W) -> (N,)` (lanjutan W2, fokus workflow)
**Rigor habit:** Change one thing at a time
**Dataset:** CIFAR-10 (reuse dari W2)
**Lab utama:** Lab 1 selesai + Lab 2 (`lab2_loss_freeze_ablation.ipynb`)

---

## 0. Peta Bab

W3 adalah minggu example-first. Sebelum membaca teori tentang loss dan optimizer, Anda akan melihat lima run nyata dan diminta mengidentifikasi apa yang terjadi. Baru setelah itu kita tarik pola dan penjelasannya.

- **1.5** Galeri Lima Run (sebelum teori)
- **2.1** Loss sebagai pilihan - bukan bawaan default
- **2.2** Optimizer dan weight decay
- **2.3** Evaluasi: bukan satu angka
- **2.4** Tiga strategi representasi fitur
- **2.5** Diagnosis loss curve - capstone W3

**Recap W2:** Anda sudah memahami tensor I/O, empat keluarga arsitektur, dan three-level smoke test ritual. W3 membangun di atasnya.

---

## 1.5 Galeri Lima Run: Sebelum Membaca Teori

Ini bukan soal. Ini latihan observasi.

Perhatikan lima loss curve berikut (masing-masing menampilkan train loss dan val loss selama 20 epoch):

**Run 1 - Healthy convergence:** Train loss dan val loss turun sejajar, keduanya mencapai angka rendah. Val sedikit di atas train - gap stabil.

**Run 2 - Overfitting:** Train loss terus turun mulus, val loss turun sampai epoch 6 lalu naik perlahan. Divergensi makin lebar.

**Run 3 - No learning:** Train loss tidak bergerak dari epoch pertama. Val juga stagnan. Kedua kurva datar.

**Run 4 - Unstable training:** Train loss turun sampai epoch 12, lalu tiba-tiba meledak ke `NaN`. Val loss ikut hilang.

**Run 5 - Noisy but improving:** Train loss turun tapi dengan noise besar (naik-turun tiap epoch). Val loss secara umum turun meski fluktuatif.

**Pertanyaan untuk Anda:**

- Run mana yang paling mengkhawatirkan? Kenapa?
- Untuk Run 3, apa hipotesis pertama Anda?
- Untuk Run 2, perubahan apa yang akan Anda coba pertama?
- Run 5 - apakah ini masalah? Kapan noise di loss curve mulai menjadi masalah?

Tuliskan jawaban singkat sebelum membaca bagian berikutnya. Kita akan kembali ke galeri ini di Section 2.5 dengan kerangka diagnosis lengkap.

---

## 1. Motivasi: Ketika Training Terasa Aneh

Anda menjalankan SimpleCNN 20 epoch. Loss training turun mulus. Lalu Anda bandingkan dengan loss validasi - ia stagnan sejak epoch 4. Apa yang salah? Atau: loss tiba-tiba melompat ke `NaN` di epoch ke-8. Atau: loss training tidak bergerak sama sekali dari epoch pertama.

Tiga skenario di atas bukan pengecualian - mereka adalah rutinitas riset sehari-hari. Bab ini memberi Anda bahasa untuk menamai masalah-masalah tersebut dan langkah sistematis untuk menanganinya.

---

## 2. Konsep Inti

### 2.1 Loss sebagai Pilihan

Loss menentukan *apa yang dianggap salah oleh model*. Mengganti loss berarti mengubah arah yang dianggap model sebagai "perbaikan".

**Untuk klasifikasi:**
- *Cross-entropy*: pilihan default. Mengukur jarak antara distribusi probabilitas prediksi dan label.
- *Focal loss* (Lin et al., 2017): memodifikasi cross-entropy dengan faktor `(1-p)^γ` yang menurunkan bobot sampel mudah dan menaikkan bobot sampel sulit. Berguna pada kelas sangat tidak seimbang.
- *Label smoothing*: mengganti label one-hot dengan distribusi sedikit kabur, mencegah model terlalu percaya diri.

**Untuk regresi:**
- *MSE*: hukuman kuadratik - sensitif terhadap outlier, cocok ketika residu kecil sudah bermasalah.
- *MAE*: linear, lebih robust tetapi kurang tajam di sekitar nol.
- *Huber loss*: menggabungkan keduanya - kuadratik untuk residu kecil, linear untuk outlier besar.

Pertanyaan yang selalu relevan sebelum mengganti loss: *apa jenis kesalahan yang paling mahal di aplikasi Anda?* Jika false negative pada kelas minor lebih mahal, focal loss atau pembobotan kelas langsung membantu. Mengganti loss tanpa alasan jelas menambah satu variabel yang harus dijelaskan di laporan.

### 2.2 Optimizer: Bagaimana Langkah Diputuskan

Optimizer mengubah gradient menjadi langkah konkret pada parameter.

- **SGD (+ momentum).** Tertua, paling sederhana, sering paling kuat hasilnya setelah tuning yang tekun. Membutuhkan *learning rate schedule* yang dirancang hati-hati. Banyak paper *state-of-the-art* di visi komputer tetap memakai SGD.
- **Adam dan AdamW.** Adaptif - setiap parameter mendapat learning rate yang disesuaikan. Sangat cepat konvergen di epoch awal. AdamW memperbaiki Adam dengan memisahkan *weight decay* dari gradient momentum.
- **LAMB.** Varian untuk *batch size* besar (ribuan sampel). Relevan di pre-training besar (BERT, GPT), jarang diperlukan di proyek kuliah.

> **Catatan: `weight_decay` di AdamW bukan L2 regularisasi.** Pada SGD, menambahkan L2 regularisasi (`λ ||w||²` ke loss) ekuivalen dengan mengurangkan `λw` dari setiap parameter. Pada Adam, hal ini **tidak berlaku**: Adam membagi gradient dengan estimasi variansi, sehingga penalti L2 yang ditambahkan ke loss mendapat efek yang tidak proporsional antar parameter. AdamW memperbaiki ini dengan mengaplikasikan weight decay *langsung* ke parameter (bukan lewat gradient). Akibat praktisnya: `weight_decay=0.01` di AdamW memberi efek regularisasi yang lebih konsisten daripada nilai yang sama di Adam biasa.

Dipasangkan dengan optimizer adalah *scheduler*: mekanisme menurunkan (atau menaikkan lalu menurunkan) learning rate selama training. `OneCycleLR`, `CosineAnnealingLR`, dan `ReduceLROnPlateau` adalah tiga pola yang paling sering Anda jumpai.

### 2.3 Evaluasi: Bukan Satu Angka

Satu kesalahan klasik: membanggakan akurasi 95% tanpa menyadari kelas positif hanya muncul 5% di data - sehingga *dummy classifier* yang selalu memprediksi "negatif" juga mencapai 95%.

| Metrik | Kapan dipakai | Kelemahan |
| --- | --- | --- |
| Accuracy | Kelas seimbang | Menyesatkan pada imbalance |
| Precision / Recall / F1 | Kelas imbalance, fokus satu kelas | Perlu memilih ambang batas |
| ROC-AUC | Evaluasi probabilistik binary | Tidak mencerminkan performa pada ambang tertentu |
| PR-AUC | Imbalance ekstrem | Lebih sulit diinterpretasikan non-teknis |
| Perplexity | Model bahasa | Hanya bermakna relatif antar model |

Di samping metrik, Anda juga perlu strategi validasi:

- **Hold-out split.** Train/val/test sekali; val untuk tuning, test untuk pengukuran final. Cepat tetapi sensitif terhadap keberuntungan pembagian.
- **K-fold cross-validation.** Bagi data menjadi k bagian; training k kali dengan tiap bagian jadi validasi bergantian. Estimasi lebih stabil, biaya k kali training.
- **Stratified split/fold.** Distribusi kelas sama di setiap bagian; wajib untuk klasifikasi dengan imbalance.

### 2.4 Representasi Fitur: Tiga Pilihan Desain

Salah satu keputusan yang paling sering menentukan *seberapa baik* model bekerja bukan pilihan arsitektur, melainkan pilihan representasi - diambil jauh sebelum training dimulai. Pada modalitas dan tugas yang sama, representasi yang berbeda kerap menghasilkan selisih performa lebih besar dari mengganti arsitektur.

**Engineered.** Fitur dirancang manusia dengan pengetahuan domain - statistik agregat, transformasi matematis, atau fitur klasik. Di gambar: histogram warna, HOG, SIFT. Di sinyal CGM: mean, koefisien variasi, *time-in-range*. Representasi *engineered* murah secara komputasi, mudah diinterpretasi, dan sering menjadi baseline yang mengejutkan kuat ketika data latih terbatas.

**Extracted.** Fitur diambil dari *hidden layer* model *pretrained* yang di-freeze. Di visi: *hidden states* dari CNN atau ViT pretrained pada ImageNet. Di teks: token `[CLS]` atau mean pooling dari BERT. Kompromi menarik: representasi kaya dari model besar tanpa biaya training penuh, dengan syarat domain target tidak terlalu jauh dari domain pretraining.

**Learned.** Representasi dipelajari langsung dari data melalui training *end-to-end* atau *self-supervised*. Fine-tuning BERT, melatih 1D CNN dari nol pada sinyal ECG, atau me-fine-tune ResNet pada dataset medis semuanya termasuk kategori ini. Biasanya paling kuat ketika data latih memadai, tetapi paling haus data dan paling mahal dilatih.


| Domain | Engineered | Extracted | Learned |
| --- | --- | --- | --- |
| Gambar | Histogram warna, HOG, SIFT | Hidden states CNN/ViT pretrained (frozen) | CNN di-fine-tune end-to-end |
| Teks | TF-IDF, n-gram | `[CLS]` / mean pooling BERT (frozen) | BERT di-fine-tune untuk task hilir |
| Sinyal CGM | Mean, CV, TIR, TBR | Hidden states Chronos/TimesFM (frozen) | 1D CNN/Transformer dari nol |
| Audio | MFCC, spectral centroid | Embedding Wav2Vec2/AST (frozen) | CNN di atas spektrogram, end-to-end |


![Tiga strategi representasi fitur: Engineered (manual), Extracted (dari pretrained frozen), dan Learned (end-to-end)](./figures/fig01d_feature_representation.svg)

Setelah memilih jalur utama, beberapa keputusan turunan segera mengikuti: apakah model *pretrained* di-freeze penuh atau sebagian? Layer mana yang dibuka? Bagaimana mereduksi *hidden states* menjadi satu vektor - token `[CLS]`, mean pooling, atau konkatenasi beberapa layer?

Taksonomi ini akan penting di Bab 02 saat merumuskan variabel eksperimen. Membandingkan "BERT frozen + head kecil" dengan "BERT fine-tune penuh" bukan sekadar membandingkan dua model - Anda membandingkan dua strategi representasi dengan tingkat kebebasan yang sangat berbeda.

### 2.5 Membaca Sinyal: Diagnosis dari Loss Curve

Lima pola yang paling sering ditemui, masing-masing dengan hipotesis dan langkah test. Diagram di bawah adalah peta navigasi cepat; jika Anda baru pertama kali mendiagnosis, mulai dari pertanyaan di simpul paling atas dan ikuti cabang sesuai kondisi Anda.

```mermaid
flowchart TD
    A["Loss training tinggi,<br/>tidak turun dari awal"] --> B{"Overfit one batch:<br/>loss turun ke ≈0?"}
    B -->|Ya| C["Naikkan LR 10×,<br/>coba lagi"]
    B -->|Tidak| D["Bug di forward pass<br/>atau loss function"]

    E["Loss training turun,<br/>val stagnan dari awal"] --> F{"Val loss pernah<br/>turun sama sekali?"}
    F -->|"Tidak pernah"| G["Curigai data leakage.<br/>Periksa overlap train/val"]
    F -->|"Pernah turun, lalu stagnan"| H["Kurangi kapasitas<br/>atau tambah regularisasi"]

    I["Loss train & val turun sejajar,<br/>val lebih tinggi di akhir"] --> J{"Selisih train/val<br/>&gt; 10% akurasi?"}
    J -->|Ya| K["Overfitting klasik.<br/>Early stopping di epoch<br/>dengan val loss terbaik"]
    J -->|Tidak| L["Gap normal.<br/>Lanjutkan training"]

    M["Loss val turun,<br/>train stagnan tinggi"] --> N{"Augmentasi terlalu<br/>agresif?"}
    N -->|Ya| O["Kurangi probabilitas<br/>augmentasi"]
    N -->|Tidak| P["Model terlalu kecil.<br/>Tambah kapasitas"]

    Q["Loss meledak:<br/>NaN atau naik tajam"] --> R{"Tiba-tiba atau<br/>gradual?"}
    R -->|"Tiba-tiba"| S["Tambah gradient clipping<br/>(clip=1.0)"]
    R -->|"Gradual"| T["Turunkan LR 10×"]

    U["Pola tidak tercantum<br/>di atas?"] --> V["Mulai dari overfit<br/>one batch"]
```

**Pola 1: Loss training tinggi, tidak turun dari awal.**
Model tidak belajar sama sekali. Hipotesis: (a) learning rate terlalu kecil, atau (b) bug di forward pass. Langkah test: jalankan *overfit one batch* - ambil 4-8 sampel, jalankan ratusan iterasi hanya pada sampel itu. Jika loss tidak turun mendekati nol, ada bug di arsitektur atau loss function. Jika turun, model sehat - masalahnya di tempat lain. Naikkan LR 10× dan lihat apakah kurva mulai bergerak.

**Pola 2: Loss training turun, tapi loss validasi stagnan atau lebih tinggi sejak awal.**
Overfitting sangat cepat. Hipotesis: dataset terlalu kecil relatif terhadap kapasitas model, atau ada data leakage. Langkah test: kurangi kapasitas model atau tambah regularisasi. Jika val loss tidak membaik sama sekali, curigai leakage.

**Pola 3: Loss training dan validasi turun sejajar, tetapi val jauh di atas train di akhir.**
Overfitting klasik. Langkah test: identifikasi epoch terbaik dari kurva val (sebelum titik divergen) dan gunakan *early stopping*.

**Pola 4: Loss validasi turun tapi loss training stagnan di angka tinggi.**
*Underfitting* - model terlalu kecil atau LR terlalu rendah. Paradoksnya val bisa lebih baik dari train jika val set kebetulan lebih mudah. Langkah test: periksa apakah augmentasi terlalu agresif.

**Pola 5: Loss meledak - tiba-tiba `NaN` atau naik tajam.**
Gradient explosion. Hipotesis: (a) LR terlalu besar, atau (b) tidak ada gradient clipping. Langkah test: kurangi LR 10× atau tambahkan `grad_clip = 1.0`. Untuk RNN dan Transformer, gradient clipping hampir selalu diperlukan.

![Lima pola loss curve untuk diagnosis: underfitting, overfitting, early divergence, val lebih rendah dari train, dan konvergensi normal](./figures/fig01c_loss_curves_diagnostic.svg)

**Overfit satu batch** adalah alat diagnosis terpenting untuk membedakan bug kode dari masalah hiperparameter. Karpathy menyebutnya sebagai *"the most important debugging tool"*.

Jika loss curve Anda tidak cocok dengan kelima pola di atas, jangan menebak. Kembali ke simpul paling atas diagram: overfit satu batch. Hasil tes itu - apakah loss turun ke nol atau tidak - akan memisahkan bug kode dari masalah hiperparameter dan mengarahkan Anda ke cabang diagnosis yang tepat.

---

## 3. Worked Example: Evaluasi yang Jujur

Setelah training SimpleCNN dari [W2](02_W2_Images_CNN_Smoke_Test.md), tiga pemeriksaan sebelum menulis angka di laporan:

1. **Overfitting?** Bandingkan train accuracy dengan val accuracy. Selisih > 10% biasanya sinyal overfitting.
2. **Akurasi per kelas.** Pada CIFAR-10, kelas `cat` vs `dog` biasanya lebih sulit. Confusion matrix menunjukkan pola kesalahan.
3. **Sampel yang salah.** Visualisasikan 10 gambar paling *confident* salah. Sering kali ada pola yang bisa dijelaskan.

---

## 4. Pitfalls & Miskonsepsi

**"Loss turun berarti model membaik."** Turunnya training loss tanpa validation yang terpantau bisa berarti model menghafal, bukan belajar.

**"Mengganti loss pasti meningkatkan performa jika diimplementasi benar."** Tidak ada loss yang unggul secara universal. Focal loss membantu pada imbalance ekstrem tetapi bisa memperburuk performa pada kelas seimbang karena menurunkan sinyal dari mayoritas sampel.

**"Loss validasi sedikit di atas loss training itu normal."** Benar untuk gap kecil. Tapi jika val loss tidak pernah turun atau mulai naik sementara train loss terus turun, itu bukan "sedikit" - itu sinyal yang perlu ditangani.

---

## 5. Lab

### Lab 1 - Baseline CNN (selesai Minggu 3)

Buka `notebooks/lab1_baseline_cnn.ipynb`. Selesaikan empat tugas:

1. Lengkapi training loop dengan evaluasi pada validation set setiap epoch.
2. Simpan `train_loss`, `val_loss`, `train_acc`, `val_acc` per epoch, lalu plotkan.
3. Hitung dan plot confusion matrix pada test set.
4. Pilih 10 kesalahan paling *confident*, visualisasikan, tulis 3-4 kalimat amatan tentang pola kesalahan.

**Checklist verifikasi:**
- [ ] Train accuracy ≥ 75%, val accuracy ≥ 70% setelah 20 epoch.
- [ ] Selisih train - val accuracy dilaporkan; jika > 10% dijelaskan.
- [ ] Confusion matrix tersimpan sebagai gambar di `experiments/lab1/`.
- [ ] Notebook dapat dijalankan ulang dari atas ke bawah tanpa error.

### Lab 1b - Membandingkan Tiga Strategi Representasi (opsional, sangat dianjurkan)

Buka `notebooks/lab1b_representasi.ipynb`. Pada CIFAR-10 yang sama, bandingkan tiga strategi:

1. **Engineered**: HOG manual + MLP kecil (tanpa pretrained weights apapun).
2. **Extracted**: ResNet-18 pretrained pada ImageNet, di-freeze seluruhnya - hanya linear probe.
3. **Learned**: ResNet-18 pretrained, di-fine-tune penuh.

Pertanyaan yang dijawab setelah lab: Pada dataset terbatas (500 sampel per kelas), strategi mana yang paling menguntungkan? Pada dataset penuh, apakah jawabannya berubah?

---

## 6. Refleksi

1. Saat Anda mengganti `CrossEntropyLoss` menjadi `FocalLoss`, apa saja variabel yang *secara implisit* juga berubah walaupun Anda tidak menyentuhnya? (Petunjuk: pikirkan learning rate efektif, tekanan pada kelas minor, stabilitas awal training.) Bagaimana ini memengaruhi cara Anda merancang perbandingan?
2. Anda ditugaskan membangun klasifikasi kualitas biji kopi dari foto *close-up* dengan hanya 300 gambar per kelas untuk empat kelas. Bandingkan tiga strategi representasi secara singkat. Manakah yang paling masuk akal dicoba terlebih dahulu dan mengapa? Pada penambahan data sejumlah berapa Anda akan mempertimbangkan berpindah strategi?
3. **Koneksi ke Capstone.** Saat membuka Bab 10 nanti, Anda akan diminta memilih topik dan membangun baseline. Dari kerangka tensor input → output, empat keluarga arsitektur, dan tiga strategi representasi, tuliskan satu kalimat: *"Saat membaca repo Capstone nanti, pertanyaan pertama yang akan saya tanyakan ke diri sendiri adalah ..."*.

---

## 7. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Bagian "overfit a single batch" dan "visualize just before the net" adalah checklist diagnosis yang sangat praktis.
- **Lin et al. - *Focal Loss for Dense Object Detection*** (ICCV 2017). Baca bagian 3 untuk intuisi; lewati eksperimen detection.
- **The Deep Learning Book (Goodfellow et al.), Bab 8.** Optimizer secara lebih mendalam.

---

## Lanjut ke W4

Anda sudah memiliki kerangka lengkap untuk memahami dan membangun sistem ML/DL dari tensor input sampai diagnosis loss curve. W4 mengubah fokus dari *memahami sistem* menjadi *merancang eksperimen yang reproduksibel*: YAML config, seed locking, run folder structure, dan experiment matrix.

Buka [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) ketika siap.
