from pydantic import BaseModel
from datetime import *

class OrderBase(BaseModel):
    address: str
    phone_number: str
    email: str
    full_name: str
    note: str
    user_id: int
    status_id: int
    total_price: float
    payment_method: str 
    shipment_method: str
    payment_image: str
    
class OrderDetailBase(BaseModel):
    amount: int
    order_id: int
    product_id: int
    
class StatusBase(BaseModel):
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


        
