from .db import db, environment, SCHEMA, add_prefix_for_prod


class CalendarEvent(db.Model):
    __tablename__ = 'calendar_events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('event.id')), nullable=False)
    start = db.Column(db.String, nullable=False)
    end = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    calendar_event = db.relationship('Event', back_populates='event_calendar')


    def to_dict(self):
        # ic('Time object', self.time)
        return {
            'id': self.id,
            'eventId': self.event_id,
            'start': self.start,
            'end': self.end
        }
