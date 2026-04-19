<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| ▶ 02 | Ide ke Eksperimen | 4 |
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

# 02 · Menerjemahkan Ide Penelitian Menjadi Eksperimen

> *Instruksi terbuka bukan perintah yang harus dilaksanakan huruf demi huruf, melainkan undangan untuk bertanya lebih dulu. Eksperimen yang dirancang dengan cermat menjawab pertanyaan yang jelas; eksperimen yang dijalankan tergesa-gesa hanya menghasilkan angka yang sulit dipertahankan.*

---

## 0. Peta Bab

Bab ini mengajari Anda mengubah instruksi terbuka - "coba focal loss, freeze conv1" - menjadi rancangan eksperimen yang konkret: variabel apa yang berubah, baseline apa yang adil, hipotesis apa yang dapat dipalsukan, metrik apa yang relevan, dan apa bentuk hasil yang diharapkan. Setelah bab ini, Anda mampu menuliskan *satu halaman protokol eksperimen* sebelum menyentuh kode - dokumen yang menyelamatkan waktu berhari-hari dan mencegah hasil yang tidak bisa Anda jelaskan.

---

## 1. Motivasi: Dua Cara Menjawab Email

Ingat email PI dari Bab 00:

> "Tolong coba ubah loss-nya jadi focal, lalu freeze conv1 pada backbone. Bandingkan dengan baseline. Saya butuh hasilnya hari Kamis."

**Cara A - langsung kerja.** Anda membuka `train.py`, mengganti `CrossEntropyLoss` menjadi `FocalLoss`, menambahkan `for p in backbone.conv1.parameters(): p.requires_grad = False`, menjalankan training 20 epoch, mengirim akurasi ke Slack: *"baseline 78.4%, mod 80.1%, naik 1.7%"*.

**Cara B - merancang lebih dulu.** Anda duduk 30 menit. Menulis satu halaman: apa yang dimaksud "baseline"; `gamma` berapa untuk focal loss; apakah kedua run memakai seed sama; apakah `conv1` yang di-freeze adalah layer backbone atau layer pertama dari CNN custom; apakah "bandingkan" berarti satu run masing-masing atau tiga run untuk mengurangi *noise*; metrik mana yang paling berbicara pada kelas minor (yang biasanya jadi motivasi utama memakai focal loss). Setelah semua jelas, Anda kerja selama tiga hari, melaporkan hasil dengan tabel, plot, dan interpretasi.

Kedua cara menghasilkan angka. Hanya Cara B menghasilkan *eksperimen* - sesuatu yang bisa dipertanggungjawabkan ketika PI bertanya "kenapa kenaikan 1.7% ini bisa dipercaya?" Perbedaannya bukan kecerdasan; perbedaannya adalah *kebiasaan merancang sebelum menjalankan*.

Bab ini membangun kebiasaan itu.

---

## 2. Konsep Inti

### 2.1 Lima Pertanyaan Sebelum Menyentuh Kode

Sebelum Anda membuka editor, jawab lima pertanyaan ini. Tulis jawabannya di file `protocol.md` di folder eksperimen.

**1. Variabel apa yang berubah?**  
Apa yang berbeda antara kondisi A (baseline) dan kondisi B (modifikasi)? Daftar harus spesifik: bukan "loss", tetapi "`CrossEntropyLoss` → `FocalLoss(gamma=2.0)`". Bukan "freeze layer", tetapi "`backbone.layer1.parameters()` dengan `requires_grad=False`". Jika ada lebih dari satu variabel berubah, pisahkan - Anda butuh satu eksperimen per variabel untuk atribusi yang jelas.

**2. Apa baseline yang adil?**  
Baseline harus identik dengan kondisi modifikasi pada *semua variabel lain*: arsitektur, data, augmentasi, optimizer, learning rate, seed, jumlah epoch. Jika baseline yang tersedia di repo berbeda di salah satu aspek, entah Anda menyesuaikan baseline atau melaporkan perbedaan dengan jujur.

**3. Apa hipotesis yang dapat dipalsukan?**  
Hipotesis yang baik berbentuk *pernyataan empiris yang bisa salah*. Contoh: "Focal loss dengan γ=2.0 meningkatkan F1-score pada kelas minor minimal 3 poin absolut, tanpa menurunkan akurasi keseluruhan lebih dari 1 poin." Hipotesis yang buruk: "Focal loss lebih baik." (Lebih baik pada metrik apa? Seberapa besar? Pada kondisi apa?)

