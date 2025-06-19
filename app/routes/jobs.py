# app/routes/jobs.py
from flask import Blueprint, request, jsonify
from app import db
from app.models import Job
from datetime import datetime

job_bp = Blueprint("job_bp", __name__)


def serialize_job(job):
    return {
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "posting_date": job.posting_date.isoformat() if job.posting_date else None,
        "job_type": job.job_type,
        "tags": job.tags.split(",") if job.tags else [],
    }


@job_bp.route("/", methods=["GET"])
def get_jobs():
    job_type = request.args.get("job_type")
    location = request.args.get("location")
    tag = request.args.get("tag")
    sort = request.args.get("sort", "posting_date_desc")

    query = Job.query

    if job_type:
        query = query.filter(Job.job_type.ilike(job_type))
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if tag:
        query = query.filter(Job.tags.ilike(f"%{tag}%"))

    if sort == "posting_date_desc":
        query = query.order_by(Job.posting_date.desc())
    elif sort == "posting_date_asc":
        query = query.order_by(Job.posting_date.asc())

    jobs = query.all()
    return jsonify([serialize_job(job) for job in jobs]), 200


@job_bp.route("/", methods=["POST"])
def add_job():
    data = request.json
    required_fields = ["title", "company", "location", "job_type"]

    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Field '{field}' is required and cannot be empty."}), 400

    try:
        job = Job(
            title=data["title"],
            company=data["company"],
            location=data["location"],
            job_type=data["job_type"],
            tags=','.join(data.get("tags", [])),
            posting_date=datetime.strptime(data["posting_date"], "%Y-%m-%d") if "posting_date" in data else None
        )
        db.session.add(job)
        db.session.commit()
        return jsonify(serialize_job(job)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@job_bp.route("/<int:job_id>", methods=["PATCH"])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.json
    for field in ["title", "company", "location", "job_type", "tags", "posting_date"]:
        if field in data:
            if field == "tags":
                setattr(job, field, ','.join(data[field]))
            elif field == "posting_date":
                setattr(job, field, datetime.strptime(data[field], "%Y-%m-%d"))
            else:
                setattr(job, field, data[field])

    db.session.commit()
    return jsonify(serialize_job(job)), 200


@job_bp.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": f"Job {job_id} deleted."}), 200


@job_bp.route("/<int:job_id>", methods=["GET"])
def get_job_by_id(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    return jsonify(serialize_job(job)), 200
