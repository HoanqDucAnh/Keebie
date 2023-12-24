from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.review import ReviewBase, ReviewCreate, ReviewById
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=ReviewById)
def create_review(review_in: ReviewCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.review.create(db, obj_in=review_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=ReviewById)
def get_review_by_id(id: int, db: Session = Depends(deps.get_db)):
    review = crud.review.get(db, id=id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {id} not found",
        )
    
    try :
        return review
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_pdetail/{pdetail_id}", response_model=List[ReviewById])
def get_review_by_pdetail(pdetail_id: int, db: Session = Depends(deps.get_db)):
    review = crud.reviewInteract.get_by_product_detail(db, pdetail_id=pdetail_id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with product detail ID {pdetail_id} not found",
        )
    
    try :
        return review
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_review(id: int, db: Session = Depends(deps.get_db)):
    review = crud.review.get(db, id=id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {id} not found",
        )
    
    try:
        return crud.review.remove(db, obj=review)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=ReviewById)
def update_review(id: int, review_in: ReviewCreate, db: Session = Depends(deps.get_db)):
    review = crud.review.get(db, id=id)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with ID {id} not found",
        )
    
    try:
        return crud.review.update(db, db_obj=review, obj_in=review_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[ReviewById])
def get_all_review(db: Session = Depends(deps.get_db)):
    review = crud.review.get_multi(db)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review not found",
        )
    
    try :
        return review
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        

