from app.models import db, Review


def seed_reviews():
    review1 = Review(userId=2, cabinId=1,review='Loved the minimalistic feel of the cabin and the campfire was perfect at night! Bring your hiking boots if you\'re planning on visiting there are tons of hiking trails around the cabin.')
    review2 = Review(userId=2, cabinId=2,review='Don\'t be fooled by the suburban looking landscape. This cabin was the perfect get away from the city. It was cozy and secluded in nature.')
    review3 = Review(userId=2, cabinId=3,review='The sunrise here is absolutely breath taking. You can enjoy your morning coffee with the view of rolling hills for miles. At night you can see the night sky lit up with millions of stars unhindered by city lights.')
    review4 = Review(userId=2, cabinId=4,review='The owners told us that the bed could be rolled outside if we wanted. At first we thought they were crazy, but then we tried it. The weather was perfect, the stars made it seem like a fantasy, and there were no mosquitos.')
    review5 = Review(userId=2, cabinId=5,review='This is the type of cabin to take a group camping trip for city folk. It was spacious and furnished with modern ammenities. For those who want to escape but not totally off the grid.')
    review6 = Review(userId=2, cabinId=6,review='Waking up and being able to look out the window to see the mountain side takes your breath away. That trip was so awe-inspiring.')
    review7 = Review(userId=2, cabinId=7,review='The tranquility we found here was priceless. The hammock in the front was a fine touch. 10/10 would recommend staying here. ')
    review8 = Review(userId=2, cabinId=8,review='Loved the hiking trails all around the cabin! Fishing at the lake nearby was super fun as well!')
    review9 = Review(userId=2, cabinId=9,review='We found this quiet little cabin to escape to and fell in love. We were able to see deer and other wildlife.')
    review10 = Review(userId=2, cabinId=10,review='I can\'t even begin to describe the absolutely breath taking view. Being right on the water\'s edge we could wake up, enjoy our coffee and watch fish swimming below us. It was a little chilly during our time, but that didn\'t bother us we enjoy the cold. The views were something out of a movie.')
    review11 = Review(userId=2, cabinId=11,review='Great escape for hiking lovers. If you\'re feeling a bit more adventurous there are mountains nearby that experienced rock climbers would enjoy. The hillside provided a nice challenge.')
    review12 = Review(userId=2, cabinId=12,review='Awesome hidden gem secluded in the woods. There are great trails for both hiking and biking not too far from the cabin. ')
    review13 = Review(userId=2, cabinId=1,review='We found this quiet little cabin to escape to and fell in love. We were able to see deer and other wildlife.')
    review14 = Review(userId=2, cabinId=2,review='We loved the feeling of being at home, but if you step outside the front yard you get the feeling of being in nature. You get the best of both worlds.')
    review15 = Review(userId=2, cabinId=3,review='Cute little cabin for a quick escape! Really enjoyed the weather and peacefulness.')
    review16 = Review(userId=2, cabinId=4,review='The sunrise here is absolutely breath taking. You can enjoy your morning coffee with the view of rolling hills for miles. At night you can see the night sky lit up with millions of stars unhindered by city lights.')
    review17 = Review(userId=2, cabinId=5,review='The sunrise here is absolutely breath taking. You can enjoy your morning coffee with the view of rolling hills for miles. At night you can see the night sky lit up with millions of stars unhindered by city lights.')
    review18 = Review(userId=2, cabinId=6,review='We found this quiet little cabin to escape to and fell in love. We were able to see deer and other wildlife.')
    review19 = Review(userId=2, cabinId=7,review='Loved the minimalistic feel of the cabin and the campfire was perfect at night! Bring your hiking boots if you\'re planning on visiting there are tons of hiking trails around the cabin.')
    review20 = Review(userId=2, cabinId=8,review='Awesome hidden gem secluded in the woods. There are great trails for both hiking and biking not too far from the cabin.')
    review21 = Review(userId=2, cabinId=9,review='We found this quiet little cabin to escape to and fell in love. We were able to see deer and other wildlife.')
    review22 = Review(userId=2, cabinId=10,review='Being able to row around the crystal clear lake was a once in a lifetime opportunity. The mountain side was gorgeous. If you get a chance I would highly recommend visiting.')
    review23 = Review(userId=2, cabinId=11,review='Waking up and being able to look out the window to see the mountain side takes your breath away. That trip was so awe-inspiring.')
    review24 = Review(userId=2, cabinId=12,review='Loved the minimalistic feel of the cabin and the campfire was perfect at night! Bring your hiking boots if you\'re planning on visiting there are tons of hiking trails around the cabin.')


    db.session.add_all([
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review7,
        review8,
        review9,
        review10,
        review11,
        review12,
        review13,
        review14,
        review15,
        review16,
        review17,
        review18,
        review19,
        review20,
        review21,
        review22,
        review23,
        review24


    ])
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
