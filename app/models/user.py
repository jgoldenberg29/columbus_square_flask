from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean, default=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    ig_access_token = db.Column(db.String(255), nullable=True)
    token_expiration = db.Column(db.DateTime, nullable=True)
    last_ig_fetch = db.Column(db.DateTime, nullable=True)

    posted_events = db.relationship('Event', back_populates='event_poster')
    posted_news = db.relationship('News', back_populates='news_poster')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'admin': self.admin,
            'eventsPosted': [event.id for event in self.posted_events]
        }
