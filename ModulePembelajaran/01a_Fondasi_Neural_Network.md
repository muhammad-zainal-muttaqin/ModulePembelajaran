<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| ▶ 01a | Fondasi Neural Network | 2 |
| 01b | [Loss, Optimizer & Evaluasi](01b_Loss_Optimizer_Evaluasi.md) | 3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| 04 | [Validasi Data](04_Validasi_Data.md) | 7 |
| 05 | [AI Tools Sebagai Pendukung](05_AI_Tools_Sebagai_Pendukung.md) | 8 |
| 06 | [Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 01a · Fondasi Neural Network

> *Arsitektur bukan daftar definisi untuk dihafalkan. Ia adalah keputusan desain yang berangkat dari pertanyaan: bentuk apa yang melekat pada data Anda, dan struktur apa yang paling alami mengikutinya?*

---

## 0. Peta Bab

Bab ini (Minggu 2) membekali Anda dengan fondasi konseptual neural network:

- **2.1** Tensor masuk dan tensor keluar - kerangka berpikir lintas domain
- **2.2** MLP dan backpropagation - mesin fondasional di bawah semua arsitektur
- **2.3** Empat keluarga arsitektur sebagai asumsi tentang data
- **2.4** Layer sebagai transformasi: inisialisasi, normalisasi, aktivasi

Setelah Minggu 2, lanjut ke [01b](01b_Loss_Optimizer_Evaluasi.md) untuk loss, optimizer, evaluasi, representasi fitur, dan diagnosis loss curve.

**Lab minggu ini:** Lab 1c (MLP numpy, wajib) dan Lab 1 (baseline CNN, mulai - selesai di 01b).

---

## 1. Motivasi: Tiga Dataset di Meja Anda

Seorang rekan mengirim tiga dataset sekaligus: *"coba klasifikasi dulu, pakai arsitektur yang menurut Anda paling masuk akal"*.

- **A**: tabel medis - 20 kolom hasil lab darah pasien, target diabetes ya/tidak.
- **B**: 10.000 gambar daun sawit berlabel *sehat* atau *terkena penyakit*, resolusi 224×224.
- **C**: 30.000 review produk berbahasa Indonesia, target sentimen positif/negatif.

Tanpa membuka paper apapun, Anda sudah bisa menebak keluarga arsitektur yang cocok. Dataset A punya struktur *flat* - feed-forward network sudah masuk akal. Dataset B berupa grid piksel 2D dengan *translation invariance* - CNN alami di sini. Dataset C berupa urutan kata dengan ketergantungan jangka panjang - Transformer atau RNN yang cocok.

Poinnya: setiap keluarga arsitektur dibangun dengan *asumsi tertentu* tentang bentuk data. Memilih arsitektur berarti memilih asumsi mana yang paling tepat.

---

## 2. Konsep Inti

### 2.1 Peta Besar: Tensor Masuk, Tensor Keluar

Satu kerangka berpikir yang menyederhanakan hampir setiap keputusan desain dalam deep learning: setiap masalah dapat dipahami dengan menjawab dua pertanyaan - *bentuk tensor apa yang masuk*, dan *bentuk apa yang keluar*. Segala sesuatu di antaranya - MLP, CNN, RNN, Transformer - hanyalah mesin transformasi yang memetakan satu bentuk ke bentuk lain.

Saat membaca kode repositori yang belum dikenal, hal pertama yang perlu Anda perhatikan adalah bentuk batch di `DataLoader` dan bentuk tensor tepat sebelum fungsi loss. Dari dua angka itu saja, Anda sudah bisa menebak keluarga arsitektur yang masuk akal. Sebaliknya, ketika merancang eksperimen untuk domain baru, menuliskan pasangan tensor input → output di kertas - sebelum satu baris kode pun ditulis - sering kali mempersempit pilihan dari "semua model di dunia" menjadi "satu atau dua keluarga yang masuk akal".


| Domain | Contoh Data | Tensor Input | Tensor Output | Contoh Tugas |
| --- | --- | --- | --- | --- |
| Tabular | Umur, tekanan darah, kolesterol | `(F,)` - vektor fitur | `(N,)` | Klasifikasi risiko penyakit |
| Gambar | Foto RGB 224×224 | `(C, H, W)` | `(N,)` | Klasifikasi kucing vs anjing |
| Gambar | Foto kebun / jalan | `(C, H, W)` | `(G, G, 5+N)` | Deteksi objek |
| Teks | Ulasan produk | `(T,)` - urutan token | `(N,)` | Klasifikasi sentimen |
| Teks | Kalimat berita | `(T,)` - urutan token | `(T, N)` | Token classification |
| Deret waktu | Sinyal sensor per detik | `(T, F)` - waktu × fitur | `(1,)` | Prediksi nilai berikutnya |
| Deret waktu | Data glukosa dari waktu ke waktu | `(T, F)` | `(T', 1)` | Prediksi urutan masa depan |
| Multimodal | Foto produk + deskripsi teks | `(C,H,W)` dan `(T,)` | `(N,)` | Klasifikasi produk |


Perhatikan bahwa output tidak selalu `(N,)`: deteksi objek menghasilkan tensor tiga dimensi karena setiap sel grid memprediksi beberapa kotak dan kelas. Transisi dari "tugas apa yang ingin saya selesaikan" ke "bentuk output yang benar" adalah keputusan yang perlu diselesaikan sebelum memilih arsitektur.

### 2.2 MLP dan Backpropagation: Fondasi yang Menopang Semua

Sebelum masuk ke empat keluarga arsitektur, satu model pantas mendapat pembahasan tersendiri: *Multi-Layer Perceptron* (MLP). Bukan karena MLP sering dipakai di paper riset modern - justru sebaliknya. MLP pantas dibahas karena **semua keluarga arsitektur lain, pada level komputasi, adalah MLP dengan batasan tambahan**: CNN adalah MLP yang dipaksa berbagi bobot antar lokasi spasial, Transformer adalah MLP yang memproses setiap posisi dengan bobot yang sama, RNN adalah MLP yang dipanggil berulang sepanjang urutan waktu.

**Forward pass dua-layer.** Ambil MLP minimal: satu *hidden layer*, satu *output layer*. Input `x` berdimensi `d_in`, hidden `d_h` neuron, output `d_out`:

```
z1 = W1 x + b1         # pre-activation, (d_h,)
h  = σ(z1)             # activation, (d_h,)
z2 = W2 h + b2         # output pre-activation, (d_out,)
y_hat = z2             # regresi; klasifikasi tambahkan softmax di loss
```

`W1` bentuknya `(d_h, d_in)`, `W2` bentuknya `(d_out, d_h)`. Jika kita hilangkan `σ`, seluruh jaringan runtuh menjadi satu transformasi linear - tidak lebih kuat dari regresi biasa.

**Backpropagation: satu kali latihan yang perlu dilakukan.** Anda tidak akan pernah menulis *backward loop* manual di pekerjaan riset - PyTorch mengerjakannya lewat `loss.backward()`. Tapi ketika model tidak belajar, ketika gradient meledak, ketika paper menyebut *"we clip gradients at norm 1.0"*, Anda perlu model mental yang benar tentang apa yang mengalir di pipa gradient.

**Contoh terturunkan: MSE loss, satu sampel.** Misalkan `d_in = 2`, `d_h = 2`, `d_out = 1`. Target `y`, prediksi `y_hat = z2`. Loss `L = ½ (y_hat - y)²`. Chain rule dari belakang ke depan:

1. `∂L/∂z2 = y_hat - y`
2. `∂L/∂W2 = (∂L/∂z2) · h^T`  - bentuk `(d_out, d_h)`
3. `∂L/∂b2 = ∂L/∂z2`
4. `∂L/∂h = W2^T (∂L/∂z2)`
5. `∂L/∂z1 = (∂L/∂h) ⊙ σ'(z1)` - untuk ReLU: `σ'(z) = 1[z > 0]`
6. `∂L/∂W1 = (∂L/∂z1) · x^T`
7. `∂L/∂b1 = ∂L/∂z1`

![MLP 2-layer: forward pass dengan dimensi dan backward pass chain rule 7 langkah](./figures/fig01b_mlp_forward_backward.svg)

Pola yang sama berulang di layer manapun: gradient terhadap pre-activation berasal dari layer di atasnya, dikalikan turunan non-linearitas. Tiga fenomena yang sering disebut di paper langsung bisa dijelaskan dari sini:

- **Vanishing gradient.** `σ'(z1)` yang kecil (sigmoid di zona saturasi) mengalikan gradient dengan angka mendekati nol di setiap layer. Setelah 10 layer, gradient di bobot paling bawah mendekati nol. Inilah alasan ReLU, yang turunannya 0 atau 1, menjadi pilihan default.
- **Exploding gradient.** Bobot `W2` yang besar membuat faktor `W2^T` mengalikan gradient dengan angka besar. Di RNN dalam, faktor ini muncul sekali per langkah waktu - gradient bisa meledak eksponensial. Solusi praktis: *gradient clipping*.
- **Inisialisasi Kaiming/Xavier** (dibahas di 2.4): tujuannya menjaga variansi gradient kira-kira konstan saat merambat mundur, sehingga gradient tidak menyusut atau meledak sejak iterasi pertama.

Lab 1c (`notebooks/lab1c_mlp_numpy.ipynb`) menuntun Anda menulis ketujuh langkah di atas dalam numpy murni untuk klasifikasi MNIST. Setelah itu, saat membaca `loss.backward()` di Lab 1, Anda tahu persis mesin apa yang sedang berjalan.

### 2.3 Arsitektur sebagai Asumsi tentang Data

Empat keluarga yang paling sering muncul di paper dan repositori riset.

**Feed-Forward Neural Network (FFN/MLP).** Lapisan linear berturut-turut dengan non-linearitas di antaranya. Asumsi: tidak ada struktur khusus pada fitur input - urutan kolom tidak bermakna, tidak ada kedekatan spasial atau temporal. Cocok untuk data tabular dan embedding yang sudah diproses. Kelemahan: tidak efisien ketika data punya struktur yang bisa dimanfaatkan.

**Convolutional Neural Network (CNN).** Satu *filter* kecil digeser ke seluruh input, berbagi bobot di semua lokasi. Asumsi: pola relevan dapat muncul di lokasi manapun (*translation invariance*) dan bersifat lokal. Komponen khas: `Conv2d → BatchNorm → ReLU → MaxPool`. Kekuatan: sangat efisien parameter untuk gambar dan data grid. Kelemahan: asumsi lokalitas gagal ketika pola penting menyebar luas.

**Recurrent Neural Network (RNN), LSTM, GRU.** Memproses urutan satu langkah waktu demi satu, menyimpan *hidden state* yang merangkum masa lalu. Asumsi: urutan penting, informasi langkah sebelumnya membantu prediksi berikutnya. LSTM dan GRU memperkenalkan *gate* untuk mengatasi *vanishing gradient* pada RNN polos. Kelemahan: komputasi sekuensial (tidak bisa diparalelkan sepanjang urutan), ketergantungan sangat panjang tetap sulit ditangkap.

**Transformer.** Menggantikan rekursi dengan *self-attention*: setiap elemen urutan secara langsung melihat semua elemen lain. Komponen utama: `Multi-Head Attention`, `Positional Encoding`, `Feed-Forward` per posisi. Dominan di NLP modern (BERT, GPT), kini juga di visi (ViT) dan audio. Biaya utama: self-attention kuadratik terhadap panjang urutan.

![Lima keluarga arsitektur neural network: MLP, CNN, RNN/LSTM, Transformer, dan Autoencoder - masing-masing dengan inductive bias dan domain khasnya](./figures/fig01a_nn_families.svg)

Setiap keluarga di atas dapat Anda baca sebagai "MLP + asumsi spesifik domain". Ketika asumsi cocok dengan data, model belajar lebih efisien.

### 2.4 Layer sebagai Transformasi Representasi

Setiap layer adalah *fungsi* yang mengubah representasi data menjadi bentuk yang lebih berguna bagi lapisan berikutnya. Di CNN, layer awal belajar detail kecil (tepi, tekstur), layer dalam menggabungkannya menjadi konsep lebih tinggi. Implikasi praktis: saat *fine-tune* model pretrained, layer awal biasanya aman di-*freeze*, layer akhir perlu beradaptasi dengan domain baru.

**Inisialisasi bobot: titik awal yang sering diabaikan.** Memilih nol atau nilai terlalu besar menghancurkan sinyal gradient sejak iterasi pertama.

- **Kaiming (He) initialization** - untuk layer dengan aktivasi ReLU: σ² = 2/fan\_in. PyTorch menerapkannya otomatis untuk `nn.Conv2d` dan `nn.Linear`.
- **Xavier (Glorot) initialization** - untuk aktivasi simetris (Tanh, Sigmoid): σ² = 2/(fan\_in + fan\_out). Sering dipakai di Transformer.

Anda jarang perlu menginisialisasi sendiri. Tapi ketika mendefinisikan layer kustom atau mendebug model yang tidak mau belajar dari epoch pertama, ini relevan:

```python
def init_weights(m):
    if isinstance(m, (nn.Conv2d, nn.Linear)):
        nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.zeros_(m.bias)

model.apply(init_weights)
```

**Normalisasi: BatchNorm, LayerNorm, GroupNorm.** Ketiganya berbeda pada sumbu yang dinormalisasi:

| Normalisasi | Normalisasi melewati... | Butuh batch size besar? | Domain khas |
| --- | --- | --- | --- |
| BatchNorm | seluruh batch di tiap channel | Ya (minimal 16-32) | CNN visi |
| LayerNorm | seluruh fitur di tiap sampel | Tidak | Transformer, RNN |
| GroupNorm | grup channel di tiap sampel | Tidak | CNN batch kecil (segmentasi 3D) |

BN menghitung statistik dari seluruh batch; batch kecil membuat statistik bising dan training tidak stabil. Itulah alasan Transformer yang dilatih dengan batch kecil hampir selalu memakai LayerNorm. Alasan lebih dalam: setiap token harus punya normalisasi yang tidak bergantung token lain di batch - LayerNorm memberi jaminan ini, BN tidak.

![BatchNorm, LayerNorm, dan GroupNorm - perbedaan sumbu normalisasi pada tensor (N, C, H, W)](./figures/fig01f_normalization.svg)

**Aktivasi: ReLU, GELU, SiLU.**

- **ReLU** (`max(0, x)`): default untuk CNN dan MLP. Murah, turunan 0 atau 1. Risiko: *dead ReLU* - neuron yang tidak pernah menyala bisa mati permanen.
- **GELU** (`x · Φ(x)`): default untuk Transformer modern (BERT, GPT). Lebih halus dekat nol.
- **SiLU/Swish** (`x · σ(x)`): dipakai di MobileNet v3, EfficientNet, LLaMA. Kinerja mirip GELU, lebih murah dihitung.

Aturan praktisnya: pakai default yang disebut paper yang Anda replikasi. Mengganti aktivasi tanpa alasan kuat adalah variabel tambahan yang harus dijelaskan di laporan.

![Kurva fungsi aktivasi ReLU, GELU, dan SiLU pada rentang [-3, 3]](./figures/fig01e_activation_functions.svg)

---

## 3. Worked Example: SimpleCNN pada CIFAR-10

Tujuan: membangun CNN minimal yang dapat training penuh, menjelaskan setiap keputusan desain.

### 3.1 Definisi Model

```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        # Blok 1: 3 channel input (RGB) -> 32 channel; resolusi 32 -> 16
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        # Blok 2: 32 -> 64 channel; resolusi 16 -> 8
        self.block2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 8 * 8, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.block1(x)
        x = self.block2(x)
        return self.classifier(x)
```

Alasan tiap pilihan: `padding=1` mempertahankan dimensi spasial; BatchNorm sebelum ReLU menstabilkan distribusi input; `MaxPool2d(2)` memperluas *receptive field*; `Dropout(0.3)` regularisasi ringan; classifier tidak memakai `Softmax` karena `CrossEntropyLoss` PyTorch sudah melakukan log-softmax secara numerik stabil.

### 3.2 Setup Training Minimal

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616)),
])

