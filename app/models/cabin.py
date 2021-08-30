from .db import db


class Cabin(db.Model):
    __tablename__ = 'cabins'

    id = db.Column(db.Integer, primary_key=True)
    hostId = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    guests = db.Column(db.Integer)
    beds = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'hostId': self.hostId,
            'name': self.name,
            'price': self.price,
            'guests': self.guests,
            'beds': self.beds,
            'description': self.description,
            'image': self.image
        }
