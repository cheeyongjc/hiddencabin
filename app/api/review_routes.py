from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Review, User
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def review():
    reviews = Review.query.join(User).order_by(Review.id).all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/')
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            userId=form.data['userId'],
            cabinId=form.data['cabinId'],
            review=form.data['review']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {'message': id}


@review_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.review =form.data['review'] if form.data['review'] else review.review
        db.session.commit()
        return {'message': id}
