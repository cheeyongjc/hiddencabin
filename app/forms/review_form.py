from flask_wtf import FlaskForm
from wtforms import (IntegerField, TextAreaField, validators)
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    userId = IntegerField('userId')
    cabinId = IntegerField('cabinId')
    review = TextAreaField('review', validators=[DataRequired('Please enter a review'), validators.Length(min=1, max=350, message='Review must be between 1 and 350 characters')])
