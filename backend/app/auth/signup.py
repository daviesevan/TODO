from app import app
from flask import request, jsonify
from app.model import db, User
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import SQLAlchemyError


bcrypt = Bcrypt(app)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        app.logger.info(data)
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify(
                Error="This email already exists in the database please login"
            ), 409
        hashedPassword = bcrypt.generate_password_hash(password)
        newUser = User(
            email=email,
            password = hashedPassword,
        )
        db.session.add(newUser)
        db.session.commit()
        return jsonify(
            message="User created succesfully",
            email=f"{email}"
        ), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify(
            error = f"{e}"
        )