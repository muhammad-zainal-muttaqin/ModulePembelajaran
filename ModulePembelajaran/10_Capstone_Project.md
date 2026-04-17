# 10 · Capstone Project

> *Capstone bukan ujian terakhir - ia adalah pameran pertama. Empat minggu yang memaksa Anda merangkai ulang semua yang telah dipelajari menjadi satu cerita yang Anda pertanggungjawabkan dari awal hingga akhir.*

---

## 0. Peta Bab

Bab ini memandu Anda menyusun proyek capstone 4 minggu yang mengintegrasikan minimal enam dari sembilan kompetensi modul dan memperlihatkan keempat sikap riset - *curiosity*, *rigor*, *skepticism*, *ownership* - dalam satu karya yang padat. Anda akan memilih satu dari tiga template proyek yang telah diuji kompleksitasnya, mengikuti timeline mingguan yang realistis, dan menghasilkan tiga *deliverable* yang dapat dievaluasi: repository lengkap, laporan 6-8 halaman, serta demo yang bisa diklik. Bab ini sekaligus menjelaskan kriteria penerimaan capstone, cara memetakan pekerjaanmu ke rubrik Bab 11, dan batasan sehat yang menjaga proyek tetap selesai tepat waktu alih-alih "hampir selesai" dengan kualitas yang meragukan.

---

## 1. Motivasi: Proyek yang Tidak Ditanya Ulang

Bayangkan setelah lulus, Anda melamar posisi riset atau program magang. Pertanyaan yang paling sering muncul dalam wawancara bukan "IPK Anda berapa?" - pertanyaan itu adalah "ceritakan satu proyek yang Anda banggakan dan jelaskan keputusan-keputusan yang Anda ambil di dalamnya."

Jawaban mahasiswa biasa: "Saya membuat klasifikasi CIFAR-10 di PyTorch, dapat akurasi 89%." Pertanyaan lanjut: "Kenapa arsitektur itu? Kenapa augmentasi itu? Apa yang paling sulit?" Mahasiswa itu terdiam - karena sebagian besar proyek kuliahnya sebenarnya mengikuti tutorial. Ia tidak pernah *memutuskan*, hanya *melakukan*.

Jawaban mahasiswa yang sudah melalui capstone ini: "Saya menguji apakah augmentasi gaya-transfer mengurangi domain gap antara data rumah sakit A dan B pada segmentasi kulit. Hipotesis awal salah - gap turun hanya 2% dari proyeksi 8%, karena saya underestimate variance antar lesion type. Saya revisi pre-reg, menambahkan ablasi per-class, menemukan bahwa augmentasi membantu pada lesion umum tetapi menyakiti pada lesion langka. Rekomendasi: augmentasi bersyarat per-class." Pewawancara bertanya ulang karena tertarik.

Capstone ini dirancang agar Anda bisa memberi jawaban jenis kedua - tidak hanya tentang proyek capstone, tetapi tentang proyek apapun yang Anda kerjakan sesudahnya. Disiplinnya menjadi disiplinmu.

---

## 2. Konsep Inti

### 2.1 Kriteria Capstone yang Baik

Proyek capstone harus memenuhi empat kriteria sekaligus. Proyek yang mengorbankan salah satunya hampir selalu mengecewakan di akhir.

**Tertutup dan dapat diselesaikan dalam 4 minggu.** Topik "membuat deteksi kanker umum" tidak tertutup - tidak ada akhir yang jelas. Topik "membandingkan tiga metode augmentasi pada subset HAM10000 untuk tujuh kelas dermatologi" tertutup: jelas kapan selesai.

**Memuat pertanyaan yang dapat dipalsukan.** Bukan "saya akan membangun model untuk X", melainkan "saya akan menguji apakah metode M unggul >Δ dari baseline B pada D". Bab 2 dan 9 telah mengajarkan cara memformulasikannya.

