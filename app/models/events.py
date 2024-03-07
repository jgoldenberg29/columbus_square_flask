from sqlalchemy import Enum
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from icecream import ic

frequencies = ["DNR", "consecutive", "weekly", "biweekly", "monthly"]

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(40), nullable=False)
    flyer = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    frequency = db.Column(Enum(frequencies), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    event_poster = db.relationship('User', back_populates='posted_events')
    event_calendar = db.relationship('CalendarEvent', back_populates='calendar_event')

    def to_dict(self):
        ic('Time object', self.time)
        return {
            'id': self.id,
            'title': self.title,
            'location': self.location,
            'flyer': self.flyer,
            'frequency': self.frequency,
            'description': self.description,
            'poster': self.event_poster.name,
        }

    # def create_calendar_events(self):



def calendar_datetime(self):
    pass
