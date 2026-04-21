<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| ▶ 04 | Validasi Data | 7 |
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

# 04 · Validasi Data dan Pra-pemrosesan

> *Akurasi 99% bukan prestasi - ia adalah alarm. Hampir selalu ada penjelasan yang lebih membosankan daripada "model kami sangat pintar": data yang bocor, label yang salah, atau pipeline yang memberi model informasi yang seharusnya tidak ia lihat. Skeptisisme terhadap angka sendiri adalah sikap yang memisahkan peneliti dari operator model.*

---

## 0. Peta Bab

Bab ini melatih Anda memeriksa data sebelum mempercayai hasil yang diturunkan darinya. Anda akan belajar melakukan EDA sebagai *investigasi* bukan ritual, mendeteksi berbagai jenis *data leakage* yang dapat diam-diam menggembungkan metrik, mengaudit kualitas label dengan pemeriksaan sampel individu, dan memverifikasi bahwa pipeline pra-pemrosesan tidak membocorkan informasi dari test set ke train set. Setelah bab ini, Anda tidak lagi meneruskan dataset yang tidak Anda periksa sendiri - sebuah kebiasaan yang menyelamatkan banyak eksperimen dari hasil yang tampaknya spektakuler tetapi sebenarnya palsu.

---

## 1. Motivasi: Dua Kisah Singkat

**Kisah pertama.** Seorang mahasiswa pascasarjana melatih model klasifikasi citra medis untuk mendeteksi penyakit paru-paru dari rontgen dada. Akurasi validasi: 97%. PI kegirangan, rencana submit paper dibuat. Pada tahap review, seorang kolega bertanya sederhana: "apakah model belajar mengenali penyakit, atau belajar mengenali rumah sakitnya?". Ternyata setiap rumah sakit memakai mesin rontgen berbeda dengan ciri visual khas di sudut gambar; data positif dan negatif datang dari sumber yang berbeda. Model tidak pernah melihat paru-paru - ia mengklasifikasi *sumber*. Enam bulan kerja mesti diulang dengan protokol data yang lebih ketat.

**Kisah kedua.** Tim kecil membangun prediktor *churn* pelanggan. Akurasi test 94%, ROC-AUC 0.98. Semua metrik terlihat sehat. Saat deployment, akurasi nyata di produksi 68%. Setelah investigasi panjang, ditemukan bahwa fitur `last_login_days` dihitung relatif terhadap *tanggal ekstraksi data* - bukan relatif terhadap *tanggal prediksi*. Pelanggan yang *churn* punya fitur ini bernilai tinggi karena mereka memang tidak login lagi setelah churn; model belajar bahwa "tidak ada login baru" = "akan churn", tetapi ini hanya berlaku karena data diambil setelah kejadian. Fitur yang seharusnya tidak tersedia pada saat prediksi nyatanya bocor ke training.

Dua kisah berbeda, satu pelajaran sama: *data yang terlihat baik mungkin sedang membohongimu*. Kewaspadaan terhadap data bukan tugas tambahan - ia adalah fondasi tanpa-mana seluruh eksperimen berdiri di atas pasir.

---

## 2. Konsep Inti

### 2.1 EDA sebagai Investigasi

*Exploratory Data Analysis* sering diajarkan sebagai daftar langkah: "jalankan `df.describe()`, plot histogram, hitung korelasi, selesai". Praktik yang benar adalah sebaliknya - EDA dipandu oleh pertanyaan, bukan daftar. Setiap angka atau plot yang Anda lihat harus memicu pertanyaan baru, bukan tanda centang.

Kerangka kerja yang produktif: tiga lapis pertanyaan.

**Lapis 1 - Bentuk dan integritas.**
- Berapa banyak baris dan kolom?
- Apakah ada nilai hilang? Di kolom mana, berapa proporsinya?
- Apakah tipe data tiap kolom sesuai ekspektasi?
- Apakah ada duplikasi baris? Apakah duplikasi masuk akal (sah) atau mencurigakan?
- Untuk data gambar/audio: apakah semua file dapat dibaca? Apakah dimensi seragam?

