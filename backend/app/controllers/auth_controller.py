from flask import request, jsonify
from ..models import User
from .. import db

def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)})

def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
        return jsonify(user.to_dict())
    
    # print all the users in the database
    print(User.query.all())
    return jsonify({'error': 'Invalid credentials'}), 401

def register():
    data = request.get_json()
    user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        status='active',
        user_type='member'
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict())
