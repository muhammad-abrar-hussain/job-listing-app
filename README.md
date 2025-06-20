# 🧰 Job Listing Application (Flask + PostgreSQL + React + MUI)

> 🎥 [Demo Video](https://www.loom.com/share/c59f60f7abfc43bb9dd21c2cb076376e?sid=4b15a43d-81a8-458d-9f7b-abd4dd81be8a) &nbsp;&nbsp;

[//]: # (> 🌍 [Live Deployment]&#40;https://your-deployed-site-link.com&#41;)

This is a **full-stack job listing application** built with:

- **Flask** (Python) for backend RESTful APIs  
- **PostgreSQL** as the database  
- **React + TypeScript** and **Material UI (MUI)** for the frontend  
- **Selenium** for scraping job listings from external sources  


It supports full **CRUD**, **filtering**, **sorting**, **responsive UI**, and **snackbar/confirmation dialogs**.

---

## 📁 Project Structure

```bash
job_listing_app/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── jobs.py
│   │   ├── __init__.py
│   │   ├── extensions.py
│   │   └── models.py
│   ├── migrations/
│   ├── scraper/
│   │   ├── __init__.py
│   │   └── scrape_jobs.py
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   └── jobBox/
│       ├── public/
│       ├── src/
│       │   ├── api/   
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
│
├── .gitignore
└── README.md
```

---

## 🧪 Backend Setup (`backend/`)

### 📦 1. Create and Activate Virtual Environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

### 📥 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 🔐 3. Set Up Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://username:passworenvd@localhost:5432/job_db
FLASK_APP=main.py
FLASK_ENV=development
```

### 🧱 4. Database Setup & Migrations

Make sure PostgreSQL is running and the `job_db` database exists.

#### Initialize Migrations (First time only)

```bash
flask db init
```

#### Create Migration

```bash
flask db migrate -m "Initial migration"
```

#### Apply Migration to Database

```bash
flask db upgrade
```

### 🚀 5. Run the Flask Server

```bash
flask run
```

Or:

```bash
python main.py
```

### 📫 API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/api/jobs/`     | List all jobs        |
| POST   | `/api/jobs/`     | Create a new job     |
| GET    | `/api/jobs/<id>` | Get job by ID        |
| PUT    | `/api/jobs/<id>` | Update a job (full)  |
| PATCH  | `/api/jobs/<id>` | Update job (partial) |
| DELETE | `/api/jobs/<id>` | Delete a job         |

Supports **filtering and sorting**:

```http
GET /api/jobs?job_type=Full-time&location=Remote&tag=react&sort=posting_date_desc
```

---
## 🕸️ Scraper Setup & Usage

### 📌 Prerequisites

- Google Chrome installed
- Chromedriver matching your Chrome version installed and available in your system path

### 🧰 1. Run Scraper Script

```bash
source .venv/bin/activate
python scraper/scrape_jobs.py
```

- This script scrapes jobs from external sources (like `actuarylist.com`) using Selenium.
- The scraped will be stored in database using SQLAlchemy.

---

## 🌐 Frontend Setup (`frontend/jobBox/`)

### 📍 1. Navigate to Frontend Folder

```bash
cd frontend/jobBox
```

### 📥 2. Install Node.js Dependencies

Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### ⚙️ 3. Setup Environment Variables

Create a `.env` file in the `frontend/jobBox/` folder:

```env
VITE_API_URL=http://localhost:5000/api/jobs
```

> Adjust the URL if your backend runs on a different host or port.

### 🚀 4. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 🛠 Tech Stack

### 🔗 Backend

- Python 3.10+
- Flask
- SQLAlchemy
- PostgreSQL
- Flask-Migrate
- FSelenium

### 🎨 Frontend

- React + TypeScript
- Material UI (MUI)
- Axios
- React Router
