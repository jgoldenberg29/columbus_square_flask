from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DateField, TimeField, TextAreaField, SelectField
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


class UpdateEventForm(FlaskForm):
    title=StringField('title', validators=[Length(4, 255)])
    description=TextAreaField('description', validators=[Length(10, 4000)])
    date=DateField('date')
    time=TimeField('time')
    location=SelectField('location', choices=locations)
    flyer=FileField('flyer', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
