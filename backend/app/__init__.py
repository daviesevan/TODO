from flask import Flask
from config import ApplicationConfiguration
app = Flask(__name__)

app.config.from_object(ApplicationConfiguration)

app.app_context().push()

from .auth import (
    login,
    signup
)