from app.models import db, User, environment, SCHEMA
import os
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    admin = User(
        email='columbussquarepark@gmail.com',
        name='Steve',
        admin=True,
        password='AtThePark99',
        ig_access_token=os.environ.get('IG_ACCESS_KEY'),
        token_expiration=datetime(2024, 4, 10),
        last_ig_fetch=datetime(2024, 4, 10)
        )

    db.session.add(admin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
