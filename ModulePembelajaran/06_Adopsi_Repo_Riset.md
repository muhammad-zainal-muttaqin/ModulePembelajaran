<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| 04 | [Validasi Data](04_Validasi_Data.md) | 7 |
| 05 | [AI Tools Sebagai Pendukung](05_AI_Tools_Sebagai_Pendukung.md) | 8 |
| ▶ 06 | Adopsi Repo Riset | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 06 · Adopsi Repository Riset

> *Kemampuan membaca kode orang lain dengan cepat adalah penggandaan kekuatan terbesar yang bisa Anda miliki sebagai peneliti. Proyek kuliah boleh dimulai dari nol; riset nyata hampir selalu dimulai dari repo yang sudah ada - dengan puluhan file, konvensi asing, dan README satu paragraf yang tidak cukup.*

---

## 0. Peta Bab

Bab ini membekali Anda untuk membuka repository riset yang belum Anda kenal, memetakan strukturnya dalam hitungan menit bukan hari, menyiapkan environment yang runnable, dan memodifikasi secara minimal-invasif untuk kebutuhan Anda sendiri. Anda akan belajar urutan membaca yang efisien, strategi saat dokumentasi minim, teknik smoke test untuk verifikasi setup, dan pola modifikasi yang aman agar pekerjaanmu bisa di-merge kembali ke repo asli bila perlu. Setelah bab ini, Anda bisa mendarat di proyek asing pada hari Senin dan sudah menjalankan eksperimen sendiri pada hari Jumat.

---

## 1. Motivasi: Dua Minggu yang Seharusnya Empat Jam

Seorang asisten baru di lab menerima tugas: "reproduksi hasil paper X, lalu coba ganti encoder-nya dengan ViT". Link repo dilampirkan. Mahasiswa itu meng-clone, menjalankan `pip install -r requirements.txt`, error. Melacak error, menemukan versi CUDA tidak cocok; reinstall PyTorch. Error lagi, kali ini library `mmcv` minta versi spesifik. Setelah tiga hari gulat dengan setup, akhirnya `python train.py` jalan - tetapi dataset tidak terunduh otomatis, dokumentasi tentang lokasi data tidak ada, mahasiswa harus membaca 400 baris kode data loader untuk menemukan path yang diharapkan. Hari ketujuh, eksperimen baseline akhirnya jalan. Dua minggu berlalu sebelum modifikasi pertama bisa dicoba.

Mahasiswa kedua dapat tugas sama. Ia meluangkan empat jam pertama *tidak menjalankan apa-apa*: membaca README, memeriksa struktur folder, menelusuri `train.py` dari entry point, mencari bagian konfigurasi, memetakan bagaimana data di-load. Ia mencatat pertanyaan-pertanyaan terbuka. Setelah pemahaman peta terbentuk, ia setup environment secara sistematis, menjalankan smoke test dengan dummy data, dan baru mengunduh dataset penuh. Dua hari berikutnya, modifikasi encoder sudah bisa dicoba.

Perbedaan kecepatan tujuh kali lipat bukan karena bakat. Perbedaannya adalah *strategi membaca* sebelum menjalankan. Bab ini memberimu strategi yang sama.

---

## 2. Konsep Inti

### 2.1 Urutan Membaca: Dari Luar ke Dalam

Ketika membuka repo baru, tahan godaan untuk langsung menjalankan. Baca dulu, dengan urutan yang dipikirkan:

**1. README.md.** Baca seluruhnya, bahkan jika pendek. Fokus pada: tujuan proyek, cara install, cara jalan, format data yang diharapkan, link ke paper atau dokumentasi tambahan. Catat apa yang tidak jelas.

**2. Paper atau laporan terkait.** Jika repo adalah hasil paper, baca abstrak + bagian *method*. Anda tidak perlu paham semua detail; tujuan baca adalah mengetahui *apa yang harus ada di kode*: arsitektur utama, loss utama, dataset utama.

