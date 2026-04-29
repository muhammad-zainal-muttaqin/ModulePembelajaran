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
| 08 | [W8 - Foundation Models](08_W8_Foundation_Models.md) | 8 |
| ▶ 09 | W9 - Multimodal Reasoning | 9 |
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| 11 | [W11 - Research Framing & Capstone Proposal](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone 3 Minggu](12_Capstone_3_Minggu.md) | 12-14 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Dosen](15_Panduan_Dosen.md) | – |

</details>

---

# 09 · W9 - Multimodal Reasoning

> *Ketika dua stream data tersedia, apakah model benar-benar menggunakan keduanya? Pertanyaan ini adalah yang paling diabaikan dalam multimodal research - dan jawabannya sering mengejutkan.*

**Big Map row:** multiple tensors -> shared prediction
**Rigor habit:** Per-modality ablation dan multimodal failure analysis
**Dataset:** Multimodal dataset dengan minimal dua modality (sensor + image, atau audio + text)
**Lab utama:** Lab W9 - Multimodal Ablation (`lab_w9_multimodal_ablation.ipynb`)

---

## 0. Peta Bab

W9 adalah tentang berpikir secara sistematis tentang banyak stream data sekaligus:

- **2.1** Fusion strategies: late, early, cross-attention
- **2.2** Ignored-modality failure mode
- **2.3** Missing modality: graceful degradation strategies
- **2.4** Temporal alignment: stream yang tidak sinkron
- **2.5** Per-modality ablation protocol
- **2.6** Repo adoption pada codebase multimodal

---

## 1. Motivasi: Apakah Model Ini Benar-Benar Melihat Keduanya?

Anda membangun model untuk memprediksi nyeri pasien menggunakan dua input: ekspresi wajah (gambar) dan sensor pergelangan tangan (accelerometer). Model training dengan lancar. Validation F1 = 0.79. Impressive.

Lalu Anda coba satu eksperimen: hapus seluruh input sensor, hanya berikan gambar. F1 = 0.78.

Hampir sama. Artinya: model pada dasarnya tidak menggunakan data sensor sama sekali. Dua minggu implementasi fused model menghasilkan performa yang identik dengan model single-modality. Ini adalah **ignored-modality failure mode**.

Sebelum melaporkan hasil multimodal, Anda harus menjalankan per-modality ablation. W9 mengajarkan bagaimana dan mengapa.

---

## 2. Konsep Inti

### 2.1 Fusion Strategies: Tiga Cara Menggabungkan Modality

#### Late Fusion

Setiap modality diproses secara independen oleh encodernya masing-masing. Output (embedding atau logits) digabungkan di ujung, biasanya dengan concatenation atau averaging.

```
Image → CNN → embedding_v
Text  → BERT → embedding_t
                           ↓
               concat([embedding_v, embedding_t]) → Linear → prediction
```

**Kelebihan:**
- Mudah diimplementasikan.
- Setiap encoder bisa dipretrain secara independen.
- Jika satu modality hilang, prediction masih bisa menggunakan encoder lainnya.

**Kelemahan:**
- Tidak ada interaksi antar modality sebelum penggabungan. Model tidak bisa belajar bahwa "kata ini relevan ketika gambar menunjukkan X".
- Sering menghasilkan ignored-modality failure (satu stream mendominasi karena lebih mudah dioptimasi).

#### Early Fusion

Input dari berbagai modality digabungkan di level representasi awal, sebelum diproses oleh model bersama.

```
Image pixels + Text tokens → concat/project → Shared Transformer → prediction
```

**Kelebihan:**
- Model bisa belajar interaksi antar modality dari awal.

**Kelemahan:**
- Shape yang sangat berbeda antar modality butuh projection yang cermat.
- Training lebih kompleks; lebih sulit untuk pretrained model.
- Kehilangan satu modality saat inference sulit ditangani.

#### Cross-Attention Fusion (Interaction-Based)

Satu modality digunakan sebagai query dan yang lain sebagai key/value dalam attention mechanism. Model secara eksplisit belajar "bagian mana dari modality A yang relevan untuk setiap elemen modality B?"

