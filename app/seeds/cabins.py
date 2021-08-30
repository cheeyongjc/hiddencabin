from app.models import db, Cabin


def seed_cabins():
    cabin1 =Cabin(hostId=1,name='Demo Cabin1',price=99,guests=4,beds=2, description='Description of cabin1', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin1' )
    cabin2 =Cabin(hostId=2,name='Demo Cabin2',price=99,guests=6,beds=3, description='Description of cabin2', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin2')
    cabin3 =Cabin(hostId=3,name='Demo Cabin3',price=99,guests=2,beds=1, description='Description of cabin3', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/63a6569c-d6f2-405b-8c34-38f29237b3b2.jpg')
    cabin4 =Cabin(hostId=1,name='Demo Cabin4',price=99,guests=2,beds=1, description='Description of cabin4', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/83437773-a6b2-4e36-9e87-f1e6dbcfb319.jpg')
    cabin5 =Cabin(hostId=2,name='Demo Cabin5',price=99,guests=4,beds=2, description='Description of cabin5', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin5')
    cabin6 =Cabin(hostId=3,name='Demo Cabin6',price=99,guests=4,beds=2, description='Description of cabin6', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin6')

    db.session.add_all([
        cabin1,
        cabin2,
        cabin3,
        cabin4,
        cabin5,
        cabin6
    ])

    db.session.commit()


def undo_cabins():
    db.session.execute('TRUNCATE cabins RESTART IDENTITY CASCADE;')
    db.session.commit()