**4. Metrik sukses apa?**  
Tentukan *sebelum* Anda melihat hasil. Urutkan: metrik utama, metrik sekunder, metrik pengaman (yang tidak boleh memburuk). Contoh untuk perubahan fokus pada kelas minor:

- Utama: F1-score kelas minor.
- Sekunder: recall kelas minor, confusion matrix.
- Pengaman: akurasi keseluruhan tidak turun > 1%; train/val gap tidak meningkat drastis.

**5. Bentuk hasil apa yang Anda harapkan, dan apa yang mengejutkan?**  
Pikirkan dua dunia sebelum menjalankan: dunia di mana hipotesis benar, dunia di mana ia salah. Apa yang Anda lihat di log? Apa yang akan Anda simpulkan? Jika Anda tidak bisa membayangkan ini, eksperimenmu belum cukup jelas.

### 2.2 Protokol Eksperimen Satu Halaman

Contoh konkret, langsung bisa ditiru:

```markdown
# Protocol: Focal Loss + Freeze Layer pada CIFAR-10

## Variabel
- A (baseline): CrossEntropyLoss, semua layer trainable.
- B: FocalLoss(gamma=2.0), backbone.block1 di-freeze (conv + BN).
- Semua variabel lain: SimpleCNN, AdamW lr=3e-4, batch 128,
  20 epoch, seed {42, 43, 44}.

## Hipotesis
- H1: F1-score kelas minor pada B naik ≥ 3 poin dibandingkan A.
- H2: Akurasi keseluruhan B tidak turun lebih dari 1 poin dari A.

## Metrik
- Utama: F1 kelas minor (rata-rata 3 seed).
- Sekunder: recall per kelas, confusion matrix.
- Pengaman: train/val gap, akurasi keseluruhan.

## Eksekusi
- Tiga seed per kondisi = 6 run total.
- Log ke TensorBoard; checkpoint akhir disimpan.
- Laporkan rata-rata ± std.

## Hasil yang diharapkan
- H1 terkonfirmasi → lanjut ke gamma sweep.
- H1 gagal tetapi H2 terpenuhi → cek distribusi kelas, pertimbangkan
  class weighting sebagai alternatif.
- H2 gagal → identifikasi kelas yang memburuk, hipotesis baru tentang
  trade-off.

## Waktu perkiraan
- Training: 6 × 25 menit = 2.5 jam.
- Analisis: 2 jam.
- Laporan: 2 jam.
- Total: setengah hari kerja.
```

Satu halaman ini mengubah "coba focal loss, freeze conv1" menjadi rancangan yang bisa dibaca, didiskusikan, dan dijalankan oleh orang lain tanpa tebakan. Protokol tersimpan di repo bersama kode. Ia adalah versi Anda sebelum hasil keluar; berguna sebagai cek kejujuran nanti ketika Anda tergoda mengubah cerita agar sesuai data.

### 2.3 Mengendalikan Variabel

Prinsip yang terdengar klise tetapi sering dilanggar: *ubah satu hal pada satu waktu*. Jika Anda mengganti loss dan mengubah learning rate sekaligus, ketika akurasi naik Anda tidak tahu mana yang berjasa. Ada situasi di mana mengubah dua hal bersamaan justru tepat (misalnya ketika Anda tahu secara teori bahwa loss baru butuh learning rate berbeda untuk konvergen), tetapi dalam kasus itu Anda perlu eksperimen tambahan untuk mengisolasi efeknya.

Tabel konfigurasi adalah alat sederhana yang kuat:


| Run          | Loss  | γ   | Freeze | LR   | Seed | F1 minor |
| ------------ | ----- | --- | ------ | ---- | ---- | -------- |
| baseline_s42 | CE    | –   | none   | 3e-4 | 42   | ...      |
| baseline_s43 | CE    | –   | none   | 3e-4 | 43   | ...      |
| baseline_s44 | CE    | –   | none   | 3e-4 | 44   | ...      |
| focal_s42    | Focal | 2.0 | block1 | 3e-4 | 42   | ...      |
| focal_s43    | Focal | 2.0 | block1 | 3e-4 | 43   | ...      |
| focal_s44    | Focal | 2.0 | block1 | 3e-4 | 44   | ...      |


