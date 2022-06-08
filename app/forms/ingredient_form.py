from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Ingredient

class IngredientForm(FlaskForm):
    thought_id = IntegerField("thought_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
