from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField, validators
from wtforms.validators import DataRequired, ValidationError



class CabinForm(FlaskForm):
    hostId = IntegerField('hostId')
    name = StringField('name', validators=[DataRequired('Please enter a name for your cabin'), validators.Length(min=3, max=20, message='Name must be between 3 and 20 characters')])
    price = IntegerField('price', validators=[validators.NumberRange(min=1, max=9999, message='Price per night must be a whole number between 1 and 9999')])
    guests = IntegerField('guests', validators=[DataRequired('Please enter maximum number of guests'), validators.NumberRange(min=1, max=6, message='Number of guests must be between 1 and 6')])
    beds = IntegerField('beds', validators=[DataRequired('Please enter how many beds are in your cabin'), validators.NumberRange(min=1, max=6, message='Number of beds must be between 1 and 6')])
    description = TextAreaField('description', validators=[DataRequired('Please add a description for your cabin'), validators.Length(min=1, max=100, message='Description must be between 1 and 100 characters')])
    image = StringField('image', validators=[DataRequired(message='Please input a URL to add an image')])
