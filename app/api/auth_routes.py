from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import login_required
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from icecream import ic
from datetime import datetime


auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    present = datetime.now()
    today_noon = present.replace(hour=12, minute=0, second=0, microsecond=0)
    if present < today_noon:
        user = User.query.filter(User.email == 'columbussquarepark@gmail.com').first()
        user.ig_fetched = False
        db.session.add(user)
        db.session.commit()

    if current_user.is_authenticated:
        return {'user': current_user.to_dict()}

    return {'errors': 'Unauthorized'}

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        ic('user', user)
        login_user(user)
        return {'user': user.to_dict()}
    return {'errors': form.errors}, 401


@auth_routes.route('/logout', methods=['DELETE'])
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/add', methods=['POST'])
@login_required
def add_user():
    """
    Creates a new user, admin permissions required
    """
    # form = SignUpForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     data = form.data
    #     user = User(
    #         email=data['email'],
    #         password=data['password']
    #     )
    #     db.session.add(user)
    #     db.session.commit()
    #     return user.to_dict()
    # return {'errors': form.errors}, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