**Lapis 2 - Distribusi dan anomali.**
- Distribusi tiap kolom numerik (histogram, box plot). Apakah ada outlier ekstrem?
- Distribusi kolom kategorikal (value counts). Apakah ada kelas dengan frekuensi terlalu rendah?
- Distribusi target: imbalanced? Jika ya, seberapa parah?
- Apakah ada nilai yang "tidak masuk akal" (umur negatif, suhu 999, tanggal di masa depan)?

**Lapis 3 - Hubungan dan kejutan.**
- Korelasi antar fitur numerik.
- Korelasi fitur dengan target. Adakah fitur dengan korelasi *sangat* tinggi (>0.95)? Ini patut diselidiki - sering tanda leakage.
- Apakah distribusi fitur sama antara train dan test? Jika berbeda, mengapa?
- Apakah ada pola temporal yang tidak diharapkan?

Tool pembantu EDA:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data/train.csv')

# Lapis 1
print(df.shape)
print(df.info())
print(df.isna().sum())
print(df.duplicated().sum())

# Lapis 2
df.describe()
df['target'].value_counts(normalize=True)  # proporsi kelas

# Lapis 3
corr = df.select_dtypes('number').corr()
sns.heatmap(corr, annot=True, fmt='.2f')
plt.show()
```

Untuk dataset besar, `pandas-profiling` (sekarang `ydata-profiling`) menghasilkan laporan otomatis yang mencakup lapis 1 dan 2:

```python
from ydata_profiling import ProfileReport
ProfileReport(df, title='EDA Report').to_file('eda.html')
```

Ingat: laporan otomatis adalah titik awal, bukan akhir. Ia menunjukkan *apa*; Anda yang bertanya *mengapa*.

### 2.2 Jenis-Jenis Data Leakage

*Data leakage* adalah masuknya informasi ke training yang seharusnya tidak tersedia pada waktu prediksi. Lima jenis yang paling umum:

**1. Target leakage.** Fitur yang dihitung *setelah* atau *dari* target. Contoh: `total_payments` di prediksi default kredit - jumlah pembayaran hanya tersedia setelah pinjaman berakhir, jadi tidak bisa ada di data training untuk model prediksi awal.

**2. Train-test contamination.** Baris yang sama muncul di train dan test. Sering terjadi saat split dilakukan setelah proses yang menciptakan duplikasi (misalnya agregasi yang meniru baris).

**3. Temporal leakage.** Data masa depan masuk ke prediksi masa lalu. Umum di time series - pemisahan train/test dengan random split padahal data punya urutan waktu. Solusinya: split berdasarkan waktu, bukan acak.

**4. Group leakage.** Data dari subjek yang sama muncul di train dan test. Contoh: pasien yang sama punya beberapa rontgen; satu masuk train, satu masuk test - model bisa belajar mengenali pasien, bukan penyakit. Solusinya: split berdasarkan grup (pasien, pengguna, sesi).

**5. Preprocessing leakage.** Statistik untuk normalisasi (mean, std) dihitung dari seluruh dataset termasuk test. Ini memberi model informasi agregat test. Solusinya: fit preprocessing hanya pada train, transform train+test dengan parameter yang sudah di-fit.

Tabel deteksi:

| Jenis | Tanda-tanda awal | Tes cepat |
|---|---|---|
| Target leakage | Satu fitur punya korelasi ekstrem dengan target | Uji "model dengan fitur ini saja" - jika akurasi sudah tinggi, curigai |
| Train-test contamination | Akurasi validasi dekat atau melebihi train | Hitung overlap ID/hash antara split |
| Temporal leakage | Performa turun drastis di data masa depan | Split by time dan bandingkan |
| Group leakage | Val acc tinggi tetapi performa di pasien baru rendah | Group split, retrain |
| Preprocessing leakage | Efek kecil tetapi konsisten | Refactor: fit hanya pada train |

### 2.3 Audit Label: Kualitas Data yang Sering Diabaikan

Label yang salah 5% tidak akan membatasi akurasi di 95%, tetapi akan menyesatkan pilihan arsitektur dan loss. Model yang "gagal" mencapai 100% pada data noisy sebenarnya sedang benar-benar mengenali pola; Anda menghukumnya karena gagal menghafal kesalahan.

Protokol audit label untuk dataset klasifikasi:

1. **Periksa distribusi label.** `value_counts()`. Kelas dengan frekuensi sangat rendah (< 1%) mungkin tidak praktis untuk model klasifikasi biasa - pertimbangkan menggabung ke kelas lain atau memakai pendekatan *few-shot*.
2. **Periksa ejaan/konsistensi kategori.** `df['label'].unique()`. Sering ditemukan 'Positif', 'positif', 'Positive', 'POS' yang seharusnya satu kelas.
3. **Sampel inspeksi manual.** Ambil 50 sampel acak, periksa labelnya dengan pemahaman domain. Jika Anda bukan ahli domain, minta bantuan.
4. **Inspeksi kesalahan model sebagai audit tambahan.** Setelah baseline training, ambil 20 "kesalahan paling percaya diri" - prediksi di mana model yakin tetapi salah. Sering kali *labelnya* yang salah, bukan modelnya.

Contoh pada dataset gambar:

```python
# Prediksi model pada val set
import torch

