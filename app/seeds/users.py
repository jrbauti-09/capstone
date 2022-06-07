from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    mary = User(
        username='basil_mary', email='marnie@aa.io', password='password')
    bobbie = User(
        username='foodie_bobby', email='bobbie@aa.io', password='password')
    Aleck = User(username='chef_Alek', email='alek@alek.com', password='password')
    Pat = User(username='pemiran', email='pem@p.com', password='password1')

    db.session.add(demo)
    db.session.add(mary)
    db.session.add(bobbie)
    db.session.add(Aleck)
    db.session.add(Pat)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
