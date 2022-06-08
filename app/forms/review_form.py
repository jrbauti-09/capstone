from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    review = TextAreaField("Review", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    thought_id = IntegerField("thought_id", validators=[DataRequired()])
