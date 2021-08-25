from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    cabinId = db.Column(db.Integer, db.ForeignKey('cabins.id'))
    review = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return{
            'id': self.id,
            'userId': self.userId,
            'cabinId': self.cabinId,
            'review': self.review
        }
