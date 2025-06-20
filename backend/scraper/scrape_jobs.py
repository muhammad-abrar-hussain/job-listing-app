import sys
import os
import time
from datetime import datetime

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# -- Set up project path --
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from app.models import db, Job
from app import create_app


app = create_app()
app.app_context().push()

# -- ChromeDriver Configuration --
CHROMEDRIVER_PATH = "/usr/local/bin/chromedriver"
options = Options()
options.binary_location = "/usr/bin/google-chrome"
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--window-size=1920,1080")
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
)

driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=options)
driver.set_page_load_timeout(120)


URL = "https://www.actuarylist.com/"


def scroll_to_load_jobs():
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # allow JS to load
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

# -- Main Scraping Logic --
def scrape_jobs():
    try:
        driver.get(URL)

        # ✅ Wait for jobs to appear
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.CLASS_NAME, "job-post"))
        )

        scroll_to_load_jobs()  # optional — load more jobs

        soup = BeautifulSoup(driver.page_source, "html.parser")
        job_cards = soup.select(".job-post")[:50]

        for job in job_cards:
            try:
                title = job.select_one(".job-title").text.strip()
                company = job.select_one(".company-name").text.strip()
                location = job.select_one(".job-location").text.strip()
                date_posted_raw = job.select_one(".job-date").text.strip()
                tags = ", ".join([tag.text.strip() for tag in job.select(".job-tags .tag")])
                job_type = "Full-Time"  # fallback default

                # ✅ Parse posting date
                try:
                    posted_date = datetime.strptime(date_posted_raw, "%B %d, %Y").date()
                except ValueError:
                    posted_date = datetime.utcnow().date()

                # ✅ Avoid duplicates
                exists = Job.query.filter_by(title=title, company=company).first()
                if exists:
                    print(f"🔁 Skipped duplicate: {title} at {company}")
                    continue

                # ✅ Save to DB
                job_entry = Job(
                    title=title,
                    company=company,
                    location=location,
                    job_type=job_type,
                    tags=tags,
                    posting_date=posted_date
                )
                db.session.add(job_entry)

            except Exception as job_err:
                print(f"❌ Error processing job: {job_err}")

        db.session.commit()
        print("✅ Scraping completed and data saved.")

    except Exception as e:
        print(f"⚠️ Error during scraping: {e}")

    finally:
        driver.quit()

# -- Run script directly --
if __name__ == "__main__":
    scrape_jobs()
