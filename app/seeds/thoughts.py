from re import S
from app.models import db, Thought

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(255), nullable=False)
    # description = db.Column(db.String(255), nullable=False)
    # instructions = db.Column(db.Text, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # category = db.Column(db.String(), nullable=False)
    # time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # time_updated = db.Column(db.DateTime(timezone=True), server_default=func.now())

def seed_thoughts():
    GreenCurry = Thought(name='Green Curry Glazed Tofu', description='To make crispy, flavorful tofu without having to press it first, use this smart method from Andrea Nguyen, the author of “Asian Tofu” (Ten Speed Press, 2012) and other cookbooks: Warm the tofu in a pan with a small amount of flavorful sauce. As it cooks, it will dry out and absorb the flavors of the sauce. Next, you add oil to the pan, which crisps the tofu. In Ms. Nguyen`s recipe, soy sauce is used, but here, the aromatics in Thai green curry paste and the sugars in coconut milk toast and caramelize on the tofu. Once the tofu has a deep-brown crust, remove it, sear a quick-cooking vegetable in the same pan, then reduce the remaining curry-coconut mixture into a fragrant, sweet-and-spicy glaze.', instructions='Cut the tofu in half lengthwise, then slice crosswise into 6 sections. (You`ll have 12 squares total.) Transfer to a towel-lined plate and pat dry, then sprinkle with salt.', user_id=1, category='Lunch')
    #url = https://static01.nyt.com/images/2022/06/02/dining/as-green-curry-glazed-tofu/merlin_207624033_0edca327-25ea-4f92-abf2-c4fd8890f6ac-articleLarge.jpg
    ClamChowder = Thought(name='Clam Chowder Seafood Pasta', description="This odd but amazing soup/pasta hybrid was inspired by a food wish for linguini and clam sauce, which I'd already posted many years ago, so I decided to do an updated version using pasta shells. I've always felt that shells are a far superior shape for holding the clams and creamy sauce, and so that was going to be my big innovation.", instructions="Place bacon in a large skillet and cook over medium heat, turning occasionally, until crisp, about 10 to 12 minutes. Pour bacon and grease into a strainer set over a bowl to let the grease drain out. Reserve bacon until needed and discard grease or set aside for another use.", user_id=2, category='Dinner')
    #url = https://recipes.net/wp-content/uploads/2020/03/clam-chowder-seafood-pasta-recipes.jpg
    Chicken = Thought(name='Grilled Gochujang Chicken Thighs', user_id=3, category='Lunch', description='Gochujang is the star in this Korean-style chicken recipe. These smoky char-grilled chicken thighs are brushed and basted with a sweet and spicy sauce. We`re introducing a new summer favorite!', instructions='Place your chicken skin side down on the direct heat side of the grill, close the lid, and cook for 3 to 5 minutes. This is just long enough to get some grill marks and to render some of the fat under the skin. As the fat melts onto the grill, you may see some flare ups. Don`t panic! If that happens, you can turn the pieces of chicken to get an even char. After the 3 to 5 minutes are up, and your chicken has your desired amount of char, turn the chicken over, skin side up, close the lid, and cook for an additional 3 to 5 minutes.' )
    #url = https://www.simplyrecipes.com/thmb/JWE_vlOPdrV9T8fK6N8omaz71uI=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Grilled-Gochujang-Chicken-LEAD-13-5dac12d949c541499267c082f45434ca.jpg
    Huevos = Thought(name='Huevos Rancheros', user_id=4, category='Breakfast', description='Huevos rancheros (or rancher`s eggs) are a typical breakfast served at Mexican farms, featuring corn tortillas and fried eggs topped with plenty of warmed salsa.', instructions='To prepare the pico de gallo: In a medium bowl, combine the tomatoes, onion, cilantro, lime juice, and salt. Stir to combine, then set the bowl aside for later. To cook the beans: In a small saucepan over medium heat, warm the olive oil until shimmering. Add the onions and salt. Cook, stirring occasionally, until the onions have softened and are turning translucent, about 3 to 6 minutes.')
    #https://static01.nyt.com/images/2022/05/15/dining/15eggrex-rancheros/merlin_205206840_311e22b4-dc72-4ef4-b756-8feb8d11a3b1-articleLarge.jpg
    Baklava = Thought(name='Baklava', user_id=5, category="Dessert", description='Baklava is a sweet dessert made of layers of flaky phyllo pastry filled with crushed nuts and sweetened with honey syrup.', instructions='Thaw your phyllo dough properly. Place the phyllo pastry sheets between two clean towels while you work. Prepare your honey syrup. Chop the nuts well. Layer the phyllo dough and add honey syrup.')


    db.session.add(GreenCurry)
    db.session.add(ClamChowder)
    db.session.add(Chicken)
    db.session.add(Huevos)
    db.session.add(Baklava)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_thoughts():
    db.session.execute('TRUNCATE thoughts RESTART IDENTITY CASCADE;')
    db.session.commit()
