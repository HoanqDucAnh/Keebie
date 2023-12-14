from pydantic import BaseModel
from datetime import *

class ReviewBase(BaseModel):
    review_id: int
    product_detail_id: int
    customer_id: int
    review_content: str
    review_rating: int
    created_at: datetime
    
class ReviewById(ReviewBase):
    id: int
    
    class Config:
        from_attributes = True
        
class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate:
    pass

class ReviewDelete:
    pass

class ReviewByCustomerId(ReviewBase):
    customer_id: int
    
    class Config:
        from_attributes = True

class ReviewByProductDetailId(ReviewBase):
    product_detail_id: int
    
    class Config:
        from_attributes = True
        
# review = ReviewBase()
# review_create = ReviewCreate()
# review_update = ReviewUpdate()
# review_delete = ReviewDelete()
# review_by_customer_id = ReviewByCustomerId()
# review_by_product_detail_id = ReviewByProductDetailId()