**3. Struktur folder.** Dari root, buka file dan direktori satu level. Konvensi umum:

- `src/` atau folder nama proyek: kode inti.
- `configs/`: hyperparameter dan setting.
- `scripts/`: entry point untuk training/evaluasi.
- `data/`: dataset (sering tidak di-commit, hanya skrip download).
- `experiments/` atau `runs/`: hasil eksperimen.
- `tests/`: unit test.
- `notebooks/`: eksplorasi.
- `requirements.txt` atau `environment.yml` atau `pyproject.toml`: dependency.

**4. Entry point.** File yang dijalankan user pertama kali - biasanya `train.py`, `main.py`, atau `scripts/train.sh`. Baca dari atas ke bawah. Cari: parsing argumen, pembuatan model, pembuatan dataset, training loop. Catat panggilan ke file lain.

**5. File model dan loss.** Dari entry point, ikuti jejak ke `models/` dan `losses/`. Baca definisi kelas utama, *jangan* dulu setiap fungsi helper. Cukup tahu input dan output-nya.

**6. Data loader.** Biasanya file yang paling kompleks. Baca sampai Anda mengerti format input (shape, tipe) yang diharapkan model.

**7. Konfigurasi.** Buka satu file config; pahami struktur. Ini memberitahu Anda rentang eksperimen yang didukung repo.

Alokasi waktu tipikal untuk repo ukuran sedang (10-30 file Python): 30-60 menit membaca sebelum `pip install`.

### 2.2 Memetakan Struktur dalam 15 Menit

Setelah langkah 1-3 di atas, Anda bisa menggambar peta singkat. Contoh untuk repo hipotetis:

```
repo/
├── src/
│   ├── data.py          (CIFAR10Dataset, load_cifar)
│   ├── models/
│   │   ├── resnet.py    (ResNet18, dari torchvision)
│   │   └── vit.py       (ViTCustom, kontribusi paper)
│   ├── losses.py        (FocalLoss, SupConLoss)
│   ├── train.py         (ENTRY POINT)
│   └── utils.py         (set_seed, logging helper)
├── configs/
│   ├── baseline.yaml    (ResNet18 + CE)
│   ├── focal.yaml       (ResNet18 + Focal)
│   └── vit.yaml         (ViTCustom + CE)
├── scripts/
│   └── download_data.sh
└── README.md
```

Peta seperti ini memberimu jawaban cepat untuk pertanyaan:

- "Di mana saya mengubah loss?" → `losses.py` dan `configs/*.yaml`.
- "Bagaimana saya ganti backbone jadi ViT?" → `models/vit.py` sudah ada; cek `configs/vit.yaml`.
- "Dataset apa yang dipakai?" → `data.py` + `scripts/download_data.sh`.

Gambarkan peta di kertas atau `notes.md`. Anda akan merujuknya berulang.

### 2.3 Smoke Test Sebelum Training Penuh

Setelah environment terpasang, *jangan* langsung training dengan dataset penuh. Jalankan *smoke test* - versi minimal yang memverifikasi seluruh pipeline jalan tanpa error.

Tiga tingkat smoke test:

**Level 1: Import test.**

```bash
python -c "from src.models import ResNet18; from src.losses import FocalLoss"
```

Jika error di sini, masalah dependency atau path, bukan logika.

**Level 2: Forward pass dengan dummy data.**

```python
import torch
from src.models import ResNet18

model = ResNet18(num_classes=10)
x = torch.randn(2, 3, 32, 32)   # batch 2 dummy
y = model(x)
assert y.shape == (2, 10)
```

Menangkap bug dimensi atau mismatch input/output.

**Level 3: Satu iterasi training.**
Modifikasi entry point untuk menjalankan satu batch, satu backward pass, lalu exit. Banyak repo punya flag `--dry-run` atau `--overfit-one-batch`. Jika tidak ada, tambahkan sendiri:

