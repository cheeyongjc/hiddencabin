from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Cabin
from app.forms import CabinForm
from .auth_routes import validation_errors_to_error_messages

cabin_routes = Blueprint('cabins', __name__)

@cabin_routes.route('/')
def cabin():
    cabins = Cabin.query.all()
    return {'cabins': [cabin.to_dict() for cabin in cabins]}

@cabin_routes.route('/', methods=['POST'])
def create_cabin():
    form = CabinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cabin = Cabin(
            hostId=form.data['hostId'],
            name=form.data['name'],
            price=form.data['price'],
            guest=form.data['guests'],
            beds=form.data['beds'],
            description=form.data['description']
        )
        db.session.add(cabin)
        db.session.commit()
        return cabin.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
