from flask import jsonify
from flask_jwt_extended import jwt_required, unset_jwt_cookies, get_jwt_identity
from app import app
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Logout route to revoke the current user's access token.
    """
    # Access the JWT identity/data
    user_email = get_jwt_identity()

    # Revoke the access token
    unset_jwt_cookies(resp)

    return jsonify({"msg": f"User {user_email} successfully logged out."}), 200