model.eval()
with torch.no_grad():
    preds = []
    confs = []
    for xb, yb in val_loader:
        logits = model(xb.to(device))
        probs = torch.softmax(logits, dim=1)
        conf, pred = probs.max(dim=1)
        preds.append(pred.cpu())
        confs.append(conf.cpu())
preds = torch.cat(preds)
confs = torch.cat(confs)
targets = torch.tensor([y for _, y in val_loader.dataset])

# Kesalahan yang paling percaya diri
wrong = preds != targets
conf_wrong = confs[wrong]
indices = torch.where(wrong)[0][conf_wrong.argsort(descending=True)[:20]]

# Inspeksi 20 gambar teratas secara manual
for idx in indices:
    show_image(val_loader.dataset[idx])
    print(f"true: {targets[idx]}, predicted: {preds[idx]}, conf: {confs[idx]:.3f}")
```

Proses ini sering mengejutkan. Saya pernah menemukan 15% label pada dataset publik "kucing vs anjing" salah karena ditandai oleh *crowd worker* yang tergesa-gesa.

### 2.4 Verifikasi Pipeline: Pemisahan yang Ketat

Pipeline pra-pemrosesan harus *fit pada training set saja*, lalu *transform train, val, dan test* dengan parameter yang sudah di-fit. Ini mencegah kebocoran statistik test ke training.

Salah:

```python
# JANGAN LAKUKAN INI
scaler = StandardScaler()
X_all_scaled = scaler.fit_transform(X_all)  # fit pakai seluruh data
X_train, X_test = train_test_split(X_all_scaled, ...)
```

Benar:

```python
X_train, X_test = train_test_split(X_all, ...)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)     # fit HANYA train
X_test = scaler.transform(X_test)            # transform test
```

Untuk pipeline multi-langkah, `sklearn.pipeline.Pipeline` memastikan fit/transform dilakukan dengan benar:

```python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer

num_cols = ['age', 'salary']
cat_cols = ['city', 'role']

num_pipe = Pipeline([
    ('impute', SimpleImputer(strategy='median')),
    ('scale', StandardScaler()),
])
cat_pipe = Pipeline([
    ('impute', SimpleImputer(strategy='most_frequent')),
    ('encode', OneHotEncoder(handle_unknown='ignore')),
])
preprocess = ColumnTransformer([
    ('num', num_pipe, num_cols),
    ('cat', cat_pipe, cat_cols),
])

preprocess.fit(X_train)
X_train_t = preprocess.transform(X_train)
X_test_t = preprocess.transform(X_test)