**Menggunakan paling sedikit enam kompetensi modul.** Tabel kompetensi ↔ capstone ada di 2.3 di bawah. Proyek yang hanya memakai tiga-empat kompetensi terlalu ringan untuk menjadi capstone.

**Menghasilkan artefak publik.** Repository yang orang lain bisa clone dan jalankan; laporan yang orang lain bisa baca mandiri; demo yang orang lain bisa coba. Jika semua hanya ada di laptop Anda, capstone gagal memenuhi ownership yang sejati.

### 2.2 Tiga Template Proyek

Tiga proyek berikut telah diuji: kompleksitasnya cocok untuk mahasiswa S1 di 4 minggu, alat dan dataset tersedia publik dan cukup ringan, serta masing-masing secara alamiah memakai lebih dari enam kompetensi. Pilih satu - atau ajukan proyek sendiri yang memenuhi empat kriteria 2.1 dan disetujui pembimbing.

---

#### Template A · Fine-tuning BERT untuk Sentimen Bahasa Indonesia

**Inti pertanyaan (contoh):** Apakah *IndoBERT-base* yang di-fine-tune pada dataset sentimen ulasan produk Indonesia menghasilkan F1-macro yang secara signifikan lebih tinggi dari *XLM-R-base* multilingual pada kelas minoritas (rating 3 = netral)?

**Mengapa menarik.** Bahasa Indonesia bukan bahasa mayoritas di pretraining multilingual. Pertanyaan apakah model pretrained khusus-bahasa tetap unggul saat data fine-tune terbatas adalah pertanyaan praktis bagi banyak tim data di Indonesia.

**Bahan.**

- Dataset: "Indonesian Sentiment Analysis" di Hugging Face (jasonmiao, id-sentiment, atau dataset ulasan Tokopedia/Shopee publik lainnya). Pastikan lisensi mengizinkan penggunaan akademik.
- Model: `indolem/indobert-base-uncased` dan `xlm-roberta-base`.
- Framework: Hugging Face Transformers + Datasets.
- Compute: dapat dijalankan di T4 / RTX 3060 / A40; total ~5-10 jam GPU.

**Skope minimal.**

1. EDA dataset, laporan distribusi kelas, panjang teks, sampel mencurigakan.
2. Fine-tune dua model dengan hyperparameter yang setara (learning rate, batch, epoch).
3. Tiga seed per kondisi; laporkan F1-macro + F1 per kelas dengan error bar.
4. Error analysis: 50 sampel yang paling keliru di tiap model; apakah pola errornya sama?
5. Demo Gradio sederhana: paste teks, lihat prediksi + probabilitas kedua model berdampingan.

**Outcome yang digunakan.** 1 (arsitektur), 2 (formulasi), 3 (reproduksibilitas), 4 (validasi data - audit label sentimen sering berisik), 5 (LLM untuk bantu parsing dataset), 7 (demo Gradio), 9 (baca minimal 2 paper sentimen ID untuk context), opsional 8 (cloud GPU bila laptop tidak cukup).

---

#### Template B · Multi-modal Visual Question Answering Ringan

**Inti pertanyaan (contoh):** Apakah menggunakan *CLIP* sebagai encoder gambar + *IndoBERT* sebagai encoder teks, dengan fusion MLP sederhana, cukup untuk menjawab pertanyaan sederhana berbahasa Indonesia tentang gambar dataset COCO (subset) - setidaknya 50% akurasi pada pertanyaan tipe "apa warna X" dan "berapa jumlah X"?

**Mengapa menarik.** Membangun sistem multimodal dari dua encoder pretrained yang berbeda adalah latihan konkret tentang *feature fusion* dan *alignment* - keterampilan yang sedang naik di banyak bidang riset. Versi "lite"-nya dapat dicapai tanpa model besar.

**Bahan.**

