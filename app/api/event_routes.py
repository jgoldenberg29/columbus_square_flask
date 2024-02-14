from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import CreateEventForm


event_routes = Blueprint('event', __name__)



@event_routes.route('/add', methods=['POST'])
@login_required
def add_user():
    """
    Creates a new user, admin permissions required
    """
    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        user = User(
            new_event = Event(
            title=data['title'],
            description=data['description'],
            date=data['date'],
            time=data['time'],
            location=data['location'],
            flyer=data['flyer'],
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            )
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': form.errors}, 401