# Simpan untuk reproduksibilitas
import joblib
joblib.dump(preprocess, 'experiments/lab4/preprocess.pkl')
```

Untuk model PyTorch yang memakai augmentasi, prinsip sama: augmentasi hanya di training `Dataset`, tidak di validation/test.

### 2.5 Domain Shift dan Distribusi yang Berubah

Data di dunia nyata sering berbeda dari data training. Tiga bentuk perubahan:

**Covariate shift** - distribusi fitur berubah, tetapi hubungan fitur→target tetap. Contoh: model klasifikasi daun dilatih di musim kemarau, dipakai di musim hujan (warna daun beda, tetapi penyakit tetap terdeteksi dari pola yang sama).

**Label shift** - distribusi target berubah, tetapi distribusi fitur|target tetap. Contoh: proporsi kelas minor meningkat di produksi.

**Concept drift** - hubungan fitur→target itu sendiri berubah. Paling sulit. Contoh: perilaku pengguna berubah setelah fitur aplikasi diubah; pola churn lama tidak berlaku lagi.

Diagnosis awal: bandingkan histogram tiap fitur antara train dan test/produksi. Jika histogram berbeda signifikan, Anda menghadapi shift. Uji statistik seperti Kolmogorov-Smirnov dapat memformalkan.

Di proyek kuliah, shift sering sengaja diperkenalkan sebagai latihan. Lab 4 akan memindahkan model yang dilatih di CIFAR-10 ke dataset medis PathMNIST - *domain shift* yang akan membuat akurasi turun drastis, memberi Anda kesempatan menyaksikan dan mendeteksinya.

---

## 3. Worked Example: Audit Dataset PathMNIST

PathMNIST adalah dataset sederhana dari koleksi MedMNIST - gambar histopatologi kolon, sembilan kelas jaringan, resolusi 28×28. Kita akan mengaudit dataset ini sebelum melatih model.

### 3.1 Memuat dan Memeriksa Struktur

```python
from medmnist import PathMNIST

train_ds = PathMNIST(split='train', download=True)
val_ds   = PathMNIST(split='val',   download=True)
test_ds  = PathMNIST(split='test',  download=True)

print(len(train_ds), len(val_ds), len(test_ds))
# output: 89996 10004 7180

# Struktur satu sampel
img, label = train_ds[0]
print(type(img), img.size, label)
# output: <class 'PIL.Image.Image'> (28, 28) [0]
```

Pemeriksaan awal: 90k train, 10k val, 7k test - ukuran yang masuk akal. Resolusi 28×28 kecil (mirip MNIST), sesuai untuk proyek edukasi. Label adalah array panjang 1 (konvensi MedMNIST).

### 3.2 Distribusi Kelas

```python
import numpy as np
from collections import Counter

train_labels = np.array([train_ds[i][1][0] for i in range(len(train_ds))])
val_labels   = np.array([val_ds[i][1][0]   for i in range(len(val_ds))])
test_labels  = np.array([test_ds[i][1][0]  for i in range(len(test_ds))])

print('Train:', Counter(train_labels))
print('Val:',   Counter(val_labels))
print('Test:',  Counter(test_labels))
```

Output menunjukkan distribusi 9 kelas. Kita periksa keseimbangan: rasio kelas terbanyak/terkecil. Jika > 5×, kita mengklasifikasi sebagai imbalance moderat; > 10× imbalance ekstrem.

### 3.3 Visualisasi Sampel

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(3, 9, figsize=(18, 6))
for cls in range(9):
    idxs = np.where(train_labels == cls)[0][:3]
    for row, idx in enumerate(idxs):
        axes[row, cls].imshow(train_ds[idx][0])
        axes[row, cls].set_title(f'class {cls}', fontsize=8)
        axes[row, cls].axis('off')
plt.tight_layout()
plt.savefig('experiments/lab4/samples_per_class.png')
```

Inspeksi visual ini penting: Anda akan melihat perbedaan antar kelas, menilai apakah tugas tampak "masuk akal", dan menemukan anomali (gambar hitam, gambar kosong, gambar dengan artefak).

### 3.4 Cek Leakage: Duplikasi Antar Split

