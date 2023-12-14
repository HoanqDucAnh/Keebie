from pydantic import BaseModel
from datetime import *

class SaleBase(BaseModel):
    sale_id: int
    admin_id: int
    created_at: datetime
    updated_at: datetime
    sale_name: str
    started_at: datetime
    ended_at: datetime
    sale_limit: int
    
class SaleDetailBase(BaseModel):
    sale_detail_id: int
    sale_id: int
    product_detail_id: int
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

class SaleByAdminId(SaleBase):
    admin_id: int
    
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
        
class SaleDetailByProductDetailId(SaleDetailBase):
    product_detail_id: int
    
    class Config:
        from_attributes = True
        
class SaleDetailByIsPercentage(SaleDetailBase):
    is_percentage: bool
    
    class Config:
        from_attributes = True

# sale = SaleBase()
# sale_create = SaleCreate()
# sale_update = SaleUpdate()
# sale_detail = SaleDetailBase()
# sale_detail_create = SaleDetailCreate()
# sale_detail_update = SaleDetailUpdate()
# sale_by_id = SaleById()
# sale_detail_by_id = SaleDetailById()
# sale_by_admin_id = SaleByAdminId()
# sale_by_sale_name = SaleBySaleName()
# sale_detail_by_sale_id = SaleDetailBySaleId()
# sale_detail_by_product_detail_id = SaleDetailByProductDetailId()
# sale_detail_by_is_percentage = SaleDetailByIsPercentage()

