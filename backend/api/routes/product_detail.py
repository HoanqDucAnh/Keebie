from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas import ProductDetailsCreate, ProductDetailsById, ProductBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=ProductDetailsById)
def create_product_details(product_details_in: ProductDetailsCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.product_details.create(db, obj_in=product_details_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.get("/{id}", response_model=ProductDetailsById)
def get_product_details_by_id(id: int, db: Session = Depends(deps.get_db)):
    product_details = crud.product_details.get(db, id=id)
    if not product_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product details with ID {id} not found",
        )
   
    try :
        return product_details
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    

@router.delete("/{id}", response_model=int)
def delete_product_details(id: int, db: Session = Depends(deps.get_db)):
    product_details = crud.product_details.get(db, id=id)
    if not product_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product details with ID {id} not found",
        )
    
    try:
        return crud.product_details.remove(db, obj=product_details)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.put("/{id}", response_model=ProductDetailsById)
def update_product_details(id: int, product_details_in: ProductDetailsCreate, db: Session = Depends(deps.get_db)):
    product_details = crud.product_details.get(db, id=id)
    if not product_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product details with ID {id} not found",
        )
    try :
        return crud.product_details.update(db, db_obj=product_details, obj_in=product_details_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/search/{name}", response_model=List[ProductDetailsById])
def search_product_details_by_name(name: str, db: Session = Depends(deps.get_db)):
    product_details = crud.product_details.get_by_name(db, name=name)
    if not product_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product details with name {name} not found",
        )
    try:
        return product_details
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        ) from e
        