```python
import hashlib

def image_hash(img):
    return hashlib.md5(np.array(img).tobytes()).hexdigest()

train_hashes = set(image_hash(train_ds[i][0]) for i in range(len(train_ds)))
val_hashes   = set(image_hash(val_ds[i][0])   for i in range(len(val_ds)))
test_hashes  = set(image_hash(test_ds[i][0])  for i in range(len(test_ds)))

print('Train-val overlap:', len(train_hashes & val_hashes))
print('Train-test overlap:', len(train_hashes & test_hashes))
print('Val-test overlap:', len(val_hashes & test_hashes))
```

Jika ada overlap > 0, catat, laporkan, dan pertimbangkan memfilter sebelum training. Untuk dataset publik yang matang seperti PathMNIST, overlap biasanya 0 - tetapi periksa selalu, jangan percaya begitu saja.

### 3.5 Cek Label yang Tidak Konsisten

Pada dataset kecil, inspeksi manual 20 sampel acak per kelas. Pada dataset besar, strategi proxy:

- Cari *near-duplicate* - gambar yang sangat mirip (cosine similarity embedding > 0.99) dengan label berbeda. Ini kandidat label tidak konsisten.
- Latih baseline pendek, ambil sampel dengan *disagreement maksimal* antara prediksi dan label. Inspeksi manual.

```python
# Pseudo-code: strategi proxy
from sklearn.neighbors import NearestNeighbors

embeddings = extract_embeddings(train_ds)  # misal pakai ResNet pre-trained
nn = NearestNeighbors(n_neighbors=2).fit(embeddings)
distances, indices = nn.kneighbors(embeddings)
# Pasangan terdekat (bukan diri sendiri) dengan label berbeda:
for i, (d, j) in enumerate(zip(distances[:, 1], indices[:, 1])):
    if train_labels[i] != train_labels[j] and d < 0.05:
        print(f"Suspect: sample {i} (label {train_labels[i]}) vs "
              f"sample {j} (label {train_labels[j]}), dist {d:.3f}")
```

### 3.6 Laporan Audit

Setelah semua pemeriksaan, tulis ringkasan:

```markdown
## Audit Dataset: PathMNIST

**Ukuran:** train 89996, val 10004, test 7180 - cukup besar.
**Kelas:** 9. Distribusi agak imbalance (max/min ~ 4×).
**Resolusi:** 28×28×3. Kecil, tidak perlu augmentasi berat.
**Overlap split:** train-val 0, train-test 0, val-test 0.
**Anomali visual:** tidak ditemukan (inspeksi 10 sampel per kelas).
**Label inconsistency:** 12 pasangan suspek dari strategi proxy,
dari 89996 sampel (0.013%). Diabaikan untuk eksperimen kuliah.
**Domain shift dari CIFAR-10:** drastis (fotografi natural vs
histopatologi medis). Diharapkan model pre-trained di CIFAR-10
tidak transfer langsung.

**Keputusan untuk eksperimen:**
- Normalisasi per channel dengan statistik training set.
- Augmentasi ringan: random rotation ±15°, horizontal flip.
- Metrik utama: F1 macro (karena imbalance moderat).
```

Laporan ini masuk ke `experiments/lab4/audit.md`, dibaca bersama protokol eksperimen.

---

## 4. Pitfalls & Miskonsepsi

**"EDA cukup sekali di awal proyek."** Tidak. Setiap kali Anda memutuskan mengubah subset data, menambah sumber, atau memfilter sampel, jalankan EDA ulang pada data hasil perubahan. Distribusi bisa berubah tanpa Anda sadari.

**"Saya akan periksa leakage nanti."** Sama seperti "saya akan simpan config nanti" - tidak pernah terjadi. Periksa leakage sebelum run training pertama. Akurasi tinggi yang ternyata karena leakage membuat Anda membuang waktu di eksperimen turunan yang semua berdasarkan metrik palsu.

**"Dataset publik sudah bersih."** Hampir tidak pernah. ImageNet punya label salah; CIFAR-10 punya duplikasi antar split; dataset medis publik sering punya *patient leakage*. Jangan anggap dataset publik bebas dari pemeriksaan.

