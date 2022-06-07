from re import S
from app.models import db, Review

def seed_reviews():
    #GreenCurry thought_id = 1, user_id = 2-5
    curry1 = Review(rating=5, thought_id=1, user_id=2, review="Amazing, this is superb and delicious. Was aslo quick to make")
    curry2 = Review(rating=2, thought_id=1, user_id=3, review="This recipe was mediocre. I didn't quite like it although it still filled me up.")
    curry3 = Review(rating=5, thought_id=1, user_id=4, review="Texture was great and the ingredients choice was awesome.")

    db.session.add(curry1)
    db.session.add(curry2)
    db.session.add(curry3)

    #ClamChowder thought_id = 2, user_id= 1.. 3-5
    clam1 = Review(rating=4, thought_id = 2, user_id = 1, review="Great thought to put clams in chowder. Brilliant!")
    clam2 = Review(rating=5, thought_id = 2, user_id = 4, review="Yummy and delicious. Cannot wait to make more of this!")
    clam3 = Review(rating=2, thought_id = 2, user_id = 5, review="It was okay.. I'm not sure what the hype is about.")

    db.session.add(clam1)
    db.session.add(clam2)
    db.session.add(clam3)
    #Chicken thought_id = 3, user_id = 1-2.. 4-5
    chicken1 = Review(rating=5, thought_id = 3, user_id=5, review="The gochujang sauce really makes this chicken dish shine. Yum!")
    chicken2 = Review(rating=5, thought_id = 3, user_id=4, review="No matter how much I make this. I'm still wanting more!")
    chicken3 = Review(rating=4, thought_id = 3, user_id=3, review="When cooked right, you can hear the crisp. Bravo")

    db.session.add(chicken1)
    db.session.add(chicken2)
    db.session.add(chicken3)

    #Huevos thought_id = 4. user_id = 1-3.. 5
    huevos1 = Review(rating=5, thought_id = 4, user_id=1, review="One of the best mexican comfort foods. Great way to start your morning!")
    huevos2 = Review(rating=5, thought_id = 4, user_id=2, review="Delicious, whenever you are having a bad day. Just make one of these.")
    huevos3 = Review(rating=5, thought_id = 4, user_id=3, review="The pico de gallo compliments the eggs really well. The cheesy goodness plus tortilla and eggs!")

    db.session.add(huevos1)
    db.session.add(huevos2)
    db.session.add(huevos3)

    #Baklava
    baklava1 = Review(rating=4, thought_id = 5, user_id=1, review="The flaky layers of the phyllo really intensifies this dessert.")
    baklava2 = Review(rating=5, thought_id = 5, user_id=4, review="The pistachio really elevates this pastry dish. Satisfies my sweet tooth.")
    baklava3 = Review(rating=5, thought_id = 5, user_id=2, review="I can make and eat this everyday. There should be a warning!")

    db.session.add(baklava1)
    db.session.add(baklava2)
    db.session.add(baklava3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
