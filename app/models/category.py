from .db import db
from sqlalchemy import func


thoughts_categories = db.Table(
    "thought_category",
    db.Column("thought_id", db.Integer, db.ForeignKey("thoughts.id"), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey("categories.id"), primary_key=True)
)

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    thought = db.relationship("Thought", back_populates='categories', secondary=thoughts_categories)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
