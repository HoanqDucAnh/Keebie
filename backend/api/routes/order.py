from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.order import OrderCreate, OrderById, OrderBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=OrderById)
def create_order(order_in: OrderCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.order.create(db, obj_in=order_in)
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
def get_order_by_customer(customer_id: int, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_customer(db, customer_id=customer_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with customer ID {customer_id} not found",
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
        
@router.delete("/{id}", response_model=int)
def delete_order(id: int, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    
    try:
        return crud.order.remove(db, obj=order)
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
        
@router.get("/by_status_name/{status_name}", response_model=List[OrderById])
def get_order_by_status_name(status_name: str, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_status_name(db, status_name=status_name)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with status name {status_name} not found",
        )
    
    try :
        return order
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
    
    try:
        return crud.order.remove(db, obj=order)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )


    