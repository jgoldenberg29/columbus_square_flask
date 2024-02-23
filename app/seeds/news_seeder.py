from app.models import db, News, environment, SCHEMA
from sqlalchemy.sql import text
from .news_seeds import news_seeds



# Adds a demo user, you can add other users here if you want
def seed_news():
    for item in news_seeds:
        new_news = News(
            title=item['title'],
            body=item['body'],
            image=item['image'],
            user_id=item['user_id'],
            created_at=item['created_at'],
            updated_at=item['updated_at']
            )
        db.session.add(new_news)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_news():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.news RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM news"))

    db.session.commit()