```python
# Di awal training loop:
if args.dry_run:
    xb, yb = next(iter(loader))
    out = model(xb)
    loss = criterion(out, yb)
    loss.backward()
    optimizer.step()
    print(f"Dry run OK. loss={loss.item():.4f}")
    sys.exit(0)
```

Teknik "overfit one batch" (Karpathy, 2019) lebih kuat: training loop biasa tetapi selalu pada satu batch kecil. Dalam beberapa epoch, loss harus turun ke nol (atau sangat kecil). Jika tidak, ada bug fundamental - bukan di tuning, tetapi di kode.

### 2.4 Menavigasi Kode dengan Cepat

Beberapa teknik pragmatis untuk memahami kode tanpa membaca semuanya:

`**grep` / `rg` untuk menemukan definisi:**

```bash
rg "class ResNet18" src/
rg "def forward" src/models/
rg "CrossEntropyLoss|FocalLoss" src/
```

**Pohon panggilan dengan `grep`:**

```bash
# Siapa yang memanggil build_model?
rg "build_model\(" src/
```

**Search IDE (VS Code: `Ctrl+T`).** Jauh lebih cepat daripada `grep` untuk simbol Python.

**Type checker (`pyright` atau `mypy`):**

```bash
pyright src/
```

Walau kode tidak punya type hints, pyright sering menemukan inkonsistensi yang memberi petunjuk tentang niat.

**Git log untuk memahami evolusi:**

```bash
git log --oneline src/models/vit.py
git log --follow src/losses.py
```

Commit history memberitahu *mengapa* kode menjadi bentuk sekarang - sering jawaban atas "kenapa ada fungsi aneh ini".

`**git blame` untuk menemukan author:**

```bash
git blame src/train.py
```

Jika satu bagian membingungkan, lihat siapa yang menulisnya dan commit apa yang menambahkannya. Pesan commit sering mengandung konteks.

### 2.5 Modifikasi Minimal-Invasif

Saat Anda menambah fitur atau mengubah perilaku, pilih pola yang *tidak mengganggu* kode orang lain. Ini penting untuk:

- Memudahkan *upstream merge* jika repo berubah.
- Membuat pekerjaanmu dapat dibalik (revert) dengan bersih.
- Membuat pull request Anda lebih mudah di-review.

**Pola 1: Tambahkan opsi, jangan ubah default.**

Buruk - mengubah perilaku fungsi yang sudah ada:

```python
# Lama:
def train_one_epoch(model, loader, criterion):
    for xb, yb in loader:
        ...

# Ubah jadi:
def train_one_epoch(model, loader, criterion):
    for xb, yb in loader:
        xb, yb = apply_mixup(xb, yb)   # SELALU mixup sekarang
        ...
```

Baik - tambah argumen dengan default yang mempertahankan perilaku lama:

```python
def train_one_epoch(model, loader, criterion, use_mixup: bool = False):
    for xb, yb in loader:
        if use_mixup:
            xb, yb = apply_mixup(xb, yb)
        ...
```

**Pola 2: Tambahkan file baru, jangan edit banyak file lama.**

Jika fitur Anda melibatkan 200 baris kode, buat `src/mixup.py` baru daripada menyebar perubahan di `train.py`, `data.py`, dan `utils.py`.

**Pola 3: Tambahkan argumen CLI, bukan hardcode.**

```python
# Di argparse:
parser.add_argument('--freeze-blocks', type=str, default='',
                    help='Comma-separated block names to freeze (e.g. "block1,block2")')

# Di main:
if args.freeze_blocks:
    for name in args.freeze_blocks.split(','):
        freeze_module(getattr(model, name.strip()))
```

Fitur yang ter-expose via CLI dapat dimatikan tanpa menyentuh kode lagi.

**Pola 4: Commit kecil dengan pesan jelas.**

