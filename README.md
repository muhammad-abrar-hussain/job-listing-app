# Job Listing API (Flask + SQLAlchemy + PostgreSQL)

This is a backend RESTful API for a Job Listing application built with **Flask**, **SQLAlchemy**, and **PostgreSQL**. It supports full CRUD functionality, filtering, sorting, and validation.

---

## 📁 Project Structure

```bash
job_listing_app/
│
├── app/
│   ├── __init__.py          # Initialize app and extensions
│   ├── models.py            # SQLAlchemy models
│   ├── routes/
│   │   ├── __init__.py
│   │   └── jobs.py          # Job routes
│   ├── schemas.py           # Marshmallow schemas (optional)
│   └── utils/               # Helper functions
│
├── migrations/              # Flask-Migrate files
├── config.py                # Config settings
├── run.py                   # Run the app
├── .env                     # Environment variables
└── requirements.txt
```


---

## ⚙️ Setup Instructions

### 1. 📦 Create and Activate Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```
### 2. 📥 Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. 🔐 Environment Variables
Create a .env file in the root directory with your database URL:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/job_db
FLASK_APP=main.py
FLASK_ENV=development
```

### 4. 🧱 Database Setup & Migrations
Make sure PostgreSQL is running and a database is created.
#### Initialize Migrations (Only Once)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/job_db
FLASK_APP=main.py
FLASK_ENV=development
```
#### Create a Migration

```bash
flask db migrate -m "Initial migration"
```
#### Apply Migration to Database
```bash 
flask db upgrade
```
### 🚀 Run the Flask Server
```bash
flask run
```
or
```bash
python run.py
```
## 📫 API Endpoints
| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/jobs/`     | List all jobs        |
| POST   | `/api/jobs/`     | Create a new job     |
| GET    | `/api/jobs/<id>` | Get job by ID        |
| PUT    | `/api/jobs/<id>` | Update a job (full)  |
| PATCH  | `/api/jobs/<id>` | Update job (partial) |
| DELETE | `/api/jobs/<id>` | Delete a job         |

Supports filtering and sorting by query parameters:

```bash
GET /api/jobs?job_type=Full-time&location=Remote&sort=posted_date_desc
```
## 🛠 Tech Stack
- Python 3.10+
- Flask
- SQLAlchemy
- Flask-Migrate (Alembic)
- PostgreSQL
- Marshmallow (optional, for schemas)
