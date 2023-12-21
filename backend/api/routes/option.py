from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.option import OptionCreate, OptionById, OptionBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=OptionById)
def create_option(option_in: OptionCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.option.create(db, obj_in=option_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=OptionById)
def get_option_by_id(id: int, db: Session = Depends(deps.get_db)):
    option = crud.option.get(db, id=id)
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Option with ID {id} not found",
        )
    
    try :
        return option
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=OptionById)
def update_option(id: int, option_in: OptionBase, db: Session = Depends(deps.get_db)):
    option = crud.option.get(db, id=id)
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Option with ID {id} not found",
        )
    
    try :
        return crud.option.update(db, db_obj=option, obj_in=option_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}")
def delete_option(id: int, db: Session = Depends(deps.get_db)):
    option = crud.option.get(db, id=id)
    if not option:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Option with ID {id} not found",
        )
    
    try :
        return crud.option.remove(db, id=id)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
