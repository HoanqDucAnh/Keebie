from . import user
from .user import *
from schemas import Token
from fastapi_login import LoginManager
import crud
router = APIRouter()

SECRET_KEY = "hieucute"

manager = LoginManager(SECRET_KEY, token_url='api/auth/login')


@router.post('/login', response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(deps.get_db)) -> Token:
    user = crud.userInteract.get_by_username(db, username=form_data.username)
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