- Dataset: COCO-QA atau VQAv2 subset (pilih 3-4 tipe pertanyaan saja). Anotasi Bahasa Indonesia: terjemahkan subset 2000 pertanyaan dengan bantuan LLM + spot-check manual 100 pertanyaan.
- Model: `openai/clip-vit-base-patch32` (gambar), `indolem/indobert-base-uncased` (teks), klasifier sederhana (answer vocabulary ~300 kata paling sering).
- Compute: A40 atau L4; total ~10 jam GPU.

**Skope minimal.**

1. EDA dataset: distribusi tipe pertanyaan, distribusi jawaban (power law biasanya).
2. Translate + spot-check manual 100 pertanyaan; dokumentasikan kesalahan translasi yang umum.
3. Baseline: hanya encoder teks (tanpa gambar) - laporkan akurasi. Bila baseline ini sudah 40%, tandakan *language bias* yang harus dijaga.
4. Model multimodal: MLP fusion, 3 seed, error bar.
5. Error analysis per tipe pertanyaan: di mana model unggul/terpuruk?
6. Demo Streamlit: upload gambar + ketik pertanyaan → jawab top-5.

**Outcome yang digunakan.** 1-5 penuh, 6 (clone dan pahami CLIP wrapper), 7 (Streamlit), 9 (baca 2 paper VQA klasik).

---

#### Template C · Domain Adaptation pada Dataset Medis Kecil

**Inti pertanyaan (contoh):** Apakah teknik *test-time augmentation* meningkatkan akurasi klasifikasi pada dataset PathMNIST ketika test set di-perturbasi dengan variasi warna (simulasi pewarnaan H&E berbeda) - dibanding baseline tanpa augmentasi uji?

**Mengapa menarik.** Domain shift adalah masalah nyata di medical imaging, dan solusi TTA ringan (tanpa retraining) adalah intervensi yang dapat diuji dengan bersih. Dataset MedMNIST cukup kecil untuk dijalankan di laptop.

**Bahan.**

- Dataset: PathMNIST dari MedMNIST (9 kelas, ~100k sampel, resolusi 28×28 atau 64×64).
- Model: ResNet-18 dari `torchvision` dengan fine-tune di PathMNIST clean.
- Perturbasi: variasi warna (color jitter agresif, simulasi stain), blur, noise.
- Framework: PyTorch + template_repo modul ini.
- Compute: laptop CPU/GPU kecil cukup untuk subset; dapat skala ke A40 untuk replikasi penuh.

**Skope minimal.**

1. Train ResNet-18 pada PathMNIST; baseline akurasi.
2. Bangun 3 test sets terperturbasi (stain, blur, noise) + 1 test set clean.
3. Evaluasi baseline di semua 4 kondisi; laporkan accuracy drop per kondisi.
4. Terapkan TTA sederhana (averaging k augmented predictions); bandingkan di semua 4 kondisi.
5. 3 seed training; error bar pada semua komparasi.
6. Audit leakage (Bab 4): pastikan train/test split per-patient (atau per-image-group bila metadata tersedia).
7. Demo Streamlit: upload gambar pathologi, tampilkan prediksi dengan dan tanpa TTA.

**Outcome yang digunakan.** 1-4 penuh (termasuk audit leakage ketat), 5 (LLM bantu parsing MedMNIST), 6 (adopsi loader MedMNIST), 7 (demo), 8 (opsional RunPod untuk replikasi penuh), 9 (baca 2 paper TTA / domain shift medical).

---

### 2.3 Pemetaan Kompetensi ke Capstone

Gunakan tabel berikut sebagai self-check di akhir minggu ke-2: di mana saya berdiri untuk tiap kompetensi?


