from pydantic import BaseModel
from datetime import *

class CartBase(BaseModel):
    product_detail_id: int
    customer_id: int
    quantity: int
    
class CartById(CartBase):
    id: int
    
    class Config:
        from_attributes = True
        
class CartCreate(CartBase):
    pass

class CartUpdate:
    pass

class CartDelete:
    pass

class CartByCustomerId(CartBase):
    customer_id: int
    
    class Config:
        from_attributes = True
        
class CartByProductDetailId(CartBase):
    product_detail_id: int
    
    class Config:
        from_attributes = True
        
# cart = CartBase()
# cart_create = CartCreate()
# cart_update = CartUpdate()
# cart_delete = CartDelete()
# cart_by_customer_id = CartByCustomerId()
# cart_by_product_detail_id = CartByProductDetailId()
