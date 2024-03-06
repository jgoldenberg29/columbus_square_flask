from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import NewsForm
from app.models import db, News
from icecream import ic


news_routes = Blueprint('news', __name__)

@news_routes.route('', methods=['POST'])
@login_required
def add_news():
    """
    Creates a new news item, login required
    """

    form = NewsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_news = News(
            title=data['title'],
            body=data['body'],
            image=data['image'] or None,
            user_id=current_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(new_news)
        db.session.commit()
        return {'event': new_news.to_dict()}
    return {'errors': form.errors}, 400

@news_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_news(id):
    """
    Update an news item, login required
    """
    form = NewsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    news = News.query.get(id)
    if form.validate_on_submit():
        data = form.data

        event.title=data['title']
        event.body=data['body']
        event.image=data['image'] or "https://parkvillelivingcenter.org/wp-content/uploads/2021/05/Flyer-scaled.jpg"
        event.user_id=current_user.id
        event.updated_at=datetime.now()

        db.session.commit()
        return {'news': news.to_dict()}
    return {'errors': form.errors}, 400


@news_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_news(id):
    """
    Update an event, login required
    """

    news = News.query.get(id)

    if News is None:
        return {'errors': {'message':'News not found'}}, 404

    db.session.delete(news)
    db.session.commit()
    return {'news': id}