trainset = datasets.CIFAR10(root='./data', train=True,
                            download=True, transform=transform_train)
trainloader = DataLoader(trainset, batch_size=128, shuffle=True, num_workers=2)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = SimpleCNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
```

Augmentasi hanya pada training set; normalisasi dengan statistik CIFAR-10 yang sama di val/test; batch size 128 cukup stabil untuk BatchNorm; `device` otomatis agar kode jalan di laptop dan server.

---

## 4. Pitfalls & Miskonsepsi

**"Arsitektur yang lebih dalam selalu lebih baik."** Tidak. Tanpa data cukup banyak, model dalam cenderung overfitting. Mulai dari arsitektur sederhana yang konvergen, tingkatkan kedalaman hanya jika bottleneck terbukti adalah kapasitas model.

**"Adam selalu lebih baik dari SGD."** Pada banyak tugas, Adam konvergen lebih cepat di epoch awal tetapi SGD (dengan momentum dan schedule yang tepat) sering menang di akhir. Bergantung pada tugas.

**"Accuracy 99% berarti model hebat."** Selalu periksa baseline naif - *dummy classifier* yang memprediksi kelas mayoritas. Jika akurasinya juga tinggi, Anda sedang mengukur kesamaan dengan distribusi kelas.

---

## 5. Lab

### Lab 1c - MLP dari Nol (wajib, Minggu 2)

Buka `notebooks/lab1c_mlp_numpy.ipynb`. Lab ini menuntun Anda mengimplementasikan ketujuh langkah backpropagation dalam numpy murni untuk klasifikasi MNIST, lalu memverifikasi gradient dengan *finite-difference check* dan membandingkan hasilnya dengan versi PyTorch.

**Checklist verifikasi:**
- [ ] Forward pass menghasilkan loss yang turun dalam beberapa iterasi overfit.
- [ ] Finite-difference gradient check lulus (selisih < 1e-5).
- [ ] Parity check dengan `SimpleMLP` PyTorch: loss converge ke titik yang sama.

### Lab 1 - Baseline CNN (mulai Minggu 2, selesai Minggu 3)

Buka `notebooks/lab1_baseline_cnn.ipynb`. Mulai bagian setup dan smoke test di Minggu 2; selesaikan evaluasi dan error analysis setelah membaca [01b](01b_Loss_Optimizer_Evaluasi.md).

---

## 6. Refleksi

1. Anda diberi dataset baru: 500 sinyal EKG satu dimensi, panjang masing-masing 5000 titik, target empat kelas aritmia. Keluarga arsitektur apa yang paling masuk akal untuk Anda coba pertama kali, dan mengapa? Pilihan kedua Anda apa, dan di kondisi apa ia lebih cocok?
2. Bayangkan Anda sudah training SimpleCNN dan mendapat train accuracy 95% tetapi val accuracy 68%. Tanpa melihat kodenya, sebutkan tiga hipotesis paling mungkin tentang penyebabnya, lalu tiga eksperimen pendek yang bisa membedakan satu hipotesis dari yang lain.
3. Seorang kolaborator mengirim dataset baru: rekaman suara tangisan bayi sepanjang tiga detik pada *sampling rate* 16 kHz, dilabeli empat kategori. Tuliskan pasangan tensor input → output yang paling alami, lalu ajukan satu alternatif representasi input (misalnya mel-spektrogram 2D) dan diskusikan bagaimana perubahan bentuk itu menggeser pilihan keluarga arsitektur.

---

## 7. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Ritme kerja peneliti berpengalaman; bagian "overfit a single batch" sangat berguna untuk mendebug loop training.
- **Christopher Olah - *Understanding LSTM Networks*** (blog, 2015). Penjelasan visual paling jelas tentang mekanisme gate LSTM.
- **The Deep Learning Book (Goodfellow et al.), Bab 6 & 9.** Bab 6 untuk FFN, Bab 9 untuk CNN.

---

## Lanjut ke 01b

Fondasi sudah berdiri. Bab berikutnya menuntaskan sisa Minggu 3: loss sebagai pilihan, optimizer sebagai mekanisme langkah, evaluasi yang jujur, tiga strategi representasi fitur, dan cara membaca loss curve untuk mendiagnosis masalah training.

Buka [01b - Loss, Optimizer & Evaluasi](01b_Loss_Optimizer_Evaluasi.md) ketika siap.
