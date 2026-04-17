<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [Memahami ML/DL](01_Memahami_ML_DL.md) | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| ▶ 03 | Eksperimen Reproduksibel | 5–6 |
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

# 03 · Eksperimen Reproduksibel

> *Hasil yang tidak dapat direproduksi hanyalah anekdot. Reproduksibilitas bukan beban tambahan di akhir pekerjaan - ia adalah kerangka yang membuat pekerjaanmu bertahan ketika diuji oleh diri sendiri tiga bulan kemudian, oleh mahasiswa lain yang melanjutkan, atau oleh reviewer paper Anda nanti.*

---

## 0. Peta Bab

Bab ini mengubah cara Anda mencatat, menjalankan, dan menyimpan eksperimen, sehingga hasil apapun yang Anda laporkan dapat direproduksi persis sama oleh orang lain. Anda akan belajar mengunci sumber-sumber acak, memindahkan konfigurasi dari kode ke file deklaratif, menghubungkan log ke konfigurasi dan kode yang menghasilkannya, serta merancang ablation yang bisa dibaca ulang berbulan-bulan kemudian. Setelah bab ini, folder eksperimen Anda punya struktur yang sama, disiplin penamaan yang konsisten, dan jejak yang cukup untuk menjawab pertanyaan "bagaimana tepatnya angka ini didapat?" tanpa ragu.

---

## 1. Motivasi: Anda Tiga Bulan dari Sekarang

Bayangkan tiga bulan dari hari ini, dosen meminta Anda mengekstrak kembali hasil salah satu eksperimen untuk paper yang sedang ditulis. Anda membuka folder `experiments/` dan menemukan:

```
experiments/
├── run1/
├── run_final/
├── run_focal_v2/
├── last_one/
├── actually_final_fixed/
└── backup_oct/
```

Folder `run_final` berisi checkpoint tetapi tidak ada config. Folder `run_focal_v2` berisi config tetapi file `train.py` di repo sudah banyak berubah sejak eksperimen itu. Tidak ada catatan seed. Log TensorBoard ada, tetapi loss plot saja tidak cukup untuk menjawab pertanyaan PI.

Anda mencoba meregenerasi hasil: menjalankan `train.py` dengan config yang tersisa, hasilnya akurasi 75%, padahal laporan menyebut 80%. Lima jam dihabiskan mencari sebabnya. Ternyata Anda dulu menjalankan dengan augmentasi berbeda yang sudah tidak ada lagi di kode.

Skenario ini bukan fiksi - ini pengalaman hampir setiap peneliti pemula minimal sekali. Reproduksibilitas adalah tentang melindungi diri Anda tiga bulan dari sekarang. Investasi waktu 30 menit di awal proyek menyelamatkan berjam-jam di kemudian hari, dan sering kali menyelamatkan paper itu sendiri.

---

## 2. Konsep Inti

### 2.1 Empat Sumber Non-Determinisme

Saat Anda menjalankan kode yang sama dua kali dan mendapat hasil berbeda, salah satu dari empat sumber berikut yang bertanggung jawab:

**1. Inisialisasi acak parameter model.** Bobot awal diacak. Kontrol dengan `torch.manual_seed`.

**2. Urutan acak data.** `DataLoader` dengan `shuffle=True` memakai RNG untuk urutan batch. Juga beberapa augmentasi (random crop, flip). Kontrol dengan seed generator `DataLoader` dan PyTorch.

**3. Operasi non-deterministik CUDA.** Beberapa kernel konvolusi CUDA memilih algoritma berbeda antar run demi kecepatan, menghasilkan hasil numerik yang berbeda pada epsilon. Kontrol dengan `torch.backends.cudnn.deterministic = True` dan `torch.backends.cudnn.benchmark = False`.

**4. Urutan eksekusi paralel.** `num_workers > 0` di DataLoader dapat memicu perbedaan urutan. Kontrol dengan `worker_init_fn` yang meng-seed tiap worker.

Fungsi utility yang merangkum keempatnya:

