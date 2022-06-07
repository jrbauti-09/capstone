from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # A user has many thoughts and populates user column in user model
    thoughts = db.relationship("Thought", back_populates='user', cascade='all, delete-orphan')
    # A user has many reviews and populates the user column in reviews model
    reviews = db.relationship("Review", back_populates='user', cascade='all, delete-orphan')
    # A user has many images they uploaded which populates user column in images model
    images = db.relationship("Image", back_populates='user', cascade='all, delete-orphan')
    # A user has many ingredients
    ingredients = db.relationship("Ingredient", back_populates='user', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def owner_info(self):
        return {
            'username': self.username
        }