Baca secara vertikal: kolom `LR` seragam, berarti learning rate bukan variabel. Kolom `Loss` dan `Freeze` berubah bersamaan - inilah yang sedang Anda uji. Seed divariasikan sebagai *replikasi*, bukan sebagai variabel eksperimen.

**Variabel yang saling bergantung.** Ada satu jebakan yang sering tidak disadari: *batch size dan learning rate tidak independen*. Menggandakan batch size sambil mempertahankan LR yang sama secara efektif mengurangi ukuran update relatif - hasilnya sering lebih lambat konvergen atau performa lebih rendah. Aturan praktis yang umum diterima: jika batch size naik k kali, LR juga naik k kali (*linear scaling rule*, Goyal et al. 2017). Ini bukan hukum besi - tetapi artinya ketika Anda mengubah batch size, LR bukan variabel yang aman untuk dianggap konstan.

**Tiga strategi menginisialisasi baseline hyperparameter.** Sebelum bisa mengontrol variabel, Anda perlu baseline yang konfigurasinya masuk akal. Tiga strategi umum, dari paling mudah ke paling teliti:

1. **Salin dari paper.** Jika paper asli menyertakan config (LR, batch size, weight decay), gunakan itu sebagai titik mulai. Waspadai: paper sering melapor setting terbaik mereka, bukan setting yang "wajar untuk dataset lebih kecil".
2. **Grid search kecil pada subset.** Ambil 10-20% data, jalankan grid LR × {1e-3, 3e-4, 1e-4} dengan 3 epoch. Ini jauh lebih cepat daripada training penuh dan cukup untuk menyingkirkan nilai LR yang jelas salah.
3. **Learning rate range test.** Mulai dari LR sangat kecil (1e-7), naikkan secara eksponensial setiap batch selama 100 iterasi. Plot loss vs LR - titik di mana loss turun paling curam adalah kandidat LR yang baik (Leslie Smith, 2017). Banyak library modern punya implementasi bawaan.

### 2.4 Noise, Seed, Replikasi, dan Kapan Perbedaan Bermakna

Model dengan inisialisasi berbeda sering menghasilkan akurasi yang berbeda beberapa poin persen, *bahkan tanpa perubahan apapun*. Ini disebut *seed variance*. Jika Anda melaporkan "baseline 78.4% vs mod 80.1%, naik 1.7%" tetapi seed variance baseline sendiri ±1.5%, kenaikan 1.7% mungkin sekadar noise.

Solusi: replikasi minimal tiga seed per kondisi, laporkan rata-rata dan standar deviasi. Idealnya lima seed, tetapi tiga sudah jauh lebih baik daripada satu. Jika Anda tidak punya waktu, akui keterbatasan ini di laporan - jangan pura-pura satu run adalah kebenaran.

Di luar seed, sumber noise lain: urutan data, kernel CUDA yang non-deterministik (beberapa operasi konvolusi), optimasi compiler. Untuk reproduksibilitas ketat, Anda juga perlu mengatur `torch.backends.cudnn.deterministic = True` - bab berikutnya membahas teknik ini lebih lengkap.

**Kapan perbedaan cukup besar untuk diklaim?** Mean ± std memberi gambaran variabilitas, tetapi tidak langsung menjawab pertanyaan "apakah ini nyata atau noise?" Dua aturan praktis yang berguna:

1. **Aturan 2σ**: Jika Δ antara dua kondisi lebih besar dari 2 × σ gabungan keduanya, perbedaannya lebih mungkin nyata daripada sekadar variasi seed. Ini bukan uji statistik formal, tetapi cukup untuk laporan internal.

2. **Effect size threshold**: Tetapkan δ minimum sebelum eksperimen berjalan (di pre-registration). Jika kenaikan yang diprediksi penting adalah 2 poin F1, kenaikan 0.3 poin tidak bermakna secara praktis meski angkanya "naik". Peningkatan < 0.5 poin pada dataset besar dengan 3 seed hampir selalu noise.

Untuk publikasi atau laporan formal, pertimbangkan *paired t-test* atau *Wilcoxon signed-rank test* jika Anda punya cukup run (≥5 seed per kondisi). Namun di tahap eksplorasi awal, threshold δ yang ditetapkan sebelumnya lebih berguna daripada p-value yang dicomputasi setelah melihat data.

