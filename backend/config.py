from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())

class ApplicationConfiguration:
    APP_SECRET = os.getenv('APP_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = f'sqlite:///todos.db'
    JWT_SECRET_KEY = os.getenv('APP_SECRET_KEY')
    JWT_COOKIE_SECURE = False
    # JWT_TOKEN_LOCATION = ['header', 'cookies', 'json']