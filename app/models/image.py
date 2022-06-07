from .db import db
from sqlalchemy import func

class Image(db.Model):

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"))
    url = db.Column(db.String, nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates='images')
    thought = db.relationship("Thought", back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url,
            'thought_id': self.thought_id,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
        }
