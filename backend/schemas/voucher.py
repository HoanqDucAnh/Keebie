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
    admin_id: int
    
class VoucherCustomerBase(BaseModel):
    voucher_id: int
    customer_id: int
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

class VoucherByAdminId(VoucherBase):
    admin_id: int
    
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
        
class VoucherCustomerByCustomerId(VoucherCustomerBase):
    customer_id: int
    
    class Config:
        from_attributes = True
        
class VoucherCustomerByVoucherId(VoucherCustomerBase):
    voucher_id: int
    
    class Config:
        from_attributes = True
        
# voucher = VoucherBase()
# voucher_create = VoucherCreate()
# voucher_update = VoucherUpdate()
# voucher_customer = VoucherCustomerBase()
# voucher_customer_create = VoucherCustomerCreate()
# voucher_customer_update = VoucherCustomerUpdate()
# voucher_by_admin_id = VoucherByAdminId()
# voucher_by_voucher_name = VoucherByVoucherName()
# voucher_by_code = VoucherByCode()
# voucher_customer_by_customer_id = VoucherCustomerByCustomerId()
# voucher_customer_by_voucher_id = VoucherCustomerByVoucherId()

