Berikut README GitHub versi **siap copas dan langsung tampil rapi di tampilan GitHub (Markdown .md)** untuk proyekmu **🌿 Plantify – Recommender System for Living Decorative Plants**:

---

```markdown
# 🌱 Plantify – Recommender System for Living Decorative Plants

**Plantify** adalah aplikasi web modern berbasis **Next.js** yang membantu pengguna memilih **tanaman hias hidup** yang sesuai dengan kondisi ruangan, preferensi estetika, dan tingkat perawatan yang diinginkan.  
Aplikasi ini menggunakan algoritma **content-based recommendation** dengan *filtering rules* dan *similarity scoring* terhadap dataset tanaman dari **Kaggle**.

---

## 🚀 Key Features

- 🌿 **Personalized Plant Recommendation**  
  Menyesuaikan hasil dengan kondisi cahaya, iklim, penyiraman, dan preferensi dekoratif pengguna.

- 🔍 **Smart Search System**  
  Fitur pencarian fuzzy berbasis **Fuse.js** (fuzzy matching) dengan dukungan *TF-IDF*.

- 🪴 **Interactive Filtering Panel**  
  Filter kontekstual: cahaya, penyiraman, iklim, penempatan, dan gaya tanaman.

- 📋 **Detailed Plant Information**  
  Menampilkan nama ilmiah, kebutuhan cahaya & air, iklim, suhu ideal, toksisitas, dan fungsi dekoratif.

- 💾 **Save / Like System**  
  Simpan tanaman favorit untuk dilihat kembali.

- 📄 **PDF Export**  
  Unduh hasil rekomendasi atau daftar tanaman pilihan ke dalam file PDF.

---

## 🧠 Tech Stack

| Layer | Tools & Frameworks |
|-------|--------------------|
| **Frontend Framework** | Next.js (App Router, TypeScript, React 18) |
| **Styling** | TailwindCSS |
| **Search Engine** | Fuse.js + Custom Matching Algorithm |
| **Data Handling** | Local JSON Dataset (PlantsData.json) |
| **PDF Export** | jsPDF / html2canvas |
| **Development Tools** | VS Code, Git, GitHub Actions (optional CI/CD) |

---

## 📂 Folder Structure

```

PLANTIFY/
├── app/
│   ├── api/plant-image/route.ts
│   ├── plants/
│   │   ├── route.ts
│   │   └── rekomendasi/page.tsx
│   ├── tanaman/[id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ExportPDFButton.tsx
│   ├── FiltersPanel.tsx
│   ├── PlantCard.tsx
│   ├── PlantImage.tsx
│   └── PlantList.tsx
│
├── lib/
│   ├── loadData.ts
│   ├── recommend.ts
│   └── types.ts
│
├── public/
│   ├── data/PlantsData.json
│   ├── images/plants/*.png
│   ├── placeholder-plant.jpg
│   └── icons (file.svg, globe.svg, etc.)
│
├── .gitignore
├── package.json
└── README.md

````

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/plantify.git
cd plantify
````

### 2️⃣ Install Dependencies

```bash
npm install
# Jika ada konflik dependency:
npm install --legacy-peer-deps
```

### 3️⃣ Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Dataset

Dataset publik yang digunakan:
🔗 [Indoor House Plants Dataset with Care Instructions](https://www.kaggle.com/datasets/prakash27x/indoor-house-plants-dataset-with-care-instructions)

Berisi:

* Nama umum & ilmiah
* Kebutuhan cahaya dan air
* Iklim & suhu ideal
* Toksisitas, fungsi dekoratif, deskripsi singkat
* URL gambar tanaman

---

## 🧩 Recommendation Logic Overview

1. **Prefiltering**
   Menyaring tanaman berdasarkan cahaya, suhu, dan iklim.

2. **Scoring & Matching**
   Menghitung kecocokan preferensi pengguna (penyiraman, dekorasi, dll) dengan *cosine similarity* dan *string matching*.

3. **Ranking & Output**
   Menampilkan daftar tanaman terurut dengan skor relevansi dan alasan rekomendasi.

---

## 🧑‍💻 Development Team

| Name                             | Student ID | Role                             | GitHub                               |
| -------------------------------- | ---------- | -------------------------------- | ------------------------------------ |
| Fadillah Nur Laili               | 5026221032 | Algorithm Developer              | –                                    |
| Sintiarani Febyan Putri          | 5026221044 | Algorithm Developer              | –                                    |
| **Moehammad Fazle Mawla Sidiki** | 5026221110 | Project Director / Algorithm Dev | [@mfazms](https://github.com/mfazms) |
| Parisya Naylah Suhaymi           | 5026221138 | UI/UX Designer                   | –                                    |
| Candleline Audrina Firsta        | 5026221159 | UI/UX Designer                   | –                                    |

---

## 🧪 Functional Highlights

| ID   | Feature               | Description                                    |
| ---- | --------------------- | ---------------------------------------------- |
| FR-1 | Dashboard             | Halaman utama dengan quotes & navigasi         |
| FR-2 | Search                | Pencarian fuzzy berbasis nama umum/latin       |
| FR-3 | Filter                | Filter cahaya, penyiraman, iklim, penempatan   |
| FR-4 | Recommendation Engine | Algoritma content-based filtering              |
| FR-5 | Result View           | Menampilkan hasil rekomendasi & skor relevansi |
| FR-6 | Detail View           | Informasi lengkap tiap tanaman                 |
| FR-7 | Save/Like             | Simpan tanaman favorit                         |
| FR-8 | Favorites             | Lihat daftar tanaman tersimpan                 |

---

## 📊 Nonfunctional Highlights

| Category           | Key Points                                  |
| ------------------ | ------------------------------------------- |
| **Performance**    | Hasil rekomendasi muncul ≤ 2 detik          |
| **Security**       | Data favorit disimpan aman di local storage |
| **Usability**      | UI responsif, mobile-friendly               |
| **Explainability** | Tampilkan alasan di balik rekomendasi       |

---

## 📄 License

This project is licensed under the **MIT License**.
See the LICENSE file for more details.

---

## 📬 Contact

📧 **[fazlesidiki@gmail.com](mailto:fazlesidiki@gmail.com)**
🌐 GitHub: [@mfazms](https://github.com/mfazms)

```

---

🔥 **Catatan:**  
README di atas sudah:
- Menggunakan struktur Markdown penuh agar tampil *clean & rapi* di GitHub.  
- Siap langsung ditempel ke file `README.md` di repo kamu.  
- Sudah sesuai konteks proposal capstone kamu di file *Brainstorm Capstone – Group 5 [C]*:contentReference[oaicite:0]{index=0}.

Apakah kamu mau aku tambahkan **bagian CI/CD + Deployment ke Vercel atau Google Cloud Run** biar sekalian mirip gaya profesional seperti DooIT-mu juga?
```
