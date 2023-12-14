from typing import Type
from crud.base import CRUDBase, ReviewCRUD
from schemas.review import ReviewCreate, ReviewById, ReviewUpdate
from models.review import Review

class CRUDReview(CRUDBase[ReviewById, ReviewCreate, ReviewUpdate]):
    pass

class CRUDReview_Type(ReviewCRUD):
    pass

review = CRUDReview(Review)
reviewInteract = CRUDReview_Type(Review)