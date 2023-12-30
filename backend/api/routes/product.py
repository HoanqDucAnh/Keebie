from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form, Query
from sqlalchemy.orm import Session
from fastapi.requests import Request
from schemas import ProductCreate, ProductById, ProductBase, ProductByHeaderImage, HeaderImageOnly
from models.product import Product
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud
import base64
from security import manager
router = APIRouter()

@router.post("/", response_model=ProductById)
async def create_product(file: UploadFile,
                        db: Session = Depends(deps.get_db), 
                        product_name: str = Form(...),
                        brand: str = Form(...),
                        content: str = Form(...),
                        price: float = Form(...),
                        stock: int = Form(...),
                        category_id: int = Form(...),
                        user=Depends(manager)):
    try:
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else :
            data = await file.read()  
            data = base64.b64encode(data)  
            db_obj = Product(header_image=data, product_name=product_name, brand=brand, content=content, price=price, stock=stock, category_id=category_id) 
            db.add(db_obj)  
            db.commit() 
            db.refresh(db_obj)
            return ProductById(**db_obj.__dict__)
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
def delete_product(id: int, db: Session = Depends(deps.get_db), user=Depends(manager)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else:
            return crud.product.remove(db, obj=product)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=ProductById)
def update_product(id: int, product_in: ProductCreate, db: Session = Depends(deps.get_db), user=Depends(manager)):
    product = crud.product.get(db, id=id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {id} not found",
        )
    try :
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else:
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
    
@router.get("/", response_model=List[ProductByHeaderImage])
def get_all_products(db: Session = Depends(deps.get_db)):
    try :    
        return crud.product.get_all(db)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.get("/by_header_image/", response_model=List[HeaderImageOnly])
def get_header_image_by_list_id(id: str, db: Session = Depends(deps.get_db)):
    try :    
        id_list = [int(i) for i in id.split(",")]
        ListProduct = []
        for i in id_list:
            product = crud.product.get(db, id=i)
            ListProduct.append(product)
        return ListProduct
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error
        )
