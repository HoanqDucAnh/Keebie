from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.cart import CartCreate, CartById, CartBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=CartById)
def create_cart(cart_in: CartCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.cart.create(db, obj_in=cart_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=CartById)
def get_cart_by_id(id: int, db: Session = Depends(deps.get_db)):
    cart = crud.cart.get(db, id=id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with ID {id} not found",
        )
    
    try :
        return cart
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_customer/{customer_id}", response_model=List[CartById])
def get_cart_by_customer(customer_id: int, db: Session = Depends(deps.get_db)):
    cart = crud.cartInteract.get_by_customer(db, customer_id=customer_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with customer ID {customer_id} not found",
        )
    
    try :
        return cart
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_cart(id: int, db: Session = Depends(deps.get_db)):
    cart = crud.cart.get(db, id=id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with ID {id} not found",
        )
    
    try:
        return crud.cart.remove(db, obj=cart)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=CartById)
def update_cart(id: int, cart_in: CartCreate, db: Session = Depends(deps.get_db)):
    cart = crud.cart.get(db, id=id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with ID {id} not found",
        )
    
    try:
        return crud.cart.update(db, db_obj=cart, obj_in=cart_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[CartById])
def get_all_cart(db: Session = Depends(deps.get_db)):
    cart = crud.cart.get_multi(db)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart not found",
        )
    
    try :
        return cart
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/by_customer/{customer_id}", response_model=int)
def delete_cart_by_customer(customer_id: int, db: Session = Depends(deps.get_db)):
    cart = crud.cartInteract.get_by_customer(db, customer_id=customer_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with customer ID {customer_id} not found",
        )
    
    try:
        return crud.cart.remove(db, obj=cart)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
    )

@router.delete("/by_pdetail_and_customer/{product_detail_id}/{customer_id}", response_model=int)
def delete_cart_by_pdetail_and_customer(product_detail_id: int, customer_id: int, db: Session = Depends(deps.get_db)):
    cart = crud.cartInteract.get_by_pdetail_and_customer(db, product_detail_id=product_detail_id, customer_id=customer_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Cart with product detail ID {product_detail_id} and customer ID {customer_id} not found",
        )
    
    try:
        return crud.cart.remove(db, obj=cart)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,)
        

        
