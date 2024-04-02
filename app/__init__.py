import os
from flask import Flask, render_template, request, session, redirect
from app.config import Config
from flask_login import LoginManager
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models import db, User
from .api.auth_routes import auth_routes
from .api.instagram_routes import instagram_routes
from .api.all_data_routes import all_data_routes
from .api.user_routes import user_routes
from .api.event_routes import event_routes
from .api.news_routes import news_routes
from .api.images_routes import images_routes
from .seeds import seed_commands

app = Flask(__name__, static_folder='../vite', static_url_path='/')

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(instagram_routes, url_prefix='/api/instagram')
app.register_blueprint(all_data_routes, url_prefix='/api/allData')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(event_routes, url_prefix='/api/events')
app.register_blueprint(news_routes, url_prefix='/api/news')
app.register_blueprint(images_routes, url_prefix='/api/images')

db.init_app(app)
Migrate(app, db)

CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path and path != 'favicon.ico':  # Check if path is not empty and not favicon.ico
        # If the path is not empty and not favicon.ico, serve the requested file from the Vite frontend folder
        return app.send_static_file(os.path.join('..', 'vite', path))

    # For favicon.ico or root path, serve index.html from the Vite frontend folder
    return app.send_static_file(os.path.join('..', 'vite', 'index.html'))


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file(os.path.join('..', 'vite', 'index.html'))
