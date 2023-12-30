from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.order import OrderCreate, OrderById, OrderBase
from fastapi_login import LoginManager
from models.order import Order
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import base64
import crud

router = APIRouter()

@router.post("/", response_model=OrderById)
async def create_order(payment_image: str = Form(...),
                        address: str = Form(...), 
                        user_id: int = Form(...), 
                        status_id: int = Form(...), 
                        total_price: float = Form(...),
                        email: str = Form(...),
                        phone_number: str = Form(...),
                        full_name: str = Form(...), 
                        note: str = Form(...),
                        payment_method: str = Form(...),
                        shipment_method: str = Form(...),
                        db: Session = Depends(deps.get_db)):
    try:
        db_obj = Order(address=address, user_id=user_id, status_id=status_id, total_price=total_price, payment_image=payment_image, email=email, phone_number=phone_number, full_name=full_name, note=note, payment_method=payment_method, shipment_method=shipment_method) 
        db.add(db_obj)  
        db.commit() 
        db.refresh(db_obj)
        return OrderById(**db_obj.__dict__)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=OrderById)
def get_order_by_id(id: int, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_customer/{customer_id}", response_model=List[OrderById])
def get_order_by_customer(user_id: int, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_customer(db, user_id==user_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with user ID {user_id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_status/{status_id}", response_model=List[OrderById])
def get_order_by_status(status_id: int, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_status(db, status_id=status_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with status ID {status_id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.put("/{id}", response_model=OrderById)
def update_order(id: int, order_in: OrderCreate, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    try :
        return crud.order.update(db, db_obj=order, obj_in=order_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[OrderById])
def get_all_orders(db: Session = Depends(deps.get_db)):
    orders = crud.order.get_all(db)
    if not orders:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No orders found",
        )
    
    try :
        return orders
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.delete("/{id}", response_model=int)
def delete_order(id: int, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    order_details = crud.order_detailInteract.get_by_order(db, order_id=id)
    try:
        for order_detail in order_details:
            order_detail_stock = order_detail.amount
            product_in_stock = crud.productInteract.get_stock_by_id(db, id = order_detail.product_id)
            crud.productInteract.update_stock_by_id(db, id=order_detail.product_id, stock=order_detail.amount + product_in_stock)
            crud.order_detail.remove(db, obj=order_detail)
        return crud.order.remove(db, obj=order)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.put("/update_status/{id}", response_model=OrderById)
def update_order_status(id: int, status_id: int, db: Session = Depends(deps.get_db)):
    try :
        if status_id == 3:
            order_details = crud.order_detailInteract.get_by_order(db, order_id=id)
            for order_detail in order_details:
                order_detail_stock = order_detail.amount
                product_in_stock = crud.productInteract.get_stock_by_id(db, id = order_detail.product_id)
                crud.productInteract.update_stock_by_id(db, id=order_detail.product_id, stock=order_detail.amount + product_in_stock)
        return crud.orderInteract.update_status(db, id=id, status_id=status_id)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )