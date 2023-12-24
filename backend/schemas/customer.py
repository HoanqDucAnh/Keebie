from pydantic import BaseModel
from datetime import *

class CustomerBase(BaseModel):
    customer_first_name: str
    customer_last_name: str
    created_at: datetime
    updated_at: datetime
    user_id: int
    
class CustomerById(CustomerBase):
    id: int
    
    class Config:
        from_attributes = True
        
class CustomerByUserId(CustomerBase):
    user_id: int
    
    class Config:
        from_attributes = True
        
class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate:
    pass

class CustomerDelete:
    pass

# customer = CustomerBase()
# customer_create = CustomerCreate()
# customer_update = CustomerUpdate()
# customer_delete = CustomerDelete()
# customer_by_id = CustomerById()
# customer_by_user_id = CustomerByUserId()