### 2.5 Hipotesis yang Dapat Dipalsukan vs Pengharapan

Ada perbedaan halus antara *hipotesis* dan *harapan*. Hipotesis berisi prediksi spesifik: "F1 kelas minor naik ≥ 3 poin." Harapan berisi keinginan samar: "focal loss akan membantu."

Hipotesis yang spesifik melindungi Anda dari dua bahaya:

1. **Konfirmasi bias.** Tanpa target konkret, Anda akan melihat hasil apa saja yang sedikit lebih baik sebagai "bukti bahwa hipotesisnya benar". Dengan target 3 poin, kenaikan 0.5 poin adalah *tidak mengkonfirmasi*, bukan sukses kecil.
2. **Cerita setelah fakta.** Tanpa prediksi tertulis sebelum run, mudah sekali menarasikan hasil aktual sebagai "yang kita harapkan sejak awal". Protokol tertulis mencegah ini.

Hipotesis tidak harus benar. Hipotesis yang ternyata salah sering lebih informatif daripada yang benar - karena ia memaksa Anda mencari penjelasan. Laboratorium yang paling produktif memperlakukan hipotesis salah bukan sebagai kegagalan, tetapi sebagai data.

### 2.6 Ketika Hipotesis Tidak Terkonfirmasi

Ini situasi yang hampir pasti Anda alami: eksperimen sudah berjalan, hasilnya tidak sesuai pre-registration. Apa yang dilakukan? Ada tiga skenario yang berbeda cara penanganannya.

**Skenario A: Hasil hampir mencapai threshold tapi tidak sampai.**
Misalnya hipotesis "F1 naik ≥ 3 poin" tapi hasil aktual Δ = 1.8 poin. Jangan langsung klaim "hipotesis terkonfirmasi sebagian" - itu bukan cara kerja pre-registration. Langkah yang tepat: (1) verifikasi protokol *exact match* - apakah semua variabel benar-benar dikontrol sesuai pre-reg? (2) tambah 2 seed lagi untuk memastikan angka tidak berubah arah; (3) jika tetap 1.8 poin, simpulkan hipotesis tidak terkonfirmasi dan catat sebagai temuan negatif.

**Skenario B: Hasil berlawanan arah dari prediksi.**
Hipotesis "focal loss meningkatkan F1" tapi hasilnya F1 turun 1.2 poin. Ini lebih informatif dari skenario A. Sebelum menyimpulkan "focal loss tidak bekerja", lakukan (1) audit implementasi: apakah gamma=0 menghasilkan CE yang identik? (2) cek distribusi loss tiap kelas: apakah focal loss terlalu agresif menekan kelas mudah? (3) investigasi apakah baseline yang dipakai sudah fair (sama hyperparameter kecuali variabel yang diuji). Jika semua aman, hasil negatif ini valid dan layak dilaporkan.

**Skenario C: Hasil sangat bagus, jauh di atas prediksi.**
Ini *terutama* membutuhkan skeptisisme. Jika hipotesis "naik 3 poin" tapi aktual naik 12 poin, kemungkinan ada bug atau leakage yang tidak disengaja. Langkah: (1) jalankan ulang baseline dengan seed berbeda; (2) periksa apakah test set benar-benar tidak menyentuh training; (3) verifikasi bahwa intervensi tidak secara tidak sengaja mengubah sesuatu yang lain (misal: mengubah augmentasi, mengubah normalisasi).

**Catatan hasil negatif.** Hasil negatif yang didokumentasikan dengan baik adalah kontribusi nyata untuk riset - ia mencegah orang lain membuang waktu di arah yang sama. Di lab Anda sendiri, catatan negatif melindungi Anda dari mengulangi eksperimen yang sama enam bulan kemudian.

---

## 3. Worked Example: Menerjemahkan Instruksi PI

Mari kita kerjakan email PI langkah demi langkah, membangun protokol yang baru saja kita bahas.

### 3.1 Membaca Instruksi secara Kritis

Instruksi: *"Ubah loss jadi focal, freeze conv1, bandingkan dengan baseline."*

Ambiguitas yang harus Anda ajukan ke PI (lewat pesan singkat atau di pertemuan mingguan):

