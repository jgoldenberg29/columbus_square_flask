from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.models import News
from ..api.AWS_helpers import ALLOWED_IMG_EXTENSIONS

class CreateNewsForm(FlaskForm):
    title=StringField('title', validators=[DataRequired(), Length(4, 255)])
    body=TextAreaField('description', validators=[DataRequired(), Length(10, 5000)])
    image=FileField('image', validators=[FileAllowed(list(ALLOWED_IMG_EXTENSIONS))])
