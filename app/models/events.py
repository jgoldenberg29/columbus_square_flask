from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from icecream import ic


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(), nullable=False)
    flyer = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)


    def to_dict(self):
        ic('Time object', self.time)
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'time': self.time.strftime("%H:%M"),
            'location': self.location,
            'flyer': self.flyer,
            'description': self.description
        }


# jsonify({'current_time': time_str})
