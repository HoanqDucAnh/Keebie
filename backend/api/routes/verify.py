from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import VerifyBase, VerifyById, VerifyCreate, VerifyUpdate, VerifyByUserId, VerifyByCode
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.exc import SQLAlchemyError
from api import deps
from security import manager
import logging
import crud
import sqlalchemy

router = APIRouter()

@router.post("/", response_model=VerifyById)
def create_verify(verify_in: VerifyCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.verify.create(db, obj_in=verify_in)
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )
            
@router.get("/{id}", response_model=VerifyById)
def get_verify_by_id(id: int, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_user/{user_id}", response_model=VerifyByUserId)
def get_verify_by_user(user_id: int, db: Session = Depends(deps.get_db)):
    verify = crud.verifyInteract.get_by_user(db, user_id=user_id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with user ID {user_id} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_code/{code}", response_model=VerifyByCode)
def get_verify_by_code(code: str, db: Session = Depends(deps.get_db)):
    verify = crud.verifyInteract.get_by_code(db, code=code)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with code {code} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_verify(id: int, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try:
        return crud.verify.remove(db, obj=verify)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=VerifyById)
def update_verify(id: int, verify_in: VerifyUpdate, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try:
        return crud.verify.update(db, db_obj=verify, obj_in=verify_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[VerifyById])
def get_all_verify(db: Session = Depends(deps.get_db)):
    verify = crud.verify.get_multi(db)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