- **"Focal loss"**: versi asli Lin et al. 2017 (γ, α) atau variannya? Nilai γ berapa? α dipakai atau tidak?
- **"Conv1"**: layer `conv1` dalam arti kode mana? Jika backbone ResNet-18, `conv1` adalah layer pertama 7×7; jika SimpleCNN kita, tidak ada atribut bernama `conv1` (kita pakai `block1`). Konfirmasi yang dimaksud.
- **"Bandingkan"**: berapa seed, berapa epoch, metrik mana yang menentukan?
- **"Baseline"**: konfigurasi mana persisnya? Apakah baseline yang ada di repo sudah pakai augmentasi, atau polos?

Jika PI sibuk dan jawabannya singkat ("pakai default"), Anda *menulis asumsi Anda* di protokol dan kirim satu kalimat konfirmasi: "OK, saya ambil γ=2.0, 3 seed, 20 epoch, metrik utama F1 kelas minor - beri tahu jika ingin lain." Ini memberi PI satu kesempatan menolak asumsi salah, dan memberi Anda jejak tertulis ketika nanti perlu menjelaskan pilihan.

### 3.2 Menulis Protokol

Hasil konfirmasi → protokol di bagian 2.2 di atas. Perhatikan bagaimana protokol menutup seluruh ambiguitas: γ ditetapkan, seed ditentukan, metrik urut prioritasnya, waktu diperkirakan.

### 3.3 Menulis Kode Modifikasi

```python
# losses.py
import torch
import torch.nn as nn
import torch.nn.functional as F

class FocalLoss(nn.Module):
    """Focal loss multi-kelas. Formula: L = -(1 - p_t)^gamma * log(p_t).
    
    gamma=0 → ekuivalen cross-entropy.
    gamma>0 → menurunkan bobot sampel mudah (p_t besar),
              menaikkan pengaruh sampel sulit (p_t kecil).
    """
    def __init__(self, gamma: float = 2.0, weight: torch.Tensor | None = None):
        super().__init__()
        self.gamma = gamma
        self.weight = weight

    def forward(self, logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:
        ce = F.cross_entropy(logits, targets, weight=self.weight, reduction='none')
        pt = torch.exp(-ce)                    # p_t = prob prediksi kelas benar
        focal = ((1 - pt) ** self.gamma) * ce
        return focal.mean()
```

```python
# train.py, bagian freeze
def freeze_module(module: nn.Module) -> None:
    """Set requires_grad=False untuk seluruh parameter di module.
    Panggil ini setelah model dibuat, sebelum optimizer dibuat."""
    for p in module.parameters():
        p.requires_grad = False

# Penggunaan:
model = SimpleCNN()
if args.freeze_block1:
    freeze_module(model.block1)

# Optimizer hanya mendapat parameter yang trainable:
trainable = [p for p in model.parameters() if p.requires_grad]
optimizer = torch.optim.AdamW(trainable, lr=3e-4, weight_decay=1e-4)
```

Dua pelajaran implementasi:

1. `**FocalLoss` ditulis dengan dokumentasi alasan, bukan apa.** Komentar `gamma=0 → cross-entropy` memberi verifikasi cepat; ketika γ=0, hasil harus sama persis dengan baseline - ini uji minimal yang mudah untuk memastikan tidak ada bug.
2. **Optimizer hanya diberi parameter trainable.** Ini lebih dari kosmetik: beberapa optimizer (termasuk AdamW) mempertahankan state per parameter; memasukkan parameter frozen akan membuang memori dan sedikit waktu. Lebih penting, filter ini membuat niat kode eksplisit.

### 3.4 Menjalankan dan Melaporkan

Enam run total. Simpan log dalam folder per-eksperimen. Setelah selesai, buat tabel agregat:


| Kondisi       | F1 minor (mean ± std) | Acc keseluruhan | Train/val gap |
| ------------- | --------------------- | --------------- | ------------- |
| Baseline (CE) | 0.612 ± 0.018         | 0.781 ± 0.007   | 0.09          |
| Focal+Freeze  | 0.672 ± 0.014         | 0.774 ± 0.011   | 0.11          |


Interpretasi (tulis sebelum PI bertanya):

- **H1 terkonfirmasi.** F1 minor naik 6 poin, melampaui ambang 3 poin. Ketiga seed konsisten (std kecil).
- **H2 terkonfirmasi.** Akurasi turun 0.7 poin, di bawah ambang 1 poin. Trade-off yang dapat diterima.
- **Catatan pengamanan.** Train/val gap naik tipis (0.09 → 0.11), sinyal awal overfitting lebih tinggi pada varian focal. Perlu dipantau jika melanjutkan ke dataset lebih besar.
- **Langkah berikutnya yang diusulkan.** Gamma sweep (γ ∈ {1.0, 2.0, 3.0}) untuk mencari titik optimal; mencoba freeze parsial (hanya conv, bukan BN).

