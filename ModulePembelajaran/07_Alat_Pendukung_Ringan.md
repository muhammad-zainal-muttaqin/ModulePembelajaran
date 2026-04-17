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
| ▶ 07 | Alat Pendukung Ringan | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 07 · Alat Pendukung Ringan untuk Riset

> *Perkakas riset tidak perlu indah - ia harus membuktikan sesuatu. Demo yang bisa diklik seorang reviewer lebih meyakinkan daripada lima halaman laporan; visualisasi yang tepat menghemat satu minggu debug yang tidak perlu.*

---

## 0. Peta Bab

Bab ini melatih Anda membangun perkakas pendukung yang ringan - demo interaktif, UI anotasi, visualisasi hasil, dan alat inspeksi data - dengan prinsip bahwa setiap alat harus membuktikan atau mempercepat sesuatu, bukan menjadi proyek tersendiri. Anda akan belajar menggunakan Streamlit untuk demo model, Gradio untuk anotasi cepat, Matplotlib/Seaborn untuk visualisasi eksperimen yang jujur, dan pola kapan berhenti membangun perkakas agar fokus tidak hilang dari riset itu sendiri. Setelah bab ini, Anda dapat mengemas model Anda menjadi demo yang bisa diklik dalam satu jam, membangun UI anotasi untuk dataset 200 sampel dalam satu sore, dan membuat plot yang dibaca cepat oleh pembimbing tanpa perlu penjelasan lisan.

---

## 1. Motivasi: Demo yang Mengubah Rapat Mingguan

Bayangkan dua kondisi rapat pembimbingan. Pada kondisi pertama, mahasiswa membawa notebook penuh angka, grafik screenshot dari TensorBoard, dan tabel metrik. Dosen bertanya, "Kalau gambar yang ini bagaimana hasilnya?" - mahasiswa harus kembali ke laptop, memuat checkpoint, menulis kode inferensi, lima menit kemudian baru ada jawaban. Rapat kehilangan tempo.

Pada kondisi kedua, mahasiswa membuka tab browser, menampilkan aplikasi Streamlit lokal. Dosen menyeret gambar apapun ke area upload; dalam dua detik muncul prediksi, confidence, dan heatmap aktivasi. "Coba yang kelas ini - bagaimana?" Mahasiswa klik contoh dari galeri yang sudah disiapkan. Diskusi mengalir ke arah *mengapa* model keliru pada kasus tertentu, bukan ke hal mekanis seperti bagaimana memuatnya.

Perbedaan utama bukan teknologi yang rumit. Streamlit yang dipakai mahasiswa kedua itu seratus baris kode - selesai dalam dua jam. Perbedaannya adalah *keputusan* bahwa waktu dua jam itu berharga untuk dikeluarkan. Perkakas yang tepat menggeser pertanyaan dari "apakah kode Anda jalan?" ke "apakah idemu benar?" - dan itulah percakapan yang seharusnya terjadi di lab.

---

## 2. Konsep Inti

### 2.1 Empat Kategori Perkakas Pendukung

Perkakas yang akan Anda butuhkan dalam riset dapat dikelompokkan menjadi empat kategori, masing-masing menjawab pertanyaan berbeda:


| Kategori          | Pertanyaan yang Dijawab                                  | Contoh Teknologi            |
| ----------------- | -------------------------------------------------------- | --------------------------- |
| Demo interaktif   | "Apa yang model Anda lakukan?"                           | Streamlit, Gradio           |
| UI anotasi        | "Bagaimana saya mendapatkan label untuk 200 sampel ini?" | Gradio, Label Studio        |
| Visualisasi hasil | "Mana yang lebih baik, baseline atau varian A?"          | Matplotlib, Seaborn, Plotly |
| Inspeksi data     | "Ada apa di dataset saya yang tidak saya lihat?"         | Pandas + Jupyter, FiftyOne  |


Bedakan perkakas *pendukung riset* dari produk perangkat lunak. Perkakas pendukung punya satu pengguna (Anda atau pembimbing), umur pakai pendek (mungkin hanya untuk satu milestone), dan tujuan tunggal yang tajam. Ia tidak perlu otentikasi, tidak perlu responsif di ponsel, tidak perlu deploy ke cloud kecuali memang diperlukan. Kelonggaran itu adalah fitur, bukan bug.