```python
import os
import random
import numpy as np
import torch

def set_seed(seed: int) -> None:
    """Set seed di semua sumber RNG yang relevan untuk training PyTorch."""
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

def seed_worker(worker_id: int) -> None:
    """Dipanggil oleh DataLoader untuk tiap worker."""
    worker_seed = torch.initial_seed() % 2**32
    np.random.seed(worker_seed)
    random.seed(worker_seed)
```

Pemakaian di `DataLoader`:

```python
g = torch.Generator()
g.manual_seed(args.seed)
loader = DataLoader(dataset, batch_size=128, shuffle=True,
                    num_workers=2, worker_init_fn=seed_worker,
                    generator=g)
```

Ada trade-off: `cudnn.deterministic = True` kadang memperlambat training 10-20%. Untuk eksperimen eksplorasi cepat, banyak orang melepasnya dan menerima noise kecil. Untuk eksperimen yang masuk laporan, aktifkan.

### 2.2 Konfigurasi: Memisahkan Parameter dari Kode

Hyperparameter yang tersebar di dalam kode (di variabel, di argumen `__init__`, di argumen fungsi) menimbulkan dua masalah: Anda harus membaca semua kode untuk tahu konfigurasi apa yang dijalankan, dan Anda tidak bisa membandingkan dua eksperimen tanpa diff kode.

Solusinya: pindahkan semua hyperparameter ke file konfigurasi deklaratif. YAML adalah pilihan populer karena mudah dibaca manusia.

```yaml
# configs/focal_freeze.yaml
seed: 42
data:
  dataset: cifar10
  batch_size: 128
  num_workers: 2
  augment:
    random_crop: 4
    horizontal_flip: true
model:
  name: simple_cnn
  num_classes: 10
  freeze_blocks: [block1]
loss:
  name: focal
  gamma: 2.0
optimizer:
  name: adamw
  lr: 3.0e-4
  weight_decay: 1.0e-4
scheduler:
  name: cosine
  t_max: 20
training:
  epochs: 20
  eval_every: 1
  save_every: 20
logging:
  backend: tensorboard
  log_dir: experiments/lab2/focal_freeze_s42
```

Aturan praktis:

- **Satu file config = satu eksperimen.** Jangan pakai satu file dengan banyak sub-eksperimen; susah melacak.
- **Tidak ada angka ajaib di kode.** Setiap hyperparameter di kode yang dapat memengaruhi hasil harus datang dari config.
- **Config disimpan bersama checkpoint.** Setelah training selesai, salin config ke `experiments/<run>/config.yaml`. Checkpoint tanpa config adalah setengah bukti.

Pola umum pembacaan config:

```python
import yaml
from pathlib import Path

def load_config(path: str | Path) -> dict:
    with open(path) as f:
        cfg = yaml.safe_load(f)
    return cfg

cfg = load_config('configs/focal_freeze.yaml')
set_seed(cfg['seed'])
```

Untuk tugas lanjut, library seperti `hydra` atau `omegaconf` menyediakan fitur composition (gabung config dari beberapa file) dan override via CLI. Mulai dengan YAML + dict sederhana dulu; beralih ke library hanya ketika kebutuhan muncul.

### 2.3 Jejak Lengkap: Checkpoint yang Cerita Sendiri

Checkpoint yang hanya menyimpan `model.state_dict()` tidak cukup. Ia hanya berisi bobot - tidak ada informasi *bagaimana* bobot itu terbentuk. Checkpoint yang baik menyertakan:

```python
ckpt = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'scheduler_state_dict': scheduler.state_dict(),
    'config': cfg,
    'seed': cfg['seed'],
    'git_hash': get_git_hash(),
    'metrics': {
        'train_loss': train_loss,
        'val_loss': val_loss,
        'val_acc': val_acc,
    },
    'timestamp': datetime.now().isoformat(),
}
torch.save(ckpt, save_path)
```

Fungsi `get_git_hash` singkat:

```python
import subprocess

def get_git_hash() -> str:
    """Ambil commit hash saat ini; kembalikan 'dirty' jika ada uncommitted."""
    try:
        hash_ = subprocess.check_output(
            ['git', 'rev-parse', '--short', 'HEAD']).decode().strip()
        dirty = subprocess.call(['git', 'diff', '--quiet']) != 0
        return f"{hash_}-dirty" if dirty else hash_
    except subprocess.CalledProcessError:
        return 'unknown'
```

