from re import S
from app.models import db, Thought

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(255), nullable=False)
    # description = db.Column(db.String(255), nullable=False)
    # instructions = db.Column(db.Text, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # category = db.Column(db.String(), nullable=False)
    # time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

def seed_thoughts():
