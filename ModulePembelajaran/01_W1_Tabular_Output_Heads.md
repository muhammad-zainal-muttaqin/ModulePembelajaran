<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| ▶ 01 | W1 - Tabular & Output Heads | 1 |
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

# 01 · W1 - Tabular Foundations dan Output Heads

> *Sebelum membahas arsitektur yang rumit, kita mulai dari pertanyaan yang paling sederhana: shape apa yang masuk, dan shape apa yang harus keluar?*

**Big Map row:** `(F,) -> (1,)`, `(1,)`, `(N,)`
**Rigor habit:** Observation before conclusion
**Dataset:** Tabular shared (synthetic) yang mendukung regression, binary classification, dan multiclass dari input yang sama
**Lab utama:** Lab 0 (`lab_w1_tabular_heads.ipynb`)

---

## 0. Peta Bab

W1 adalah pintu masuk bootcamp. Bab ini memperkenalkan tiga ide fondasi: **MLP sebagai shape transformer**, **output head + loss matching**, dan **observasi sebelum kesimpulan**. Anda mengerjakan tiga formulasi tugas (regression, binary, multiclass) di atas satu dataset tabular yang sama, sehingga perbedaan antar tugas terlihat **bukan dari datanya**, melainkan dari pilihan output head dan loss. Pada akhir minggu, Anda punya satu run end-to-end yang berhasil dan kebiasaan menuliskan apa yang Anda *amati* sebelum apa yang Anda *simpulkan*.

---

## 1. Mengapa Tabular Lebih Dulu?

Tabular adalah konteks paling jujur untuk memperkenalkan deep learning. Tidak ada augmentasi gambar, tidak ada tokenisasi teks, tidak ada timestep yang bergerak. Hanya satu vektor fitur masuk, satu prediksi keluar. Inilah kondisi paling bersih untuk melatih satu refleks yang akan dipakai sepanjang bootcamp:

> Saat Anda melihat tugas baru, identifikasi **shape input** dan **shape output**, lalu pilih **keluarga model** yang secara alami memetakan keduanya.

Empat alasan tabular sebagai entry point:

1. **Pipeline minimum.** Tidak perlu transform image; satu DataFrame sudah cukup.
2. **Tiga task formulation pada satu data.** Memungkinkan Anda merasakan perbedaan output head tanpa harus mengganti dataset.
3. **Loss-head mismatch terlihat eksplisit.** Salah satu cara paling cepat memahami kenapa CrossEntropy butuh logits dan MSE butuh output kontinu adalah dengan sengaja salah-pasangkan keduanya, lalu mengamati training gagal total.
4. **Tidak ada distraksi domain.** Anda fokus pada mekanik training, bukan pada pertanyaan "kenapa augmentasi flip horizontal masuk akal untuk CIFAR".

---

## 2. Konsep Inti

### 2.1 MLP sebagai Shape Transformer

Multilayer Perceptron (MLP) sederhana mengambil vektor `(F,)` dan menghasilkan vektor `(D_out,)`. Setiap layer `Linear(in, out)` adalah transformasi affine `y = W x + b` diikuti aktivasi non-linear seperti ReLU.

```text
input (F,) -> Linear(F, 64) -> ReLU -> Linear(64, 32) -> ReLU -> Linear(32, D_out) -> output (D_out,)
```

Perhatikan bahwa `D_out` ditentukan oleh **tugas**, bukan oleh data:

- regression scalar: `D_out = 1`
- binary classification: `D_out = 1` (logit) atau `D_out = 2` (logits dua kelas)
- multiclass dengan N kelas: `D_out = N`

Inilah yang dimaksud "MLP sebagai shape transformer": tubuh model sama, kepala (head) berubah sesuai tugas.

### 2.2 Output Head + Loss Matching

Tabel berikut adalah salah satu yang paling sering Anda butuhkan sepanjang bootcamp. Cetak, tempel di samping monitor.

| Tugas | Output head | Aktivasi akhir | Loss yang cocok | Bentuk target |
|---|---|---|---|---|
| Regression scalar | `Linear(D, 1)` | tidak ada (linear) | MSE atau MAE | `float` |
| Binary classification | `Linear(D, 1)` | tidak ada (logit raw) | `BCEWithLogitsLoss` | `float` 0/1 |
| Binary classification (alt) | `Linear(D, 2)` | tidak ada (logits) | `CrossEntropyLoss` | `int64` 0/1 |
| Multiclass (N kelas) | `Linear(D, N)` | tidak ada (logits raw) | `CrossEntropyLoss` | `int64` 0..N-1 |
| Multilabel | `Linear(D, N)` | tidak ada (logits raw) | `BCEWithLogitsLoss` | `float` vektor 0/1 |

