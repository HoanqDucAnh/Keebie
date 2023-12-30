from pydantic import BaseModel
from datetime import *

class VerifyBase(BaseModel):
    verify_code: str
    user_id: int
    
class VerifyById(VerifyBase):
    id: int
    created_at: datetime
    expired_at: datetime
    
    class Config:
        from_attributes = True
        
class VerifyCreate(VerifyBase):
    pass

class VerifyUpdate:
    pass

class VerifyByUserId(VerifyBase):
    user_id: int
    
    class Config:
        from_attributes = True
        
class VerifyByCode(VerifyBase):
    verify_code: str
    
    class Config:
        from_attributes = True
        
