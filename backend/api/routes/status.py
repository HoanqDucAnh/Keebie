from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.order import StatusBase, StatusCreate, StatusById
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=StatusById)
def create_status(status_in: StatusCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.status.create(db, obj_in=status_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=StatusById)
def get_status_by_id(id: int, db: Session = Depends(deps.get_db)):
    _status = crud.status.get(db, id=id)
    if not _status:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Status with ID {id} not found",
        )
    
    try :
        return _status
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_status(id: int, db: Session = Depends(deps.get_db)):
    _status = crud.status.get(db, id=id)
    if not _status:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Status with ID {id} not found",
        )
    
    try:
        return crud.status.remove(db, obj=_status)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=StatusById)
def update_status(id: int, status_in: StatusCreate, db: Session = Depends(deps.get_db)):
    _status = crud.status.get(db, id=id)
    if not _status:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Status with ID {id} not found",
        )
    
    try:
        return crud.status.update(db, db_obj=_status, obj_in=status_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[StatusById])
def get_all_status(db: Session = Depends(deps.get_db)):
    try:
        return crud.status.get_multi(db)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
