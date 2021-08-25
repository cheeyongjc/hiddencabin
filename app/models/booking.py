from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    cabinId = db.Column(db.Integer, db.ForeignKey('cabin.id'))
    checkin = db.Column(db.Date)
    checkout = db.Column(db.Date)

    def to_dict(self):
        return{
            'id': self.id,
            'hostId': self.hostId,
            'cabinId': self.cabinId,
            'checkin': self.checkin,
            'checkout': self.checkout
        }
