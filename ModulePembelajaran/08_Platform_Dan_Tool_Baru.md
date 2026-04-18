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
| 06 | [Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| ▶ 08 | Platform & Tool Baru | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 08 · Adopsi Platform dan Tool Baru

> *Kesiapan menjajal platform baru - dari GPU cloud hingga sistem eksperimen yang belum pernah Anda pakai - adalah keterampilan yang menentukan seberapa cepat riset Anda dapat berkembang. Tool tidak hilang dari hidupmu setelah kuliah selesai; kemampuan mengadopsinya dengan cepat justru makin penting.*

---

## 0. Peta Bab

Bab ini membekali Anda dengan pola umum untuk mengadopsi platform dan tool baru dengan aman: membaca quickstart, mereplikasi contoh, mengadaptasi ke kebutuhan sendiri, lalu mengintegrasikan ke workflow harian. Anda akan menerapkannya secara konkret pada RunPod - platform GPU cloud yang hemat biaya - termasuk menyiapkan pod, mensinkronkan data, menjalankan training panjang, menarik checkpoint, serta mengelola biaya agar tidak meledak. Anda juga akan mempelajari SSH port forwarding untuk memantau TensorBoard jarak jauh, manajemen checkpoint antar mesin, dan bagaimana men-scan dokumentasi tool baru dalam satu jam untuk memutuskan apakah tool itu cocok untuk pekerjaanmu. Setelah bab ini, Anda dapat memindahkan training yang gagal muat di laptop ke GPU cloud dalam satu sore - dan menyalakan pod baru kapan saja Anda perlu tanpa kehilangan arah.

---

## 1. Motivasi: Laptop yang Tidak Cukup

Bayangkan Anda sampai di Lab 5: eksperimen sudah reproducible, ablation jalan, data bersih. Anda ingin mencoba training yang lebih serius - ResNet-50 pretrained pada PathMNIST dengan batch size 128, 100 epoch. Di laptopmu, satu epoch butuh 45 menit. Total: 75 jam. Mustahil.

Pilihan lazim mahasiswa: kurangi batch size, kurangi epoch, pakai model lebih kecil. Ini kompromi yang memudarkan kualitas eksperimen. Pilihan lain - yang tidak banyak diajarkan di kelas - adalah menggunakan GPU cloud sesuai kebutuhan. RunPod memberi GPU A40 dengan harga ~$0.35/jam; 75 jam training = $26, lebih murah dari satu buku teks.

Tapi cloud GPU menghadirkan tantangan baru: biaya mengalir detik demi detik, data harus disinkronkan, koneksi SSH bisa putus, pod bisa hilang ketika Anda lupa mematikannya. Tanpa disiplin, $26 proyek bisa menjadi tagihan $400 dalam seminggu.

Bab ini mengajarkan cara mengadopsi tool baru ini - dan lewat contoh konkret RunPod, mengajarkan Anda pola umum yang berlaku untuk platform apapun yang akan Anda temui setelah lulus.

---

## 2. Konsep Inti

### 2.1 Pola Umum Adopsi Tool Baru

Setiap tool baru - RunPod, Weights & Biases, Modal, Hugging Face Spaces, LLM provider baru - memiliki kurva yang sama bila dijinakkan dengan disiplin:

**Langkah 1: Baca quickstart, penuh.** 15-30 menit. Jangan langsung ke tutorial rumit; baca halaman "Hello World". Anda akan tahu konsep inti dan vocab platform.

**Langkah 2: Replikasi tutorial apa adanya.** Jangan modifikasi apapun di percobaan pertama. Kalau tutorial bilang `pip install x==1.2.3`, ikuti persis. Tujuan: memisahkan "tool ini bermasalah" dari "saya salah pakai".

**Langkah 3: Adaptasi ke satu kebutuhan kecilmu.** Setelah tutorial jalan, coba ubah satu hal: ganti dataset, ganti model. Belum integrasi ke proyekmu - masih eksperimen terisolasi.

**Langkah 4: Integrasi ke workflow.** Baru setelah tiga langkah di atas sukses, bawa ke proyek nyata. Pada titik ini Anda sudah punya cukup pemahaman untuk tahu di mana harus memasukkannya dan apa yang akan rusak.

**Langkah 5: Tulis catatan pribadi.** Setelah tool dipakai sekali untuk proyek nyata, tulis *personal cheat sheet* - lima baris command yang paling sering Anda pakai, tiga gotcha yang Anda temukan. Simpan di repo `docs/tools/<tool>.md`. Ini menghemat jam-jam di masa depan.

Pola ini mencegah dua kesalahan umum: langsung integrasi tanpa paham (berakhir dengan debugging yang menggabungkan masalah tool + masalah proyek) dan eksplorasi tanpa batas (menghabiskan seminggu main-main dengan tool yang ternyata tidak cocok).

### 2.2 RunPod: Anatomi Penyewaan GPU

RunPod adalah marketplace GPU di mana Anda menyewa *pod* - mesin virtual dengan GPU - per detik. Komponen yang perlu Anda pahami:

**Pod.** Instance GPU yang Anda sewa. Punya tipe GPU (RTX 3090, A40, H100, dll), RAM, disk, dan image OS (biasanya image PyTorch resmi RunPod). Dimatikan = biaya berhenti; dihapus = data hilang.

**Network volume.** Disk persisten terpisah dari pod. Anda bisa attach ke pod manapun. Pakai ini untuk dataset dan checkpoint agar tidak hilang ketika pod dimatikan.

**Template.** Preset image + konfigurasi. RunPod menyediakan template "PyTorch 2.1 + CUDA 12.1"; pakai itu kecuali Anda punya kebutuhan khusus.

**Spot vs On-Demand.** *Spot* 50-70% lebih murah tapi bisa dihentikan sewaktu-waktu; pakai untuk eksperimen yang dapat disimpan secara bertahap (checkpoint per epoch). *On-demand* dijamin jalan sampai Anda matikan; pakai untuk debugging interaktif.

**Harga.** Dihitung per detik jalan. GPU idle = tetap terhitung. Disk persisten juga ada biaya kecil per jam. Target biaya realistis untuk proyek mahasiswa: $10-30 per eksperimen besar.

### 2.3 Workflow Sekali-Jalan di RunPod

Alur yang dapat Anda ulang setiap kali butuh training yang berat:

**1. Siapkan kode & data lokal.** Pastikan repo Anda commit, dataset yang dibutuhkan sudah ada skrip download-nya. Dataset sendiri *tidak* di-commit; hanya skripnya.

**2. Nyalakan pod.** Pilih GPU sesuai kebutuhan (A40 untuk sebagian besar kasus mahasiswa), template PyTorch, attach network volume jika sudah ada, 20-50 GB disk ephemeral. Klik *Deploy*.

**3. Setup pod via SSH.** RunPod memberi SSH command. Connect, lalu:

```bash
git clone https://github.com/<akun>/<repo>.git
cd <repo>
pip install -r requirements.txt
python scripts/download_data.py --dest /workspace/data
python -m src.train --config configs/baseline.yaml --dry-run
```

Perhatikan `--dry-run` dulu: smoke test untuk memastikan semua lancar sebelum training panjang. Anda membayar GPU setiap detik - satu menit cek sekarang menghemat 30 menit training yang gagal di tengah karena bug path.

**4. Jalankan training dengan logging persisten.**

```bash
mkdir -p /workspace/experiments
python -m src.train \
    --config configs/focal_freeze.yaml \
    --output_dir /workspace/experiments/focal_freeze_seed42 \
    --seed 42 2>&1 | tee /workspace/experiments/focal_freeze_seed42/train.log
```

`tee` menyalin output ke file; jika koneksi SSH putus, log tetap tertulis di disk. Pakai `nohup` atau `tmux` kalau ingin benar-benar tidak terganggu oleh disconnect:

```bash
tmux new -s train
# di dalam tmux:
python -m src.train ...
# Ctrl+B lalu D untuk detach
```

Ketika kembali: `tmux attach -t train`. Training terus jalan bahkan ketika laptop Anda tidur.

**5. Tarik checkpoint dan log.** Dari laptop lokal:

```bash
scp -P <port> root@<host>:/workspace/experiments/focal_freeze_seed42/ckpt_best.pt ./experiments/focal_freeze_seed42/
scp -P <port> root@<host>:/workspace/experiments/focal_freeze_seed42/train.log ./experiments/focal_freeze_seed42/
```

Atau pakai `rsync` yang lebih tahan putus:

```bash
rsync -avz -e "ssh -p <port>" root@<host>:/workspace/experiments/focal_freeze_seed42/ ./experiments/focal_freeze_seed42/
```

**6. Matikan pod.** Ini langkah yang paling sering dilupakan mahasiswa - dan yang paling mahal. *Begitu selesai tarik data, matikan pod*. Jangan biarkan menyala "untuk jaga-jaga". Kalau Anda butuh lagi dalam satu jam, nyalakan lagi - biaya nyalakan-ulang < $0.05, biaya diam menyala = terus mengalir.

### 2.4 SSH Port Forwarding: TensorBoard Jarak Jauh

Training berjalan di pod. TensorBoard berjalan di port 6006 pod. Anda ingin melihatnya di browser laptop. Solusi: SSH tunnel.

```bash
ssh -L 6006:localhost:6006 -p <port> root@<host>
```

`-L 6006:localhost:6006` berarti: port 6006 di laptop Anda diteruskan ke port 6006 di pod. Lalu di pod:

```bash
tensorboard --logdir /workspace/experiments/ --bind_all
```

Di laptop, buka `http://localhost:6006`. Anda melihat TensorBoard yang jalan di cloud seolah-olah ia lokal.

Pola ini berlaku untuk semua dashboard-server: Streamlit (port 8501), Jupyter (8888), Weights & Biases local instance, dsb. Ganti nomor port; konsepnya sama.

### 2.5 Manajemen Checkpoint Antar Mesin

Masalah khas: ada dua pod, satu di laptop, satu checkpoint di tiap tempat, mana yang terbaru? Solusi: satu *source of truth* yang jelas.

Rekomendasi praktis untuk mahasiswa:

**Semua checkpoint final masuk ke laptop lokal.** Pod adalah tempat kerja sementara; hasil final ditarik dan disimpan di laptop dengan struktur `experiments/<nama_eksperimen>/`.

**Network volume RunPod untuk data, bukan untuk arsip hasil akhir.** Network volume murah tetapi ada biaya bulanan; pakai untuk dataset yang sering diakses, bukan arsip checkpoint lama.

**Backup yang penting ke cloud storage gratis.** Hasil capstone atau model yang ingin Anda jaga, push ke Hugging Face Hub atau Google Drive. Jangan mengandalkan laptop pribadi saja.

**Gunakan hash git di nama checkpoint.** Lihat Bab 3. Ketika ada tiga checkpoint dari tiga pod berbeda, nama file yang menyertakan `<commit>_<seed>_<date>` menghilangkan kebingungan.

### 2.6 Manajemen Biaya: Empat Aturan

**Aturan 1: Alarm anggaran.** Set notifikasi di dashboard RunPod ketika pengeluaran harian melewati ambang (mis. $5). Bunyi alarm lebih cepat dari tagihan mengejutkan.

**Aturan 2: Pilih GPU sesuai kebutuhan, bukan yang terbesar.** H100 tiga kali lebih cepat dari A40 tetapi enam kali lebih mahal. Untuk eksperimen CIFAR-10 atau dataset kecil lainnya, RTX 3090 sering cukup.

**Aturan 3: Batch job, jangan interactive lama.** Kembangkan kode di laptop; kirim ke pod hanya untuk eksekusi. Pod yang menyala dengan `jupyter notebook` saat Anda pergi makan adalah uang yang terbuang.

**Aturan 4: Review mingguan.** Setiap akhir minggu, buka dashboard, catat total biaya, catat eksperimen apa yang menghabiskan dana itu, tanya apakah nilainya sepadan. Ini mentransformasi biaya dari "angka abstrak" menjadi "keputusan belajar".

**Alternatif RunPod.** Modul ini fokus pada RunPod karena antarmukanya sederhana, tapi prinsipnya sama di platform lain. Tabel singkat:

| Platform | Cocok untuk | Catatan |
| --- | --- | --- |
| **RunPod** | Eksperimen mahasiswa; spot instance murah | Dibahas di bab ini |
| **Google Colab Pro** | Iterasi cepat, notebook, bebas setup | Terbatas 12-24 jam/sesi; sulit untuk training multi-seed jangka panjang |
| **Modal** | Workflow *serverless*; deploy fungsi Python ke GPU | Penagihan per milidetik; cocok untuk eksperimen kecil-sedang; API Python-native |
| **Lambda Labs** | Training besar; instance A100/H100 lebih murah daripada AWS/GCP | Antarmuka mirip cloud besar; cocok jika sudah familiar dengan EC2 |

Setelah Anda kuasai RunPod, adopsi platform lain butuh < 1 sore: polanya sama - login, sewa GPU, setup repo, jalankan training, transfer hasil.

---

## 3. Worked Example: Training PathMNIST di RunPod, End-to-End

Skenario: Anda ingin fine-tune ResNet-18 pretrained pada PathMNIST (9 kelas, ~100k sampel), batch size 128, 30 epoch, tiga seed. Estimasi di A40: ~15 menit/epoch × 30 × 3 seed = 22 jam. Total biaya: ~$8.

**Persiapan lokal (30 menit):**

```bash
git commit -am "feat: add pathmnist resnet18 config"
git push
```

Pastikan `configs/pathmnist_resnet18.yaml` ada dan lengkap. Test lokal dengan `--dry-run` yang membatasi data ke 100 sampel:

```bash
python -m src.train --config configs/pathmnist_resnet18.yaml --dry-run --limit_data 100
```

Bila lulus, kode siap pod.

**Nyalakan pod (5 menit):**

- Template: "RunPod Pytorch 2.1"
- GPU: 1× A40
- Disk: 40 GB
- Volume: mount di `/workspace/data` (sudah ada PathMNIST dari proyek sebelumnya)
- Spot instance (karena tiga training independen; interrupt = restart seed itu saja)

Klik Deploy. Tunggu 1-2 menit sampai status "Running".

**Setup pod (5 menit):**

```bash
ssh -p <port> root@<host>
cd /workspace
git clone https://github.com/<akun>/my-research.git
cd my-research
pip install -r requirements.txt
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

Output terakhir harus menyebut GPU (mis. "NVIDIA A40"). Bila bukan, ada masalah CUDA - dokumentasikan di cheat sheet, jangan lanjut.

**Smoke test (2 menit):**

```bash
python -m src.train --config configs/pathmnist_resnet18.yaml --dry-run
```

Harus selesai dalam satu menit. Bila error path dataset: verifikasi volume ter-mount; perbaiki path di config; commit-push dari laptop, pull di pod.

**Jalankan training (22 jam):**

```bash
tmux new -s seeds
for SEED in 42 123 2024; do
    python -m src.train \
        --config configs/pathmnist_resnet18.yaml \
        --output_dir /workspace/experiments/resnet18_seed${SEED} \
        --seed ${SEED} 2>&1 | tee /workspace/experiments/resnet18_seed${SEED}/train.log
done
# Ctrl+B, D untuk detach
```

**Monitor selama berjalan:**

Dari laptop, di terminal lain:

```bash
ssh -L 6006:localhost:6006 -p <port> root@<host>
# di pod:
tensorboard --logdir /workspace/experiments/ --bind_all
```

Buka `localhost:6006` di browser. Anda bisa melihat loss turun dari kantor lain, dari rumah, dari mana saja. Penting: pod tetap menyala walaupun SSH Anda putus, karena `tmux` menampung proses training.

**Tarik hasil (5 menit):**

Setelah semua tiga seed selesai (lihat log terakhir), dari laptop:

```bash
rsync -avz --progress -e "ssh -p <port>" \
    root@<host>:/workspace/experiments/ \
    ./experiments/pathmnist/
```

**Matikan pod (10 detik):**

Klik *Stop* di dashboard. Verifikasi status "Stopped" - biaya pod = 0, biaya volume tetap ada (kecil).

**Review:**

```bash
cat experiments/pathmnist/resnet18_seed42/train.log | tail -20
python scripts/aggregate.py --dir experiments/pathmnist/ --out experiments/pathmnist/summary.csv
```

Total waktu aktif Anda: mungkin 1-2 jam (setup + tarik). Training 22 jam berjalan otomatis. Biaya: lihat dashboard RunPod; catat di log personal.

---

## 4. Pitfalls & Miskonsepsi

**Pitfall 1 - Lupa matikan pod.** Pod menyala sepanjang weekend, tagihan bengkak 20×. *Cara deteksi:* saat bangun tidur atau pulang malam, buka dashboard RunPod - kebiasaan harian yang murah. Alternatif: set auto-stop di dashboard (pod berhenti otomatis setelah n jam idle, bila tersedia).

**Pitfall 2 - Data hilang karena pod dihapus, bukan dihentikan.** "Stop" menjaga disk; "Terminate" menghapusnya. *Cara deteksi:* selalu gunakan network volume untuk data/hasil penting; asumsikan disk ephemeral pod akan hilang.

**Pitfall 3 - Koneksi SSH putus, training terhenti.** Menjalankan `python train.py` langsung di SSH tanpa `tmux`/`nohup` membuat proses mati ketika sesi terputus. *Cara deteksi:* biasakan selalu pakai `tmux new -s <name>` sebelum perintah panjang; jika Anda tidak ingat command `tmux`-mu, training kemungkinan besar sudah tewas.

**Pitfall 4 - GPU ternyata tidak dipakai.** PyTorch diam-diam fallback ke CPU karena salah setup; training 10× lebih lambat dari estimasi. *Cara deteksi:* di awal skrip, `assert torch.cuda.is_available()` dan print `next(model.parameters()).device`; ini *fail-fast*, bukan *fail-slow*.

**Pitfall 5 - Checkpoint disimpan di tempat yang hilang.** Output di `/root/` atau `/tmp/`, pod dihentikan, file hilang. *Cara deteksi:* selalu simpan di `/workspace/` (disk pod yang persisten selama pod tidak di-terminate) atau di network volume.

**Pitfall 6 - "Debugging interaktif" di pod mahal.** Anda nyalakan pod, ketemu bug, perbaiki di pod, jalan lagi, ketemu bug lagi - 3 jam berlalu, belum ada eksperimen. *Cara deteksi:* kalau Anda sedang edit kode di pod, Anda sedang membayar GPU untuk mengetik. Debug lokal, kirim ke pod hanya ketika siap.

---

## 5. Lab Hands-on

**Lab 8 - RunPod Remote Training.** Kerjakan notebook [Lab 8 - RunPod Remote Training](template_repo/notebooks/lab8_runpod_remote.ipynb) dan script pendamping. Target:

1. Daftar akun RunPod (gratis; biaya minimal ~$5 untuk lab ini).
2. Siapkan network volume 20 GB; unggah dataset PathMNIST via script [scripts/download_data.py](template_repo/scripts/download_data.py).
3. Nyalakan pod RTX 3090 spot instance, setup repo dari commit tertentu (sebut hash di laporan).
4. Jalankan smoke test `--dry-run`, lalu training penuh 1 seed (30 menit) dengan `tmux`.
5. Monitor via TensorBoard SSH tunnel dari laptop.
6. Tarik checkpoint dan log via rsync.
7. Matikan pod; verifikasi dari dashboard.
8. Tulis `docs/tools/runpod.md`: 5 command paling sering dipakai + 3 gotcha yang Anda temukan.

**Checklist verifikasi:**

- Total biaya < $3; screenshot dashboard.
- Log training utuh di laptop; berisi output `torch.cuda.get_device_name(0)` = "NVIDIA GeForce RTX 3090" atau serupa.
- Checkpoint ter-load di laptop (`torch.load(...)` berhasil).
- TensorBoard dapat dibuka di `localhost:6006` saat pod masih berjalan.
- `docs/tools/runpod.md` ada, lima command + tiga gotcha nyata (bukan disalin dari internet).

Target waktu: 3-4 jam hands-on + ~$3 biaya.

---

## 6. Refleksi

1. Tool apa yang akan Anda pelajari berikutnya (selain RunPod), dan mengapa? Tulis kriteria yang akan Anda pakai untuk memutuskan layak atau tidak mengalokasikan satu akhir pekan untuk menguasainya.
2. Pod Anda menyala 18 jam, training baru berjalan 6 jam - sisanya waktu debugging. Apa tiga perubahan konkret yang akan Anda terapkan di eksperimen berikutnya untuk menekan 12 jam menjadi 2 jam?
3. Pembimbing bertanya, "Kenapa hasilmu berbeda dengan paper aslinya?" Anda menjalankan di A40, paper di 8× V100. Bagaimana Anda membedakan pengaruh perangkat keras (seed/non-determinisme dari cuDNN) dari pengaruh perbedaan hyperparameter? Susun pemeriksaan berurutan.

---

## 7. Bacaan Lanjutan

- **RunPod Documentation** (docs.runpod.io). Baca bagian *Pods*, *Network Volumes*, dan *Spot Instances*. Dokumentasi singkat, dapat dibaca dalam 40 menit; sangat padat informasi.
- **tmux cheat sheet** (oleh Ham Vocke atau serupa). Lima menit baca, dipakai seumur riset. Minimum yang perlu Anda kuasai: `new -s`, `attach -t`, `Ctrl+B D`, `Ctrl+B %`, `Ctrl+B arrow`.
- **"The Twelve-Factor App"** (12factor.net) - khusus bagian *Config* dan *Logs*. Bukan tentang ML, tetapi prinsipnya langsung berlaku: jangan hardcode konfigurasi, tulis log ke stdout dan tangkap di level deployment.
- **Modal, Lambda Labs, Paperspace Documentation.** Tidak perlu dipakai sekarang, tetapi scan satu halaman quickstart masing-masing. Anda akan melihat pola yang sama - setelah mengenali polanya, adopsi platform keempat atau kelima hanya butuh satu sore.

---

## Lanjut ke Bab 09

Anda kini bisa menjalankan training di GPU cloud dan membawa hasilnya pulang dengan aman. Kompetensi terakhir menggeser pertanyaan dari "bagaimana saya menjalankan eksperimen ini" ke "eksperimen apa yang seharusnya saya jalankan" - membaca paper, memformulasikan pertanyaan sendiri, dan berkembang tanpa menunggu instruksi.

Buka [Bab 09 - Pengembangan Mandiri](09_Pengembangan_Mandiri.md) ketika siap.