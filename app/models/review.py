from .db import db
from sqlalchemy import func


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="reviews")
    thought = db.relationship("Thought", back_populates="reviews")

    def to_dict(self):
         return {
            'id': self.id,
            'review': self.review,
            'rating': self.rating,
            'thought_id': self.thought_id,
            'user_id': self.user_id,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
        }
