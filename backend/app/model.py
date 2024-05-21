from app import app
from flask_sqlalchemy import SQLAlchemy
from functions import newID
from flask_migrate import Migrate

db = SQLAlchemy(app)
Migrate(app, db)
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, nullable=False, default=newID)
    email = db.Column(db.String(325), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    todos = db.relationship('Todo', backref='user', lazy=True)

    def fullName(self):
        return f"{self.firstName} {self.lastName}"

class Todo(db.Model):
    id = db.Column(db.String(36), primary_key=True, nullable=False, default=newID)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    completed = db.Column(db.Boolean, nullable=False, default=False)