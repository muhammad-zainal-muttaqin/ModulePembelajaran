<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| ▶ 05 | W5 - Sequences: RNN & LSTM | 5 |
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

# 05 · W5 - Sequences: RNN & LSTM

> *Model yang tidak ingat masa lalu hanya bisa belajar pola saat ini. Arsitektur recurrent hadir justru karena urutan itu penting - apa yang terjadi sebelumnya mengubah makna apa yang terjadi sekarang.*

**Big Map row:** `(T, F) -> (1,)`, `(N,)`, `(T'', 1)`
**Rigor habit:** Long-sequence diagnosis dan justifikasi arsitektur
**Dataset:** Sequence dataset dengan dependensi panjang yang terlihat
**Lab utama:** Lab 3b (`lab_w5_lstm_sequence.ipynb`) - **wajib di W5**

---

## 0. Peta Bab

W5 memperluas Big Map ke domain sequence. Setelah W5, Anda dapat:

- memahami tiga keluarga output head untuk sequence tasks
- membangun dan melatih RNN vanilla serta LSTM/GRU
- melihat vanishing gradient secara konkret dalam satu perbandingan
- memilih arsitektur sequence berdasarkan panjang dependensi
- menulis architecture justification statement yang konkret

---

## 1. Motivasi: Data yang Urutan Pentingnya

Bayangkan data glukosa sensor dari pasien diabetes. Nilai glukosa jam 14:00 tidak berdiri sendiri - ia dipengaruhi oleh apa yang dimakan jam 12:00, aktivitas fisik jam 13:00, dan pola tidur kemarin malam. Model yang memperlakukan setiap timestep independen kehilangan informasi ini.

Tiga pertanyaan diagnostik untuk setiap dataset sequence:

1. **Dependensi seberapa jauh?** Prediksi berikutnya butuh konteks 5 langkah atau 500 langkah?
2. **Output apa yang diinginkan?** Satu angka di akhir, satu kelas, atau seluruh sequence masa depan?
3. **Apakah urutan benar-benar bermakna?** Atau data hanya "berurutan" tapi sebenarnya bisa diacak?

Jawaban ketiga pertanyaan ini menentukan keluarga arsitektur.

---

## 2. Konsep Inti

### 2.1 Big Map untuk Sequence

Tiga formulasi output yang paling umum pada sequence task:

| Tugas | Input shape | Output shape | Contoh |
|---|---|---|---|
| Sequence classification | `(T, F)` | `(N,)` | Klasifikasi aktivitas dari sensor IMU |
| Regression/forecast scalar | `(T, F)` | `(1,)` | Prediksi nilai berikutnya dari time series |
| Sequence-to-sequence forecast | `(T, F)` | `(T'', 1)` | Prediksi 12 jam ke depan dari sinyal CGM |
| Token classification | `(T,)` | `(T, N)` | NER, POS tagging per token |

Di W5 kita fokus pada tiga pertama. Token classification dibahas di W7.

### 2.2 RNN Vanilla: Arsitektur Recurrent Dasar

RNN vanilla memproses sequence satu langkah waktu demi satu. Di setiap timestep `t`, ia menggabungkan input baru `x_t` dengan hidden state sebelumnya `h_{t-1}`:

```
h_t = tanh(W_x x_t + W_h h_{t-1} + b)
```

Hidden state `h_t` berperan sebagai "memori" yang diperbarui setiap langkah. Untuk sequence classification, output diambil dari `h_T` (langkah terakhir). Untuk forecasting, output `y_t = W_o h_t` di setiap langkah.

**Masalah vanishing gradient.** Saat backpropagation melewati urutan panjang, gradient dikalikan dengan `W_h` di setiap langkah waktu. Jika nilai eigen `W_h` kecil (< 1), gradient menyusut secara eksponensial. Setelah 50-100 langkah, gradient di langkah awal mendekati nol - model berhenti belajar dari konteks jauh.

Ini bukan masalah teoritis abstrak. Lab 3b menunjukkan ini secara visual: plot gradient norm di setiap timestep untuk RNN vanilla pada sequence panjang. Penurunan eksponensial terlihat jelas.

### 2.3 LSTM: Gate sebagai Solusi

Long Short-Term Memory (LSTM) memperkenalkan *cell state* `c_t` yang terpisah dari hidden state, dan tiga *gate* yang mengontrol aliran informasi:

```
forget gate:  f_t = σ(W_f [h_{t-1}, x_t] + b_f)
input gate:   i_t = σ(W_i [h_{t-1}, x_t] + b_i)
cell update:  g_t = tanh(W_g [h_{t-1}, x_t] + b_g)
cell state:   c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t
output gate:  o_t = σ(W_o [h_{t-1}, x_t] + b_o)
hidden state: h_t = o_t ⊙ tanh(c_t)
```

Kunci: `c_t` dapat mengalir tanpa perkalian bobot berulang jika forget gate `f_t ≈ 1`. Gradient dapat merambat jauh tanpa menyusut. Inilah solusi vanishing gradient.

