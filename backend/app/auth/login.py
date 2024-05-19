from app import app
import datetime
from flask import jsonify, request
from app.model import db, User
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from flask_bcrypt import Bcrypt

jwt = JWTManager(app)
bcrypt = Bcrypt(app)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({
            "Error":"Email does not exist in our database"
        }), 401
    correctPassword = bcrypt.check_password_hash(user.password, password)
    if not correctPassword:
        return jsonify({
            "Message":"Incorrect Password"
        }), 401
    access_token = create_access_token(
        identity=email,
        expires_delta=datetime.timedelta(minutes=10),
    )
    return jsonify(
        access_token=access_token
    ), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(
        logged_in_as=current_user
    ), 200

@app.route('/unprotected', methods=['GET'])
def unprotected():
    pass