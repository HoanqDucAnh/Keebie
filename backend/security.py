from fastapi_login import LoginManager

SECRET_KEY = "hieucute"

manager = LoginManager(SECRET_KEY, token_url='api/auth/login')

