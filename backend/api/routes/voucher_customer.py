from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.voucher import VoucherCustomerBase, VoucherCustomerById, VoucherCustomerCreate, VoucherCustomerUpdate
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=VoucherCustomerById)
def create_voucher_customer(voucher_customer_in: VoucherCustomerCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.voucher_customer.create(db, obj_in=voucher_customer_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=VoucherCustomerById)
def get_voucher_customer_by_id(id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher Customer with ID {id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_voucher_customer(id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher Customer with ID {id} not found",
        )
    
    try:
        return crud.voucher_customer.remove(db, obj=voucher_customer)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=VoucherCustomerById)
def update_voucher_customer(id: int, voucher_customer_in: VoucherCustomerUpdate, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher Customer with ID {id} not found",
        )
    
    try:
        return crud.voucher_customer.update(db, db_obj=voucher_customer, obj_in=voucher_customer_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/customer/{customer_id}", response_model=List[VoucherCustomerById])
def get_voucher_customer_by_customer_id(customer_id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get_by_customer_id(db, customer_id=customer_id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher Customer with customer ID {customer_id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/voucher/{voucher_id}", response_model=List[VoucherCustomerById])
def get_voucher_customer_by_voucher_id(voucher_id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get_by_voucher_id(db, voucher_id=voucher_id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher Customer with voucher ID {voucher_id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
