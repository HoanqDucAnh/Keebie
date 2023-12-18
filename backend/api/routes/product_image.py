from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas import ProductImageCreate, ProductImageById, ProductImageBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud
from .auth import manager
router = APIRouter()

@router.post("/", response_model=ProductImageById)
def create_product_image(product_image_in: ProductImageCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.productImage.create(db, obj_in=product_image_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.get("/{id}", response_model=ProductImageById)
def get_product_image_by_id(id: int, db: Session = Depends(deps.get_db)):
    product_image = crud.productImage.get(db, id=id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with ID {id} not found",
        )
    
    try :
        return product_image
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.delete("/{id}", response_model=int)
def delete_product_image(id: int, db: Session = Depends(deps.get_db)):
    product_image = crud.productImage.get(db, id=id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with ID {id} not found",
        )
    try :
        return crud.productImage.remove(db, obj=product_image)
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
        


@router.get("/by_product_id/{product_id}", response_model=List[ProductImageBase])
def get_product_image_by_product_id(product_id: int, db: Session = Depends(deps.get_db)):
    product_image = crud.productImage.list_by_product(db, product_id=product_id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with product ID {product_id} not found",
        )
    
    try :
        return product_image
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