**"Imbalance berarti harus pakai SMOTE/oversampling."** Tidak selalu. Imbalance yang sesuai dengan realita (misalnya 5% pasien positif kanker) adalah informasi yang valid. Oversampling menipu model agar menganggap distribusi seimbang, yang bisa menurunkan performa di distribusi nyata. Pertimbangkan dulu: apakah loss yang sadar imbalance (focal, weighted CE) atau *metrik* yang tepat (PR-AUC) sudah cukup?

**"Normalisasi dilakukan di awal, aman."** Periksa apakah `fit` pada train saja. Jika `fit_transform` dipanggil pada seluruh data sebelum split, Anda punya preprocessing leakage - halus tetapi nyata.

**"Test set tidak perlu diinspeksi, kita hanya mengukur di sana."** Salah. Anda perlu memastikan test set punya distribusi yang sama dengan apa yang akan Anda temui di produksi. Jika test set menyimpang, hasilnya tidak dapat diekstrapolasi.

**"Model saya overfitting parah, kurangi parameter."** Bisa jadi. Tetapi sebelum itu, periksa apakah training set cukup bersih dari label salah. Overfitting "buatan" sering terjadi ketika model memaksa diri menghafal label yang saling bertentangan.

---

## 5. Lab 4 - Audit PathMNIST dan Pipeline Pra-pemrosesan

Buka [Lab 4 - EDA dan Audit Leakage](template_repo/notebooks/lab4_eda_leakage.ipynb).

Tugas:

1. Unduh PathMNIST dan jalankan EDA tiga lapis: bentuk/integritas, distribusi/anomali, hubungan/kejutan. Hasilkan minimal 4 figur (distribusi kelas per split, sampel per kelas, statistik per channel, matriks confusion awal).
2. Jalankan cek overlap antar split dengan image hashing. Catat hasilnya di `audit.md`.
3. Implementasikan strategi deteksi label inconsistency (near-duplicate dengan label berbeda, atau disagreement model baseline). Inspeksi 10 pasangan suspek secara manual.
4. Buat pipeline pra-pemrosesan yang fit-only-on-train. Verifikasi dengan membandingkan output transform di train vs val - statistik normalisasi val harus memakai mean/std dari train, bukan dari val.
5. Jalankan baseline training pendek (5 epoch) dengan dan tanpa augmentasi. Bandingkan train/val gap.
6. Tulis `audit.md` satu halaman yang mencakup seluruh temuan dan keputusan eksperimen.

**Checklist verifikasi**:

- [ ] Figur distribusi kelas tersimpan di `experiments/lab4/`.
- [ ] Tidak ada overlap antar split (atau overlap terdokumentasi).
- [ ] Minimal 10 pasangan suspek dari proxy check diinspeksi manual.
- [ ] Kode pra-pemrosesan jelas: `fit` hanya pada `train_ds`.
- [ ] `audit.md` berisi keputusan eksperimen (metrik utama, strategi augmentasi, alasan) yang dapat dibaca oleh mahasiswa lain.

---

## Komponen Mandiri (Pekan 7)

> Eksperimen di sini boleh menghasilkan hasil yang tidak sesuai harapan - yang dinilai adalah kualitas dokumentasi dan analisis Anda, bukan keberhasilannya.

**Konsep yang dilatih:** Memeriksa data sebelum mempercayai hasil - dari distribusi kelas hingga *leakage* tersembunyi dan kualitas label.

Pilih **satu jalur** di bawah. Catat pilihan dan hasilnya di `notebooks/portofolio_mandiri.ipynb` pada entri Pekan 7. Di awal sesi Pekan 8, ada slot 10 menit untuk presentasi. Isi bagian "Koneksi": apakah temuan data ini mengubah cara Anda memandang eksperimen-eksperimen yang sudah dijalankan sebelumnya?

