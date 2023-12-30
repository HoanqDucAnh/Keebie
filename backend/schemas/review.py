from pydantic import BaseModel
from datetime import *

class ReviewBase(BaseModel):
    product_id: int
    user_id: int
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

class ReviewByUserId(ReviewBase):
    user_id: int
    
    class Config:
        from_attributes = True

class ReviewByProductId(ReviewBase):
    product_id: int
    
    class Config:
        from_attributes = True
        