### 2.2 Streamlit: Demo dalam 30 Menit

Streamlit membaca file Python dari atas ke bawah, memperlakukan setiap panggilan `st.something(...)` sebagai widget UI. Perubahan widget memicu re-run seluruh skrip. Model mental ini mengejutkan untuk programmer web tetapi sangat cocok untuk peneliti: tidak perlu memikirkan state management, routing, atau JSON API.

Kerangka minimum demo klasifikasi gambar:

```python
import streamlit as st
import torch
from PIL import Image
from src.models import load_model
from src.data import preprocess_image

st.title("Demo Klasifikasi CIFAR-10")
st.caption("Upload gambar 32x32 atau lebih besar; model akan memprediksi salah satu dari 10 kelas.")

@st.cache_resource
def get_model():
    return load_model("experiments/baseline/ckpt_best.pt")

model = get_model()
uploaded = st.file_uploader("Pilih gambar", type=["png", "jpg", "jpeg"])

if uploaded is not None:
    img = Image.open(uploaded).convert("RGB")
    st.image(img, width=256, caption="Input")
    x = preprocess_image(img).unsqueeze(0)
    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1)[0]
    top3 = torch.topk(probs, k=3)
    for prob, idx in zip(top3.values, top3.indices):
        st.write(f"**{CLASSES[idx]}**: {prob.item():.2%}")
```

Perhatikan tiga keputusan kecil yang membuat demo ini berguna. `@st.cache_resource` mencegah model dimuat ulang setiap interaksi - tanpa ini, setiap klik menunggu sepuluh detik. `top3` lebih informatif daripada argmax tunggal; reviewer sering tertarik pada kepercayaan relatif antar kelas. Caption di atas uploader memberi konteks tanpa perlu penjelasan lisan.

Untuk menjalankan: `streamlit run app.py`. Browser terbuka otomatis di `localhost:8501`.

### 2.3 Gradio: UI Anotasi Cepat

Gradio lebih kecil dari Streamlit tetapi punya komponen anotasi yang lebih kaya secara default. Ia cocok ketika Anda butuh cepat mengumpulkan label untuk beberapa ratus sampel - misalnya subset test yang perlu Anda anotasi ulang karena labelnya mencurigakan.

Pola umum UI anotasi dengan dua tombol (benar/salah):

```python
import gradio as gr
import pandas as pd
from pathlib import Path

samples = list(Path("data/ambiguous").glob("*.png"))
log_path = Path("annotations.csv")
if not log_path.exists():
    pd.DataFrame(columns=["file", "label", "timestamp"]).to_csv(log_path, index=False)

def annotate(idx, label):
    file = samples[idx].name
    row = pd.DataFrame([{"file": file, "label": label, "timestamp": pd.Timestamp.now()}])
    row.to_csv(log_path, mode="a", header=False, index=False)
    next_idx = (idx + 1) % len(samples)
    return str(samples[next_idx]), next_idx, f"{next_idx+1} / {len(samples)}"

with gr.Blocks() as demo:
    idx_state = gr.State(0)
    img = gr.Image(value=str(samples[0]), type="filepath")
    counter = gr.Label(value=f"1 / {len(samples)}")
    with gr.Row():
        btn_correct = gr.Button("Benar")
        btn_wrong = gr.Button("Salah")
    btn_correct.click(lambda i: annotate(i, "correct"), inputs=idx_state, outputs=[img, idx_state, counter])
    btn_wrong.click(lambda i: annotate(i, "wrong"), inputs=idx_state, outputs=[img, idx_state, counter])

demo.launch()
```

Setiap klik menulis satu baris ke CSV segera - bukan buffer di memori. Konsekuensinya: kalau browser crash di sampel ke-137, Anda tidak kehilangan 136 anotasi sebelumnya. Keputusan desain "append per interaksi" adalah kontras sederhana dengan pola "submit di akhir" yang rawan kehilangan data.

### 2.4 Visualisasi Hasil yang Jujur

Plot yang baik punya tiga sifat: dapat dibaca tanpa penjelasan tambahan, menunjukkan ketidakpastian ketika ada, dan membuat perbandingan mudah secara visual. Plot yang buruk memoles satu sisi cerita sambil menyembunyikan sisi yang lain.