| #   | Kompetensi           | Bukti minimum di capstone                                                                            |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Memahami ML/DL       | Paragraf "mengapa arsitektur ini" di laporan; bukan hanya nama.                                      |
| 2   | Ide → Eksperimen     | Pre-registration file di repo, tanggal < commit pertama eksperimen.                                  |
| 3   | Reproduksibilitas    | Seed tercatat, config YAML, ≥3 seed per kondisi, checkpoint menyertakan git hash.                    |
| 4   | Validasi data        | Laporan EDA satu bagian, audit leakage eksplisit (atau argumen bahwa tidak berlaku).                 |
| 5   | AI tools             | Dokumentasi di `docs/llm_log.md` - di mana LLM membantu, bagaimana diverifikasi.                     |
| 6   | Adopsi repo          | Setidaknya satu komponen dari repo eksternal diadopsi (model, loader, utility), tercatat di laporan. |
| 7   | Alat pendukung       | Demo yang bisa diklik (Streamlit/Gradio); plot yang dapat dibaca mandiri.                            |
| 8   | Platform baru        | Bila compute >6 jam: bukti penggunaan cloud GPU dengan cost log. Opsional.                           |
| 9   | Pengembangan mandiri | ≥2 paper dibaca dengan catatan (format Bab 9); 5 Whys di pre-reg.                                    |


Enam kompetensi adalah minimum untuk lulus. Tujuh-delapan untuk proficient; delapan-sembilan untuk masterpiece.

### 2.4 Timeline Empat Minggu

**Minggu 1 - Fondasi.**

- Hari 1-2: pilih template atau ajukan proyek. Baca minimum 2 paper relevan.
- Hari 3: tulis 5 Whys → pre-registration lengkap.
- Hari 4-5: setup repo (fork template_repo), EDA dataset, audit leakage awal.
- Deliverable minggu: `docs/prereg.md`, `docs/eda.md`, repo commit pertama.

**Minggu 2 - Baseline.**

- Hari 6-7: jalankan baseline; verifikasi sanity (loss turun, akurasi naik dari chance level).
- Hari 8-9: tulis training dengan config + seeds + logging; jalankan 3 seed baseline.
- Hari 10: review - apakah baseline cukup keras? Apakah pre-reg masih masuk akal?
- Deliverable minggu: baseline results tabulated, TensorBoard logs, commit hash terdaftar per eksperimen.

**Minggu 3 - Eksperimen Utama.**

- Hari 11-12: implementasi intervensi (metode yang diuji). Unit test kecil bila ada komponen baru.
- Hari 13-14: jalankan eksperimen utama; error analysis awal.
- Hari 15: ablasi tambahan yang dibutuhkan jujur menjawab pertanyaan.
- Deliverable minggu: `experiments/` lengkap dengan results.csv, ablation.csv, plots.

**Minggu 4 - Sintesis & Polish.**

- Hari 16-17: demo (Streamlit/Gradio), polish plot, deep dive error analysis.
- Hari 18-19: tulis laporan 6-8 halaman.
- Hari 20: baca ulang laporan; polish README repo agar orang bisa clone-and-run.
- Deliverable minggu: laporan, demo live, repo final dengan tag `v1.0`.

Setiap minggu lulusi *checkpoint*: 15 menit dengan pembimbing - tunjukkan apa yang dijanjikan minggu itu. Jika terlambat, pangkas skope, jangan tambahkan waktu. Proyek yang terlambat 40% hampir selalu gagal; proyek yang dipangkas skope-nya dari minggu ke-2 sering masih sukses.

### 2.5 Tiga Deliverable

**Deliverable 1 - Repository.**

Struktur minimum:

```
capstone-<nama>/
├── README.md              # abstrak 1 paragraf + setup + command reproduksi
├── pyproject.toml / requirements.txt
├── configs/               # semua config YAML
├── src/                   # kode modul
├── scripts/               # download data, train, evaluate
├── experiments/           # logs, plots, results (hasil final di-commit; logs besar di-gitignore)
├── docs/
│   ├── prereg.md
│   ├── eda.md
│   ├── llm_log.md
│   ├── papers/*.md
│   └── report.pdf         # link ke laporan final
├── demo/
│   └── app.py             # Streamlit atau Gradio
└── notebooks/             # eksplorasi (opsional)
```

Repo harus dapat di-setup orang lain dari README dalam < 30 menit, termasuk download data.

