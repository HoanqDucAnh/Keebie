from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form, File, UploadFile
from sqlalchemy.orm import Session
from schemas.product import ProductImageCreate, ProductImageById, ProductImageBase
from models.product import ProductImage
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud
from typing import Annotated
import base64
from .auth import manager
router = APIRouter()

@router.post("/")
async def create(files: list[UploadFile], db: Session = Depends(deps.get_db), user=Depends(manager)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User is not admin",
        )
    else :
        image_ids = []
        for file in files:
            data = await file.read()  
            data = base64.b64encode(data)  
            db_obj = ProductImage(image=data) 
            db.add(db_obj)  
            db.commit() 
            db.refresh(db_obj)
            image_ids.append(db_obj.id)

        return image_ids
    
    

    
@router.get("/{id}", response_model=ProductImageById)
def get_product_image_by_id(id: int, db: Session = Depends(deps.get_db), user=Depends(manager)):
    product_image = crud.productImage.get(db, id=id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with ID {id} not found",
        )
    
    try :
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else:
            return product_image
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.delete("/{id}", response_model=int)
def delete_product_image(id: int, db: Session = Depends(deps.get_db), user=Depends(manager)):
    product_image = crud.productImage.get(db, id=id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with ID {id} not found",
        )
    try :
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else:
            return crud.productImage.remove(db, obj=product_image)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.get("/by_product_id/{product_id}", response_model=List[ProductImageBase])
def get_product_image_by_product_id(product_id: int, db: Session = Depends(deps.get_db), user=Depends(manager)):
    product_image = crud.productImage.list_by_product(db, product_id=product_id)
    if not product_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ProductImage with product ID {product_id} not found",
        )
    
    try :
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is not admin",
            )
        else:
            return product_image
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )