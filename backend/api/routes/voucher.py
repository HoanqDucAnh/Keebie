from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.voucher import VoucherCreate, VoucherById, VoucherBase, VoucherCustomerBase, VoucherCustomerCreate, VoucherCustomerById
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=VoucherById)
def create_voucher(voucher_in: VoucherCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.voucher.create(db, obj_in=voucher_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=VoucherById)
def get_voucher_by_id(id: int, db: Session = Depends(deps.get_db)):
    voucher = crud.voucher.get(db, id=id)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher with ID {id} not found",
        )
    
    try :
        return voucher
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_voucher(id: int, db: Session = Depends(deps.get_db)):
    voucher = crud.voucher.get(db, id=id)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher with ID {id} not found",
        )
    
    try:
        return crud.voucher.remove(db, obj=voucher)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=VoucherById)
def update_voucher(id: int, voucher_in: VoucherBase, db: Session = Depends(deps.get_db)):
    voucher = crud.voucher.get(db, id=id)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher with ID {id} not found",
        )
    
    try:
        return crud.voucher.update(db, db_obj=voucher, obj_in=voucher_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[VoucherById])
def get_all_voucher(db: Session = Depends(deps.get_db)):
    voucher = crud.voucher.get_multi(db)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher not found",
        )
    
    try :
        return voucher
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_name/{name}", response_model=VoucherById)
def get_voucher_by_name(name: str, db: Session = Depends(deps.get_db)):
    voucher = crud.voucherInteract.get_by_name(db, name=name)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher with name {name} not found",
        )
    
    try :
        return voucher
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_voucher_code/{voucher_code}", response_model=VoucherById)
def get_voucher_by_voucher_code(voucher_code: str, db: Session = Depends(deps.get_db)):
    voucher = crud.voucherInteract.get_by_code(db, voucher_code=voucher_code)
    if not voucher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher with voucher code {voucher_code} not found",
        )
    
    try :
        return voucher
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
# VoucherCustomer
@router.post("/customer", response_model=VoucherCustomerById)
def create_voucher_customer(voucher_customer_in: VoucherCustomerCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.voucher_customer.create(db, obj_in=voucher_customer_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
    )
        
@router.get("/customer/{id}", response_model=VoucherCustomerById)
def get_voucher_customer_by_id(id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer with ID {id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
    )
        
@router.delete("/customer/{id}", response_model=int)
def delete_voucher_customer(id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer with ID {id} not found",
        )
    
    try:
        return crud.voucher_customer.remove(db, obj=voucher_customer)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
    )
        
@router.put("/customer/{id}", response_model=VoucherCustomerById)
def update_voucher_customer(id: int, voucher_customer_in: VoucherCustomerBase, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get(db, id=id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer with ID {id} not found",
        )
    
    try:
        return crud.voucher_customer.update(db, db_obj=voucher_customer, obj_in=voucher_customer_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,   
    )
        
@router.get("/customer", response_model=List[VoucherCustomerById])
def get_all_voucher_customer(db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customer.get_multi(db)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,   
    )
        
@router.get("/customer/by_customer_id/{customer_id}", response_model=List[VoucherCustomerById])
def get_voucher_customer_by_customer_id(customer_id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customerInteract.get_by_customer(db, customer_id=customer_id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer with customer ID {customer_id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,   
    )
        
@router.get("/customer/by_voucher_id/{voucher_id}", response_model=List[VoucherCustomerById])
def get_voucher_customer_by_voucher_id(voucher_id: int, db: Session = Depends(deps.get_db)):
    voucher_customer = crud.voucher_customerInteract.get_by_voucher(db, voucher_id=voucher_id)
    if not voucher_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Voucher customer with voucher ID {voucher_id} not found",
        )
    
    try :
        return voucher_customer
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,   
    )
        