**Deliverable 2 - Laporan 6-8 halaman.**

Struktur yang direkomendasikan:

1. **Abstract** (1 paragraf).
2. **Introduction** - motivasi, pertanyaan, kontribusi (1 halaman).
3. **Related Work** - 2-4 paper inti, bukan katalog (0.5-1 halaman).
4. **Method** - pre-registered; deskripsikan intervensi dan baseline dengan cukup detail untuk replikasi (1-1.5 halaman).
5. **Experiments** - dataset, protokol, hasil utama + ablasi, error analysis (2-3 halaman, termasuk tabel dan plot).
6. **Discussion** - apa yang terbukti, apa yang tidak, deviasi dari pre-reg, keterbatasan (0.5-1 halaman).
7. **Conclusion + Future Work** - satu paragraf masing-masing.
8. **References** - format konsisten (APA atau IEEE).

Template tersedia di `12_Lampiran.md`. Gunakan LaTeX atau Markdown → PDF; hindari Word untuk proyek ini (versi-kontrol lebih mudah dengan teks).

**Deliverable 3 - Demo.**

Live demo yang dapat diakses dalam rapat presentasi (`streamlit run demo/app.py`). Syarat: setidaknya input + output yang bermakna; bonus: comparison mode (baseline vs intervensi berdampingan) dan error inspection (cari contoh yang model keliru).

### 2.6 Presentasi Akhir

15-20 menit presentasi + 10 menit tanya jawab, struktur yang direkomendasikan:

1. **Pertanyaan (1 menit).** Mulai dari pertanyaan riset, bukan dari "saya akan mempresentasikan proyek saya".
2. **Mengapa layak (1 menit).** Konteks: kenapa pertanyaan ini menarik sekarang.
3. **Metode (3 menit).** Tunjukkan gambar: arsitektur, alur data, apa yang *baru* (intervensi Anda).
4. **Hasil (5 menit).** Tabel utama + 1-2 plot. Deklarasikan apa yang terbukti, apa yang tidak.
5. **Error analysis (3 menit).** Satu cerita konkret: di mana model keliru, dan mengapa itu memberi insight.
6. **Demo (3 menit).** Live. Satu contoh yang berhasil, satu yang gagal.
7. **Limitations + Future Work (2 menit).** Jujur.
8. **Q&A.**

Tip: latihan dua kali, rekam sekali, tonton. Anda akan melihat sendiri kalimat-kalimat yang tidak perlu.

---

## 3. Worked Example: Template C yang Disederhanakan

Seorang mahasiswa, Dito, memilih Template C. Rangkuman timeline kerjanya:

**Minggu 1.** Membaca 2 paper TTA (Wang et al., "Tent"; Khurana et al., "MEMO"). Catat di `docs/papers/`. 5 Whys: "Saya tertarik robustness. Mengapa? Karena deployment real-world berbeda dari benchmark. Mengapa itu penting? Karena model medical yang deploy fail silently. Mengapa aku bisa menjawab? Karena PathMNIST + perturbasi warna adalah proxy yang cukup untuk stain variation. Mengapa sekarang? Karena template_repo sudah mendukung loader MedMNIST."

Pre-reg: "TTA dengan averaging 8 augmentasi warna akan menaikkan accuracy pada test-stain-perturbed sebesar setidaknya 3% dari baseline; dan tidak akan menurunkan accuracy pada test-clean lebih dari 0.5%." EDA: menemukan bahwa 3 kelas minoritas kurang dari 5% sampel - catat akan pantau per-class metrics.

**Minggu 2.** Baseline ResNet-18 tercapai: 89.2% clean. Perturbasi stain dibuat dengan ColorJitter(brightness=0.5, saturation=0.8, hue=0.2) - parameter dicatat di config. Accuracy drop: 89.2 → 74.1 (−15.1%). Alarm: drop besar, eksperimen makin relevan.

