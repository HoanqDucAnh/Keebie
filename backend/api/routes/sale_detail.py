from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.sale import SaleDetailCreate, SaleDetailById, SaleDetailBase
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=SaleDetailById)
def create_sale_detail(sale_detail_in: SaleDetailCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.sale_detail.create(db, obj_in=sale_detail_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=SaleDetailById)
def get_sale_detail_by_id(id: int, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detail.get(db, id=id)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with ID {id} not found",
        )
    
    try :
        return sale_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_sale/{sale_id}", response_model=List[SaleDetailById])
def get_sale_detail_by_sale(sale_id: int, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detailInteract.get_by_sale(db, sale_id=sale_id)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with sale ID {sale_id} not found",
        )
    
    try :
        return sale_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_sale_detail(id: int, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detail.get(db, id=id)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with ID {id} not found",
        )
    
    try:
        return crud.sale_detail.remove(db, obj=sale_detail)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=SaleDetailById)
def update_sale_detail(id: int, sale_detail_in: SaleDetailCreate, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detail.get(db, id=id)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with ID {id} not found",
        )
    
    try:
        return crud.sale_detail.update(db, db_obj=sale_detail, obj_in=sale_detail_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[SaleDetailById])
def get_all_sale_detail(db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detail.get_multi(db)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail not found",
        )
    
    try :
        return sale_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_pdetail/{pdetail_id}", response_model=List[SaleDetailById])
def get_sale_detail_by_pdetail(pdetail_id: int, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detailInteract.get_by_product_detail(db, pdetail_id=pdetail_id)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with pdetail ID {pdetail_id} not found",
        )
    
    try :
        return sale_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_is_percent/{is_percent}", response_model=List[SaleDetailById])
def get_sale_detail_by_is_percent(is_percent: bool, db: Session = Depends(deps.get_db)):
    sale_detail = crud.sale_detailInteract.get_by_is_percent(db, is_percent=is_percent)
    if not sale_detail:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sale detail with is_percent {is_percent} not found",
        )
    
    try :
        return sale_detail
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
