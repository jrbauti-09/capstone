from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms import IngredientForm
from app.models import db, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(error)
    return errorMessages

@ingredient_routes.route("/")
@login_required
def get():
    ingredients = Ingredient.query.all()
    return {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}

# POST
@ingredient_routes.route("/", methods=["POST"])
@login_required
def post_ingredient():
    form = IngredientForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        ingredient = Ingredient(
            thought_id = data["thought_id"],
            user_id = data["user_id"],
            name = data["name"]
        )

        db.session.add(ingredient)
        db.session.commit()
        return ingredient.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# PUT
@ingredient_routes.route('/<int:ingredientId>', methods=["PUT"])
@login_required
def edit_ingredient(ingredientId):
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        ingredientToEdit = Ingredient.query.filter(Ingredient.id == ingredientId).first()

        ingredientToEdit.name = data['name']
        ingredientToEdit.user_id = data['user_id']
        ingredientToEdit.thought_id = data['thought_id']

        db.session.commit()

        return ingredientToEdit.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@ingredient_routes.route("/<int:ingredientId>", methods=["DELETE"])
@login_required
def delete_ingredient(ingredientId):

    print(ingredientId)
    ingredientToDelete = Ingredient.query.filter(Ingredient.id == ingredientId).first()

    if ingredientToDelete:
        db.session.delete(ingredientToDelete)
        db.session.commit()
        return {"id": ingredientToDelete.id}
