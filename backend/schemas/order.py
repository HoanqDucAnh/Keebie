from pydantic import BaseModel
from datetime import *

class OrderBase(BaseModel):
    order_code: str
    address: str
    user_id: int
    
class OrderDetailBase(BaseModel):
    amount: int
    price: int
    order_id: int
    product_id: int
    
class StatusBase(BaseModel):
    status_name: str
    order_id: int
    
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


        
