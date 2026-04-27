<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| 05 | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md) | 5 |
| 06 | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) | 6 |
| 07 | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md) | 7 |
| ▶ 08 | W8 - Foundation Models | 8 |
| 09 | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) | 9 |
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| 11 | [W11 - Research Framing & Capstone Proposal](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone 3 Minggu](12_Capstone_3_Minggu.md) | 12-14 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Dosen](15_Panduan_Dosen.md) | – |

</details>

---

# 08 · W8 - Foundation Models

> *Foundation model bukan "model yang bagus". Ia adalah model yang sudah mempelajari representasi kaya dari jutaan atau miliaran contoh sehingga Anda tidak harus mulai dari nol. Pertanyaannya bukan "apakah saya boleh memakainya" - pertanyaannya adalah "adaptasi apa yang paling masuk akal untuk skenario ini?"*

**Big Map row:** input apapun dengan pretrained priors
**Rigor habit:** Model-card literacy, adaptation choice, fair baseline selection
**Dataset:** Reuse dataset dari minggu sebelumnya untuk perbandingan langsung
**Lab utama:** Foundation Model Map + selection memo

---

## 0. Peta Bab

W8 membangun pemahaman sistematis tentang ekosistem foundation models:

- **2.1** Apa yang membuat sebuah model menjadi "foundation model"?
- **2.2** Taksonomi modality x family x adaptation
- **2.3** Membaca model card secara kritis
- **2.4** Adaptation choice decision tree
- **2.5** Teacher model dan training-time supervision
- **3** Worked Example: IndoBERT dengan tiga strategi adaptasi

---

## 1. Motivasi: Jangan Mulai dari Nol

Bayangkan Anda ditugaskan membangun classifier untuk teks medis Bahasa Indonesia. Pilihan:

**Dari nol:** Train LSTM dari scratch. Dataset Anda 5.000 sampel - mungkin cukup untuk pola dasar, tapi vocabulary medis sangat sparse.

**Dengan foundation model:** Mulai dari IndoBERT yang sudah memahami tata bahasa dan konteks Bahasa Indonesia dari jutaan kalimat. Fine-tune hanya 3 epoch. Hasilnya hampir pasti lebih baik dengan lebih sedikit data dan waktu.

Tapi sebelum memilih model, ada pertanyaan yang perlu dijawab:

1. Model mana yang paling cocok untuk tugas dan domain ini?
2. Adaptasi apa yang paling tepat - frozen features, LoRA, atau full fine-tuning?
3. Apakah model ini punya batasan yang perlu saya waspadai?

W8 memberi kerangka untuk menjawab ketiga pertanyaan ini.

---

## 2. Konsep Inti

### 2.1 Apa Itu Foundation Model dalam Praktiknya?

Foundation model bukan definisi teknis yang ketat. Dalam konteks riset praktis, ia merujuk ke model yang:

1. **Pretrained pada data besar** - teks, gambar, audio, atau multimodal pada skala yang tidak praktis untuk dilatih sendiri.
2. **Representasi yang dapat ditransfer** - hidden states atau embeddings berguna untuk banyak downstream tasks.
3. **Dapat diadaptasi tanpa training penuh** - frozen extraction, lightweight adapters (LoRA), atau fine-tuning sebagian sudah memberikan hasil kompetitif.

Konsekuensi praktis: ketika Anda mendapat task baru, pertanyaan pertama adalah "apakah ada foundation model yang relevan?" bukan "arsitektur apa yang akan saya bangun dari nol?"

### 2.2 Taksonomi Modality x Family x Adaptation

#### Teks

| Model | Family | Pretraining | Best for | Adaptation modes |
|---|---|---|---|---|
| BERT / RoBERTa | Encoder-only | MLM | Classification, NER, similarity | Frozen, LoRA, full FT |
| IndoBERT | Encoder-only | Indonesian corpus | Indonesian NLP | Frozen, LoRA, full FT |
| GPT-2/3 | Decoder-only | Causal LM | Text generation, completion | Prompt, full FT |
| T5 / FLAN-T5 | Encoder-decoder | Text-to-text | QA, summarization, translation | Full FT |
| BioBERT / ClinicalBERT | Encoder-only | Biomedical text | Medical NLP | Full FT (domain matters) |

Aturan praktis: encoder-only untuk pemahaman, decoder-only untuk generasi, encoder-decoder untuk transformasi teks.

#### Vision

| Model | Family | Pretraining | Best for | Adaptation |
|---|---|---|---|---|
| ResNet / EfficientNet | CNN | ImageNet supervised | Image classification | Frozen, full FT |
| ViT / DeiT | Transformer | ImageNet supervised | Classification, patches | Frozen, full FT |
| CLIP (visual encoder) | Transformer | Image-text contrastive | Zero-shot, similarity | Frozen features |
| DINO / DINOv2 | Self-supervised | Unlabeled images | Dense tasks, segmentation | Frozen, linear probe |

#### Vision-Language

