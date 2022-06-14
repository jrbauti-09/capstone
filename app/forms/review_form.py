from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

def rating_check(form, field):
    rating = field.data
    if rating < 1 or rating > 5 or rating == 0:
        raise ValidationError('Please provide a rating between 1 and 5.')

def review_check(form, field):
    review = field.data
    if " " not in review:
        raise ValidationError('Review cannot be a single word.')
    if len(review) > 1000:
        raise ValidationError('Review cannot exceed 1000 characters.')


class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[rating_check])
    review = TextAreaField("Review", validators=[DataRequired(), review_check])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    thought_id = IntegerField("thought_id", validators=[DataRequired()])
