# # app/schemas.py
# from marshmallow import Schema, fields
# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
# from app.models import Job
#
# # Auto schema from Job model
# class JobSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = Job
#         load_instance = True
#
# app/schemas.py
from marshmallow import pre_load, post_dump
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import Job

class JobSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Job
        load_instance = True
