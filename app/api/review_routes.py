from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms import ReviewForm
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)

# GET all reviews for thought
@review_routes.route('/<int:recipeId>')
def get(recipeId):
    reviews = Review.query.filter(Review.thought_id == recipeId)
    return {"reviews": [review.to_dict() for review in reviews]}

# DELETE
@review_routes.route('/<int:recipeId>')
@login_required
def delete_review(recipeId):
    deleteReview = Review.query.filter(Review.id == recipeId).first()

    if deleteReview:
        db.session.delete(deleteReview)
        db.session.commit()
        return {"id": deleteReview.id}

# POST
@review_routes.route('/')
@login_required
def post_review():
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        review = Review(
            rating = data['rating'],
            review = data['review'],
            user_id = data['user_id'],
            thought_id = data['thought_id']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}

# PUT
@review_routes.route('/<int:reviewId>', methods=['PUT'])
def edit_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        review = Review.query.filter(Review.id == reviewId).first()

        review.name = data['name']
        review.review = data['review']
        review.user_id = data['user_id']
        review.thought_id = data['thought_id']

        db.session.commit()

        return review.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
