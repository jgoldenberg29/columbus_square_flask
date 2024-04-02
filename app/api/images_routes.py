from flask import Blueprint, request
from app.models import db
from flask_login import current_user, login_required
from .aws_helpers import upload_file_to_s3, get_unique_filename
# from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms.aws_form import ImageForm
# from ..models.db import db, User, Restaurant, MenuItem

images_routes = Blueprint("images", __name__)

# CREATE/HOST FILE ON AWS, THEN RETURN UPLOAD: POST /api/images/create
@images_routes.route("/create", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        return upload
    if form.errors:
        return {"errors": form.errors}, 400

# DELETE FILE ON AWS (RESTAURANT): DELETE /api/images/restaurants/:restaurantId/delete
# @images_routes.route("/restaurants/<int:id>/delete", methods=["DELETE"])
# @login_required
# def delete_image_restaurant(id):
#     restaurant_to_update = Restaurant.query.get(id)

#     image_deleted = remove_file_from_s3(restaurant_to_update.image_url)

#     if image_deleted is True:
#         return {"message": "Successfully deleted image for restaurant"}
#     else:
#         return {"errors": "Could not delete image for restaurant"}

# DELETE FILE ON AWS (MENU ITEM): DELETE /api/images/menu-items/:menuItemId/delete
# @images_routes.route("/menu-items/<int:id>/delete", methods=["DELETE"])
# @login_required
# def delete_image_menu_item(id):
#     menu_item_to_update = MenuItem.query.get(id)

#     image_deleted = remove_file_from_s3(menu_item_to_update.image_url)

#     if image_deleted is True:
#         return {"message": "Successfully deleted image for menu item"}
#     else:
#         return {"errors": "Could not delete image for menu item"}
