from re import S
from app.models import db, Image

    # id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # thought_id = db.Column(db.Integer, db.ForeignKey("thoughts.id"), nullable=False)
    # url = db.Column(db.String, nullable=False)

def seed_images():
    GreenCurryImage = Image(user_id=1, thought_id=1, url="https://static01.nyt.com/images/2022/06/02/dining/as-green-curry-glazed-tofu/merlin_207624033_0edca327-25ea-4f92-abf2-c4fd8890f6ac-articleLarge.jpg")
    ClamChow = Image(user_id=2, thought_id=2, url="https://recipes.net/wp-content/uploads/2020/03/clam-chowder-seafood-pasta-recipes.jpg")
    Chicken = Image(user_id=3, thought_id=3, url="https://www.simplyrecipes.com/thmb/JWE_vlOPdrV9T8fK6N8omaz71uI=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Grilled-Gochujang-Chicken-LEAD-13-5dac12d949c541499267c082f45434ca.jpg")
    Huevos = Image(user_id=4, thought_id=4, url="https://static01.nyt.com/images/2022/05/15/dining/15eggrex-rancheros/merlin_205206840_311e22b4-dc72-4ef4-b756-8feb8d11a3b1-articleLarge.jpg")
    Baklava = Image(user_id=5, thought_id=5, url="https://www.themediterraneandish.com/wp-content/uploads/2020/04/baklava-recipe-9.jpg")

    db.session.add(GreenCurryImage)
    db.session.add(ClamChow)
    db.session.add(Chicken)
    db.session.add(Huevos)
    db.session.add(Baklava)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
