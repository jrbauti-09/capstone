from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Thought

class ThoughtForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    instructions = TextAreaField('Instruction', validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])
