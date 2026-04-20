<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| 04 | [Validasi Data](04_Validasi_Data.md) | 7 |
| ▶ 05 | AI Tools Sebagai Pendukung | 8 |
| 06 | [Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 05 · AI Tools Sebagai Pendukung Riset

> *LLM adalah rubber duck yang sangat cerdas, bukan oracle. Ia menambah kecepatan Anda, bukan menggantikan pemahaman Anda. Ketika hasil akhir ditandatangani dengan namamu, penjelasan yang menyertainya juga harus milikmu sepenuhnya.*

---

## 0. Peta Bab

Bab ini membahas cara memakai *large language model* - ChatGPT, Claude, Copilot, Cursor - dan asisten pemrograman lain untuk mempercepat kerja riset tanpa menyerahkan pemahaman dan tanggung jawab. Anda akan belajar memisahkan tugas yang cocok untuk LLM dari yang berbahaya dijadikan *outsource*, menulis *prompt* yang menghasilkan bantuan presisi, menjalankan protokol verifikasi yang memastikan setiap output dapat dipertanggungjawabkan, dan memakai LLM untuk tugas riset non-kode (membaca paper, mendiskusikan hipotesis, interpretasi awal). Setelah bab ini, Anda punya alur kerja yang memakai AI tools secara produktif tetapi memperkuat - bukan melemahkan - kemampuan teknis Anda sendiri.

**Lab ekstensi opsional.** Selain Lab 5 wajib (LLM-assisted implementation loop), Bab ini menawarkan Lab 5b (`notebooks/lab5b_domain_teks.ipynb`) - klasifikasi sentimen teks bahasa Indonesia memakai dataset IndoNLU SmSA. Lab 5b berfungsi sebagai jembatan ke dunia di luar gambar: Anda akan berlatih memindahkan kerangka tensor input → output dari domain visi (Bab 01) ke teks, dan melihat bagaimana LLM membantu memahami library NLP yang belum familiar. Ambil Lab 5b bila jadwal Pekan 8 longgar, atau tunda ke pekan refleksi akhir semester.

---

## 1. Motivasi: Dua Cara Memakai LLM

**Cara A - operator prompt.** Anda menerima tugas "implementasikan training loop dengan early stopping". Anda ketik prompt panjang ke ChatGPT: "write a PyTorch training loop with early stopping, tensorboard logging, checkpoint saving, and type hints". Output 80 baris kode keluar. Anda tempel ke `train.py`. Beberapa run ternyata menyimpan checkpoint yang salah; Anda tidak tahu mengapa; Anda ketik prompt baru: "the checkpoint doesn't load, please fix"; ChatGPT menghasilkan kode baru yang agak berbeda. Siklus berulang. Pada saat pekerjaan selesai, Anda tidak bisa menjelaskan mengapa pilihan tertentu dibuat.

**Cara B - kolaborator.** Anda baca draft `train.py` Anda sendiri, mengidentifikasi bagian yang terasa repetitif (penulisan log, penyimpanan checkpoint). Anda minta LLM: "berikan skeleton early stopping yang mempertahankan signature fungsi `train_one_epoch(model, loader, criterion, optimizer)` saya; cukup potongan utilitas, bukan loop penuh". Output 15 baris. Anda baca baris per baris, memahami, memodifikasi variabel nama agar cocok dengan konvensi kode Anda, menambahkan satu assert yang memastikan state `best_val_loss` diperbarui. Anda commit. Ketika nanti ada bug, Anda tahu tepatnya 15 baris mana yang perlu diperiksa.

Perbedaan kedua cara bukan kecerdasan atau produktivitas jangka pendek. Perbedaannya adalah *kapabilitas* yang terbangun. Cara A menghasilkan kode yang jalan hari ini; Cara B menghasilkan pemrogram yang lebih baik enam bulan dari sekarang.

Bab ini melatih Cara B menjadi default.

---

## 2. Konsep Inti

### 2.1 Apa yang LLM Baik dan Kurang Baik

Setelah jutaan interaksi kolektif, komunitas riset telah mengumpulkan konsensus tentang kekuatan dan keterbatasan LLM untuk pekerjaan teknis.

**LLM baik untuk:**

- **Boilerplate berulang.** Menulis argparse, skeleton kelas, one-liner pandas. Anda tahu apa yang Anda inginkan, LLM mempercepat pengetikan.
- **Menjelaskan kode atau error.** "Apa arti pesan error RuntimeError ini?" sering menghasilkan penjelasan yang lebih cepat daripada googling. "Apa yang dilakukan fungsi ini?" berguna ketika membaca kode orang lain.
- **Konversi format.** Mengubah YAML ke dict Python, JSON ke CSV, skema SQL ke migration. Tugas yang mekanis.
- **Menyarankan nama.** Meminta "5 alternatif nama yang lebih deskriptif untuk variabel ini" sering menghasilkan pilihan yang tidak terpikir.
- **Memo pertama dokumentasi.** Draft docstring atau README awal; Anda edit dan rapikan.
- **Exploring API yang tidak familiar.** "Bagaimana cara melakukan X di library Y?" menghasilkan contoh yang bisa Anda uji dan pelajari.

**LLM kurang baik untuk:**

- **Logika yang halus.** LLM sering menghasilkan kode yang *terlihat* benar tetapi punya bug subtle: off-by-one, boundary case tidak ditangani, race condition. Semakin kritis logikanya, semakin penting Anda yang menulis.
- **Memilih hyperparameter spesifik.** "Learning rate apa yang paling baik untuk tugas saya?" akan menghasilkan tebakan yang terdengar meyakinkan tetapi tidak berdasarkan data Anda.
- **Interpretasi hasil eksperimen.** "Mengapa akurasi saya 78%?" tidak bisa dijawab LLM tanpa akses ke konteks penuh. Interpretasi adalah pekerjaan Anda.
- **Klaim yang memerlukan presisi.** LLM bisa *membuat-buat* referensi ("Paper Smith et al. 2019 membahas ini") yang tidak ada. Setiap klaim sumber harus diverifikasi.
- **Kode keamanan-kritis.** Kode yang menangani kredensial, otentikasi, atau input dari internet. Kesalahan di sini punya konsekuensi serius.
- **Memutuskan arsitektur proyek.** "Bagaimana saya sebaiknya menyusun proyek ini?" menghasilkan saran generik; keputusan arsitektur memerlukan pemahaman konstraint spesifik yang tidak bisa diringkas dalam prompt.

Aturan praktisnya: LLM sangat efektif dalam mempercepat *eksekusi* tugas yang sudah Anda pahami, namun kurang efektif dalam *pengambilan keputusan* yang belum Anda kuasai.

### 2.2 Prompt yang Menghasilkan Bantuan Presisi

Prompt yang buruk menghasilkan output panjang, generik, dan sulit diverifikasi. Prompt yang baik membatasi scope dan memberi konteks yang cukup agar output relevan.

**Pola prompt yang bekerja:**

1. **Konteks ringkas.** Satu atau dua kalimat tentang proyek dan tujuan.
2. **Ruang lingkup eksplisit.** Apa yang Anda inginkan, apa yang tidak.
3. **Contoh input/output.** Dua atau tiga jika bentuk output tidak trivial.
4. **Batasan teknis.** Versi library, gaya kode, konstraint (tidak ada library tambahan, harus compatible dengan Python 3.10, dll).

Contoh kontras:

*Prompt buruk:*
> "implement focal loss in PyTorch"

*Prompt baik:*
> Saya sedang menulis `src/losses.py` untuk modul kuliah PyTorch. Saya ingin kelas `FocalLoss(nn.Module)` multi-class (bukan binary), dengan parameter `gamma: float = 2.0` dan `weight: Tensor | None`. Harus compatible dengan `torch.nn.CrossEntropyLoss` sebagai drop-in replacement - signature `forward(logits, targets)` dengan `logits` berbentuk `(N, C)` dan `targets` berbentuk `(N,)`. Gunakan `F.cross_entropy(..., reduction='none')` internal agar pembobotan kelas bekerja. Sertakan docstring satu paragraf yang menjelaskan formula dan kapan dipakai. Tidak perlu unit test.

Prompt kedua menghasilkan 20 baris yang langsung dapat Anda baca, modifikasi, dan tempel. Prompt pertama menghasilkan 50+ baris dengan keputusan-keputusan yang Anda tidak minta.

Untuk debugging error:

*Prompt buruk:*
> "my code doesn't work, here's the error"

*Prompt baik:*
> Saya dapat error berikut ketika menjalankan `python -m src.train --config configs/focal.yaml`:
> ```
> RuntimeError: CUDA error: device-side assert triggered
> ...
> ```
> Saya menduga ini terkait pemilihan kelas di loss saya. Berikut kode `FocalLoss.forward`:
> ```python
> ...
> ```
> Dan berikut konfigurasi dataset saya:
> ```yaml
> num_classes: 9
> ```
> Mohon jelaskan penyebab paling mungkin dan bagaimana mendiagnosis, bukan langsung memberi kode pengganti.

Kunci: *minta diagnosis, bukan ganti*. Output diagnosis membuat Anda belajar; output penggantian kode membuat Anda bergantung.

### 2.3 Protokol Verifikasi: Tiga Lapis

Setiap output LLM yang Anda masukkan ke kode Anda harus melewati tiga lapis verifikasi, dari murah ke mahal.

**Lapis 1 - Baca baris per baris.** Sebelum commit, baca output dari atas ke bawah. Jangan sekadar skim. Pertanyaan untuk tiap blok:
- Apa yang dilakukan?
- Apakah saya bisa menulisnya sendiri jika diminta?
- Apakah ada identifier yang tidak saya kenali? (Jika ya, cari dokumentasinya.)
- Apakah ada asumsi implicit? (Dimensi tensor, tipe data, nilai default.)

**Lapis 2 - Uji minimal.** Bagian terpenting: jalankan kode pada kasus yang Anda tahu jawabannya.
- `FocalLoss(gamma=0)` harus identik dengan `CrossEntropyLoss`.
- Fungsi normalisasi dengan input konstan harus menghasilkan output nol.
- Loader dengan `batch_size=1` dan shuffle=False harus menghasilkan sampel yang sama di tiap panggilan.

Uji minimal bukan unit test lengkap; mereka adalah *sanity check* yang harus Anda lakukan *sebelum* kode dianggap layak pakai.

**Lapis 3 - Integrasi dan cross-check.** Jalankan di pipeline aslinya, bandingkan dengan baseline yang sudah Anda verifikasi. Jika Anda mengganti implementasi loss, akurasi pada seed yang sama harus sama (jika fungsinya ekuivalen) atau berbeda dengan alasan yang dapat dijelaskan.

Lapis mana yang dilewati = kode yang tidak dipercaya.

### 2.4 Mencatat Interaksi LLM

Rubrik di Bab 11 menilai "penggunaan AI tools" sebagian berdasarkan *dokumentasi* interaksi Anda. Bukan karena dokumentasi itu sendiri berharga, tetapi karena tindakan mencatat memaksa refleksi tentang proses.

Format minimal untuk setiap interaksi LLM yang menghasilkan kode yang masuk ke repo:

```markdown
## 2025-10-18 - FocalLoss implementation

**Tool:** ChatGPT-4o
**Goal:** Kerangka kelas FocalLoss multi-class untuk src/losses.py.

**Prompt:** [lihat section 2.2 contoh "prompt baik"]

**Output ringkas:** 22 baris kode; kelas FocalLoss dengan forward memakai
F.cross_entropy(reduction='none') lalu ((1-pt)**gamma * ce).mean().

**Modifikasi saya:** 
- Ganti nama argumen `weight` jadi `class_weights` untuk konsisten dengan
  kode proyek.
- Tambahkan assert untuk dim logits (harus 2D).
- Tambahkan uji minimal: gamma=0 reproduksi CrossEntropyLoss (commit abc123).

**Catatan:** Output awal pakai `torch.gather` manual yang lebih verbose;
saya minta versi ringkas dengan F.cross_entropy. Lebih mudah dibaca.
```

Catatan ini disimpan di folder eksperimen atau di `docs/llm_log.md`. Tidak perlu mewah; penting jujur.

### 2.5 Copilot dan Inline Completion

*Copilot*, *Cursor*, atau fitur serupa menyarankan kode saat Anda mengetik. Interaksi berbeda dari chat karena lebih cepat dan lebih halus - Anda bisa menerima saran dengan satu tombol tanpa refleksi.

Bahaya utama Copilot: *autocomplete drift*. Setiap saran terlihat kecil, tetapi akumulasi ratusan saran mengubah gaya kode Anda menjadi rata-rata kode dunia, bukan gaya yang Anda pilih sengaja. Beberapa strategi:

- **Aktifkan hanya saat Anda menulis kode yang Anda sudah tahu.** Matikan saat mempelajari library baru - suggestion akan mendahului pemahaman Anda.
- **Tolak saran multi-baris kecuali Anda menyetujui tiap baris.** Copilot sering menyarankan blok 10 baris; menerimanya buta adalah memasukkan kode yang belum Anda baca.
- **Periksa import tersembunyi.** Saran sering memakai library yang Copilot asumsikan tersedia. Periksa `pyproject.toml` atau `requirements.txt`; Anda mungkin tidak sadar menambah dependency.

### 2.6 LLM untuk Tugas Riset - Bukan Hanya Kode

Sebagian besar panduan pemakaian LLM di konteks teknis berfokus pada coding. Tetapi asisten riset menghabiskan sebagian besar waktunya pada aktivitas lain: membaca paper, merumuskan hipotesis, mendiskusikan interpretasi hasil, dan menulis. LLM sangat efektif sebagai *sparring partner* untuk aktivitas ini - asal protokol verifikasi tetap dijaga.

**Merangkum paper baru**

Saat membaca paper yang padat, coba: tempel abstrak + introduction ke LLM, lalu minta:
> "Ringkas kontribusi utama paper ini dalam tiga poin. Untuk tiap poin, tunjukkan kalimat di abstrak yang mendukung klaim itu."

Dua keuntungan: Anda mendapat ringkasan cepat *dan* LLM menunjukkan bukti klaim-nya di teks sumber, sehingga mudah diverifikasi. Jika LLM membuat klaim yang tidak ada di abstrak, itu sinyal *hallucination*.

Lanjutkan dengan: "Bagian mana dari paper ini yang paling mungkin tidak berlaku untuk dataset medis kecil (< 5.000 sampel)?"  Pertanyaan kontrafaktual memaksa pemikiran kritis tentang asumsi paper.

**Mendiskusikan hipotesis**

Setelah menulis hipotesis untuk pre-reg Anda (Bab 02), coba:
> "Saya memiliki hipotesis berikut: [tulis hipotesis]. Berikan tiga argumen terkuat *melawan* hipotesis ini, yaitu kondisi di mana hipotesis ini akan gagal."

LLM sangat efektif sebagai *devil's advocate*. Ia tidak malu mengemukakan keberatan. Gunakan hasilnya bukan untuk mengubah hipotesis, tetapi untuk memperkuat bagian "Kondisi Revisi Pre-Reg" di template Anda.

**Interpretasi hasil awal**

Setelah eksperimen selesai, coba:
> "Berikut training curve eksperimen saya [deskripsi kurva: val_acc stagnan di epoch 8-15, kemudian naik lagi]. Sebutkan 3 hipotesis mekanis yang mungkin menjelaskan pola ini, dari yang paling sampai kurang mungkin."

Ini berbeda dari meminta LLM untuk *menginterpretasi* hasil Anda - LLM menghasilkan hipotesis, Anda yang memilih mana yang masuk akal berdasarkan pengetahuan tentang dataset dan arsitektur Anda.

**Batas yang penting**

- **Jangan** minta LLM untuk menyimpulkan apakah eksperimen Anda "berhasil" atau "membuktikan hipotesis". Interpretasi adalah pekerjaan Anda.
- **Jangan** memasukkan hasil numerik riil ke LLM jika itu data sensitif (mis. data pasien, data komersial).
- **Verifikasi** semua referensi paper yang LLM sebut. LLM sering *mengarang* penulis, judul, dan tahun yang terdengar plausibel.
- LLM tidak memiliki akses ke paper terbaru (biasanya tertinggal 6-12 bulan). Untuk paper 2024-2025, cek langsung arXiv.

### 2.7 Menyusun Alur Kerja Harian

Contoh alur kerja yang produktif dan sehat:

```
Pagi (90 menit):
- Baca ulang protokol eksperimen Anda (Bab 02).
- Tulis pseudocode manual untuk komponen baru yang Anda rencanakan.
- Review git diff dari sesi kemarin - pastikan Anda masih memahami
  semua yang Anda tulis.

Siang (2 jam):
- Implementasi komponen. Tulis sendiri bagian logika inti.
  Pakai LLM untuk: boilerplate argparse, konversi format, docstring.
- Commit kecil-kecil dengan pesan yang jelas.

Sore (1 jam):
- Debug dengan LLM: tempel error, minta diagnosis (bukan perbaikan).
- Terapkan perbaikan sendiri setelah Anda mengerti penyebab.
- Update log LLM dan log eksperimen harian.

Akhir hari (15 menit):
- Tulis satu paragraf: apa yang saya pelajari hari ini yang tidak
  saya tahu kemarin?
```

Alur ini tidak kaku; sesuaikan dengan ritme Anda. Prinsipnya: LLM menambah, tidak menggantikan, waktu kerja-sendiri.

---

## 3. Worked Example: Menambah Mixup Augmentation dengan Bantuan LLM

Tujuan: menambah teknik *mixup* (Zhang et al., 2018) ke pipeline Lab 3 - sebuah teknik augmentasi yang membuat batch dari kombinasi linear dua sampel dengan label-nya juga dikombinasikan. Anda tidak pernah mengimplementasikan ini sebelumnya, tetapi Anda tahu konsepnya dari paper.

### 3.1 Tahap 1: Menulis Pseudocode Manual

Sebelum prompt apapun, tulis niat di kertas atau komentar:

```python
# Mixup: untuk tiap batch, sample lambda ~ Beta(alpha, alpha).
# Permutasi batch secara acak; mix input: x_mix = lambda*x + (1-lambda)*x[perm]
# Label jadi soft: untuk loss, hitung CE pada x_mix dengan target original (y)
# dan dengan target permutasi (y[perm]), ambil kombinasi lambda.
# Hanya dipakai di training, bukan validation.
```

Menulis ini memaksa Anda memahami mekanisme sebelum minta bantuan.

### 3.2 Tahap 2: Prompt yang Presisi

```
Saya sedang menambah mixup augmentation ke training loop PyTorch.
Saya sudah paham konsepnya (sample lambda, permute batch, mix input,
loss = lambda*CE(y) + (1-lambda)*CE(y[perm])).

Mohon berikan:
1. Fungsi `mixup_batch(x, y, alpha=0.2) -> (x_mix, y_a, y_b, lam)`.
2. Modifikasi minimal pada fungsi `train_one_epoch` berikut untuk
   mengintegrasikan mixup hanya di training:
   
   [tempel 10 baris train_one_epoch saya]

Konstraint:
- Tidak menambah dependency baru.
- Signature luar `train_one_epoch` tidak berubah.
- Berikan komentar singkat pada dua baris yang paling mudah keliru.

Jangan beri kode test.
```

### 3.3 Tahap 3: Membaca Output

Berikut transkrip nyata (disunting ringan) dari sesi Claude pada April 2026, menampilkan empat giliran percakapan - prompt awal, pertanyaan klarifikasi dari LLM, jawaban, dan output akhir. Pola ini lebih realistis daripada "satu prompt menghasilkan kode sempurna".

<details>
<summary>📝 Transkrip: 4 giliran, ~3 menit (klik untuk buka)</summary>

> **Mahasiswa (giliran 1):**
> [prompt di bagian 3.2 di-paste]
>
> **Claude (giliran 1):**
> Sebelum saya tulis `mixup_batch`, ada dua keputusan yang memengaruhi kode: (a) Anda pakai `numpy.random` atau `torch.distributions` untuk sampling Beta? Untuk reproduksibilitas dengan `torch.manual_seed`, `torch.distributions.Beta` lebih aman. (b) `alpha=0.2` adalah default Zhang et al.; confirm atau Anda sedang eksperimen dengan nilai lain?
>
> **Mahasiswa (giliran 2):**
> Torch saja. Alpha default 0.2. Saya juga sedang pakai `CrossEntropyLoss` standar PyTorch.
>
> **Claude (giliran 2):**
> OK. Dengan `CrossEntropyLoss(reduction='mean')`, kombinasi `lam * loss_a + (1-lam) * loss_b` benar - loss tetap mean per-sample. Perhatikan: jika Anda pakai `label_smoothing > 0` di criterion, efek akan menumpuk dengan mixup (keduanya melembutkan target). Itu biasanya *tidak* masalah tetapi saya sebutkan jika Anda ingin membandingkan kontribusi tiap komponen.
>
> [kode di bawah adalah versi final setelah giliran 2]

</details>

Misalkan output (versi final setelah klarifikasi di atas):

```python
def mixup_batch(x, y, alpha=0.2):
    lam = np.random.beta(alpha, alpha) if alpha > 0 else 1.0
    idx = torch.randperm(x.size(0), device=x.device)
    x_mix = lam * x + (1 - lam) * x[idx]
    y_a, y_b = y, y[idx]
    return x_mix, y_a, y_b, lam

def train_one_epoch(model, loader, criterion, optimizer, use_mixup=False):
    model.train()
    total_loss = 0.0
    for xb, yb in loader:
        xb, yb = xb.to(device), yb.to(device)
        optimizer.zero_grad()
        if use_mixup:
            xb, ya, yb_perm, lam = mixup_batch(xb, yb)
            logits = model(xb)
            loss = lam * criterion(logits, ya) + (1 - lam) * criterion(logits, yb_perm)
        else:
            logits = model(xb)
            loss = criterion(logits, yb)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * xb.size(0)
    return total_loss / len(loader.dataset)
```

Baca baris per baris:

- `np.random.beta`: OK, menghasilkan lambda. Tetapi - ini pakai `numpy`, bukan `torch`. Untuk konsistensi seed (Bab 03), sebaiknya `torch`.
- `idx` di device yang sama dengan `x`: bagus, mencegah transfer host-device.
- Kombinasi loss memakai `criterion` yang dipassing: OK, agnostik terhadap pilihan loss.
- `yb` dipakai sebagai nama argumen *dan* variabel permutasi (`yb_perm`). Nama membingungkan.

### 3.4 Tahap 4: Modifikasi dan Uji Minimal

```python
# Revisi: pakai torch, perbaiki naming
def mixup_batch(x: torch.Tensor, y: torch.Tensor, alpha: float = 0.2
                ) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor, float]:
    """Mixup dua sampel per batch posisi. Kembalikan x_mix, label_a, label_b, lam."""
    if alpha <= 0:
        return x, y, y, 1.0
    # Sampling dari Beta(alpha, alpha) pakai torch agar konsisten seed
    lam = float(torch.distributions.Beta(alpha, alpha).sample())
    perm = torch.randperm(x.size(0), device=x.device)
    x_mix = lam * x + (1 - lam) * x[perm]
    return x_mix, y, y[perm], lam
```

Uji minimal:

```python
# Uji 1: alpha=0 harus identitas (tidak ada mix)
x = torch.randn(4, 3, 32, 32)
y = torch.tensor([0, 1, 2, 3])
x_mix, y_a, y_b, lam = mixup_batch(x, y, alpha=0)
assert torch.allclose(x_mix, x)
assert (y_a == y).all() and (y_b == y).all()
assert lam == 1.0

# Uji 2: alpha > 0 menghasilkan lambda di [0, 1]
for _ in range(10):
    _, _, _, lam = mixup_batch(x, y, alpha=0.2)
    assert 0 <= lam <= 1

# Uji 3: target permutasi berbeda dari target asli (dengan alpha>0)
torch.manual_seed(0)
_, y_a, y_b, _ = mixup_batch(x, y, alpha=0.2)
# dengan seed 0, permutasi pasti non-identitas
assert not (y_a == y_b).all()
```

Ketiga uji lolos → kode dianggap benar untuk integrasi. Commit.

### 3.5 Tahap 5: Catat Interaksi

Tulis entry log sesuai template di bagian 2.4. Tiga modifikasi Anda (torch Beta, penamaan, type hints) dicatat - ini adalah bukti ownership.

---

## 4. Pitfalls & Miskonsepsi

**"Kode LLM yang lulus test pasti benar."** Tidak. Test yang Anda tulis mungkin tidak menguji kasus yang rusak. LLM sering menghasilkan kode yang lulus test bodoh tetapi salah di kasus tepi. Uji minimal adalah *syarat perlu*, bukan *syarat cukup*.

**"Saya akan belajar sambil LLM menulis."** Sulit. Pembelajaran terjadi saat Anda menulis, gagal, dan memperbaiki - siklus yang LLM pintas. Jika Anda belajar topik baru, matikan Copilot untuk topik itu. Pakai LLM untuk boilerplate setelahnya.

**"LLM tahu library terbaru."** Seringkali tidak. Model dilatih pada snapshot data, sering tertinggal 6-12 bulan. Saran yang memakai API usang adalah umum. Periksa dokumentasi resmi untuk library yang Anda pakai.

**"Referensi paper yang LLM sebut pasti ada."** LLM sering *mengarang* referensi - penulis, judul, tahun yang terdengar masuk akal tetapi tidak ada. Jangan pernah kutip paper tanpa verifikasi langsung (Google Scholar, arXiv, perpustakaan institusi).

**"Saya akan pakai LLM hanya untuk hal tidak penting."** Definisi "tidak penting" bergeser. Hari ini argparse, besok logging, minggu depan training loop. Tanpa disiplin, keseluruhan kode jadi hasil LLM. Pilih mana *Anda* ingin menulis sendiri, bukan mana yang LLM "boleh" tulis.

**"LLM tidak bisa bohong."** Bisa. Output percaya diri yang salah adalah kegagalan mode LLM yang sangat umum - disebut *hallucination*. Ciri: klaim spesifik (nama fungsi, nomor versi, nilai default) yang tidak dapat diverifikasi dengan cepat. Verifikasi sebelum percaya.

**"Copilot gratis, pakai sebanyak mungkin."** Biaya bukan uang; biaya adalah atrofi skill. Mahasiswa yang terus-menerus menerima saran Copilot tanpa refleksi sering kesulitan menulis kode dari kertas kosong. Gunakan hemat.

---

## 5. Lab 5 - Menambah Fitur ke Repo dengan Protokol LLM

Buka [Lab 5 - LLM-Assisted Development](template_repo/notebooks/lab5_llm_assisted_loop.ipynb).

Tugas:

1. Pilih satu fitur untuk ditambahkan ke `template_repo`:
   - Early stopping berdasarkan val loss.
   - Mixup augmentation (seperti worked example).
   - Gradient clipping untuk stabilitas.
   - Learning rate warmup.
2. Ikuti alur lima tahap: pseudocode manual → prompt presisi → baca output → modifikasi + uji minimal → catat interaksi.
3. Commit pekerjaan Anda dalam dua tahap: commit pertama adalah output LLM verbatim dengan pesan "llm raw"; commit kedua adalah versi Anda dengan pesan "review + modify".
4. Tulis `docs/llm_log.md` yang mencatat interaksi (sesuai template 2.4).
5. Jalankan ablation: dengan fitur vs tanpa fitur, dua seed. Laporkan hasil singkat.

**Checklist verifikasi**:

- [ ] Pseudocode manual ada di komentar sebelum kode implementasi.
- [ ] Commit "llm raw" dan "review + modify" terpisah (lihat `git log`).
- [ ] Uji minimal ada dan lolos (sebagai fungsi terpisah di kode atau notebook).
- [ ] `llm_log.md` berisi prompt, ringkasan output, dan modifikasi Anda.
- [ ] Ablation fitur berjalan; hasilnya dilaporkan ringkas.

---

## 5b. Lab 5b - Klasifikasi Teks: Lintas Domain dari Gambar ke Teks

Semua lab sejauh ini bekerja pada domain gambar. Tetapi ML/DL dipakai di banyak domain - teks, audio, tabular, multi-modal. Lab ini memperkenalkan domain baru agar Anda tidak bergantung pada intuisi visual saja.

Buka [Lab 5b - Domain Teks](template_repo/notebooks/lab5b_domain_teks.ipynb).

**Dataset**: IndoNLU SmSA - *SMS Sentiment Analysis* berbahasa Indonesia (positif / negatif / netral, ~11.000 sampel). Tersedia di HuggingFace; dapat dijalankan di CPU.

**Tugas utama**:

1. **Representasi 1 - Bag of Words + Logistic Regression**: pipeline klasik; `TfidfVectorizer` → `LogisticRegression`. Baseline tanpa GPU.
2. **Representasi 2 - Word Embedding rata-rata**: load `fasttext-id` (50d), rata-ratakan vektor kata, train MLP kecil.
3. **Representasi 3 - Fine-tune BERT kecil**: `indobenchmark/indobert-lite-base-p1` (hanya 2 epoch pada GPU atau Colab).
4. Bandingkan ketiga strategi dalam tabel: akurasi, waktu training, parameter count.
5. Tulis refleksi: dalam konteks Section 2.6 Bab 01, representasi mana yang "engineered", "extracted", dan "learned"?

**Hubungan dengan konsep yang sudah dipelajari**: Tabel representasi ini adalah padanan teks dari Lab 1b (domain gambar). Pola yang sama - tradeoff antara kontrol manusia, kapasitas model, dan kebutuhan data - muncul di semua domain.

**Pertanyaan panduan**:

- Apakah *inductive bias* BoW berbeda dari CNN? Bagaimana ini memengaruhi jenis error yang Anda lihat?
- Jika dataset hanya 500 sampel, representasi mana yang Anda pilih dan mengapa?
- Bagaimana cara mengunci seed untuk reproducibility di pipeline teks? (Petunjuk: `transformers.set_seed`.)

**Checklist verifikasi**:

- [ ] Ketiga representasi berhasil dijalankan dan menghasilkan akurasi yang berbeda.
- [ ] Tabel perbandingan lengkap (akurasi, waktu, parameter count).
- [ ] Refleksi teksonomi representasi (Section 2.6) ditulis.
- [ ] Minimal satu hipotesis tentang domain teks vs gambar yang dapat diuji di masa depan.

---

## Komponen Mandiri (Pekan 8)

**Konsep yang dilatih:** Memakai LLM secara terprotokol - memisahkan tugas yang cocok untuk LLM dari yang tidak, menjalankan verifikasi berlapis, dan mendokumentasikan interaksi.

Pilih **satu jalur** di bawah. Catat pilihan dan hasilnya di `notebooks/portofolio_mandiri.ipynb` pada entri Pekan 8. Di awal sesi Pekan 9, ada slot 10 menit untuk presentasi. Isi bagian "Koneksi": apakah cara Anda memakai LLM berubah dibanding Pekan 4 ketika Anda pertama kali belajar merancang hipotesis?

| Jalur | Fokus Skill | Tugas |
|-------|-------------|-------|
| **A - Implementasi** | Membangun dan menguji | Minta LLM mengimplementasikan satu fitur yang *belum pernah Anda lihat sebelumnya* - bukan mixup atau augmentasi standar. Pilihan: `GradCAM` visualizer sederhana, `EarlyStopping` *callback*, atau `WarmRestartLR` *scheduler*. Jalankan protokol verifikasi 3-layer penuh dan laporkan berapa persen kode yang perlu dimodifikasi. |
| **B - Analisis** | Mengamati dan menginterpretasi | Buat satu *prompt* untuk LLM, lalu modifikasi tiga kali dengan cara berbeda: lebih spesifik, tambahkan contoh, ubah format permintaan. Bandingkan kualitas kode yang dihasilkan. Buat tabel: dimensi kualitas apa yang berubah dengan setiap modifikasi, dan apa yang tetap sama. |
| **C - Desain** | Merancang dan mengargumentasi | Tulis panduan 1 halaman "Kapan pakai LLM, kapan tidak" khusus untuk riset ML. Kategorikan minimal 5 jenis tugas (boilerplate kode, verifikasi matematika, penjelasan paper, debugging, analisis error) dengan justifikasi yang dapat dipertahankan saat ditanya dosen. |

**Deliverable:** Entri portofolio Pekan 8 terisi di `notebooks/portofolio_mandiri.ipynb`. Siap presentasi 10 menit di awal Pekan 9.

---

## 6. Refleksi

1. Bayangkan LLM yang Anda pakai tiba-tiba tidak dapat diakses seminggu. Apa dari pekerjaan Anda sekarang yang berhenti, dan apa yang tetap berjalan? Apa yang pergeseran ini katakan tentang ketergantungan Anda?

2. Anda diminta menulis paper pendek berdasarkan eksperimen di modul ini. Bagian mana dari tulisan itu *pantas* dibantu LLM, dan bagian mana *harus* ditulis sendiri? Berikan kriteria batas yang dapat Anda pakai di proyek lain.

3. Dosen pembimbing bertanya tentang satu fungsi di kode Anda yang sebenarnya ditulis LLM. Anda tidak ingat detailnya. Apa langkah yang paling profesional dalam situasi ini, dan bagaimana melindungi diri dari situasi serupa di masa depan?

4. **Koneksi ke Capstone.** Capstone akan memadatkan banyak kerja dalam 2 minggu; godaan untuk *outsource* ke LLM akan tinggi. Tuliskan "kontrak penggunaan LLM Capstone" untuk diri Anda sendiri: tiga jenis tugas yang *boleh* Anda delegasikan ke LLM, tiga jenis yang *tidak boleh*, dan format dokumentasi apa yang akan Anda pakai agar bisa menjawab pertanyaan dosen tentang bagian kode mana yang dibantu LLM.

---

## 7. Bacaan Lanjutan

- **Simon Willison - *Prompt injection and jailbreaking are not the same thing*** dan tulisannya yang lain di simonwillison.net. Perspektif jernih tentang cara kerja LLM dan batasan praktisnya.
- **Anthropic - *Prompting Guide*** (docs.anthropic.com/prompt-engineering). Panduan resmi Anthropic untuk Claude; prinsipnya berlaku luas untuk LLM lain.
- **Andy Matuschak - *How can we develop transformative tools for thought?*** (esai, 2019). Bacaan filosofis tentang bagaimana alat membentuk pikiran; membantu Anda memikirkan ketergantungan jangka panjang.
- **Peter Norvig - *On Chomsky and the Two Cultures of Statistical Learning*** (2011). Tidak langsung tentang LLM, tetapi fondasi pemikiran tentang apa yang bisa dan tidak bisa dijawab oleh model statistik.

---

## Lanjut ke Bab 06

Anda sekarang punya protokol bekerja dengan AI tools yang menjaga ownership. Keterampilan berikutnya adalah membaca dan memodifikasi kode *orang lain* - repository riset yang sering minim dokumentasi, ditulis dengan gaya berbeda, dan berisi puluhan file yang tidak langsung jelas hubungannya. Kemampuan ini membedakan mahasiswa yang hanya bisa bekerja di kode sendiri dari peneliti yang dapat berdiri di atas bahu orang lain.

Buka [Bab 06 - Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) ketika siap.
