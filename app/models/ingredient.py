from .db import db
from sqlalchemy import func

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.Integer, nullable=False)



    # An ingredient belongs to a thought
    thought = db.relationship("Thought", back_populates='ingredients')
    # A user has many ingredients
    user = db.relationship("User", back_populates="ingredient")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'thought_id': self.thought_id,
            'user': self.user.owner_info()
        }
