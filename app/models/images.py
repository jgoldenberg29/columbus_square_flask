from .db import db, environment, SCHEMA, add_prefix_for_prod
from icecream import ic


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(100), nullable=False)

    # image_event = db.relationship('Event', back_populates='event_image')

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'imageUrl': self.image_url,
            'datePosted': self.timestamp,
        }