Satu commit per perubahan logis. "Add mixup augmentation support" adalah satu commit; "refactor data loader to accept mixup-aware sampler" adalah commit berbeda. Commit kecil memudahkan review dan bisection.

### 2.6 Ketika Dokumentasi Minim atau Tidak Ada

Banyak repo riset hanya punya README satu paragraf. Taktik saat Anda harus bekerja dengannya:

**Baca `requirements.txt` sebagai petunjuk teknologi.** Tergantung library yang dipakai, Anda bisa menebak: `pytorch-lightning` → kode terstruktur rapi per fase; `hydra-core` → config kompleks multi-file; `wandb` → logging di cloud.

**Periksa `tests/` bila ada.** Test sering mendokumentasikan ekspektasi. Satu test yang lulus memberitahu Anda setidaknya satu cara memanggil fungsi yang benar.

**Cari issue dan PR di GitHub.** Pertanyaan dari user lain sering menjawab "bagaimana X dipakai" yang tidak ada di README.

**Coba `--help`.** Banyak repo punya argparse yang dokumentasi-dirinya sendiri. `python train.py --help` sering memberi peta yang cukup.

**Hubungi penulis.** Repo akademik biasanya punya email kontak. Satu pesan singkat dan jujur ("saya mahasiswa, mencoba mereproduksi hasil pada dataset X, stuck di Y") sering dijawab. Berikan konteks yang cukup; jangan minta bantuan generik.

### 2.7 Menyumbang Kembali

Setelah Anda memahami repo cukup baik untuk memodifikasi, Anda juga bisa menyumbang perbaikan kecil. Tiga jenis kontribusi yang hampir selalu diterima:

**Perbaikan dokumentasi.** README, docstring, komentar. Bug paling sering adalah dokumentasi yang keliru atau tidak lengkap. Anda yang baru saja mengadopsi repo paling tahu apa yang membingungkan.

**Perbaikan bug kecil.** Typo, off-by-one, import yang salah, versi library yang di-pin terlalu ketat. Satu PR per perbaikan.

**Fitur yang umum diinginkan.** Jika repo belum punya `--dry-run` atau `set_seed` yang deterministik, tambahkan. Jelaskan motivasi di PR description.

Etika kontribusi: sebelum mengirim PR besar, buka issue dulu menanyakan apakah kontribusi semacam itu akan diterima. Menghemat waktu Anda dan maintainer.

### 2.8 Kategori Error dan Cara Tesnya

Ketika adopsi repo atau eksperimen gagal, respons pertama yang paling sering adalah: "ada yang salah di suatu tempat, coba-coba sampai ketemu". Ini tidak efisien. Lebih cepat untuk mengidentifikasi *kategori* error dulu, karena tiap kategori punya diagnosis yang berbeda.

**Kategori 1: Setup Error** - Environment, dependency, path, atau konfigurasi tidak benar.
Tanda: error saat `import`, `ModuleNotFoundError`, `FileNotFoundError`, CUDA version mismatch.
Langkah test: (1) Jalankan `python -c "import torch; print(torch.__version__)"` dan `import [nama_library]`. (2) Bandingkan output `pip freeze` dengan `requirements.txt`. (3) Cek apakah path dataset di config benar.

**Kategori 2: Data Error** - Dataset tidak ada, format tidak sesuai, leakage, atau preprocessing berbeda dari yang diharapkan model.
Tanda: error di DataLoader, akurasi terlalu tinggi dari awal, loss tidak wajar (terlalu kecil atau NaN langsung).
Langkah test: (1) Print shape dan range nilai dari batch pertama. (2) Visualisasikan 4-8 sampel - pastikan gambar/teks kelihatan wajar. (3) Periksa label: apakah distribusinya masuk akal?

**Kategori 3: Algorithmic Error** - Bug di forward pass, loss function, atau training loop.
Tanda: loss tidak turun sama sekali, NaN loss, prediksi selalu kelas yang sama, gradient nol.
Langkah test: *overfit one batch* - ambil 4 sampel, jalankan 100-200 iterasi hanya pada itu. Model harus mencapai loss mendekati nol. Jika tidak, ada bug di model atau loss.