| Model | Pretraining | Best for |
|---|---|---|
| CLIP | Image-text contrastive | Zero-shot classification, retrieval |
| BLIP-2 | Image-text | VQA, captioning |
| Florence-2 | Multiple vision tasks | Detection, segmentation, caption |

#### Audio

| Model | Pretraining | Best for |
|---|---|---|
| Whisper | Audio transcription (multilingual) | ASR |
| Wav2Vec 2.0 | Self-supervised audio | Speech features, ASR |
| AST (Audio Spectrogram Transformer) | Supervised spectrogram | Audio classification |

#### Time Series

| Model | Pretraining | Notes |
|---|---|---|
| Chronos | Large-scale time series | Probabilistic forecasting, zero-shot |
| TimeGPT-1 | Time series | Zero-shot forecasting; commercial |
| TimesFM | Large-scale TS | General forecasting |

> [!NOTE]
> Time series foundation models masih banyak yang early-stage research. Evaluasi klaimnya dengan skeptis, terutama jika benchmark overlap dengan domain Anda.

#### Domain-Specific

| Domain | Model | Catatan |
|---|---|---|
| Biomedical text | BioBERT, ClinicalBERT | Pretraining pada PubMed/clinical notes |
| Indonesian NLP | IndoBERT, mBERT, XLM-R | Pilih berdasarkan data size dan domain |
| Chemistry / proteins | ChemBERTa, ESM-2 | Molecular dan sequence data |

### 2.3 Membaca Model Card Secara Kritis

Model card adalah dokumen yang menemani sebuah model. Tujuh pertanyaan wajib saat membaca model card:

1. **Apa dataset pretraining?** Domain, bahasa, ukuran. Relevan dengan tugas Anda?
2. **Apa evaluation benchmark yang dilaporkan?** Apakah benchmark representatif untuk tugas Anda?
3. **Apa batasan yang disebutkan eksplisit?** Biases, failure modes, out-of-scope uses.
4. **Berapa besar modelnya?** Parameter count mempengaruhi inference cost dan feasibility fine-tuning.
5. **Lisensi penggunaan?** CC-BY, Apache 2.0, atau restricted commercial - penting untuk publikasi.
6. **Apakah ada reproducibility artifacts?** Training code, eval code, atau hanya weights?
7. **Kapan model di-release dan apa data cutoff-nya?** Apakah ada model lebih baru?

> [!WARNING]
> "SOTA di benchmark X" tidak berarti "terbaik untuk tugas saya" jika domain berbeda signifikan. Selalu periksa apakah benchmark dataset punya overlap dengan domain Anda.

### 2.4 Adaptation Choice Decision Tree

Pilihan adaptasi bergantung pada tiga faktor: **compute budget**, **jumlah labeled data**, dan **seberapa jauh domain target dari pretraining**.

```
Compute budget cukup untuk fine-tuning?
├── Tidak (CPU atau GPU kecil)
│   └── Frozen features + lightweight head
└── Ya
    Labeled data < 1000 sampel?
    ├── Ya
    │   └── Frozen atau LoRA (r=4-8)
    │       (full FT berisiko overfitting)
    └── Tidak (1000+ sampel)
        Domain jauh dari pretraining?
        ├── Ya (mis. medical dari general web)
        │   └── Full fine-tuning atau LoRA (r=16-32)
        └── Tidak (domain mirip)
            └── Frozen atau LoRA (r=4-8) sudah cukup
```

**Frozen features:** Extract embeddings tanpa gradient. Hanya train linear head. Tercepat, cocok untuk proof-of-concept atau data sedikit.

**LoRA:** Tambahkan matriks low-rank parallel dengan weight original. Hanya LoRA matrices dilatih (biasanya < 1% parameter). Efficient, hasil sering comparable dengan full fine-tuning.

**Full fine-tuning:** Semua parameter diupdate. Paling fleksibel, paling mahal. Butuh data cukup untuk menghindari overfitting.

### 2.5 Teacher Model dalam Training-Time Supervision

Foundation model tidak selalu digunakan untuk inference. Pola penting: **teacher model yang hanya hadir saat training**.

Contoh:
- **Knowledge distillation** - model besar (teacher) melatih model kecil (student) dengan soft targets.
- **Auxiliary supervision** - embedding dari CLIP digunakan sebagai target untuk network visual lebih kecil.
- **Pseudo-label generation** - foundation model menghasilkan pseudo-labels untuk unlabeled data.

Dalam semua kasus ini, foundation model tidak ada dalam model final yang di-deploy. Ia meningkatkan proses training. Pola ini penting karena memungkinkan benefit dari foundation model tanpa inference cost-nya.

---

## 3. Worked Example: IndoBERT dengan Tiga Strategi Adaptasi

Dataset: IndoNLU SmSA (dari Lab 5b). Tiga strategi pada dataset yang sama untuk memperlihatkan trade-off nyata.