Mengapa git hash penting: ia menjawab pertanyaan "kode mana tepatnya yang menghasilkan checkpoint ini?". Dengan hash, Anda dapat `git checkout <hash>` untuk kembali ke keadaan kode persis saat eksperimen dijalankan.

Bendera `dirty` memperingatkan Anda ketika ada uncommitted changes - sebaiknya commit dulu sebelum eksperimen yang akan dilaporkan.

### 2.4 Logging: Dari Print ke Struktur

`print(f"epoch {epoch}, loss {loss:.4f}")` cukup untuk debugging. Tidak cukup untuk eksperimen yang akan dibandingkan lintas run.

**TensorBoard** - paling umum, terinstal bersama PyTorch:

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter(log_dir=cfg['logging']['log_dir'])

# Di dalam training loop, per epoch:
writer.add_scalar('loss/train', train_loss, epoch)
writer.add_scalar('loss/val', val_loss, epoch)
writer.add_scalar('acc/train', train_acc, epoch)
writer.add_scalar('acc/val', val_acc, epoch)
writer.add_scalar('lr', optimizer.param_groups[0]['lr'], epoch)

# Di akhir training, simpan config sebagai text:
import yaml
writer.add_text('config', f"```yaml\n{yaml.dump(cfg)}\n```", 0)
writer.close()
```

Jalankan viewer: `tensorboard --logdir experiments/`. Browser di `localhost:6006` akan menampilkan semua run dengan kurva yang dapat dibandingkan berdampingan.

**Weights & Biases (wandb)** - alternatif berbasis cloud dengan fitur lebih kaya (tabel ablation, hyperparameter sweep otomatis, kolaborasi tim). Pemakaian gratis untuk proyek kecil. Contoh:

```python
import wandb

wandb.init(project='modul-pembelajaran', config=cfg,
           name=f"focal_freeze_s{cfg['seed']}")
# Per epoch:
wandb.log({'loss/train': train_loss, 'loss/val': val_loss,
           'acc/train': train_acc, 'acc/val': val_acc})
```

Untuk modul ini, TensorBoard cukup. Pindah ke wandb ketika Anda mulai bekerja dalam tim atau menjalankan puluhan run.

### 2.5 Struktur Folder Eksperimen

Konvensi yang bekerja lintas proyek:

```
experiments/
└── <nama_eksperimen>/
    ├── <run_id>/
    │   ├── config.yaml          salinan config yang dipakai
    │   ├── ckpts/
    │   │   ├── epoch_10.pt
    │   │   └── epoch_20.pt      checkpoint terbaik dan terakhir
    │   ├── tb/                  log TensorBoard
    │   ├── metrics.csv          metrik per epoch (mudah dibaca pandas)
    │   ├── git_hash.txt         commit saat run
    │   ├── command.txt          perintah persis yang dijalankan
    │   └── stdout.log           output terminal
    └── summary.csv              tabel agregat semua run di eksperimen ini
```

Pola penamaan `run_id`: `<kondisi>_s<seed>` atau `<kondisi>_lr<lr>_s<seed>`. Contoh: `focal_freeze_s42`, `baseline_lr3e4_s43`. Hindari `final`, `v2`, `test` - mereka tidak bermakna setelah sebulan.

### 2.6 Ablation Study: Dari Ide ke Eksekusi Rapi

*Ablation* adalah eksperimen yang mengisolasi pengaruh satu komponen dengan "mematikan" atau menggantinya. Contoh pertanyaan ablation:

- Apakah augmentasi berkontribusi? → jalankan konfigurasi sama tanpa augmentasi.
- Apakah BatchNorm penting? → jalankan dengan BatchNorm diganti identitas.
- Apakah dropout di classifier diperlukan? → bandingkan dengan `Dropout(0.0)`.

Protokol ablation yang rapi:

1. **Tentukan faktor.** Daftar komponen yang ingin Anda uji pengaruhnya.
2. **Mulai dari versi penuh.** Baseline adalah konfigurasi dengan semua komponen aktif.
3. **Matikan satu faktor pada satu waktu.** N faktor = N+1 konfigurasi (baseline + N ablasi).
4. **Jalankan replikasi.** Tiga seed per konfigurasi.
5. **Agregasi ke tabel.** Satu baris per konfigurasi, kolom untuk metrik ± std.

Tabel ablation yang informatif:

| Konfigurasi | Val acc | ΔAcc vs full |
|---|---|---|
| Full (baseline + augment + BN + dropout) | 0.824 ± 0.008 | – |
| – augment | 0.781 ± 0.011 | −4.3 |
| – BN | 0.769 ± 0.015 | −5.5 |
| – dropout | 0.818 ± 0.009 | −0.6 |

Dari tabel ini, Anda bisa mengatakan: augmentasi dan BN berkontribusi signifikan; dropout kontribusinya kecil pada setting ini. Informasi yang mustahil Anda dapat tanpa ablation.

### 2.7 Catatan Eksperimen Harian

Di luar file teknis, miliki satu file manusia-ke-manusia: `experiment_log.md` yang Anda isi setiap hari.

```markdown
## 2025-10-14, Selasa

