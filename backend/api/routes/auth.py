from . import user
from .user import *
from schemas import Token
from fastapi_login import LoginManager
from db.action import get_user_by_name_manager
import crud
router = APIRouter()



@router.post('/login', response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(deps.get_db)) -> Token:
    user = get_user_by_name_manager(form_data.username, db)
    if user is None:
        raise InvalidCredentialsException

    if (form_data.password != user.password):
        raise InvalidCredentialsException

    token = manager.create_access_token(data={'sub': user.username, 'is_admin': user.is_admin})
    return Token(access_token=token, token_type='bearer')
