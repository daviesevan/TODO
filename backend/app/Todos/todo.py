from app import app
import datetime
from flask import jsonify, request
from app.model import db, User, Todo
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from flask_bcrypt import Bcrypt

jwt = JWTManager(app)


# Todo Routes
@app.route('/todo', methods=['POST'])
@jwt_required()
def create_todo():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    data = request.get_json()
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        user_id=user.id
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'Todo created!'}), 201

@app.route('/todo', methods=['GET'])
@jwt_required()
def get_todos():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    # Pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = 3

    # Query todos for the current user with pagination
    todos = Todo.query.filter_by(user_id=user.id).order_by(Todo.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    output = []
    for todo in todos.items:
        todo_data = {
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        }
        output.append(todo_data)
    
    return jsonify({
        'todos': output,
        'total_pages': todos.pages,
        'current_page': todos.page,
        'total_items': todos.total
    })


@app.route('/todo/<todo_id>', methods=['GET'])
@jwt_required()
def get_todo(todo_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
    if not todo:
        return jsonify({'message': 'Todo not found!'}), 404
    todo_data = {
        'id': todo.id,
        'title': todo.title,
        'description': todo.description,
        'created_at': todo.created_at,
        'updated_at': todo.updated_at
    }
    return jsonify({'todo': todo_data})

@app.route('/todo/<todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    data = request.get_json()
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
    if not todo:
        return jsonify({'message': 'Todo not found!'}), 404

    todo.title = data['title']
    todo.description = data.get('description', todo.description)
    db.session.commit()
    return jsonify({'message': 'Todo updated!'})

@app.route('/todo/<todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
    if not todo:
        return jsonify({'message': 'Todo not found!'}), 404

    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'Todo deleted!'})