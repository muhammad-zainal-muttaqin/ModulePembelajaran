# Template Repo Riset - Modul Pembelajaran Asisten Dosen AI

Template minimal untuk eksperimen klasifikasi gambar (CIFAR-10 → domain shift medis PathMNIST). Struktur ini dirancang *educational-grade*: seluruh repo dapat dibaca dalam satu jam, setiap modul bertanggung jawab atas satu peran, dan setiap keputusan desain diulas di salah satu bab modul.

## Struktur

```
template_repo/
├── README.md
├── pyproject.toml              # dependencies + metadata proyek
├── configs/
│   ├── baseline.yaml           # SimpleCNN + CrossEntropy, baseline
│   └── focal_freeze.yaml       # FocalLoss + freeze layer, varian
├── src/
│   ├── __init__.py
│   ├── data.py                 # dataset + transforms
│   ├── models.py               # SimpleCNN + factory
│   ├── losses.py               # CrossEntropy + FocalLoss
│   ├── train.py                # training loop + logging + checkpoint
│   └── utils.py                # seed, save_cfg, git hash
├── experiments/                # output per run (tidak di-commit isinya)
│   └── .gitkeep
├── notebooks/
│   ├── lab_w2_cnn_baseline.ipynb
│   ├── lab_w3_loss_ablation.ipynb
│   ├── lab_w4_experiment_tracking.ipynb
│   ├── lab_w6_eda_leakage.ipynb
│   ├── lab_w7_llm_assisted.ipynb
│   ├── lab_w7_repo_adoption.ipynb
│   ├── lab_w12_demo_app.ipynb
│   ├── lab_w8_remote_training.ipynb
│   └── lab_w10_paper_to_code.ipynb
└── docs/
    └── experiment_log_template.md
```

## Setup (dengan `bun`-free Python; `uv` direkomendasikan)

```bash
# Python 3.10+; bisa pakai venv atau uv
python -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install -e .
```

Bila ingin lebih cepat:

```bash
uv venv
source .venv/bin/activate
uv pip install -e .
```

## Smoke Test

Pastikan dependensi terpasang dengan benar dan loop training jalan tanpa download dataset penuh:

```bash
python -m src.train --config configs/baseline.yaml --dry-run
```

Output harus menunjukkan: satu epoch pelatihan pada ~100 sampel, loss turun, checkpoint tersimpan di `experiments/baseline_dryrun/ckpt_last.pt`. Butuh < 1 menit di laptop CPU.

## Menjalankan Baseline Penuh

```bash
python -m src.train --config configs/baseline.yaml --seed 42
```

Hasil masuk ke `experiments/baseline_seed42/` berisi: `config.yaml`, `train.log`, `ckpt_best.pt`, `results.csv`, `tb/` (TensorBoard).

## Filosofi Desain

- **Satu file = satu peran.** `data.py` hanya tentang data, `models.py` hanya tentang arsitektur. Tidak ada yang campur.
- **Config di YAML, bukan di kode.** Mengubah hyperparameter tidak mengubah commit.
- **Seed dikunci lengkap.** Lihat `utils.set_seed` - Python, NumPy, Torch, CUDA.
- **Checkpoint menyertakan git hash.** Hasil tidak bisa lepas dari kode yang menghasilkannya.
- **Minimal, bukan lengkap.** Template ini bukan produk; ia adalah titik awal yang dapat kamu kembangkan.

## Konvensi Nama Eksperimen

Setiap run menghasilkan folder `experiments/<config_name>_seed<N>/`. Jika kamu mengubah sesuatu yang tidak di config (mis. augmentasi baru), tambahkan suffix: `experiments/baseline_seed42_aug_hflip/`. Kontrak: folder yang lengkap harus dapat direproduksi persis dari `config.yaml` + `commit_hash` di dalamnya.

## Rujukan ke Bab Modul

- Struktur config + logging: W4 (Reproducibility).
- Ablation pattern (loss × freeze): W3 (Loss, Optimizer & Evaluasi).
- Audit leakage sebelum eksperimen: W6 (Representations & Temporal Leakage).
- Adopsi repo eksternal: W7 (Text, Transformers & Repo Adoption).
- Demo dari checkpoint: W12 (Capstone).
- Remote training: W8 (Foundation Models).

## Lisensi

MIT untuk struktur repo template. Dataset (CIFAR-10, PathMNIST) mengikuti lisensi masing-masing sumber.
