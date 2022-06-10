from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Ingredient

def check_length(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError("Ingredient name cannot be more than 30 letters.")
    if len(name) < 2:
        raise ValidationError("Ingredient name cannot be 1 letter.")


class IngredientForm(FlaskForm):
    thought_id = IntegerField("thought_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired(), check_length])