**Kategori 4: Experiment Error** - Konfigurasi tidak sesuai rancangan: seed tidak di-set, variabel yang seharusnya dikontrol tidak terkontrol, metrik yang dilaporkan bukan yang direncanakan.
Tanda: hasil yang tidak bisa direproduksi, metrik berbeda dari yang ada di pre-registration, kondisi ablation tidak sesuai grid.
Langkah test: Baca ulang pre-registration dan bandingkan dengan config YAML yang benar-benar dipakai. Cek commit hash di checkpoint.

Tabel ringkas untuk referensi cepat:

| Gejala | Kategori Paling Mungkin | Quick Test |
| --- | --- | --- |
| `ImportError` atau `ModuleNotFoundError` | Setup | `pip list` |
| Loss NaN dari epoch pertama | Data atau Algorithmic | Print nilai batch; cek loss_fn |
| Akurasi 99% tanpa training | Data (leakage) | Cek preprocessing |
| Hasil tidak bisa direproduksi | Experiment | Bandingkan config + seed |
| Loss tidak turun sama sekali | Algorithmic atau Setup | Overfit one batch |
| Error saat membaca dataset | Data atau Setup | Print path config |

---

## 3. Worked Example: Mengadopsi Repo Hipotetis `vision-baseline`

Misalkan Anda menerima tugas: *"Gunakan repo `vision-baseline` dari lab kita. Tambahkan opsi memakai focal loss. Hasilkan baseline + ablation pada CIFAR-10."*

### 3.1 Menit 0-15: Pemetaan

Clone repo, buka di editor. Baca README:

> # vision-baseline
>
> Minimal PyTorch training pipeline for image classification.
> Supports CIFAR-10, CIFAR-100, ImageNet-100.
> Install: `pip install -e .`
> Run: `python -m vision_baseline.train --config configs/cifar10.yaml`

Periksa struktur:

```
vision-baseline/
├── vision_baseline/
│   ├── __init__.py
│   ├── data.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── resnet.py
│   ├── train.py
│   └── utils.py
├── configs/
│   └── cifar10.yaml
├── pyproject.toml
└── README.md
```

Tidak ada `losses.py` - loss mungkin di `train.py`. Tidak ada `tests/`. Sepuluh menit membaca: cukup ringkas.

### 3.2 Menit 15-30: Entry Point dan Peta Panggilan

Buka `vision_baseline/train.py`:

```python
def main(cfg):
    set_seed(cfg['seed'])
    model = build_model(cfg['model'])
    train_loader, val_loader = build_dataloaders(cfg['data'])
    criterion = nn.CrossEntropyLoss()       # <-- di sini loss
    optimizer = torch.optim.AdamW(model.parameters(), **cfg['optim'])
    
    for epoch in range(cfg['training']['epochs']):
        train_loss = train_one_epoch(model, train_loader, criterion, optimizer)
        val_acc = evaluate(model, val_loader)
        ...
```

Loss hardcoded sebagai `CrossEntropyLoss`. Ini titik modifikasi.

### 3.3 Menit 30-60: Setup dan Smoke Test

```bash
conda create -n visionbase python=3.10 -y
conda activate visionbase
pip install -e .
```

Test level 1:

```bash
python -c "from vision_baseline.models import build_model"
# OK
```

Test level 3 (dry run):

```bash
python -m vision_baseline.train --config configs/cifar10.yaml --dry-run
```

Flag `--dry-run` tidak ada - Anda tambahkan (pola 3 di bagian 2.5):

```python
# Di argparse
parser.add_argument('--dry-run', action='store_true')

# Di training loop
if args.dry_run:
    xb, yb = next(iter(train_loader))
    loss = criterion(model(xb.to(device)), yb.to(device))
    loss.backward()
    print(f'Dry run OK. loss={loss.item():.4f}')
    return
```

