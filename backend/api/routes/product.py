import datetime
from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas import ProductCreate, ProductById, ProductBase, ProductUpdate, ProductOpenClose
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud
from .auth import manager
router = APIRouter()

@router.post("/", response_model=ProductById)
def create_product(product_in: ProductCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.product.create(db, obj_in=product_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.get("/{id}", response_model=ProductById)
def get_product_by_id(id: int, db: Session = Depends(deps.get_db)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    
    try :
        return product
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    

@router.delete("/{id}", response_model=int)
def delete_product(id: int, db: Session = Depends(deps.get_db)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
        return crud.product.remove(db, obj=product)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=ProductById)
def update_product(id: int, product_in: ProductUpdate, db: Session = Depends(deps.get_db)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
        # Update the field updated_at
        crud.productInteract.update_updated_at(db, id=id)
        return crud.product.update(db, db_obj=product, obj_in=product_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.get("/by_category/{category_id}", response_model=List[ProductBase])
def get_products_by_category(category_id: int, db: Session = Depends(deps.get_db)):
    products = crud.productInteract.list_by_category(db, category_id=category_id)
    if not products:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No products found for category with ID {category_id}",
        )
    try :
        return products
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.get("/by_name/{product_name}", response_model=ProductBase)
def get_products_by_name(product_name: str, db: Session = Depends(deps.get_db)):
    product = crud.productInteract.list_by_name(db, product_name=product_name)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No products found with name {product_name}",
        )
    try :
        return product
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.get("/", response_model=List[ProductBase])
def get_all_products(db: Session = Depends(deps.get_db)):
    return crud.product.get_all(db)

@router.post("/update_open_close_date/{id}", response_model=ProductById)
def update_open_close_date(id: int, time_in: ProductOpenClose, db: Session = Depends(deps.get_db)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
        # Update the field updated_at
        crud.productInteract.update_updated_at(db, id=id)
        return crud.productInteract.update_open_close_date(db, id=id, open_at=time_in.open_at, close_at=time_in.close_at)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