| Jalur | Fokus Skill | Tugas |
|-------|-------------|-------|
| **A - Implementasi** | Membangun dan menguji | Pilih satu dataset klasifikasi dari HuggingFace (bukan PathMNIST). Jalankan 5-layer EDA: distribusi label, ukuran sampel, nilai hilang, duplikat, dan inspeksi sampel anomali. Laporkan satu temuan konkret yang akan mengubah cara Anda memakai dataset itu. |
| **B - Analisis** | Mengamati dan menginterpretasi | Rancang dua skenario *leakage* hipotetis yang *tidak terdeteksi* oleh pipeline Lab 4: satu *leakage* pada split, satu pada fitur turunan. Untuk masing-masing, jelaskan mekanismenya, mengapa pipeline Lab 4 tidak menangkapnya, dan langkah tambahan apa yang diperlukan untuk mendeteksinya. |
| **C - Desain** | Merancang dan mengargumentasi | Rancang protokol split untuk dataset yang memiliki ID entitas berulang - misalnya dataset medis dengan ID pasien atau dataset audio dengan ID pembicara. Tulis dua versi: versi yang mudah-tapi-salah (random split) dan versi yang benar. Buat argumen mengapa versi salah sering lolos tanpa disadari. |

**Deliverable:** Entri portofolio Pekan 7 terisi di `notebooks/portofolio_mandiri.ipynb`. Siap presentasi 10 menit di awal Pekan 8.

---

## 6. Refleksi

1. Anda mewarisi proyek dari senior yang sudah pindah. Dataset siap, kode siap, akurasi test terlaporkan 91%. Apa tiga pemeriksaan pertama yang akan Anda lakukan sebelum *memakai ulang* angka 91% tersebut di laporan Anda sendiri?

2. Model Anda mencapai 99% akurasi pada val set di hari pertama. Apa lima hipotesis paling mungkin tentang penyebabnya, diurutkan dari yang paling membosankan ke yang paling mengejutkan? Untuk tiga hipotesis teratas, bagaimana Anda menguji masing-masing dalam waktu satu jam?

3. Dataset PathMNIST yang Anda pakai di Lab 4 tidak memiliki informasi pasien - setiap sampel dianggap independen. Bagaimana Anda akan menangani ini jika dataset memiliki ID pasien dan setiap pasien memiliki beberapa slide? Jelaskan protokol split yang benar dan mengapa random split biasa akan gagal.

4. **Koneksi ke Capstone.** Pada Capstone (Bab 10), Anda akan memilih dataset - bisa dari paper, Kaggle, atau repo lab. Tuliskan checklist 5-layer EDA (lihat section 2) dalam format yang bisa Anda lampirkan ke draft proposal Capstone Anda. Bagian mana dari checklist yang paling mungkin Anda *skip* karena tekanan waktu, dan apa konsekuensi paling buruk dari skip itu di Capstone?

---

## 7. Bacaan Lanjutan

- **Kaufman, Rosset, Perlich - *Leakage in Data Mining: Formulation, Detection, and Avoidance*** (KDD 2011). Taksonomi klasik tentang leakage; panjang tetapi bagian 2-3 cukup untuk intuisi.
- **Northcutt et al. - *Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks*** (NeurIPS 2021). Menunjukkan berapa banyak label salah di benchmark populer (ImageNet, CIFAR-10). Tonik skeptisisme.
- **Geirhos et al. - *Shortcut Learning in Deep Neural Networks*** (Nature Machine Intelligence, 2020). Mengapa model "belajar" dengan cara yang tidak kita harapkan, dan bagaimana mendeteksinya.
- **Cleanlab documentation** (cleanlab.readthedocs.io). Library praktis untuk deteksi label noise; dibaca sebagai alternatif dari implementasi manual di Lab 4.

---

## Lanjut ke Bab 05

Anda sudah bisa merancang, mengeksekusi, dan memverifikasi eksperimen dari sisi data dan sisi komputasi. Bab berikutnya membahas alat yang dua tahun terakhir ini mengubah cara semua peneliti bekerja: *large language model* seperti ChatGPT, Copilot, dan Claude. Pertanyaannya bukan "apakah kita memakainya" - kita semua memakainya - tetapi "bagaimana kita memakainya tanpa kehilangan kemampuan dan tanggung jawab kita sendiri?".

Buka [Bab 05 - AI Tools sebagai Pendukung](05_AI_Tools_Sebagai_Pendukung.md) ketika siap.