> [!NOTE]
> **Q/K/V primer.** Untuk recap konsep `Q`, `K`, `V` dan rumus `softmax(QK^T/√d)V`, lihat W7 §1 dan Lab `lab_w7_transformer_mini.ipynb`. Ringkasan 3-step:
>
> 1. **Q (Query)** dari modality A shape `(B, T_A, d)` - "apa yang sedang saya cari?"
> 2. **K (Key)** dan **V (Value)** dari modality B shape `(B, T_B, d)` - "apa yang tersedia untuk dicocokkan, dan apa nilai aktualnya?"
> 3. **Attention scores** `Q @ K^T / √d` shape `(B, T_A, T_B)` - matriks "seberapa relevan tiap elemen B untuk tiap elemen A". Softmax di sumbu `T_B` menghasilkan distribusi probabilitas. Output `softmax(...) @ V` shape `(B, T_A, d)` - rerata berbobot dari V, satu vektor per query.
>
> Pembagian `√d` mencegah dot product membesar saat `d` besar (tanpa scaling, softmax jadi terlalu runcing - gradient menyempit).

```
Text queries:        Q = W_q @ text_embedding       # (B, T_text, d)
Image keys/values:   K = W_k @ image_features       # (B, T_image, d)
                     V = W_v @ image_features       # (B, T_image, d)
attention_weights  = softmax(Q @ K.transpose(-2, -1) / sqrt(d), dim=-1)
cross_attn_output  = attention_weights @ V          # (B, T_text, d)
```

Ini yang digunakan oleh BLIP-2, Flamingo, dan model vision-language modern.

**Kelebihan:**
- Memungkinkan interaksi yang jauh lebih kaya - "text token 'merah' attend ke region merah di gambar".
- Sering outperforms late dan early fusion pada complex VQA tasks.

**Kelemahan:**
- Kompleksitas implementasi dan computational cost lebih tinggi.
- Butuh pretrained model yang kompatibel untuk kedua modality.

### 2.2 Ignored-Modality Failure Mode

Ini adalah failure mode paling umum dan paling sering tidak terdeteksi dalam penelitian multimodal.

**Mekanisme:** Ketika training multimodal, optimizer menemukan jalur gradient yang paling mudah. Jika satu modality lebih "informatif" atau lebih mudah dioptimasi (mis. gambar lebih clean dari sensor yang noisy), model belajar mengabaikan modality lainnya. Loss tetap turun, performance tampak bagus - tapi model sebenarnya single-modal.

**Cara mendeteksi:**

1. **Modality ablation:** Hapus satu modality sekaligus. Jika F1 tidak turun signifikan, modality itu diabaikan.
2. **Random modality:** Ganti satu modality dengan noise random. Jika performa tidak memburuk, modality itu tidak digunakan.
3. **Gradient magnitude check:** Hitung gradient norm terhadap setiap encoder. Jika satu encoder konsisten punya gradient kecil, ia tidak berkontribusi.

```python
# Gradient magnitude check per modality
def check_gradient_flow(model, batch):
    loss = compute_loss(model, batch)
    loss.backward()

    grads = {}
    for name, param in model.named_parameters():
        if param.grad is not None:
            grads[name] = param.grad.norm().item()

    # Compare gradient norms between image_encoder vs text_encoder
    img_grads = {k: v for k, v in grads.items() if 'image_encoder' in k}
    txt_grads = {k: v for k, v in grads.items() if 'text_encoder' in k}
    print(f"Image encoder avg grad: {sum(img_grads.values())/len(img_grads):.6f}")
    print(f"Text encoder avg grad: {sum(txt_grads.values())/len(txt_grads):.6f}")
```

**Solusi umum:**

- **Modality dropout** - saat training, secara acak "matikan" setiap modality dengan probabilitas tertentu. Memaksa model belajar dari setiap modality secara mandiri.
- **Separate loss terms** - tambahkan auxiliary loss per modality agar setiap encoder mendapat gradient yang jelas.
- **Gradient balancing** - scale learning rate setiap modality berdasarkan gradient magnitude.

