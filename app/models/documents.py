from .db import db, environment, SCHEMA, add_prefix_for_prod

class Document(db.Model):
    __tablename__ = 'documents'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    # list_type = db.Column(db.String(30), nullable=False)
    # sub_headers = db.Column(db.Boolean, nullable=False, defaults=False)

    document_items = db.relationship('DocumentItem', back_populates = 'document')

    def to_dict(self):
        return {
            id: self.id,
            title: self.title
        }
