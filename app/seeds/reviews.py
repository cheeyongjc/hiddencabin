from app.models import db, Review


def seed_reviews():
    review1 = Review(userId=1, cabinId=1,
                     review='This is a test review for cabin 1')
    review2 = Review(userId=1, cabinId=2,
                     review='This is a test review for cabin 2')
    review3 = Review(userId=1, cabinId=3,
                     review='This is a test review for cabin 3')
    review4 = Review(userId=1, cabinId=4,
                     review='This is a test review for cabin 4')
    review5 = Review(userId=1, cabinId=5,
                     review='This is a test review for cabin 5')
    review6 = Review(userId=1, cabinId=6,
                     review='This is a test review for cabin 6')
    review7 = Review(userId=2, cabinId=1,
                     review='This is a test review for cabin 1')
    review8 = Review(userId=2, cabinId=2,
                     review='This is a test review for cabin 2')

    db.session.add_all([
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review7,
        review8,

    ])
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
