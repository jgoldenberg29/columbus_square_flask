from flask import Flask
from app.config import Config

app = Flask(__name__)
app.config.from_object(Config)
print(app.config['SECRET_KEY'])

@app.route('/')
def index():
    return '<h1>Sample App<h1>'
