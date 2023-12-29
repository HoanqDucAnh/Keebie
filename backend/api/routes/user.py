from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import UserCreate, UserById, UserBase, UserLogin, UserByRole, UserByAddress, UserPassword
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.exc import SQLAlchemyError
from api import deps
from security import manager
import logging
import crud
import sqlalchemy

router = APIRouter()

@router.post("/", response_model=UserById)
def create_user(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.user.create(db, obj_in=user_in)
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )

@router.get("/by_name/{username}", response_model=UserLogin)
def get_user_by_name(username: str, db: Session = Depends(deps.get_db), user = Depends(manager)):
    user = crud.userInteract.get_by_username(db, username=username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with name {username} not found",
        )
    if user.is_admin == True:
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not admin",
        )

@router.get("/{user_id}")
def get_user_by_user_id(user_id: int, db: Session = Depends(deps.get_db), user = Depends(manager)):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with id {user_id} not found",
        )
    if user.is_admin == True:
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not admin",
        )

@router.get("/", response_model=List[UserByAddress])
def get_all_users(db: Session = Depends(deps.get_db), user = Depends(manager)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not admin",
        )
    else: 
        return crud.user.get_all(db)

@router.put("/{user_id}", response_model=UserByRole)
def update_user_by_role(user_id: int, user_in: UserByRole, db: Session = Depends(deps.get_db), user = Depends(manager)):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with id {user_id} not found",
        )
    try:
        return crud.user.update(db, db_obj=user, obj_in=user_in)
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )
    
@router.put("/update_password/{user_id}", response_model=UserPassword)
def update_user_password(user_id: int, new_password: str = Form(...), db: Session = Depends(deps.get_db), user = Depends(manager), old_password: str = Form(...)):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with id {user_id} not found",
        )
    try:
        if old_password != user.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong password",
            )
        else:
            return crud.userInteract.update_user_password(db, id=user_id, password=new_password)
            
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )





