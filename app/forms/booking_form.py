from flask_wtf import FlaskForm
from wtforms import (IntegerField, DateField)
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    userId = IntegerField('userId')
    cabinId = IntegerField('cabinId')
    checkin = DateField('checkin', validators=[DataRequired()])
    checkout = DateField('checkout', validators=[DataRequired()])
