from app.models import db, Review


def seed_reviews():
    review1 = Review(userId=2, cabinId=1,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review2 = Review(userId=2, cabinId=2,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review3 = Review(userId=2, cabinId=3,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review4 = Review(userId=2, cabinId=4,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review5 = Review(userId=2, cabinId=5,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review6 = Review(userId=2, cabinId=6,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review7 = Review(userId=2, cabinId=1,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')
    review8 = Review(userId=2, cabinId=2,
                     review='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae turpis commodo, venenatis enim ut, pulvinar turpis. Mauris vehicula posuere orci, sed venenatis leo egestas id. Donec tempus volutpat arcu, et vehicula erat tincidunt ullamcorper. Cras id nibh convallis, ultrices magna quis, pretium arcu. Etiam turpis purus, gravida vitae mollis.')

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
