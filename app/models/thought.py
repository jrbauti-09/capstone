from .db import db
from sqlalchemy import func


class Thought(db.Model):
    __tablename__ = "thoughts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category = db.Column(db.String(), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # a thought belongs to a user
    user = db.relationship("User", back_populates="thoughts")
    # a thought has many ingredients
    ingredients = db.relationship("Ingredient", back_populates='thought', cascade='all, delete-orphan')
    # a thought has many reviews
    reviews = db.relationship("Review", back_populates="thought", cascade='all, delete-orphan')
    # a thought has many categories
    categories = db.relationship("Category", back_populates='thoughts', cascade='all, delete-orphan')
    # a thought has many images
    images = db.relationship("Image", back_populates="thought", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'time_created': self.time_created,
            'time_updated': self.time_updated,
            'user': self.user.owner_info(),
            'category': self.category,
            'instructions': self.instructions,
            'images': [image.image_info() for image in self.images],
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'reviewRating': [review.to_rating() for review in self.reviews],
            'reviews': [review.to_dict() for review in self.reviews]
        }