**GRU (Gated Recurrent Unit)** adalah versi lebih ringkas dari LSTM dengan dua gate (reset dan update). Performa serupa, lebih sedikit parameter. Pilihan di antara keduanya sering bergantung pada ukuran dataset dan preferensi praktis.

### 2.4 Sequence Model dalam Bentuk Alaminya

Empat output head family untuk sequence:

| Output yang diinginkan | Head architecture | Loss |
|---|---|---|
| Regression scalar akhir | `Linear(hidden, 1)` pada `h_T` | MSE/MAE |
| Klasifikasi akhir | `Linear(hidden, N)` pada `h_T` | CrossEntropy |
| Forecast `(T'', 1)` | `Linear(hidden, 1)` pada `h_t` untuk setiap t | MSE/MAE |
| Per-token klasifikasi | `Linear(hidden, N)` pada `h_t` untuk setiap t | CrossEntropy (setiap t) |

Di PyTorch:

```python
class SequenceClassifier(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.head = nn.Linear(hidden_size, num_classes)

    def forward(self, x):  # x: (B, T, F)
        out, (h_n, _) = self.lstm(x)
        return self.head(h_n[-1])  # ambil hidden state layer terakhir, timestep terakhir
```

### 2.5 Justifikasi Arsitektur: Template Statement

Setiap pemilihan arsitektur harus bisa dijelaskan. Template minimal:

> "Saya memilih [LSTM/GRU/RNN/Transformer] karena task ini [butuh memori jangka panjang / sequence singkat / butuh paralelisasi / konteks bilateral]. Dataset punya panjang sequence [T], dan [LSTM] secara empirik lebih baik pada [tugas dengan dependensi > 20 langkah] dibandingkan [RNN vanilla yang cenderung gagal akibat vanishing gradient]."

Template ini akan dipakai kembali di W7 (Transformer) dan W9 (multimodal). Mulai latih menulis satu kalimat justifikasi untuk setiap pilihan arsitektur yang Anda buat.

### 2.6 Long-Sequence Diagnosis

Ketika model sequence tidak belajar dengan baik, lima hipotesis pertama:

1. **Vanishing gradient** - cek gradient norm per layer/timestep; jika turun eksponensial, switch ke LSTM/GRU.
2. **Sequence terlalu panjang** - coba truncate ke panjang yang lebih pendek; jika performa membaik, dependensi lokal sudah cukup.
3. **Shuffle data yang salah** - pada time series, jangan shuffle antar sequence; hanya shuffle *urutan sequence* di DataLoader, bukan urutan timestep di dalam sequence.
4. **Leakage temporal** - fitur yang dibuat dari masa depan bocor ke training. Ini dibahas mendalam di W6.
5. **Gradient clipping terlalu ketat** - RNN/LSTM sering butuh gradient clipping; terlalu ketat menghambat pembelajaran.

---

## 3. Worked Example: RNN vs LSTM pada Sine + Noise

Lab 3b menggunakan `sine_sequence` dataset: setiap sampel adalah sequence sinusoidal dengan noise, target adalah nilai berikutnya. Ini memungkinkan kita membuat sequence sepanjang apapun dan mengontrol noise level.

**Setup:**

```python
# configs/lstm_timeseries.yaml
data:
  name: sine_sequence
  seq_len: 50    # panjang 50 timestep
  noise_std: 0.1
  n_train: 4000

model:
  name: simple_lstm
  input_size: 1
  hidden_size: 32
  num_layers: 2
  dropout: 0.1
  readout: last    # ambil hidden state di timestep terakhir
```

**Perbandingan:**

1. Latih `SimpleLSTM` dengan `seq_len=50`. Catat final val MAE.
2. Latih `SimpleRNN` (ganti ke `nn.RNN`) dengan konfigurasi sama. Catat final val MAE.
3. Naikkan `seq_len=200`. Ulangi keduanya. Amati perbedaan semakin besar.
4. Plot gradient norm per timestep untuk keduanya. Tunjukkan kurva "vanishing" pada RNN.

**Yang harus terlihat:** Pada `seq_len=50`, selisih RNN vs LSTM mungkin kecil. Pada `seq_len=200`, LSTM jauh lebih baik karena gradient RNN sudah vanish sebelum mencapai awal sequence.

---

## 4. Pitfalls & Miskonsepsi

**"Sequence data selalu butuh RNN/LSTM."** Tidak. Jika dependensi hanya lokal (5-10 langkah), CNN 1D atau MLP biasa dengan windowed features kadang lebih efisien. RNN/LSTM paling bernilai ketika dependensi panjang (50+ langkah) dan urutan benar-benar penting.

**"LSTM selalu lebih baik dari GRU."** Tidak ada aturan universal. GRU lebih cepat dilatih dan sering performa sebanding. Coba keduanya sebelum memilih.

