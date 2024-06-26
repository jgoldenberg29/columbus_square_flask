from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import EventForm
from app.models import db, Event, Image
from icecream import ic


event_routes = Blueprint('events', __name__)

@event_routes.route('/sorted', methods=['GET'])
def get_sorted_events():
    today = datetime.now().date()
    events = Event.query.filter(Event.start >= today).order_by(Event.start)

    return { 'sorted': [event.to_dict() for event in events] }


@event_routes.route('', methods=['POST'])
@login_required
def add_event():
    """
    Creates a new event, login required
    """

    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # print('********', data)
        start_str = form['start'].data
        end_str = form['end'].data

        start = datetime.strptime(start_str, '%Y-%m-%dT%H:%M:%S')
        end = datetime.strptime(end_str, '%Y-%m-%dT%H:%M:%S')

        new_event = Event(
            title=data['title'],
            description=data['description'],
            start=start,
            end=end,
            # location=data['location'],
            # flyer=data['flyer'] or "https://parkvillelivingcenter.org/wp-content/uploads/2021/05/Flyer-scaled.jpg",
            image=data['image'],
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(new_event)
        db.session.commit()
        return {'event': new_event.to_dict(), 'user': current_user.to_dict()}
    # return {'errors': form.errors}, 400
    return form.errors, 400

@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
    """
    Update an event, login required
    """
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    event = Event.query.get(id)
    if form.validate_on_submit():
        data = form.data

        event.title=data['title']
        event.description=data['description']
        event.date=data['date']
        event.time=data['time']
        event.location=data['location']
        event.flyer=data['flyer'] or "https://parkvillelivingcenter.org/wp-content/uploads/2021/05/Flyer-scaled.jpg"
        event.user_id=current_user.id
        event.updated_at=datetime.now()

        db.session.commit()
        return {'event': event.to_dict()}
    return {'errors': form.errors}, 400


@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    """
    Update an event, login required
    """

    event = Event.query.get(id)

    if event is None:
        return {'errors': {'message':'Event not found'}}, 404

    db.session.delete(event)
    db.session.commit()
    return {'event': id, 'user': current_user.to_dict()}