Contoh perbandingan baseline vs varian (focal + freeze) dengan error bar dari tiga seed:

```python
import matplotlib.pyplot as plt
import numpy as np

labels = ["Baseline", "Focal", "Freeze", "Focal+Freeze"]
means = np.array([0.712, 0.724, 0.698, 0.731])
stds = np.array([0.008, 0.011, 0.006, 0.009])

fig, ax = plt.subplots(figsize=(6, 4))
x = np.arange(len(labels))
ax.bar(x, means, yerr=stds, capsize=5, color=["#888", "#4C72B0", "#4C72B0", "#DD8452"])
ax.set_xticks(x)
ax.set_xticklabels(labels)
ax.set_ylabel("Balanced Accuracy")
ax.set_ylim(0.65, 0.76)
ax.axhline(means[0], color="gray", linestyle="--", linewidth=0.8, label="Baseline")
ax.legend(loc="lower right")
ax.set_title("Ablation Loss × Freeze, 3 seed")
plt.tight_layout()
plt.savefig("experiments/plots/ablation.png", dpi=150)
```

Beberapa keputusan kecil yang membuat plot ini jujur: `yerr` menunjukkan standar deviasi antar seed, bukan interval kepercayaan yang dihitung sembarangan; `ylim` dimulai dari 0.65 bukan 0 karena perbedaan yang ingin dilihat adalah antar varian, tetapi *dicatat* di caption agar pembaca sadar skala; garis putus-putus di baseline memudahkan mata membandingkan; warna yang sama untuk varian yang berbagi satu perubahan (focal atau freeze saja) dan warna berbeda untuk kombinasi - menyampaikan struktur eksperimen secara visual.

Plot yang tidak jujur sering kali justru lebih cantik: gradien warna, bayangan, animasi. Hati-hati terhadap godaan itu dalam konteks akademik.

### 2.5 Inspeksi Data Interaktif

Ketika Anda menemukan anomali di metrik - misalnya test accuracy turun 5% dari epoch 10 ke epoch 20 - Anda butuh perkakas untuk mencari *mengapa*. Perkakas paling sederhana adalah notebook Jupyter dengan beberapa fungsi helper:

```python
def show_worst_k(model, loader, k=16, device="cuda"):
    model.eval()
    records = []
    with torch.no_grad():
        for x, y in loader:
            x, y = x.to(device), y.to(device)
            logits = model(x)
            probs = torch.softmax(logits, dim=1)
            pred = probs.argmax(1)
            loss_per_sample = torch.nn.functional.cross_entropy(logits, y, reduction="none")
            for i in range(len(x)):
                records.append({
                    "img": x[i].cpu(),
                    "y": y[i].item(),
                    "pred": pred[i].item(),
                    "conf": probs[i, pred[i]].item(),
                    "loss": loss_per_sample[i].item(),
                })
    records.sort(key=lambda r: -r["loss"])
    return records[:k]
```

Fungsi ini mengembalikan *k* sampel dengan loss tertinggi - yang paling keliru. Visualisasi dengan grid matplotlib dan judul yang menampilkan label asli serta prediksi memungkinkan Anda memindai dua puluh sampel dalam sepuluh detik dan menemukan pola: "semua kesalahan model adalah gambar bertema malam" atau "labelnya yang salah, bukan modelnya".

Inspeksi seperti ini bernilai lebih tinggi dari grafik loss yang cantik. Ia menyentuh *sampel individual* - tempat cerita sebenarnya tinggal.

### 2.6 Batas: Kapan Berhenti Membangun Perkakas

Perkakas pendukung menarik karena terasa produktif - ada output visual yang langsung memuaskan, kode berjalan, semuanya bekerja. Bahaya: Anda menghabiskan seminggu membangun dashboard yang cantik untuk eksperimen yang bahkan belum tajam pertanyaannya.

Tiga aturan praktis kapan berhenti:

**Aturan jam-per-minggu.** Jika Anda sudah menghabiskan lebih dari 20% waktu mingguan pada perkakas (misal 8 dari 40 jam), tanyakan: apakah riset inti saya maju minggu ini? Bila tidak, kurangi.

