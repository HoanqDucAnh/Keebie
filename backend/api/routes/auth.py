from . import user
from .user import *
from schemas import Token
from fastapi_login import LoginManager
router = APIRouter()

SECRET_KEY = "hieucute"

manager = LoginManager(SECRET_KEY, token_url='/auth/login')


@router.post('/login', response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(deps.get_db)) -> Token:
    user = get_user_by_name(form_data.username, db)
    if user is None:
        raise InvalidCredentialsException

    if (form_data.password != user.password):
        raise InvalidCredentialsException

    token = manager.create_access_token(data={'sub': user.username})
    return Token(access_token=token, token_type='bearer')

# def hash_password(plaintext: str):
#     return manager.pwd_context.hash(plaintext)


# def verify_password(plaintext: str, hashed: str):

#     return manager.pwd_context.verify(plaintext, hashed)