from flask_wtf import FlaskForm
from wtforms import (IntegerField, TextAreaField)
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    userId = IntegerField('userId')
    cabinId = IntegerField('cabinId')
    review = TextAreaField('review', validators=[DataRequired()])
