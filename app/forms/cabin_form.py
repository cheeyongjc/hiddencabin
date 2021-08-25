from flask_wtf import FlaskForm
from wtforms import (IntegerField, TextAreaField, StringField)
from wtforms.validators import DataRequired

class CabinForm(FlaskForm):
    hostId = IntegerField('hostId')
    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    guests = IntegerField('guests', validators=[DataRequired()])
    beds = IntegerField('beds', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