Laporan satu paragraf seperti di atas memberi PI informasi yang bisa dia pakai untuk keputusan berikutnya. Bandingkan dengan "baseline 78.4%, mod 80.1%, naik 1.7%" di Cara A.

---

## 4. Pitfalls & Miskonsepsi

**Menjalankan satu seed dan menarik kesimpulan.** Ini paling umum. Satu run adalah satu titik data di distribusi run yang mungkin. Minimal tiga seed.

**Mengubah baseline di tengah jalan.** Anda mulai dengan baseline A, menjalankan modifikasi B, akurasi B ternyata lebih rendah. Lalu Anda "memperbaiki" baseline (mengganti lr, menambah augmentasi) dan ternyata baseline sekarang kompetitif. Masalahnya: Anda tidak lagi punya pembanding yang adil. Jika baseline perlu diubah, ubah dulu, *lalu* jalankan modifikasi.

**Memilih metrik setelah melihat hasil.** Anda berharap focal loss menaikkan akurasi; akurasi ternyata stagnan, tetapi F1 kelas minor naik. Anda "menyadari" F1 adalah metrik yang tepat. Ini konfirmasi bias. Metrik dipilih di protokol, sebelum run. Boleh menambahkan metrik baru sebagai pengamatan, tetapi metrik utama tetap yang ditulis lebih dulu.

**Membandingkan run dengan epoch berbeda.** Baseline di-train 20 epoch; modifikasi 25 epoch "karena modelnya lebih rumit". Sekarang Anda membandingkan dua hal sekaligus (modifikasi + training lebih lama). Pisahkan.

**Tidak menulis hipotesis sama sekali.** Tanpa hipotesis, setiap hasil "menarik". Dengan hipotesis, hasil terbagi jelas menjadi konfirmasi, sanggahan, atau kebetulan - dan Anda tahu apa langkah selanjutnya di masing-masing kasus.

**Menyembunyikan ablation yang "gagal".** Anda menjalankan sepuluh eksperimen; sembilan tidak bekerja, satu iya. Laporan hanya menampilkan yang berhasil. Ini menyesatkan PI dan masa depan diri Anda sendiri. Laporkan semua yang Anda jalankan; ablation yang gagal sering lebih informatif daripada yang berhasil.

---

## 5. Lab 2 - Focal Loss + Freeze Layer dengan Ablation

Buka [Lab 2 - Focal Loss dan Freeze Layer](template_repo/notebooks/lab2_loss_freeze_ablation.ipynb).

Tugas:

1. Tulis `protocol.md` di `experiments/lab2/` dengan lima bagian (variabel, hipotesis, metrik, eksekusi, waktu) *sebelum* menyentuh kode training.
2. Implementasi `FocalLoss` di [src/losses.py](template_repo/src/losses.py), sertakan uji: ketika γ=0 hasilnya identik dengan `CrossEntropyLoss`.
3. Jalankan enam run (3 seed × 2 kondisi) memakai `SimpleCNN` pada CIFAR-10.
4. Hasilkan tabel agregat dan plot F1 per kelas (baseline vs focal+freeze).
5. Tulis laporan singkat (1 halaman): hipotesis, hasil, interpretasi, langkah berikutnya.

**Checklist verifikasi**:

- `protocol.md` ditulis *sebelum* run pertama (periksa timestamp).
- FocalLoss dengan γ=0 reproduksi tepat baseline (selisih akurasi < 0.1%).
- Enam run selesai, metrik tersimpan dalam `results.csv`.
- Laporan mengacu spesifik pada hipotesis; hasil dinyatakan sebagai konfirmasi atau sanggahan, bukan netral.
- Ablation yang tidak direncanakan (jika ada) dijelaskan motivasinya.

---

## Komponen Mandiri (Pekan 4)

**Konsep yang dilatih:** Merancang eksperimen dengan variabel, hipotesis *falsifiable*, baseline yang adil, dan metrik - semuanya ditentukan sebelum menyentuh kode.

