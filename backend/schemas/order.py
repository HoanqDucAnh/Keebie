from pydantic import BaseModel
from datetime import *

class OrderBase(BaseModel):
    order_id: int
    order_code: str
    order_status_id: int
    created_at: datetime
    order_estimated_delivery: datetime
    address: str
    customer_id: int
    
class OrderDetailBase(BaseModel):
    order_detail_id: int
    amount: int
    price: int
    order_detail_total: int
    order_id: int
    product_detail_id: int
    
class StatusBase(BaseModel):
    status_id: int
    status_name: str
    
class OrderById(OrderBase):
    id: int
    
    class Config:
        from_attributes = True
        
class OrderCreate(OrderBase):
    pass
    
class OrderDetailById(OrderDetailBase):
    id: int
    
    class Config:
        from_attributes = True
        
class OrderDetailCreate(OrderDetailBase):
    pass

class StatusById(StatusBase):
    id: int
    
    class Config:
        from_attributes = True
        
class StatusCreate(StatusBase):
    pass

class OrderUpdate:
    pass

class OrderDetailUpdate:
    pass

class StatusUpdate:
    pass

class OrderByCustomerId(OrderBase):
    customer_id: int
    
    class Config:
        from_attributes = True
        

        