Jalankan ulang: output `Dry run OK. loss=2.31`. Pipeline jalan.

### 3.4 Menit 60-120: Modifikasi Minimal-Invasif

Tambah file baru `vision_baseline/losses.py`:

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class FocalLoss(nn.Module):
    def __init__(self, gamma: float = 2.0):
        super().__init__()
        self.gamma = gamma
    
    def forward(self, logits, targets):
        ce = F.cross_entropy(logits, targets, reduction='none')
        pt = torch.exp(-ce)
        return ((1 - pt) ** self.gamma * ce).mean()

def build_loss(cfg):
    name = cfg.get('name', 'ce')
    if name == 'ce':
        return nn.CrossEntropyLoss()
    if name == 'focal':
        return FocalLoss(gamma=cfg.get('gamma', 2.0))
    raise ValueError(f'Unknown loss: {name}')
```

Ubah `train.py` minimal:

```python
# Lama:
criterion = nn.CrossEntropyLoss()

# Baru:
from vision_baseline.losses import build_loss
criterion = build_loss(cfg.get('loss', {'name': 'ce'}))
```

Gunakan `cfg.get(...)` dengan default - config lama yang tidak punya key `loss` tetap jalan (backward-compatible).

Tambah `configs/cifar10_focal.yaml`:

```yaml
# ... baris-baris lain sama seperti cifar10.yaml
loss:
  name: focal
  gamma: 2.0
