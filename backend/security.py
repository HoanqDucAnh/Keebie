from fastapi_login import LoginManager
from datetime import timedelta

SECRET_KEY = "hieucute"

manager = LoginManager(SECRET_KEY, token_url='api/auth/login', default_expiry=timedelta(hours=6))