**Minggu 3.** TTA diimplementasi: di inference, augment input 8 kali, rata-rata softmax. Hasil: pada stain-perturbed, 74.1 → 79.8 (+5.7%). Pada clean: 89.2 → 89.0 (−0.2%). Pre-reg sebagian terkonfirmasi: Δ positif +5.7% (> 3% prediksi), degradasi clean −0.2% (< 0.5% budget). 

Tetapi Dito menemukan per-class: kelas minoritas `lymphocytes` turun 2.1% dengan TTA - satu-satunya kelas yang tidak membaik. *Error analysis*: gambar lymphocytes kecil dan warnanya khas (biru-ungu); augmentasi warna agresif "menghancurkan" signal. Dito memutuskan menambah eksperimen: TTA dengan augmentasi warna *ringan* saja. Hasil: +4.8% stain-perturbed, +0.1% lymphocytes. Lebih seimbang.

**Minggu 4.** Demo Streamlit: upload histology patch, tampilkan prediksi baseline vs TTA berdampingan. Laporan 7 halaman, jujur tentang batasan (perturbasi warna bukan simulasi stain yang sempurna - rekomendasi masa depan: pakai CycleGAN stain transfer dataset yang tersedia publik).

**Hasil rubrik (Bab 11):** Kompetensi 1-7 di level *proficient* atau lebih tinggi. Kompetensi 8 tidak digunakan (tidak perlu cloud; lokal sudah cukup). Kompetensi 9 di *masterpiece* karena catatan paper-nya substantif + mengusulkan future work yang concrete. Keempat sikap tampil:

- Curiosity: menemukan lymphocytes paradox dari per-class analysis (bukan dari plot agregat).
- Rigor: pre-reg tidak diganti, walau ada temuan mengejutkan; deviasi diakui di laporan.
- Skepticism: audit leakage dilakukan; verifikasi perturbasi warna bukan simulasi sempurna.
- Ownership: menulis docs/llm_log.md; setiap klaim di laporan dapat di-trace ke eksperimen.

Proyek Dito mungkin "kecil" dibanding paper publikasi, tetapi padat dan dapat dipertanggungjawabkan sepenuhnya - kualitas yang langka dan bernilai.

---

## 4. Pitfalls & Miskonsepsi

**Pitfall 1 - Scope creep di minggu 3.** Mahasiswa ingin "tambah satu eksperimen lagi" dan proyek tidak pernah selesai. *Cara deteksi:* Kembali ke pre-reg; semua yang di luar pre-reg adalah *extra*, bukan *required*. Tulis di journal sebagai "future work", jangan kerjakan.

**Pitfall 2 - Laporan baru ditulis di minggu 4 dari nol.** Tanpa tulisan kecil selama 3 minggu sebelumnya, laporan terasa tidak bisa dimulai. *Cara deteksi:* tulis paragraf EDA di minggu 1, paragraf method di minggu 2, tabel hasil di minggu 3. Minggu 4 tinggal merakit dan polish.

**Pitfall 3 - Demo dibuat untuk mengesankan, bukan menginformasikan.** Interface cantik, tetapi tidak menunjukkan kelemahan model. *Cara deteksi:* demo Anda harus memudahkan menemukan contoh di mana model *gagal* - ini tanda kejujuran.

**Pitfall 4 - Hasil disajikan tanpa error bar.** "Model kami 89.3%" tanpa ±. Pembaca tidak tahu apakah perbedaan 0.5% meaningful atau noise. *Cara deteksi:* setiap angka utama di laporan harus punya standar deviasi dari setidaknya 3 seed.

**Pitfall 5 - Mengklaim lebih dari yang data dukung.** "Method kami membuktikan bahwa TTA universal meningkatkan robustness." Satu proyek dengan satu dataset tidak "membuktikan universal" apapun. *Cara deteksi:* kata "universal", "general", "definitively" di kesimpulan adalah bendera merah. Ganti dengan "menunjukkan, pada dataset dan kondisi yang diuji".

