from flask import Blueprint, session, request
import requests
import os
from app.models import db
from flask_login import login_required, current_user
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

    res = requests.get(f'https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token={os.environ.get("IG_ACCESS_KEY")}')
    data = res.json()

    images = {item.id:item for item in data}
    ic(images)

    return {'images': images}
