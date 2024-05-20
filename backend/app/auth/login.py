from app import app
import datetime
from flask import jsonify, request
from app.model import db, User
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
    create_refresh_token,
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
        return jsonify({"Error": "Email does not exist in our database"}), 401
    correct_password = bcrypt.check_password_hash(user.password, password)
    if not correct_password:
        return jsonify({"Message": "Incorrect Password"}), 401
    access_token = create_access_token(identity=email, expires_delta=datetime.timedelta(minutes=59))
    refresh_token = create_refresh_token(identity=email)
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

@app.route('/@me', methods=['GET'])
@jwt_required()
def me():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    full_name = user.fullName()
    app.logger.info(current_user_email)
    return jsonify(current_user=current_user_email, fullName=full_name), 200

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # Require a refresh token to access this endpoint
def refresh_token():
    try:
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return jsonify(access_token=new_access_token), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500