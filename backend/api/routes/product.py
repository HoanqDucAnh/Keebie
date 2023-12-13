from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas import ProductCreate, ProductById, ProductBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud
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
    associated_product_details = crud.product_details.list_by_product(db, product.id)
    if associated_product_details:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Cannot delete product with ID {id}. There are associated product details.",
        )
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
def update_product(id: int, product_in: ProductCreate, db: Session = Depends(deps.get_db)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
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
    product = crud.productInteract.get_by_name(db, product_name=product_name)
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
    
