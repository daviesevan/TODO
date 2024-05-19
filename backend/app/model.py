from app import app
from flask_sqlalchemy import SQLAlchemy
from functions import newID

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, nullable=False, default=newID)
    email = db.Column(db.String(325), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)

    def fullName(self):
        """
        This method returns users full name
        """
        return f"{self.firstName} {self.lastName}"