**Aturan satu-pengguna.** Jika Anda tergoda menambahkan login, multi-user, permission - hentikan. Perkakas pendukung riset punya satu pengguna. Semua itu adalah fitur produk, bukan fitur riset.

**Aturan membuktikan-sesuatu.** Sebelum menambah fitur baru, tanya: fitur ini akan membuktikan atau mempercepat pertanyaan riset yang mana? Bila jawabannya "akan enak jika ada", hentikan.

---

## 3. Worked Example: Demo Klasifikasi CIFAR-10 dalam 45 Menit

Target: membangun aplikasi Streamlit yang menampilkan prediksi model, top-3 kelas, dan peta aktivasi Grad-CAM; bisa dijalankan di laptop dan cukup untuk demo pembimbingan.

**Menit 0-10: kerangka.** Salin kerangka dari 2.2. Tambahkan import yang dibutuhkan. Pastikan `model.eval()` dipanggil di dalam `get_model()`. Jalankan dengan gambar dummy; pastikan prediksi muncul.

**Menit 10-25: galeri contoh.** Tambahkan `st.sidebar` dengan tombol untuk sepuluh gambar contoh dari test set - satu per kelas. Ketika tombol diklik, state gambar berpindah ke contoh tersebut. Ini menghilangkan friksi "cari gambar" saat demo.

```python
EXAMPLES = {c: Path(f"examples/{c}.png") for c in CLASSES}
with st.sidebar:
    st.header("Contoh")
    for c, path in EXAMPLES.items():
        if st.button(c):
            st.session_state["current_img"] = Image.open(path).convert("RGB")
```

**Menit 25-40: Grad-CAM.** Tambahkan peta aktivasi agar pembimbing dapat melihat *di mana* model melihat:

```python
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

cam = GradCAM(model=model, target_layers=[model.block2[-1]])
grayscale = cam(input_tensor=x, targets=None)[0]
heatmap = show_cam_on_image(np.array(img.resize((128, 128))) / 255.0, grayscale, use_rgb=True)
st.image(heatmap, width=256, caption="Grad-CAM")
```

**Menit 40-45: catatan demo.** Di bagian bawah halaman, tambahkan satu paragraf Markdown: dataset mana, berapa akurasi test-set, tanggal training, versi commit - agar pembaca tahu apa yang sedang mereka lihat. Tanpa ini, demo dapat disalah-pahami sebagai lebih matang dari kenyataannya.

Hasil: aplikasi 120 baris, jalan lokal, cukup baik untuk dua bulan ke depan. Tidak deploy, tidak otentikasi, tidak multi-user - dan itu tepat.

---

## 4. Pitfalls & Miskonsepsi

**Pitfall 1 - Perkakas menjadi proyek tersendiri.** Anda mulai dengan niat "demo cepat" dan tiba-tiba tiga minggu hilang memperhalus UI. *Cara deteksi:* lihat commit log - jika lebih dari dua minggu kontribusi semuanya di file `app.py` dan tidak di model atau data, Anda kehilangan arah.

**Pitfall 2 - Caching yang tidak disengaja menyembunyikan bug.** `@st.cache_resource` yang memuat model lama sementara Anda sudah mengganti checkpoint adalah sumber kebingungan klasik. *Cara deteksi:* tambahkan timestamp dan path checkpoint yang dimuat ke UI; rapat demo dengan model salah adalah kegagalan yang bisa dihindari.

**Pitfall 3 - Visualisasi yang menggiring kesimpulan.** `ylim` yang sempit membuat perbedaan kecil tampak besar; warna yang berbeda antar varian yang sebenarnya mirip membuat mata membaca struktur yang tidak ada. *Cara deteksi:* tunjukkan plot ke teman tanpa konteks, tanya kesimpulan apa yang mereka tarik; jika berbeda dari yang Anda inginkan, plot masih jujur - jika sama persis tetapi kesimpulannya lebih tegas dari yang data dukung, plot tersebut menggiring.

**Pitfall 4 - UI anotasi tanpa audit trail.** Menganotasi 200 sampel, menyimpan di memori, crash, kehilangan semua. *Cara deteksi:* test dengan sengaja membunuh proses setelah 10 anotasi; pastikan 10 anotasi tersebut tetap ada di disk.