### 2.3 Missing Modality: Strategi Degradasi Elegan

Dalam produksi, satu atau lebih modality sering tidak tersedia: sensor rusak, gambar blur tidak layak dipakai, teks tidak terisi. Sistem multimodal yang baik harus menangani ini secara graceful.

#### Strategi 1: Modality Dropout Training

Saat training, acak-acak "kosongkan" satu modality dengan probabilitas `p_drop`:

```python
class MultimodalModel(nn.Module):
    def forward(self, image, text, modality_mask=None):
        if modality_mask is None and self.training:
            # Random dropout saat training
            modality_mask = torch.bernoulli(
                torch.ones(2) * 0.15  # 15% chance tiap modality di-drop
            )

        img_feat = self.image_encoder(image) if modality_mask[0] > 0 else torch.zeros(...)
        txt_feat = self.text_encoder(text) if modality_mask[1] > 0 else torch.zeros(...)
        return self.fusion(img_feat, txt_feat)
```

Dengan ini model belajar prediksi yang robust bahkan dengan satu modality hilang.

> [!NOTE]
> **Kenapa `p_drop = 0.15`?** Bukan angka magis - rule-of-thumb dari literatur regularisasi (mirip dropout neuron 10-30%, mask language modeling BERT 15%). Range yang masuk akal: `p_drop ∈ [0.10, 0.25]`. Lebih kecil → modality dropout tidak cukup kuat untuk mencegah ignored-modality. Lebih besar → model jarang melihat fully multimodal sample, performa full-modality menurun. Untuk dataset di mana satu modality jauh lebih dominan (mis. image jauh lebih informatif dari sensor), naikkan `p_drop` modality dominan ke 0.30-0.40 agar model dipaksa belajar dari sensor lebih sering. Ini hyperparameter yang layak di-sweep di Komponen Mandiri Jalur Analisis.

#### Strategi 2: Learnable Null Token

Gantikan modality yang hilang dengan **learnable null embedding** - parameter yang dioptimasi selama training untuk merepresentasikan "tidak ada modality ini".

```python
self.null_image_token = nn.Parameter(torch.randn(1, embed_dim))

def encode_image(self, image, available=True):
    if available:
        return self.image_encoder(image)
    else:
        return self.null_image_token.expand(batch_size, -1)
```

Ini lebih baik dari zero padding karena null token belajar merepresentasikan distribusi "tidak ada", bukan noise nol.

#### Strategi 3: Fallback Single-Modal Mode

Untuk sistem production-critical, desain model sebagai ensemble:

- Default: gunakan semua modality yang tersedia.
- Jika satu modality hilang: fallback ke unimodal model untuk modality yang tersedia.

Sederhana tapi efektif untuk use case di mana reliability lebih penting dari performa maksimal.

### 2.4 Temporal Alignment: Ketika Stream Tidak Sinkron

Banyak dataset multimodal real-world punya masalah temporal alignment:

- Video frame pada 25 fps, audio pada 44100 Hz - bagaimana menyinkronkan?
- Sensor IMU pada 100 Hz, kamera pada 30 fps, label pada 1 Hz.
- Event-based data (heartbeat spikes) vs continuous time series.

**Masalah alignment tanpa sinkronisasi:**
Model mungkin mengasosiasikan event dari waktu yang salah. Jika audio dan video tidak di-align dengan benar, cross-attention akan belajar korelasi yang spurious.

**Tiga pendekatan:**

1. **Resampling/interpolasi** - downsample semua stream ke temporal resolution terendah. Kehilangan detail tapi mudah.
2. **Event-to-window mapping** - untuk event-based data, map setiap event ke window dari stream kontinu terdekat.
3. **Temporal position encoding** - encode waktu absolut sebagai feature eksplisit; biarkan model belajar alignment sendiri (lebih fleksibel tapi butuh data lebih banyak).

### 2.5 Per-Modality Ablation Protocol

