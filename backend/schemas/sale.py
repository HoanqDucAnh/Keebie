from pydantic import BaseModel
from datetime import *

class SaleBase(BaseModel):
    user_id: int
    created_at: datetime
    updated_at: datetime
    sale_name: str
    started_at: datetime
    ended_at: datetime
    sale_limit: int
    
class SaleDetailBase(BaseModel):
    user_id: int
    product_id: int
    created_at: datetime
    updated_at: datetime
    is_percentage: bool
    discount_amount: int
    
class SaleById(SaleBase):
    id: int
    
    class Config:
        from_attributes = True
        
class SaleCreate(SaleBase):
    pass

class SaleDetailById(SaleDetailBase):
    id: int
    
    class Config:
        from_attributes = True
        
class SaleDetailCreate(SaleDetailBase):
    pass

class SaleUpdate:
    pass

class SaleDetailUpdate:
    pass

class SaleByUserId(SaleBase):
    user_id: int
    
    class Config:
        from_attributes = True
        
class SaleBySaleName(SaleBase):
    sale_name: str
    
    class Config:
        from_attributes = True
        
class SaleDetailBySaleId(SaleDetailBase):
    sale_id: int
    
    class Config:
        from_attributes = True
        
class SaleDetailByProductId(SaleDetailBase):
    product_id: int
    
    class Config:
        from_attributes = True
        
class SaleDetailByIsPercentage(SaleDetailBase):
    is_percentage: bool
    
    class Config:
        from_attributes = True
        

