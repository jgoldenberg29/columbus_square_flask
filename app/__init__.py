from flask import Flask
from app.config import Config
from flask_login import LoginManager
from flask_cors import CORS
from app.auth_routes import auth_routes
from app.user_routes import user_routes
from event_routes import event_routes
from blog_routes import blog_routes

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='api/users')
app.register_blueprint(user_routes, url_prefix='api/auth')
app.register_blueprint(event_routes, url_prefix='api/blog')
app.register_blueprint(blog_routes, url_prefix='api/events')


@app.route('/')
def index():
    return '<h1>Sample App<h1>'
