from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Thought


def name_check(form, field):
    name = field.data
    if len(name) > 255:
        raise ValidationError("Name length cannot exceed 255 characters.")

class ThoughtForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_check])
    description = StringField('Description', validators=[DataRequired()])
    instructions = TextAreaField('Instruction', validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