> [!IMPORTANT]
> Di PyTorch, `CrossEntropyLoss` **menggabungkan** softmax + negative log-likelihood. Anda harus melempar **logits mentah**, bukan output yang sudah lewat softmax. Kesalahan paling umum pemula: menambahkan `softmax` lalu memberi hasilnya ke `CrossEntropyLoss`. Hasilnya: gradient kecil yang tidak masuk akal.

Alasan setiap pasangan masuk akal:

- **MSE untuk regression** mengukur jarak Euclidean antara prediksi dan target. Penurunan MSE = prediksi makin dekat ke target.
- **BCEWithLogits** menerapkan sigmoid + log-likelihood Bernoulli; turunannya rapi terhadap logit.
- **CrossEntropy untuk multiclass** generalisasi ke N kelas; secara matematis identik dengan negative log-likelihood pada distribusi categorical.

### 2.3 Backpropagation, Disebutkan Bukan Diturunkan

MLP belajar lewat **backpropagation**: setelah loss dihitung, gradient dari loss terhadap setiap parameter dirambatkan mundur via chain rule, lalu optimizer (mis. AdamW) memperbarui parameter ke arah penurunan loss.

Di W1, ini sudah cukup sebagai gambaran. Anda **tidak perlu** menurunkan chain rule manual minggu ini. Derivasi 7-langkah yang ketat tersedia di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual) untuk dibaca setelah Anda sudah punya intuisi training dari beberapa run sukses. Lab 1c (MLP numpy from-scratch) juga tersedia sebagai breadth lab opsional kapan saja.

> [!NOTE]
> Modul lama menempatkan derivasi backprop di awal, sebelum lab pertama. Revisi ini menggesernya ke appendix karena banyak trainee mengalami density terlalu cepat. Jika Anda sudah merasa nyaman dengan kalkulus chain rule, baca Lampiran A.1 paralel dengan W1; jika belum, biarkan dulu, dan kembali setelah W3 ketika Anda sudah punya beberapa loss curve untuk diinterpretasi.

### 2.4 Pipeline Praktis: Tensor, Batch, Dataloader, Split

Sebelum menjalankan training, Anda harus memahami ritme data:

1. **Tensor.** Vektor input `x` berbentuk `(F,)` per-sampel; batch berbentuk `(B, F)`.
2. **Batch.** Training tidak memproses satu sampel per langkah, melainkan satu batch (mis. 64-128 sampel). Loss dihitung sebagai rata-rata atas batch.
3. **Dataloader.** Membungkus dataset, melakukan shuffling, dan menyediakan iterator yang menghasilkan batch.
4. **Split train/val/test.** `train` melatih parameter; `val` digunakan untuk *early stopping* dan tuning hyperparameter; `test` hanya disentuh sekali di akhir untuk angka final.

Aturan paling penting: **statistik preprocessing (mean, std) dihitung dari train saja**, lalu diterapkan ke val dan test. Tidak boleh sebaliknya. Pelanggaran aturan ini disebut *preprocessing leakage* dan akan dibahas mendalam di W6.

---

## 3. Worked Example: Tiga Tugas pada Satu Dataset

Lab 0 menyiapkan dataset tabular sintetis sederhana dengan 10 fitur. Dari fitur yang sama, kita konstruksi tiga target:

- `y_regression` = kombinasi linear dari fitur + noise (kontinu)
- `y_binary` = sign dari kombinasi linear (0/1)
- `y_multiclass` = bucketize ke 3 kuantil (kelas 0/1/2)

Dengan demikian, **input** identik, tetapi **output head** dan **loss** berubah. Anda menjalankan tiga konfigurasi:

```yaml
# configs/mlp_tabular.yaml - ubah field di bawah untuk swap task
data.task: regression   # atau binary, multiclass
loss.name: mse          # atau binary_cross_entropy, cross_entropy
model.num_classes: 1    # atau 2, 3
```

Catat untuk setiap run:

- train loss akhir
- val loss akhir
- satu metrik yang sesuai: MAE (regression), accuracy (binary), accuracy + macro-F1 (multiclass)
- pengamatan: apa yang Anda *lihat* di kurva, sebelum apa yang Anda *simpulkan*

---

## 4. Pitfalls dan Miskonsepsi

**Mismatch loss-head menghasilkan training senyap.** Jika Anda memberi target `int` ke MSE, atau target `float` ke CrossEntropy, error message PyTorch sering kabur. Ciri training rusak: loss konstan dari epoch pertama, atau berubah dengan cara yang tidak masuk akal. Sebelum debug arsitektur, periksa pasangan loss-head-target.

