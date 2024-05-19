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
        email = data.get('email')
        password = data.get('password')
        firstName = data.get('firstname')
        lastName = data.get('lastname')
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify(
                Error="This email already exists in the database please login"
            ), 401
        hashedPassword = bcrypt.generate_password_hash(password)
        newUser = User(
            email=email,
            password = hashedPassword,
            firstName = firstName,
            lastName = lastName
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