from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DateTimeField, TimeField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import Event
from ..api.AWS_helpers import ALLOWED_IMG_EXTENSIONS

locations = [
    "Whole Park",
    "Field",
    "Playground",
    "Rec Center",
    "Picnic Area",
    "Reed street",
    "13th street"
]


class EventForm(FlaskForm):
    title=StringField('title', validators=[DataRequired(), Length(4, 255)])
    description=TextAreaField('description', validators=[DataRequired(), Length(10, 4000)])
    start=DateTimeField('date', validators=[])
    end=DateTimeField('date', validators=[])
    # location=SelectField('location', choices=locations, validators=[DataRequired()])
    flyer=FileField('flyer', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
