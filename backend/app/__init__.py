from flask import Flask
from flask_cors import CORS
from config import ApplicationConfiguration


app = Flask(__name__)

app.config.from_object(ApplicationConfiguration)

CORS(app, supports_credentials=True)

app.app_context().push()

from .auth import (
    login,
    signup
)
from .Todos import todo