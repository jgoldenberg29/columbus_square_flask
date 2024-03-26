from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from icecream import ic
from sqlalchemy import DateTime
import base64


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    # location = db.Column(db.String(40), nullable=False)
    # flyer = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=False)
    # image_id = db.Column(db.Integer, db.ForeighKey(add_prefix_for_prod('images.id')))
    image = db.Column(db.BLOB, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    event_poster = db.relationship('User', back_populates='posted_events')
    # event_image = db.relationship('Image', back_populates='image_event')

    def to_dict(self):
        # ic('Time object', self.time)
        return {
            'id': self.id,
            'title': self.title,
            'start': self.start.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'end': self.end.strftime('%Y-%m-%dT%H:%M:%SZ'),
            # 'displayDate': self.date,
            # 'formDate': self.date.strftime('%Y-%m-%d'),
            # 'formTime': self.time.strftime("%H:%M"),
            # 'displayTime': self.time.strftime("%I:%M %p"),
            # 'calendarDateTime'
            # 'location': self.location,
            # 'flyer': self.flyer,
            'image': base64.b64encode(self.image).decode('utf-8') or None,
            'description': self.description,
            'poster': self.event_poster.name,
            'user_id': self.user_id
        }

    # def create_calendar_events(self):



def calendar_datetime(self):
    pass
