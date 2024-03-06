from flask import Blueprint, jsonify, session, request
from app.models import db, User, Event, News


all_data_routes = Blueprint('all data', __name__)

@all_data_routes.route('')
def get_all():
    """
    get all data on initial render
    """
    events = Event.query.all()
    news = News.query.all()

    eventsArray = [event.to_dict() for event in events]
    newsArray = [news_item.to_dict() for news_item in news]
    
    return {'events': eventsArray, 'news': newsArray }
