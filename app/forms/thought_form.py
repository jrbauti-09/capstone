from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Thought


def name_check(form, field):
    name = field.data
    if len(name) > 255:
        raise ValidationError("Name length cannot exceed 255 characters.")
def description_check(form, field):
    description = field.data
    if len(description) < 100:
        raise ValidationError("Please provide at least 100 characters.")
    if len(description) > 1000:
        raise ValidationError("Description too long, please provide a description between 100-1000 characters")
def instructions_check(form, field):
    instruction = field.data
    if len(instruction) > 500:
        raise ValidationError("Instructions too long, please provide an instruction between 100-500 characters")
    if len(instruction) < 50:
        raise ValidationError("Please provide at least 20 characters for instructions.")

class ThoughtForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_check])
    description = StringField('Description', validators=[DataRequired(), description_check])
    instructions = TextAreaField('Instruction', validators=[DataRequired(), instructions_check])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
