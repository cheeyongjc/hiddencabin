from app.models import db, Cabin


def seed_cabins():
    cabin1 =Cabin(hostId=1,name='Hidden Cabin 1',price=120,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin1' )
    cabin2 =Cabin(hostId=2,name='Hidden Cabin 2',price=105,guests=6,beds=3, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin2')
    cabin3 =Cabin(hostId=3,name='Hidden Cabin 3',price=135,guests=2,beds=1, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/63a6569c-d6f2-405b-8c34-38f29237b3b2.jpg')
    cabin4 =Cabin(hostId=1,name='Hidden Cabin 4',price=115,guests=2,beds=1, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/83437773-a6b2-4e36-9e87-f1e6dbcfb319.jpg')
    cabin5 =Cabin(hostId=2,name='Hidden Cabin 5',price=100,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin5')
    cabin6 =Cabin(hostId=3,name='Hidden Cabin 6',price=99,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin6')
    cabin7 =Cabin(hostId=3,name='Hidden Cabin 7',price=135,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin7')
    cabin8 =Cabin(hostId=3,name='Hidden Cabin 8',price=140,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin8')
    cabin9 =Cabin(hostId=3,name='Hidden Cabin 9',price=115,guests=2,beds=1, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin9')
    cabin10 =Cabin(hostId=3,name='Hidden Cabin 10',price=99,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin10')
    cabin11 =Cabin(hostId=3,name='Hidden Cabin 11',price=125,guests=2,beds=1, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin11')
    cabin12 =Cabin(hostId=3,name='Hidden Cabin 12',price=130,guests=4,beds=2, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus turpis eget tincidunt.', image='https://capstonephotodump.s3.us-east-2.amazonaws.com/capstone/cabin12')



    db.session.add_all([
        cabin1,
        cabin2,
        cabin3,
        cabin4,
        cabin5,
        cabin6,
        cabin7,
        cabin8,
        cabin9,
        cabin10,
        cabin11,
        cabin12
    ])

    db.session.commit()


def undo_cabins():
    db.session.execute('TRUNCATE cabins RESTART IDENTITY CASCADE;')
    db.session.commit()