**Tujuan hari ini:** ablation augmentasi pada SimpleCNN.

**Apa yang dijalankan:**
- `baseline_s42`: akurasi 78.1%. Commit abc123.
- `no_aug_s42`: akurasi 72.4%. Commit abc123.

**Pengamatan:**
- Tanpa augmentasi, train/val gap melebar dari 0.08 jadi 0.16.
  Overfitting jelas.
- `train_acc` di `no_aug` mencapai 99% di epoch 8; model sedang
  menghafal.

**Hipotesis baru:**
- Augmentasi mungkin juga membantu focal loss (Lab 2). Perlu dicek
  apakah efek focal loss berkurang ketika augmentasi dimatikan.

**Rencana besok:**
- Jalankan `baseline_no_aug_s{43,44}` untuk seed variance.
- Mulai Bab 04 untuk persiapan EDA dataset baru.
```

Format ini tidak wajib. Yang penting: tulis sesuatu, setiap hari, dengan tangan (atau keyboard) sendiri. Log eksperimen yang Anda tulis sendiri selama enam bulan adalah bahan tulisan pertama thesis atau paper Anda.

---

## 3. Worked Example: Refaktor Lab 2 menjadi Reproduksibel

Di akhir Bab 02, Anda menjalankan Lab 2 dengan enam run (3 seed × 2 kondisi). Sekarang Anda merefaktor agar seluruh eksperimen reproduksibel.

### 3.1 Struktur Kode yang Ditargetkan

```
template_repo/
├── configs/
│   ├── baseline.yaml
│   ├── focal_freeze.yaml
│   └── _base.yaml          konfigurasi default yang di-inherit
├── src/
│   ├── data.py             dataset + transform
│   ├── models.py           SimpleCNN + factory
│   ├── losses.py           CrossEntropy, FocalLoss
│   ├── train.py            loop + logging + checkpoint
│   └── utils.py            set_seed, get_git_hash, load_config
└── experiments/lab3/
    ├── baseline_s42/
    ├── baseline_s43/
    ├── baseline_s44/
    ├── focal_freeze_s42/
    ├── focal_freeze_s43/
    └── focal_freeze_s44/
```

### 3.2 Entry Point `train.py`

```python
# src/train.py
import argparse
import shutil
from pathlib import Path

from .utils import set_seed, get_git_hash, load_config
from .data import build_dataloaders
from .models import build_model, freeze_blocks
from .losses import build_loss

def main(cfg_path: str) -> None:
    cfg = load_config(cfg_path)
    exp_dir = Path(cfg['logging']['log_dir'])
    exp_dir.mkdir(parents=True, exist_ok=True)

    # Salin config ke folder eksperimen - jejak pertama yang WAJIB.
    shutil.copy(cfg_path, exp_dir / 'config.yaml')
    (exp_dir / 'git_hash.txt').write_text(get_git_hash() + '\n')

    set_seed(cfg['seed'])

    train_loader, val_loader = build_dataloaders(cfg['data'], cfg['seed'])
    model = build_model(cfg['model'])
    if cfg['model'].get('freeze_blocks'):
        freeze_blocks(model, cfg['model']['freeze_blocks'])
    criterion = build_loss(cfg['loss'])
    # ... optimizer, scheduler, writer, training loop

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', required=True)
    args = parser.parse_args()
    main(args.config)
