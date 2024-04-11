from flask import Blueprint, session, request
from sqlalchemy.sql import text
import requests
import os
from app.models import db, User, Image, environment
from flask_login import login_required, current_user
from datetime import datetime
from icecream import ic

instagram_routes = Blueprint('instagram', __name__)

@instagram_routes.route('/auth')
def authenticate():
    '''
    Autherization window for instagram user
    https://www.columbussquare.org/instagram/auth
    https://api.instagram.com/oauth/authorize
    ?client_id=**************
    &redirect_uri=https://www.columbussquare.org/auth
    &scope=user_profile,user_media
    &response_type=code

    code=*****************************

    ***post request for short term access token***
    curl -X POST \
    https://api.instagram.com/oauth/access_token \
    -F client_id=************** \
    -F client_secret=************* \
    -F grant_type=authorization_code \
    -F redirect_uri=https://www.columbussquare.org/auth \
    -F code=*******************

    ***response***
    "access_token": "**********************",
    "user_id": 7495916713801776
    expires at: ~ 2:20pm

    ***request for userId with short term access token***
    curl -X GET \
    'https://graph.instagram.com/************?fields=id,username&access_token=**********************'

    ***response***
    {"id":"**********************","username":"goldylocks1992"}

    ***request for long-lived token***
    curl -X GET \
    'https://graph.instagram.com/access_token?grant_type=ig_exchange_token&&client_secret=*****************&access_token=**********************'

    ***response***
    {"access_token":********************","token_type":"bearer","expires_in":5183999}

    '''

    user = User.query.filter(User.email == 'columbussquarepark@gmail.com').first()

    present = datetime.now()
    exp_date = user.token_expiration
    if exp_date >= present:
        # helper function?
        # fetch for new token using cURL request
        # replace old ig_access_token with new one
        # use "expires_in" value from response to calculate 2 days before token expires
        # replace token_expireation with new datetime
        # commit to database
        pass

    today_noon = present.replace(hour=12, minute=0, second=0, microsecond=0)
    if present > today_noon and not user.ig_fetched:
        ic("IT RAN")
        res = requests.get(f'https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type&access_token={user.ig_access_token}')
        # check for errors
        parsed_res = res.json()
        data = parsed_res['data']
        # ic(data)

        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM images"))

        for item in data:
            if item['media_type'] != 'VIDEO':
                image = Image(
                    caption=item['caption'] if 'caption' in item else None,
                    image_url=item["media_url"],
                    timestamp=item["timestamp"]
                )
                db.session.add(image)
        user.ig_fetched = True
        db.session.commit()


    images = Image.query.all()
    image_list = [image.to_dict() for image in images]

    return {'images': image_list}
