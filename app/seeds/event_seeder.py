from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from .event_seeds import event_seeds



# Adds a demo user, you can add other users here if you want
def seed_events():
    for event in event_seeds:
        new_event = Event(
            title=event['title'],
            description=event['description'],
            date=event['date'],
            time=event['time'],
            location=event['location'],
            flyer=event['flyer'],
            user_id=event['user_id'],
            created_at=event['created_at'],
            updated_at=event['updated_at']
            )
        db.session.add(new_event)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
