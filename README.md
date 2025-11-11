# 🌿 PlantMatch – Recommender System for Living Decorative Plants

Plantify is a modern web-based application that helps users choose **living decorative plants** suitable for their room conditions, aesthetic preferences, and maintenance levels.  
The app is built with **Next.js** and leverages a **content-based recommendation algorithm** using custom filtering rules and similarity scoring.  
It uses a curated dataset from **Kaggle**, combining plant characteristics such as light, watering needs, and climate adaptability to produce personalized recommendations.

---

## 🚀 Key Features

- 🌱 Personalized Plant Recommendation  
- 🔍 Smart Search with Fuzzy Matching & TF-IDF  
- 🪴 Contextual Filters (Light, Watering, Climate, Placement)  
- 📋 Detailed Plant Information Page  
- 💾 Save / Like System for Favorite Plants  
- 📄 Export Recommendations to PDF  
- ⚙️ Modular Next.js Architecture with TailwindCSS  

---

## 👨‍💻 Development Team

| Name | Student ID | GitHub | Email |
|------|-------------|--------|--------|
| Fadillah Nur Laili | 5026221032 | [@FadillahNurLaili](https://github.com/FadillahNurLaili) | fadillahlaili28@gmail.com |
| Sintiarani Febyan Putri | 5026221044 | [@sranifp](https://github.com/sranifp) | sintiap288@gmail.com |
| **Moehammad Fazle Mawla Sidiki** | 5026221110 | [@mfazms](https://github.com/mfazms) | fazlesidiki@gmail.com |
| Parisya Naylah Suhaymi | 5026221138 | [@ParisyaNaylah](https://github.com/ParisyaNaylah) | parisyanaylah@gmail.com |
| Candleline Audrina Firsta | 5026221159 | [@Candleline](https://github.com/Candleline) | candlelinef@gmail.com |

---

## 📁 Repository

- 🔗 [Project Repository](https://github.com/YOUR_USERNAME/plantify)

---

## 🧰 Prerequisites

Make sure the following tools are installed on your system:

- Node.js (LTS)
- Git & GitHub Desktop
- Visual Studio Code
- (Optional) Docker Desktop
- (Optional) SonarCloud account
- (Optional) Google Cloud Platform or Vercel account for deployment

---

## ✅ Local Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/plantify.git
cd plantify

# 2. Install dependencies
npm install

# If errors occur, use:
npm install --legacy-peer-deps
````

📌 **Note**: `--legacy-peer-deps` is used to bypass dependency conflicts with older packages.

```bash
# 3. Start the development server
# 3. Start the development server
npm run dev
```

The app will run locally on **[http://localhost:3000](http://localhost:3000)**

---

## ⚙️ CI/CD Configuration (Optional for Deployment)

If you wish to automate build and deployment via GitHub Actions:

1. Create a new GitHub repository
2. Add environment variables under:
   **Settings → Secrets and variables → Actions**
3. Push your local project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/plantify.git
git branch -M main
git push -u origin main
```

✅ Once `.github/workflows/ci.yml` and `cd.yml` are configured, the CI/CD pipeline will run automatically.

---

## 🔄 DevOps Pipeline Flow (Example)

* **CI Workflow**:
  `Lint → Test → Build (Next.js) → Static Analysis`

* **CD Workflow**:
  `Authenticate → Build Docker Image → Deploy to Vercel / GCP Cloud Run`

* **Monitoring (Optional)**:
  Integrate **Google Cloud Monitoring** or **Vercel Analytics** for real-time performance insights.

---

## 🧠 Recommendation Logic Overview

* **Prefiltering:**
  Filters plants based on light, temperature, and climate compatibility.

* **Scoring:**
  Computes similarity between user preferences and dataset attributes using content-based matching.

* **Ranking:**
  Displays results sorted by relevance score with reason explanations.

---

## 📦 Dataset

🔗 [Indoor House Plants Dataset with Care Instructions](https://www.kaggle.com/datasets/prakash27x/indoor-house-plants-dataset-with-care-instructions)

Includes attributes such as:

* Common & botanical names
* Light & watering needs
* Climate & origin
* Decorative use, toxicity, and description
* Image URL

---

## 🗂️ Folder Structure

```bash
PLANTIFY/
├── app/                     # App Router (Next.js)
│   ├── api/plant-image/route.ts
│   ├── plants/
│   │   ├── route.ts
│   │   └── rekomendasi/page.tsx
│   ├── tanaman/[id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/              # UI Components
│   ├── ExportPDFButton.tsx
│   ├── FiltersPanel.tsx
│   ├── PlantCard.tsx
│   ├── PlantImage.tsx
│   └── PlantList.tsx
│
├── lib/                     # Utilities & Logic
│   ├── loadData.ts
│   ├── recommend.ts
│   └── types.ts
│
├── public/                  # Static Assets
│   ├── data/PlantsData.json
│   ├── images/plants/*.png
│   ├── placeholder-plant.jpg
│   └── icons/
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Testing (Optional)

You can implement component testing using:

* **Jest** + **React Testing Library**
* Store test files under: `components/__tests__/*.test.tsx`

---

## 📊 Nonfunctional Highlights

* **Performance**: Recommendations appear ≤ 2 seconds
* **Security**: Local storage used securely for favorites
* **Usability**: Responsive and mobile-friendly interface
* **Transparency**: Displays reasoning for each recommendation

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

---

## 📬 Need Help?

If you encounter bugs or have questions, feel free to open an issue via
➡️ [GitHub Issues](https://github.com/YOUR_USERNAME/plantify/issues)
or contact the main developer:
📧 **[fazlesidiki@gmail.com](mailto:fazlesidiki@gmail.com)**
```

The app will run locally on **[http://localhost:3000](http://localhost:3000)**

---

## ⚙️ CI/CD Configuration (Optional for Deployment)

If you wish to automate build and deployment via GitHub Actions:

1. Create a new GitHub repository
2. Add environment variables under:
   **Settings → Secrets and variables → Actions**
3. Push your local project:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/plantify.git
git branch -M main
git push -u origin main
```

✅ Once `.github/workflows/ci.yml` and `cd.yml` are configured, the CI/CD pipeline will run automatically.

---

## 🔄 DevOps Pipeline Flow (Example)

* **CI Workflow**:
  `Lint → Test → Build (Next.js) → Static Analysis`

* **CD Workflow**:
  `Authenticate → Build Docker Image → Deploy to Vercel / GCP Cloud Run`

* **Monitoring (Optional)**:
  Integrate **Google Cloud Monitoring** or **Vercel Analytics** for real-time performance insights.

---

## 🧠 Recommendation Logic Overview

* **Prefiltering:**
  Filters plants based on light, temperature, and climate compatibility.

* **Scoring:**
  Computes similarity between user preferences and dataset attributes using content-based matching.

* **Ranking:**
  Displays results sorted by relevance score with reason explanations.

---

## 📦 Dataset

🔗 [Indoor House Plants Dataset with Care Instructions](https://www.kaggle.com/datasets/prakash27x/indoor-house-plants-dataset-with-care-instructions)

Includes attributes such as:

* Common & botanical names
* Light & watering needs
* Climate & origin
* Decorative use, toxicity, and description
* Image URL

---

## 🗂️ Folder Structure

```bash
PLANTIFY/
├── app/                     # App Router (Next.js)
│   ├── api/plant-image/route.ts
│   ├── plants/
│   │   ├── route.ts
│   │   └── rekomendasi/page.tsx
│   ├── tanaman/[id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/              # UI Components
│   ├── ExportPDFButton.tsx
│   ├── FiltersPanel.tsx
│   ├── PlantCard.tsx
│   ├── PlantImage.tsx
│   └── PlantList.tsx
│
├── lib/                     # Utilities & Logic
│   ├── loadData.ts
│   ├── recommend.ts
│   └── types.ts
│
├── public/                  # Static Assets
│   ├── data/PlantsData.json
│   ├── images/plants/*.png
│   ├── placeholder-plant.jpg
│   └── icons/
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Testing (Optional)

You can implement component testing using:

* **Jest** + **React Testing Library**
* Store test files under: `components/__tests__/*.test.tsx`

---

## 📊 Nonfunctional Highlights

* **Performance**: Recommendations appear ≤ 2 seconds
* **Security**: Local storage used securely for favorites
* **Usability**: Responsive and mobile-friendly interface
* **Transparency**: Displays reasoning for each recommendation

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

---

## 📬 Need Help?

If you encounter bugs or have questions, feel free to open an issue via
➡️ [GitHub Issues](https://github.com/YOUR_USERNAME/plantify/issues)
➡️ [Notion](https://www.notion.so/Plantmatch-296197af6217807ea0faf433e602683e?source=copy_link)
or contact the main developer:
📧 **[fazlesidiki@gmail.com](mailto:fazlesidiki@gmail.com)**