**Pitfall 6 - Pembimbing baru mendengar masalah di minggu 4.** "Pak, ternyata saya tidak bisa menjalankan X sejak minggu 2." Checkpoint mingguan dirancang mencegah ini. *Cara deteksi:* jika Anda menyembunyikan masalah dari pembimbing, Anda sedang merampas bantuan yang berhak Anda dapatkan.

---

## 5. Lab Hands-on

Capstone adalah lab itu sendiri - tidak ada notebook tambahan. Sebagai gantinya, pastikan selama 4 minggu Anda menghasilkan artefak berikut di folder proyekmu:

**Checklist capstone (verifikasi mingguan):**

Minggu 1:

- `docs/prereg.md` dengan tanggal jelas, 5 bagian terisi.
- `docs/eda.md` berisi plot distribusi kelas + catatan anomali.
- ≥2 paper notes di `docs/papers/`.
- Commit repo pertama; README berisi 1 paragraf tujuan proyek.

Minggu 2:

- Baseline terjalankan dengan 3 seed; results tersimpan di `experiments/baseline/`.
- Config baseline di YAML; seed tercatat.
- Checkpoint menyertakan git hash (verifikasi dengan `torch.load` + print metadata).
- TensorBoard logs dapat dibuka.

Minggu 3:

- Eksperimen intervensi terjalankan dengan 3 seed.
- `experiments/results.csv` agregat semua eksperimen.
- Minimal 1 plot utama + 1 ablation plot, jujur (error bar, caption konkret).
- `docs/llm_log.md` diupdate - di mana LLM membantu minggu ini.

Minggu 4:

- Demo Streamlit/Gradio jalan lokal; README demo 3 kalimat.
- Laporan 6-8 halaman dengan 8 bagian wajib.
- README repo final dengan instruksi clone → setup → reproduce dalam < 30 menit.
- Git tag `v1.0` pada commit final.
- Presentasi 15 menit telah dilatih setidaknya sekali.

---

## 6. Refleksi

1. Setelah memilih template, tulis dalam satu paragraf mengapa pertanyaan spesifik di proyekmu *layak* dijawab - bagi siapa dan mengapa sekarang. Paragraf ini menjadi fondasi introduction laporanmu; jika terasa sulit ditulis, pertanyaanmu mungkin belum cukup tajam.
2. Di minggu ke-2, bandingkan timeline aktual vs rencana. Di mana Anda paling lambat? Apa yang Anda pelajari tentang cara Anda bekerja - apakah Anda cenderung terlalu optimis di setup, terlalu lama di polish, atau terlalu banyak eksperimen paralel?
3. Setelah presentasi akhir, refleksi satu halaman: keputusan desain mana yang paling sulit? Di mana Anda paling tergoda menyimpang dari pre-reg? Apa yang akan Anda lakukan berbeda di proyek riset berikutnya?

---

## 7. Bacaan Lanjutan

- **"Writing a Good Research Paper"** oleh Simon Peyton Jones (video talk, 30 menit). Fokus pada menulis introduction dan related work; aplicable langsung ke laporan capstone.
- **"Reproducibility Checklist for ML"** (NeurIPS/ICML). Centang tiap poin di repo akhir Anda; yang tidak terpenuhi, catat alasannya di limitations.
- **Contoh repo publikasi yang bersih.** Saran: `facebookresearch/mae` (README jelas, struktur rapi), `rwightman/pytorch-image-models`. Studi bagaimana mereka menyusun README dan scripts.
- **Papers with Code - "State of the Art"** halaman untuk dataset yang Anda pakai. Kalau Anda belum tahu top-3 hasil saat ini, Anda belum cukup memetakan konteks.

---

*Bab 11 (Rubrik Penilaian) telah ditulis sebelum capstone - baca ulang sekarang dengan proyekmu di tangan, dan gunakan rubrik sebagai self-check. Bab 12 berisi lampiran: glosarium ID↔EN, checklist, serta template laporan dan pre-registration yang dapat langsung Anda pakai.*