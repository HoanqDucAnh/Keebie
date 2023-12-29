from pydantic import BaseModel
from datetime import *

class VoucherBase(BaseModel):
    voucher_name: str
    voucher_code: str
    is_percentage: bool
    created_at: datetime
    updated_at: datetime
    voucher_discount: int
    voucher_expired_date: datetime
    voucher_status: bool
    discount_limit: int
    discount_left: int
    user_id: int
    
class VoucherCustomerBase(BaseModel):
    voucher_id: int
    user_id: int
    used_at: datetime
    
class VoucherById(VoucherBase):
    id: int
    
    class Config:
        from_attributes = True
        
class VoucherCreate(VoucherBase):
    pass

class VoucherCustomerById(VoucherCustomerBase):
    id: int
    
    class Config:
        from_attributes = True
        
class VoucherCustomerCreate(VoucherCustomerBase):
    pass

class VoucherUpdate:
    pass

class VoucherCustomerUpdate:
    pass

class VoucherByUserId(VoucherBase):
    user_id: int
    
    class Config:
        from_attributes = True
        
class VoucherByVoucherName(VoucherBase):
    voucher_name: str
    
    class Config:
        from_attributes = True
        
class VoucherByCode(VoucherBase):
    voucher_code: str
    
    class Config:
        from_attributes = True
        
class VoucherCustomerByUserId(VoucherCustomerBase):
    user_id: int
    
    class Config:
        from_attributes = True
        
class VoucherCustomerByVoucherId(VoucherCustomerBase):
    voucher_id: int
    
    class Config:
        from_attributes = True


