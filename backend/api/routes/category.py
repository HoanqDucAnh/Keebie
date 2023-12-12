from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import CategoryCreate, CategoryById, CategoryBase
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import logging
import crud
import sqlalchemy
router = APIRouter()

@router.post("/", response_model=CategoryById)
def create_category(category: CategoryCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.category.create(db, obj_in=category)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.get("/{id}", response_model=CategoryById)
def get_category_by_id(id: int, db: Session = Depends(deps.get_db)):
    category = crud.category.get(db, id=id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with ID {id} not found",
        )
    return category


@router.delete("/{id}", response_model=int)
def delete_category(id: int, db: Session = Depends(deps.get_db)):
    category = crud.category.get(db, id=id)
    associated_products = crud.productInteract.get_by_category_id(db, category.id)
    if associated_products:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Cannot delete category with ID {id}. There are associated products.",
        )
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with ID {id} not found",
        )

    return crud.category.remove(db, obj=category)