```

Pemakaian di terminal:

```bash
python -m src.train --config configs/baseline.yaml
python -m src.train --config configs/focal_freeze.yaml
```

Pola `python -m src.train` membuat modul dapat diimpor dari root proyek - lebih bersih daripada `python src/train.py` yang sering memicu masalah import path.

### 3.3 Menjalankan Lintas Seed

Skrip kecil untuk enam run:

```bash
# run_lab3.sh
for cfg in configs/baseline.yaml configs/focal_freeze.yaml; do
  for seed in 42 43 44; do
    python -m src.train \
      --config "$cfg" \
      --override "seed=$seed" \
      --override "logging.log_dir=experiments/lab3/$(basename $cfg .yaml)_s$seed"
  done
done
```

(Fitur `--override` adalah opsional - implementasi sederhana pakai `argparse` + `setattr`. Alternatif: salin config enam kali dengan seed berbeda.)

### 3.4 Agregasi Hasil ke Tabel

Setelah semua run selesai, skrip agregasi:

```python
# scripts/aggregate.py
import pandas as pd
from pathlib import Path
import yaml

rows = []
for run_dir in sorted(Path('experiments/lab3').iterdir()):
    metrics = pd.read_csv(run_dir / 'metrics.csv')
    cfg = yaml.safe_load((run_dir / 'config.yaml').read_text())
    rows.append({
        'run': run_dir.name,
        'loss': cfg['loss']['name'],
        'seed': cfg['seed'],
        'val_acc': metrics['val_acc'].iloc[-1],
        'f1_minor': metrics['f1_minor'].iloc[-1],
    })
df = pd.DataFrame(rows)
print(df.groupby('loss')[['val_acc', 'f1_minor']].agg(['mean', 'std']))
```

Output:

```
                     val_acc                f1_minor
                     mean        std        mean        std
