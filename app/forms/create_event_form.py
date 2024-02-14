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


class CreateEventForm(FlaskForm):
    title=StringField('title', validators=[DataRequired()])
    description=TextAreaField('description', validators=[DataRequired(), length])
    date=DateField('date', validators=[DataRequired()])
    time=TimeField('time', validators=[DataRequired()])
    location=SelectField('location', choices=locations, validators=[DataRequired()])
    flyer=FileField('flyer', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
