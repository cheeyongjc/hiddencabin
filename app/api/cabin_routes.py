from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy.sql.operators import json_getitem_op
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
            guests=form.data['guests'],
            beds=form.data['beds'],
            description=form.data['description']
        )
        db.session.add(cabin)
        db.session.commit()
        return cabin.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cabin_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cabin(id):
    cabin = Cabin.query.get(id)
    db.session.delete(cabin)
    db.session.commit()
    return {'message': id}

@cabin_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_cabin(id):
    data = request.json
    cabin = Cabin.query.get(id)
    cabin.name = data['name'] if data['name'] else cabin.name
    cabin.price = data['price'] if data['price'] else cabin.price
    cabin.guests = data['guests'] if data['guests'] else cabin.guests
    cabin.description = data['description'] if data['description'] else cabin.description
    db.session.commit()
    return {'message': id}