**Mengira "lebih dalam = lebih bagus".** MLP dengan 5 layer tersembunyi sering lebih buruk daripada 2 layer pada tabular kecil. Tabular bukan domain di mana kedalaman selalu menang. Mulai dari yang dangkal.

**Menyamakan accuracy dengan kualitas.** Pada multiclass dengan kelas tidak seimbang, accuracy bisa menyesatkan. W3 akan membahas confusion matrix dan macro-F1 secara serius. Untuk W1, sudah cukup mencatat accuracy + ukuran tiap kelas.

**Menulis "kesimpulan" sebelum "observasi".** Kebiasaan paling penting di W1: pisahkan apa yang Anda *amati* (angka, bentuk kurva) dari apa yang Anda *simpulkan* (interpretasi, hipotesis). Pemisahan ini akan menyelamatkan Anda dari overclaiming sepanjang semester.

---

## 5. Lab 0 - Tabular Output Heads

**File:** `template_repo/notebooks/lab_w1_tabular_heads.ipynb`
**Estimasi waktu:** 3-4 jam.

**Langkah:**

1. **Smoke test.** Jalankan dengan `--dry-run` untuk memastikan pipeline hidup tanpa error.
2. **Run regression.** Set `task=regression`, `loss=mse`, `num_classes=1`. Latih 20 epoch. Catat MAE val.
3. **Run binary.** Set `task=binary`, `loss=cross_entropy`, `num_classes=2`. Catat accuracy val.
4. **Run multiclass.** Set `task=multiclass`, `loss=cross_entropy`, `num_classes=3`. Catat accuracy + macro-F1 val.
5. **Mismatch eksperimen sengaja.** Jalankan satu run dengan kombinasi salah (mis. binary task tapi loss=mse). Amati kegagalan. Tuliskan dalam 2 kalimat apa yang gagal.
6. **Writeup observasi vs interpretasi.** Tulis 1 paragraf observasi murni (apa yang dilihat di angka), 1 paragraf interpretasi (apa yang menurut Anda terjadi).

**Deliverables:**

- 3 run config (regression, binary, multiclass) di `experiments/`
- 1 notebook lab0 dengan output sel terisi
- 1 writeup `observasi_vs_interpretasi.md` (template di [Lampiran C.6](14_Lampiran.md#c6-template-entri-portofolio))
- Smoke test repository sudah berhasil

---

## 6. Refleksi

Tulis jawaban singkat (1-2 paragraf masing-masing) untuk tiga pertanyaan berikut. Simpan di `notebooks/portofolio_mandiri.ipynb` sebagai entri pra-W4 (tidak masuk hitungan portofolio resmi tapi melatih kebiasaan).

1. **Output head yang sama, loss berbeda.** Ada situasi di mana binary classification dijalankan dengan `Linear(D, 1) + BCEWithLogitsLoss` dan situasi lain dengan `Linear(D, 2) + CrossEntropyLoss`. Apa konsekuensi praktisnya? Mana yang Anda pilih untuk Lab 0, dan mengapa?
2. **Observasi vs interpretasi.** Sebutkan satu pengamatan dari Lab 0 yang tergoda Anda interpretasikan terlalu cepat. Apa pertanyaan tambahan yang seharusnya Anda ajukan sebelum menyimpulkan?
3. **Big Map awal.** Tulis dua baris Big Map dalam catatan Anda: satu untuk regression Lab 0 dan satu untuk multiclass Lab 0. Apa shape input, shape output, dan keluarga model? Anda akan menambah baris baru di setiap minggu berikutnya.

---

## 7. Bacaan Lanjutan

- **PyTorch Documentation - *torch.nn.CrossEntropyLoss*** (halaman resmi). Baca subbagian "shape" dan "input is expected to contain raw, unnormalized scores". Internalisasi bahwa input harus logits.
- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (blog, 2019). Bacaan singkat yang sudah disebut di Bab 00. Setelah Lab 0, kembali ke esai ini; banyak kalimatnya akan terasa berbeda setelah Anda punya satu run sukses.
- **Goodfellow, Bengio, Courville - *Deep Learning*** (Bab 6 §6.2: *Output Units*). Bagian pendek yang merangkum kenapa pasangan output head + loss yang dipelajari di W1 adalah pasangan kanonik.

---

## Lanjut ke W2

Setelah Lab 0 selesai, buka [W2 - Images, CNN & Smoke Test Ritual](02_W2_Images_CNN_Smoke_Test.md). Bab tersebut memperkenalkan tensor citra `(C, H, W)`, intuisi CNN sebagai pendeteksi pola lokal, dan tiga-level smoke test ritual sebagai kebiasaan debugging utama.
