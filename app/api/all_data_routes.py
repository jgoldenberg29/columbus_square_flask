from flask import Blueprint, jsonify, session, request
from app.models import db, User, Event


all_data_routes = Blueprint('all data', __name__)

@all_data_routes.route('')
def get_all():
    """
    get all data on initial render
    """
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}