**"Hidden state terakhir mewakili seluruh sequence."** Untuk sequence sangat panjang, bahkan LSTM bisa lupa informasi awal. Solusi: bidirectional LSTM, atau attention di atas hidden states semua timestep.

**"Saya bisa shuffle data time series bebas."** Berbahaya. Untuk forecasting, shuffling antar sequence OK. Shuffling dalam sequence atau split data secara random (bukan temporal) menyebabkan leakage yang akan dibahas di W6.

**Gradient clipping.** RNN/LSTM tanpa gradient clipping sering mengalami exploding gradient. Tambahkan `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)` sebelum `optimizer.step()` sebagai default.

---

## 5. Lab

### Lab 3b - RNN vs LSTM Gradient Flow (wajib W5)

Buka `notebooks/lab_w5_lstm_sequence.ipynb`.

**Tugas utama:**

1. Jalankan smoke test: import, dummy forward, overfit-one-batch untuk kedua arsitektur.
2. Latih RNN vanilla vs LSTM pada `seq_len=50`, plot val MAE comparison.
3. Ulangi pada `seq_len=200`, amati divergensi performa.
4. Plot gradient norm per timestep untuk keduanya; simpan gambar ke `experiments/lab3b/`.
5. Tulis architecture justification statement menggunakan template §2.5.
6. Coba GRU sebagai alternatif ketiga; bandingkan training time vs LSTM.

**Checklist:**

- [ ] Smoke test untuk RNN dan LSTM lulus.
- [ ] Plot gradient flow menunjukkan vanishing pada RNN.
- [ ] Tabel perbandingan MAE (RNN vs LSTM vs GRU) untuk seq_len=50 dan seq_len=200.
- [ ] Architecture justification statement tertulis di notebook.
- [ ] Gradient clipping aktif di semua model.

### Lab 3b Breadth Check

Lab 3b ini juga memenuhi **Breadth Check** untuk keluarga RNN/LSTM (salah satu dari 5 keluarga arsitektur yang harus Anda tunjukkan forward pass-nya sebelum Capstone).

---

## Komponen Mandiri (W5)

Eksplorasi lebih dalam dari tugas utama. Format: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).

| Jalur | Tugas minggu ini |
|---|---|
| **Implementasi** | Implementasikan bidirectional LSTM di atas Lab 3b. Apakah performa lebih baik pada `seq_len=200`? Mengapa atau mengapa tidak? |
| **Analisis** | Coba ablasi: hidden size 16 vs 32 vs 64 vs 128 pada sine sequence. Plot val MAE vs jumlah parameter. Ada sweet spot? |
| **Desain** | Rancang (tanpa jalankan) eksperimen untuk membandingkan LSTM vs Transformer (W7) pada sequence panjang. Hipotesis apa yang perlu Anda test? |
| **Arsitektur Baru** | Implementasikan temporal CNN (1D Conv + MaxPool) sebagai baseline non-recurrent untuk sine forecasting. Bagaimana performa dibanding LSTM pada dependensi panjang? |

---

## 6. Refleksi

1. **Skenario domain baru.** Anda mendapat dataset EKG: 5000 titik per sampel pada sampling rate 500 Hz, target klasifikasi 4 kelas aritmia. Apakah LSTM adalah arsitektur pertama yang Anda coba? Apa dua alternatif yang akan Anda pertimbangkan, dan apa trade-off masing-masing?
2. **Gradient flow.** Setelah melihat plot gradient flow di Lab 3b: pada panjang berapa RNN vanilla mulai kehilangan sinyal? Bagaimana angka ini mengubah keputusan Anda tentang kapan harus pakai LSTM vs pendekatan lain?
3. **Representasi sequence.** Di W1 Anda belajar tentang engineered vs extracted vs learned features. Bagaimana ketiga strategi ini muncul dalam konteks sequence? Berikan satu contoh konkret untuk masing-masing dalam domain time series sensor.

---

## 7. Bacaan Lanjutan

- **Christopher Olah - *Understanding LSTM Networks*** (blog, 2015). Penjelasan visual paling jelas tentang mekanisme gate LSTM dan kenapa vanishing gradient diatasi.
- **Hochreiter & Schmidhuber - *Long Short-Term Memory*** (Neural Computation, 1997). Paper asli LSTM, termasuk eksperimen yang menunjukkan kegagalan RNN vanilla pada long-range dependency.
- **Cho et al. - *Learning Phrase Representations using RNN Encoder-Decoder*** (2014). Paper yang memperkenalkan GRU; baca bagian 2 untuk perbandingan dengan LSTM.

---

## Lanjut ke W6

Peta Big Map terus tumbuh. W6 menggabungkan dua tema penting: representasi fitur (engineered vs extracted vs learned) dalam konteks sequence, dan temporal leakage - salah satu bug terbahaya yang menyebabkan angka bagus tapi hasil invalid.

Buka [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) ketika siap.
