from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

def rating_check(form, field):
    rating = field.data
    if rating < 1 or rating > 5:
        raise ValidationError('Please provide a rating between 1 and 5.')


class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired(), rating_check])
    review = TextAreaField("Review", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    thought_id = IntegerField("thought_id", validators=[DataRequired()])