**Pitfall 5 - Demo yang tidak menyebutkan keterbatasan.** Pembimbing mencoba gambar anjing buram; model memprediksi "truck"; mahasiswa tampak bingung. *Cara deteksi:* sebelum demo, tulis satu paragraf "apa yang model TIDAK bisa lakukan" dan tempel di UI.

---

## 5. Lab Hands-on

**Lab 7 - Streamlit Demo + Gradio Annotation.** Kerjakan notebook [Lab 7 - Streamlit Demo dan Gradio Annotation](template_repo/notebooks/lab7_streamlit_demo.ipynb) bersama file `app.py` pendamping. Target:

1. Demo Streamlit untuk model Lab 3 (baseline CIFAR-10) dengan upload, top-3, dan Grad-CAM.
2. Galeri sepuluh contoh satu per kelas, di-load dari test set.
3. UI Gradio terpisah untuk anotasi ulang 30 sampel test set yang paling mencurigakan (ditemukan di Lab 4 ketika audit leakage). Output: `annotations_relabeled.csv`.
4. Satu plot ablation hasil Lab 2 dengan error bar dari tiga seed; simpan sebagai `experiments/plots/ablation.png`.

**Checklist verifikasi:**

- `streamlit run app.py` jalan tanpa error; demo dapat diklik.
- Model diload satu kali (verifikasi dengan print di `get_model()`).
- Grad-CAM menampilkan heatmap yang masuk akal untuk setidaknya lima contoh.
- Gradio anotasi menulis CSV per klik; bunuh proses di sampel ke-5, start ulang, lanjut ke sampel ke-6.
- Plot ablation dapat dibaca tanpa penjelasan tambahan; error bar, ylim jelas, caption jujur.

Target waktu: 4-6 jam. Ingat aturan batas: berhenti ketika aplikasi *berguna*, bukan *sempurna*.

---

## 6. Refleksi

1. Pembimbing bertanya, "Bisa tambahkan fitur X ke demo Anda?" Bagaimana Anda memutuskan apakah akan menambahkannya atau menolak dengan sopan? Tulis dua kriteria konkret yang akan Anda pakai.
2. Anda membuat plot yang menunjukkan varian Anda unggul 2% dari baseline dengan error bar yang nyaris beririsan. Apa cara paling jujur menceritakan hasil itu dalam satu paragraf - tidak overclaim, tidak underclaim?
3. Mahasiswa lain memakai demomu dan terkesan. Ia bertanya apakah Anda berencana mempublikasikannya sebagai web app. Jawaban Anda seharusnya membedakan dua jenis pekerjaan - riset vs produk. Bagaimana Anda merumuskan perbedaannya secara singkat?

---

## 7. Bacaan Lanjutan

- **Streamlit Documentation - "Advanced concepts"** (docs.streamlit.io). Baca bagian *session state* dan *caching*; dua konsep ini memecahkan 80% masalah yang muncul setelah demo pertama.
- **Gradio Documentation - "Building with Blocks"** (gradio.app/docs). Blocks API memberi kontrol lebih halus daripada `Interface` dan penting ketika UI anotasi mulai kompleks.
- **Matplotlib Cookbook - "Making plots readable"** (matplotlib.org/stable/tutorials). Fokus pada bagian *typography* dan *color*; menghindari default yang ramai sering cukup membuat plot sudah jauh lebih jelas.
- **"The Visual Display of Quantitative Information"** oleh Edward Tufte. Bukan buku teknis, tetapi prinsip *data-ink ratio* akan mengubah cara Anda membuat semua plot selanjutnya. Baca satu bab, satu bulan sekali.

---

## Lanjut ke Bab 08

Anda kini bisa membangun alat inspeksi ringan yang membuat riset lebih mudah dikomunikasikan. Keterampilan berikutnya menggeser konteks kerja: ketika laptop tidak cukup, bagaimana Anda pindah training ke GPU cloud tanpa kehilangan disiplin reproduksibilitas dan tanpa membakar anggaran?

Buka [Bab 08 - Platform dan Tool Baru](08_Platform_Dan_Tool_Baru.md) ketika siap.