Setiap paper dan laporan multimodal harus menjalankan ablation ini sebelum klaim apapun:

| Experiment | Input | Expected finding |
|---|---|---|
| Full model | image + text + sensor | Baseline performance |
| Image only | image (text+sensor masked) | Single-modal ceiling |
| Text only | text (image+sensor masked) | Single-modal ceiling |
| Sensor only | sensor (image+text masked) | Single-modal ceiling |
| Image + Text | image + text | Does sensor add value? |
| Image + Sensor | image + sensor | Does text add value? |
| Text + Sensor | text + sensor | Does image add value? |
| Random image | random noise (text+sensor real) | Ignored-modality check |

Template protocol ini tersedia di [Lampiran C.14](14_Lampiran.md#c14-per-modality-ablation-protocol).

> [!IMPORTANT]
> Jika "Image only" performanya hampir sama dengan "Full model", Anda punya masked modality problem. Selesaikan ini sebelum mengklaim bahwa sistem Anda multimodal.

### 2.6 Repo Adoption pada Codebase Multimodal

Codebase multimodal sering lebih kompleks dari codebase single-modal: banyak encoder, multiple DataLoaders, fusion modules yang abstrak. Strategi tambahan untuk membaca repo multimodal:

1. **Identifikasi titik fusion** - di mana embedding dari berbagai modality digabungkan? Ini adalah jantung arsitektur.
2. **Trace satu forward pass** - ikuti satu batch dari tiap modality dari DataLoader sampai prediction, catat shape di setiap titik.
3. **Buat repo_map.md kedua** - gunakan template [Lampiran C.12](14_Lampiran.md#c12-template-repo-map), tapi tambahkan kolom "modality".

---

## 3. Worked Example: Fusion untuk Pain Estimation

**Task:** Prediksi skala nyeri (0-10) dari dua input: ekspresi wajah (gambar 64×64) dan sensor accelerometer tangan (sequence 30 timestep, 3 axis).

**Setup Late Fusion:**

```python
class PainEstimator(nn.Module):
    def __init__(self):
        super().__init__()
        # Face encoder: CNN → embedding (128-dim)
        self.face_encoder = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.AdaptiveAvgPool2d(4), nn.Flatten(),
            nn.Linear(64*4*4, 128), nn.ReLU()
        )
        # Sensor encoder: LSTM → last hidden (64-dim)
        self.sensor_encoder = nn.LSTM(3, 64, batch_first=True)
        # Fusion + prediction head
        self.head = nn.Sequential(
            nn.Linear(128 + 64, 64), nn.ReLU(),
            nn.Linear(64, 1)
        )

    def forward(self, face, sensor, face_available=True, sensor_available=True):
        if face_available:
            face_feat = self.face_encoder(face)
        else:
            face_feat = torch.zeros(face.shape[0], 128, device=face.device)

        if sensor_available:
            _, (h_n, _) = self.sensor_encoder(sensor)
            sensor_feat = h_n[-1]
        else:
            sensor_feat = torch.zeros(sensor.shape[0], 64, device=sensor.device)

        fused = torch.cat([face_feat, sensor_feat], dim=1)
        return self.head(fused).squeeze(-1)
```

**Ablation results (expected):**

| Condition | Val MAE |
|---|---|
| Face only | 1.82 |
| Sensor only | 2.15 |
| Late fusion (both) | 1.61 |
| Random face | 2.09 |  ← jika hasilnya ~ sensor only, face diabaikan!
| Random sensor | 1.80 |  ← jika hasilnya ~ face only, sensor diabaikan!

---

## 4. Pitfalls & Miskonsepsi

**"Late fusion cukup untuk semua kasus."** Late fusion mudah diimplementasikan tapi sering menghasilkan ignored-modality problem. Coba cross-attention jika tugas butuh interaksi antar modality.

**"Hasil naik = model menggunakan semua modality."** Tidak. Model bisa mencapai improvement kecil dari satu modality saja, sementara modality lain diabaikan. Jalankan ablation!

**"Temporal alignment otomatis ditangani oleh DataLoader."** Tidak. Anda bertanggung jawab memverifikasi bahwa timestamps dari setiap modality benar-benar disinkronkan sebelum dimasukkan ke model.

**"Missing modality = zero padding."** Zero padding memberikan sinyal yang ambigu (apakah nol berarti "missing" atau "nilai sebenarnya nol"?). Gunakan learnable null token atau modality dropout training.

---

## 5. Lab W9 - Multimodal Ablation

Buka `template_repo/notebooks/lab_w9_multimodal_ablation.ipynb`.

**Tugas:**

1. Load multimodal dataset (disediakan: synthetic sensor + image, atau adopt repo multimodal publik).
2. Implementasikan late fusion baseline.
3. Jalankan per-modality ablation protocol §2.5 (7 kondisi + random check).
4. Tulis diagnosis: apakah ignored-modality problem ditemukan?
5. Jika ya, implementasikan satu solusi (modality dropout atau null token).
6. Buat `repo_map.md` kedua jika mengadopsi repo publik.

**Checklist:**
- [ ] Late fusion baseline dengan smoke test.
- [ ] 7 ablation conditions dengan tabel hasil.
- [ ] Random modality test untuk mendeteksi ignored modality.
- [ ] Diagnosis: apakah ada ignored modality?
- [ ] Satu solusi diimplementasikan jika problem ditemukan.
- [ ] `repo_map.md` untuk codebase multimodal.

---

## Komponen Mandiri (W9)

Format: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).

| Jalur | Tugas |
|---|---|
| **Implementasi** | Implementasikan cross-attention fusion sebagai alternatif late fusion. Bandingkan per-modality ablation results keduanya. |
| **Analisis** | Ambil 2 paper multimodal dari arXiv. Apakah mereka melaporkan per-modality ablation? Jika ya, apakah ada tanda ignored-modality? |
| **Desain** | Rancang sistem untuk mendeteksi missing modality secara otomatis saat inference, dan pilih strategi fallback yang tepat. |
| **Arsitektur Baru** | Implementasikan modality dropout training. Bandingkan performance pada semua 7 ablation conditions vs model tanpa modality dropout. |

---

## 6. Refleksi

1. Anda mendapatkan multimodal dataset dengan image, audio, dan text. Full fusion mencapai F1 = 0.81. Bagaimana urutan ablation yang akan Anda jalankan, dan apa yang harus terjadi agar Anda yakin ketiga modality benar-benar berkontribusi?
2. Sensor di lab Anda kadang hilang karena koneksi putus. Dari tiga missing-modality strategies (§2.3), mana yang paling sesuai untuk skenario ini? Apa trade-off masing-masing?
3. Thread Representation Choice sampai W9: engineered features (W6), extracted (W7-W8), cross-modal (W9). Bagaimana pilihan representasi untuk satu modality bisa dipengaruhi oleh ada atau tidaknya modality lain?

---

## 7. Bacaan Lanjutan

- **Baltrusaitis et al. - *Multimodal Machine Learning: A Survey and Taxonomy*** (TPAMI, 2019). Survey komprehensif fusion strategies. Baca Section 3 (Fusion) dan Section 5 (Co-learning) untuk konteks W9.
- **Wang et al. - *What Makes Training Multi-Modal Classification Networks Hard?*** (CVPR, 2020). Tentang ignored-modality problem dan solusinya. Sangat relevan dengan §2.2.
- **Li et al. - *BLIP: Bootstrapping Language-Image Pre-training*** (2022). Contoh cross-attention fusion dalam praktik yang bisa dibaca sebagai case study.
- **Lampiran C.14** - Per-Modality Ablation Protocol template untuk dipakai langsung di Lab W9.

---

## Lanjut ke W10

Dengan W9, Anda sudah menjelajahi seluruh landscape Big Map: tabular, images, sequences, text, foundation models, dan multimodal. W10 fokus pada skill yang mengikat semuanya: membaca paper secara terstruktur dan menerjemahkannya menjadi kode yang bisa dijalankan.

Buka [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) ketika siap.
