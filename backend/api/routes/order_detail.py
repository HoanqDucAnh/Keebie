from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.order import OrderDetailCreate, OrderDetailById, OrderDetailBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=OrderDetailById)
def create_order_detail(order_detail_in: OrderDetailCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.order_detail.create(db, obj_in=order_detail_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=OrderDetailById)
def get_order_detail_by_id(id: int, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detail.get(db, id=id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with ID {id} not found",
        )
    
    try :
        return order_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_order/{order_id}", response_model=List[OrderDetailById])
def get_order_detail_by_order(order_id: int, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detailInteract.get_by_order(db, order_id=order_id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with order ID {order_id} not found",
        )
    
    try :
        return order_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_product/{product_id}", response_model=List[OrderDetailById])
def get_order_detail_by_product(product_id: int, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detailInteract.get_by_product(db, product_id=product_id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with product ID {product_id} not found",
        )
    
    try :
        return order_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_order_detail(id: int, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detail.get(db, id=id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with ID {id} not found",
        )
    
    try:
        return crud.order_detail.remove(db, obj=order_detail)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=OrderDetailById)
def update_order_detail(id: int, order_detail_in: OrderDetailCreate, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detail.get(db, id=id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with ID {id} not found",
        )
    try :
        return crud.order_detail.update(db, db_obj=order_detail, obj_in=order_detail_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        