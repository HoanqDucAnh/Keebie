from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import UserCreate, UserById, UserBase, UserLogin
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from api import deps
import crud

router = APIRouter()
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# SECRET_KEY = "abc"
# manager = LoginManager(SECRET_KEY, token_url='/auth/token')

# @router.post("/users/", response_model=schemas.User)
# def create(user: schemas.UserCreate, db: Session = Depends(deps.get_db)):
#     return crud.create(db=db, user=user)

@router.post("/", response_model=UserById)
def create_user(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    return crud.user.create(db, obj_in=user_in)

@router.get("/{username}", response_model=UserLogin)
def get_user_by_name(username: str, db: Session = Depends(deps.get_db)):
    user = crud.userInteract.get_by_username(db, username=username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with name {username} not found",
        )
    return user

@router.get("/{user_id}")
def get_user_by_user_id(user_id: int, db: Session = Depends(deps.get_db)):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with id {user_id} not found",
        )
    return user





