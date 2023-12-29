from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.sale import SaleCreate, SaleById, SaleBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=SaleById)
def create_sale(sale_in: SaleCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.sale.create(db, obj_in=sale_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=SaleById)
def get_sale_by_id(id: int, db: Session = Depends(deps.get_db)):
    sale = crud.sale.get(db, id=id)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale with ID {id} not found",
        )
    
    try :
        return sale
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_user/{user_id}", response_model=List[SaleById])
def get_sale_by_user(user_id: int, db: Session = Depends(deps.get_db)):
    sale = crud.saleInteract.get_by_user(db, user_id=user_id)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale with user ID {user_id} not found",
        )
    
    try :
        return sale
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_name/{name}", response_model=List[SaleById])
def get_sale_by_name(name: str, db: Session = Depends(deps.get_db)):
    sale = crud.saleInteract.get_by_name(db, name=name)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale with name {name} not found",
        )
    
    try :
        return sale
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_sale(id: int, db: Session = Depends(deps.get_db)):
    sale = crud.sale.get(db, id=id)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale with ID {id} not found",
        )
    
    try:
        return crud.sale.remove(db, obj=sale)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=SaleById)
def update_sale(id: int, sale_in: SaleBase, db: Session = Depends(deps.get_db)):
    sale = crud.sale.get(db, id=id)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale with ID {id} not found",
        )
    
    try:
        return crud.sale.update(db, db_obj=sale, obj_in=sale_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[SaleById])
def get_all_sale(db: Session = Depends(deps.get_db)):
    sale = crud.sale.get_multi(db)
    if not sale:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale not found",
        )
    
    try :
        return sale
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
