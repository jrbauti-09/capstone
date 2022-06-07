from re import S
from app.models import db, Ingredient

def seed_ingredients():

    #GreenCurry. thought_id = 1
    tofu = Ingredient(name='Tofu', thought_id=1, user_id=1)
    salt = Ingredient(name='Salt', thought_id=1, user_id=1)
    lime = Ingredient(name='Lime Juice', thought_id=1, user_id=1)
    vegetables = Ingredient(name='Vegetables', thought_id=1, user_id=1)
    coconutMilk = Ingredient(name='Coconut milk', thought_id=1, user_id=1)

    db.session.add(tofu)
    db.session.add(salt)
    db.session.add(lime)
    db.session.add(vegetables)
    db.session.add(coconutMilk)

    #ClamChowder. thought_id.2
    bacon = Ingredient(name='Bacon', thought_id=2, user_id=2)
    butter = Ingredient(name='Butter', thought_id=2, user_id=2)
    onion = Ingredient(name='Onion', thought_id=2, user_id=2)
    clams = Ingredient(name='Clams', thought_id=2, user_id=2)
    pasta = Ingredient(name='Pasta', thought_id=2, user_id=2)

    db.session.add(bacon)
    db.session.add(butter)
    db.session.add(onion)
    db.session.add(clams)
    db.session.add(pasta)

    #Chicken. thought_id 3
    gochujang = Ingredient(name='Gochujang', thought_id=3, user_id=3)
    ginger = Ingredient(name='Fresh Ginger', thought_id=3, user_id=3)
    sesame = Ingredient(name='Sesame Oil', thought_id=3, user_id=3)
    soy = Ingredient(name='Soy Sauce', thought_id=3, user_id=3)
    chicken = Ingredient(name='Chicken', thought_id=3, user_id=3)

    db.session.add(gochujang)
    db.session.add(ginger)
    db.session.add(sesame)
    db.session.add(soy)
    db.session.add(chicken)

    #Huevos. thought_id 4
    pico = Ingredient(name='Pico de gallo', thought_id=4, user_id=4)
    beans = Ingredient(name='Refried Beans', thought_id=4, user_id=4)
    tortilla = Ingredient(name='Tortilla', thought_id=4, user_id=4)
    eggs = Ingredient(name='Eggs', thought_id=4, user_id=4)
    cheese = Ingredient(name='Monterey Jack cheese', thought_id=4, user_id=4)

    db.session.add(pico)
    db.session.add(beans)
    db.session.add(tortilla)
    db.session.add(eggs)
    db.session.add(cheese)

    #Baklava. thought_id 5
    phyllo = Ingredient(name='Phyllo dough', thought_id=5, user_id=5)
    Pistachio = Ingredient(name='Pistachio', thought_id=5, user_id=5)
    Honey = Ingredient(name='Honey Syrup', thought_id=5, user_id=5)

    db.session.add(phyllo)
    db.session.add(Pistachio)
    db.session.add(Honey)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