loss
cross_entropy        0.781       0.007      0.612       0.018
focal                0.774       0.011      0.672       0.014
```

Tabel inilah yang masuk laporan. Setiap angka dapat dilacak kembali ke folder run, ke config, dan ke git hash.

---

## 4. Pitfalls & Miskonsepsi

**"Seed saja sudah cukup."** Tidak. Tanpa `cudnn.deterministic = True`, hasil dua run dengan seed sama bisa berbeda tipis. Seed mengontrol inisialisasi; CUDA masih bisa non-deterministik.

**"Saya akan simpan config nanti."** "Nanti" tidak pernah datang. Salin config *sebelum* run dimulai, dalam kode, sebagai baris pertama setelah setup folder. Biasakan.

**"Run terakhir cukup; yang gagal dihapus saja."** Jangan menghapus. Folder run yang "gagal" sering memuat data penting - misalnya, konfigurasi yang terbukti tidak bekerja adalah hasil riset juga. Arsipkan, jangan hapus.

**"Git commit tidak perlu jika kodenya tidak bug."** Justru karena kode tidak bug-lah Anda ingin mengingat persis versinya. Commit hash di checkpoint adalah time capsule - tanpanya Anda tidak bisa kembali ke keadaan pasti.

**"Konfigurasi YAML + CLI override terlalu ribet untuk satu eksperimen kecil."** Ribet di awal, menyelamatkan setelah Anda punya dua puluh eksperimen. Bangun kebiasaan sejak run pertama.

**"TensorBoard cukup; CSV tidak perlu."** TensorBoard bagus untuk visualisasi interaktif, tetapi tidak mudah diimpor kembali. CSV adalah format arsip; keduanya saling melengkapi.

**"Saya belum commit; saya akan commit setelah eksperimen selesai."** Jika Anda menjalankan eksperimen dari kode *dirty* (uncommitted), checkpoint Anda tidak dapat direkonstruksi. Commit dulu - atau setidaknya simpan `git diff` ke file bersama checkpoint.

---

## 5. Lab 3 - Refaktor Lab 2 Menjadi Reproduksibel

Buka [Lab 3 - Config, Logging, dan Reproduksibilitas](template_repo/notebooks/lab3_config_logging.ipynb). Lab ini memaksa Anda mengadopsi seluruh infrastruktur reproduksibilitas.

Tugas:

1. Pindahkan semua hyperparameter Lab 1-2 ke file `configs/baseline.yaml` dan `configs/focal_freeze.yaml`.
2. Implementasi `src/utils.py` dengan `set_seed`, `get_git_hash`, `load_config`.
3. Refaktor training loop menjadi `src/train.py` yang:
   - Menyalin config ke folder run.
   - Menulis `git_hash.txt`.
   - Menulis `metrics.csv` per epoch.
   - Menyimpan checkpoint dengan metadata lengkap (config + git hash + metrics).
   - Menulis log TensorBoard ke `<run>/tb/`.
4. Jalankan enam run (ulangi Lab 2). Pastikan tiap run dengan seed sama menghasilkan metrik identik ketika dijalankan ulang.
5. Tulis skrip [scripts/aggregate.py](template_repo/scripts/aggregate.py) yang membaca semua run di `experiments/lab3/` dan menghasilkan tabel mean ± std.

**Checklist verifikasi**:

- [ ] Tidak ada angka hyperparameter di kode Python - semua dari config.
- [ ] Run kedua dengan seed, config, dan git hash sama menghasilkan val accuracy ±0.001 dari run pertama.
- [ ] Setiap folder run berisi: `config.yaml`, `git_hash.txt`, `metrics.csv`, `ckpts/`, `tb/`.
- [ ] [scripts/aggregate.py](template_repo/scripts/aggregate.py) menghasilkan tabel yang identik dengan tabel di laporan Lab 2.
- [ ] Tidak ada folder run bernama `final`, `test`, atau `v2`.

---

## 6. Refleksi

1. Tim riset Anda memutuskan memakai wandb alih-alih TensorBoard. Apa keuntungan dan kerugian yang perlu dipertimbangkan dari sisi reproduksibilitas? Jika proyek akan diserahkan ke mahasiswa baru tahun depan, pilihan mana yang lebih aman, dan mengapa?

2. Anda menemukan bahwa hasil run dengan seed sama berbeda 0.3% antar mesin (laptop Anda vs server lab). Tanpa mengubah kode, sebutkan tiga penyebab potensial dan bagaimana Anda mendeteksinya.

3. Dosen bertanya: "berapa angka akurasi persis untuk eksperimen focal_freeze_s42?" Anda membuka folder dan menemukan tiga checkpoint (epoch 10, 15, 20). Angka mana yang benar untuk dilaporkan, dan bagaimana Anda memutuskannya? Bagaimana kebiasaan ini sebaiknya ditulis di protokol?

---

## 7. Bacaan Lanjutan

- **Joelle Pineau - *Reproducible, Reusable, and Robust Reinforcement Learning*** (NeurIPS 2018 keynote, rekamannya ada di YouTube). Membahas pelajaran keras dari komunitas RL yang berlaku luas di ML.
- **The Turing Way - *Guide for Reproducible Research***. Bab "Reproducibility" adalah rujukan hidup yang terus diperbarui oleh komunitas.
- **PyTorch Docs - *Reproducibility*** (pytorch.org/docs/stable/notes/randomness.html). Dokumentasi resmi dengan daftar pitfall non-determinisme, termasuk yang spesifik per operasi.
- **Weights & Biases Docs - *Experiment Tracking*** (docs.wandb.ai). Dibaca ringkas ketika Anda siap beralih dari TensorBoard.

---

## Lanjut ke Bab 04

Anda sekarang bisa menjamin bahwa setiap angka dalam laporanmu dapat direproduksi. Tetapi reproduksibilitas memastikan kebenaran *pipa komputasi* - bukan kebenaran *data* yang masuk ke pipa itu. Data yang salah, label yang bocor, distribusi yang berubah diam-diam: semua akan memproduksi hasil yang *konsisten salah*. Bab 04 mengajarkan Anda melihat data dengan curiga - kebiasaan yang mencegah eksperimen berbulan-bulan dikubur oleh asumsi yang seharusnya diuji di minggu pertama.

Buka [Bab 04 - Validasi Data](04_Validasi_Data.md) ketika siap.
