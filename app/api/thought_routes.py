from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms import ThoughtForm
from app.models import db, Thought

# TODO
# import boto3
# import botocore

# TODO
# from app.config import Config
# from app.aws_s3 import *

thought_routes = Blueprint('thoughts', __name__)

#prefix
#/api/thoughts


# GET
@thought_routes.route("")
def get():
    thoughts = Thought.query.all()
    # list of objects pertaining to each thought

    results = [thought.to_dict() for thought in thoughts]

    return {"thoughts": results}

# POST
@thought_routes.route("", methods=["POST"])
@login_required
def add_spot():
    form = ThoughtForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        thought = Thought(
            name = data['name'],
            description = data['description'],
            instructions = data['instructions'],
            user_id = data['user_id'],
            category = data['category'],
        )

        db.session.add(thought)
        db.session.commit()

        return thought.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# DELETE
@thought_routes.route("/<int:thoughtId>", methods=["DELETE"])
@login_required
def delete_thought(thoughtId):
    thoughtToDelete = Thought.query.filter(Thought.id == thoughtId).first()

    if thoughtToDelete:
        db.session.delete(thoughtToDelete)
        db.session.commit()
        return {
            "id": thoughtToDelete.id
        }

# PUT
@thought_routes.route('/<int:thoughtId>', methods=['PUT'])
@login_required
def update_thought(thoughtId):
    form = ThoughtForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        thoughtUp = Thought.query.filter(Thought.id == thoughtId).first()

        thoughtUp.name = data['name']
        thoughtUp.description = data['description']
        thoughtUp.instructions = data['instructions']
        thoughtUp.user_id = data['user_id']
        thoughtUp.category = data['category']

        # TODO
        # images = Image.query.filter(Image.spot_id == spotId).all()
        # for image in images:
        #     db.session.delete(image)
        # db.session.commit()

        return thoughtUp.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401