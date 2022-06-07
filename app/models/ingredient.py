from .db import db
from sqlalchemy import func

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"))
    name = db.Column(db.Integer, nullable=False)

    thought = db.relationship("thought", back_populates='ingredients')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'thought_id': self.thought_id
        }
