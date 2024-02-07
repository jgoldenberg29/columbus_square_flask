from .db import db, environment, SCHEMA, add_prefix_for_prod

class DocumentItem(db.Model):
    __tablename__ = 'document_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text(255), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('documents.id')))
    # is_sub_header = db.Column(db.Boolean, nullable=False, defaults=False)

    document = db.relationship('Document', back_populates = 'document_items')

    def to_dict(self):
        return {
            id: self.id,
            text: self.text
        }
