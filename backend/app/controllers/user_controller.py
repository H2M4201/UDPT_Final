from flask import jsonify
from ..models import User

def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
