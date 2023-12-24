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
    product_in_stock = crud.productInteract.get_stock_by_id(db, product_detail_id=order_detail_in.product_detail_id)
    if (product_in_stock < order_detail_in.amount):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Product in stock is not enough",
        )
    else :
        try:
            crud.productInteract.update_stock_by_id(db, product_detail_id=order_detail_in.product_detail_id, amount=product_in_stock - order_detail_in.amount)
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
        
@router.get("/by_pdetail/{pdetail_id}", response_model=List[OrderDetailById])
def get_order_detail_by_pdetail(pdetail_id: int, db: Session = Depends(deps.get_db)):
    order_detail = crud.order_detailInteract.get_by_product_detail(db, pdetail_id=pdetail_id)
    if not order_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order detail with product detail ID {pdetail_id} not found",
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
        