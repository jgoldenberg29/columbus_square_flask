from .db import db, environment, SCHEMA, add_prefix_for_prod
from icecream import ic


class News(db.Model):
    __tablename__ = 'news'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    poster = db.relationship('User', back_populates='posted_events')


    def to_dict(self):
        ic('Time object', self.time)
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'description': self.description,
            'poster': self.poster.to_dict(),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


# jsonify({'current_time': time_str})