**Strategi A - Frozen + Linear Head:**
```python
# Freeze BERT, hanya train head
for param in model.bert.parameters():
    param.requires_grad = False
```
Keunggulan: training selesai dalam menit, tidak butuh GPU besar.
Kelemahan: representasi frozen mungkin tidak optimal untuk sentimen.

**Strategi B - LoRA (r=8):**
```python
from peft import get_peft_model, LoraConfig, TaskType
config = LoraConfig(task_type=TaskType.SEQ_CLS, r=8, lora_alpha=16,
                    target_modules=["query", "value"])
model = get_peft_model(base_model, config)
```
Keunggulan: 10-20× lebih hemat parameter dari full FT, training 5× lebih cepat.
Kelemahan: butuh library PEFT; kurang familier.

**Strategi C - Full Fine-tuning:**
```python
model = AutoModelForSequenceClassification.from_pretrained(
    "indobenchmark/indobert-base-p1", num_labels=3)
# Semua parameter trainable by default
```
Keunggulan: paling fleksibel, potensi performa tertinggi.
Kelemahan: paling lama, butuh GPU, risiko overfitting pada data kecil.

**Ekspektasi perbandingan** pada 5000 sampel IndoNLU SmSA:
- Frozen: macro-F1 ≈ 68-73%. Cepat, tapi sub-optimal.
- LoRA: macro-F1 ≈ 76-81%. Best efficiency-performance tradeoff.
- Full FT: macro-F1 ≈ 80-85%. Paling lambat, paling kuat.

---

## 4. Pitfalls & Miskonsepsi

**"Foundation model selalu lebih baik."** Pada dataset kecil dengan distribusi sangat berbeda dari pretraining, model kecil yang di-fine-tune khusus kadang mengungguli foundation model besar.

**"Frozen features cukup untuk domain shift besar."** Representasi frozen BERT pada teks klinik sangat spesifik mungkin jauh lebih buruk dari fine-tuned model kecil yang lebih relevan.

**"LoRA rank besar lebih baik."** Tidak linier. r=4 atau r=8 sering sudah cukup. Rank lebih besar menambah parameter tapi tidak selalu performa.

**"Model Card selalu jujur dan lengkap."** Baca bagian "Limitations" dengan skeptis - sering kurang detail dibanding bagian "Performance".

---

## 5. Assignment: Foundation Model Map (W8)

Buat **Foundation Model Map** untuk 3-4 model yang relevan dengan domain riset Anda:

| Model | Modality | Pretraining | Downstream role | Adaptation | Teacher-only? | Pilihan karena |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |

Tambahkan **selection memo** (satu paragraf per model): mengapa model ini, asumsi apa yang dibawanya, apa batasannya.

**File output:** `foundation_model_map.md` di folder eksperimen W8.

---

## Komponen Mandiri (W8)

Format: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).

| Jalur | Tugas |
|---|---|
| **Implementasi** | Implementasikan frozen CLIP visual encoder sebagai feature extractor untuk dataset citra. Bandingkan dengan fine-tuned ResNet dari W2. |
| **Analisis** | Download 3 model cards dari HuggingFace. Jawab 7 pertanyaan kritis §2.3 untuk masing-masing. |
| **Desain** | Rancang experiment untuk menentukan kapan domain-specific model lebih baik dari general model pada satu domain spesifik. |
| **Arsitektur Baru** | Eksplorasi LoRA: implementasikan LoRA sederhana dari scratch untuk satu linear layer, verifikasi parity dengan library PEFT. |

---

## 6. Refleksi

1. Anda mendapat task baru: deteksi emosi dari rekaman suara Bahasa Indonesia. Dari taksonomi §2.2, identifikasi dua kandidat foundation model. Untuk masing-masing, tulis dua argumen mendukung dan satu risiko utama.
2. Seorang kolaborator mengklaim "model X mencapai SOTA di benchmark Y, jadi kita pakai ini". Apa tiga pertanyaan yang akan Anda tanyakan sebelum menyetujui?
3. Thread Representation Choice: frozen features adalah "extracted", full FT adalah "learned". Di mana LoRA berada dalam taksonomi W3 ini? Mengapa perbedaan ini penting untuk keputusan adaptasi?

---

## 7. Bacaan Lanjutan

- **Bommasani et al. - *On the Opportunities and Risks of Foundation Models*** (2021). Paper definitif. Baca bagian 1 (Introduction) dan 3 (Capabilities).
- **Hu et al. - *LoRA: Low-Rank Adaptation of Large Language Models*** (2021). Baca Section 4 (main experiments).
- **Mitchell et al. - *Model Cards for Model Reporting*** (2019). Template model card yang digunakan industri.

---

## Lanjut ke W9

W8 membangun pemahaman single-modality foundation models. W9 memperluas ke terrain yang lebih kompleks: bagaimana menggabungkan dua atau lebih modality, bagaimana mendeteksi apakah model benar-benar menggunakan semua modality, dan bagaimana menangani situasi di mana satu modality hilang.

Buka [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) ketika siap.