Pilih **satu jalur** di bawah. Catat pilihan dan hasilnya di `notebooks/portofolio_mandiri.ipynb` pada entri Pekan 4. Di awal sesi Pekan 5, ada slot 10 menit per orang untuk mempresentasikan: apa yang dikerjakan, apa yang ditemukan, apa yang akan diubah. Ini adalah entri portofolio pertama; bagian "Koneksi ke pekan sebelumnya" bisa diisi dengan motivasi mengapa Anda memilih jalur ini.

| Jalur | Fokus Skill | Tugas |
|-------|-------------|-------|
| **A - Implementasi** | Membangun dan menguji | Implementasikan satu *loss function* yang berbeda dari yang dibahas di bab ini - misalnya `LabelSmoothingCrossEntropy` atau `DiceLoss` - pada CIFAR-10. Tulis protokol satu halaman (lima bagian) *sebelum* menjalankan kode. Laporkan apakah hipotesis terkonfirmasi, disanggah, atau tidak konklusif. |
| **B - Analisis** | Mengamati dan menginterpretasi | Ambil tiga paper klasifikasi gambar dari arXiv atau Google Scholar. Untuk masing-masing, identifikasi: variabel apa yang diuji, baseline apa yang dipakai, dan hipotesis apa yang tersirat (meski tidak ditulis eksplisit). Buat tabel perbandingan dan simpulkan: pola rancangan eksperimen mana yang paling sering diabaikan? |
| **C - Desain** | Merancang dan mengargumentasi | Pilih satu dataset klasifikasi publik (selain CIFAR-10) dari HuggingFace atau Kaggle. Tulis protokol eksperimen lengkap - lima bagian: variabel, hipotesis, metrik, eksekusi, waktu - *tanpa harus menjalankannya*. Justifikasi setiap pilihan desain: mengapa metrik ini, mengapa baseline ini, mengapa delta threshold ini. |

**Deliverable:** Entri portofolio Pekan 4 terisi di `notebooks/portofolio_mandiri.ipynb`. Siap presentasi 10 menit di awal Pekan 5.

---

## 6. Refleksi

1. Anda menemukan bahwa baseline di repo riset lab Anda memakai `lr=1e-3`, padahal pengalaman Anda bilang `3e-4` lebih stabil dengan AdamW. Anda ingin membandingkan focal loss dengan baseline. Tuliskan dua rencana eksperimen alternatif untuk menangani diskrepansi ini, beserta argumen kapan masing-masing lebih tepat.
2. Hipotesis Anda gagal: F1 kelas minor tidak naik, akurasi keseluruhan turun. Apa tiga pertanyaan berikutnya yang akan Anda kejar? Urutkan dari yang paling murah (tidak perlu training baru) ke yang paling mahal.
3. Dosen pembimbing meminta Anda "cari teknik mitigasi imbalance yang paling ampuh untuk dataset kita". Instruksi ini jauh lebih terbuka daripada email di bagian 1. Tulis lima pertanyaan klarifikasi yang paling penting Anda ajukan *sebelum* memilih teknik apapun.

---

## 7. Bacaan Lanjutan

- **Sebastian Raschka - *Model Evaluation, Model Selection, and Algorithm Selection in Machine Learning*** (2018). Paper panjang tetapi bagian 1-3 saja sudah cukup untuk memperdalam intuisi tentang replikasi dan baseline yang adil.
- **Hullman & Gelman - *Designing for Interactive Exploratory Data Analysis Requires Theories of Graphical Inference*** (2021). Relevan untuk poin "hipotesis sebelum melihat data"; argumennya cocok juga ke evaluasi model.
- **Henderson et al. - *Deep Reinforcement Learning That Matters*** (AAAI 2018). Studi kasus tentang betapa noise-nya laporan RL tanpa replikasi; pelajarannya berlaku luas.

---

## Lanjut ke Bab 03

Anda kini bisa merancang eksperimen yang *layak* dijalankan. Pertanyaan berikutnya: ketika hasil keluar, apakah mahasiswa lain - atau diri Anda sendiri tiga bulan kemudian - dapat mereproduksi hasil yang sama? Bab 03 membahas reproduksibilitas: konfigurasi, seed, logging, dan checkpoint sebagai kebiasaan yang menyelamatkan waktu dan menyelamatkan kejujuran hasil.

Buka [Bab 03 - Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) ketika siap.