```

### 3.5 Menit 120-180: Eksperimen dan Laporan

Jalankan baseline dan focal:

```bash
python -m vision_baseline.train --config configs/cifar10.yaml
python -m vision_baseline.train --config configs/cifar10_focal.yaml
```

Ulangi dengan tiga seed masing-masing (via override CLI). Agregasi hasil. Tulis laporan.

Total: ~3 jam dari clone sampai laporan pertama. Bandingkan dengan "dua minggu" di cerita motivasi.

---

## 4. Pitfalls & Miskonsepsi

**"Saya akan jalankan dulu, baru baca kalau error."** Strategi ini membuatmu terbiasa dengan bentrok permukaan (versi library, path, typo). Anda menghabiskan hari-hari mengatasi masalah yang sebenarnya akan hilang dengan satu jam membaca.

**"Mengedit `train.py` langsung adalah cara tercepat."** Cepat untuk eksperimen sekali, mahal untuk jangka panjang. Setiap perubahan di tengah file besar adalah utang teknis; dalam dua minggu Anda tidak akan ingat mana modifikasi Anda dan mana dari repo asli.

**"PR tidak diterima berarti pekerjaan saya sia-sia."** Tidak. Anda belajar membaca dan memodifikasi kode, yang merupakan skill jangka panjang. PR yang ditolak seringkali tetap dipakai sebagai basis diskusi; maintainer kadang mengambil ide Anda dan mengimplementasi ulang sesuai standar repo.

**"Saya tidak perlu commit lokal sampai semua selesai."** Buruk. Commit kecil sepanjang proses adalah save-point - jika modifikasi Anda merusak sesuatu, Anda bisa `git diff HEAD~3` untuk melihat persis apa yang berubah.

**"Saya bisa selesaikan tanpa smoke test, langsung training penuh."** Training penuh 8 jam yang gagal di menit ke-10 karena bug dimensi adalah delapan jam yang hilang. Smoke test level 3 butuh 30 detik; ia menangkap 80% bug setup.

**"Kode orang lain yang rumit pasti bagus."** Tidak selalu. Kadang kompleksitas adalah tumpukan patch atas bug lama. Jangan ragu menyederhanakan jika Anda memahami alasan aslinya.

**"Versi library yang di-pin di `requirements.txt` harus persis diikuti."** Kadang ya (untuk reproduksi hasil), kadang tidak (jika Anda bekerja di proyek downstream yang perlu versi lebih baru). Baca pin dengan kritis - apakah angka eksperimen yang Anda cari bergantung padanya?

---

## 5. Lab 6 - Mengadopsi dan Memodifikasi Repo Eksternal

Buka [Lab 6 - Adopsi dan Modifikasi Repo Eksternal](template_repo/notebooks/lab6_adopt_external_repo.ipynb).

Tugas:

1. Pilih satu repository klasifikasi image yang sederhana (pytorch/examples/mnist, atau reference implementation Fast.ai beginner). Clone ke folder Anda.
2. Ikuti urutan pembacaan (README → struktur → entry point → model → data → config). Tulis peta satu halaman di `docs/repo_map.md`.
3. Jalankan smoke test tiga level. Jika `--dry-run` tidak ada, tambahkan sendiri dan commit.
4. Tambahkan satu fitur minimal-invasif: pilihan focal loss, atau pilihan freeze layer pertama, atau flag deterministik (set_seed + cudnn.deterministic).
5. Jalankan baseline + variasi Anda (2 kondisi × 2 seed). Laporkan hasil dalam `docs/report.md`.
6. Siapkan draft PR description (tidak perlu benar-benar submit kecuali Anda ingin) yang menjelaskan: motivasi, perubahan, cara pakai, cara reproduksi hasil.

**Checklist verifikasi**:

- `repo_map.md` memuat 6 bagian (tujuan, struktur, entry point, model, data, config).
- Smoke test level 3 berjalan dan keluar tanpa training penuh.
- Modifikasi dibuat di file baru atau dengan argumen opsional (tidak mengubah default lama).
- Commit history kecil dan bermakna (minimal 4 commit terpisah).
- Draft PR description mencakup motivasi, perubahan, pemakaian, reproduksi.

---

## 6. Refleksi

1. Anda baru menerima akses ke repo lab dengan 150 file Python. Di mana Anda akan memulai, dan apa batasan waktu yang akan Anda tetapkan untuk fase membaca sebelum menjalankan?
2. Setelah setup environment, Anda menemukan bahwa hasil reproduksi menyimpang 2% dari angka paper. Apa tiga hipotesis paling mungkin, dan bagaimana Anda menginvestigasinya tanpa menghubungi penulis paper?
3. Dosen pembimbing meminta Anda "pakai repo X untuk dataset kita". Repo tersebut didesain untuk dataset berbeda. Bagaimana Anda mengevaluasi, dalam satu hari, apakah adaptasi lebih cepat daripada menulis ulang dari template?

---

## 7. Bacaan Lanjutan

- **Peter Seibel - *Code is not literature*** (esai, 2014). Argumen mengapa kode dibaca secara berbeda dari teks naratif; implikasinya untuk strategi membaca.
- **Michael Feathers - *Working Effectively with Legacy Code*** (buku). Walaupun ditujukan untuk software engineering, Bab 1-3 relevan untuk siapa saja yang akan sering bekerja dengan kode warisan.
- **Greg Wilson et al. - *Good Enough Practices in Scientific Computing*** (PLOS Comp Biol, 2017). Standar minimal yang bisa Anda harapkan - atau ikuti saat menulis repo sendiri nanti.
- **GitHub - *About Pull Requests*** (docs.github.com). Panduan teknis untuk memahami workflow kontribusi.

---

## Lanjut ke Bab 07

Anda kini bisa masuk ke kode orang lain dan keluar dengan modifikasi yang bersih. Keterampilan selanjutnya melengkapi kemampuan eksperimen Anda dengan alat inspeksi ringan: demo yang memungkinkan dosen melihat model bekerja tanpa harus menjalankan kode, visualizer hasil yang mempercepat analisis, dan UI sederhana untuk anotasi data ketika dataset Anda sendiri perlu dibangun.

Buka [Bab 07 - Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) ketika siap.