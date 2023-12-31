from pydantic import BaseModel
from datetime import *

class VerifyBase(BaseModel):
    email: str
    
class VerifyById(VerifyBase):
    id: int
    verify_code: str
    created_at: datetime
    expired_at: datetime
    
    class Config:
        from_attributes = True
        
class VerifyCreate(VerifyBase):
    pass

class VerifyRealCreate(VerifyBase):
    verify_code: str

class VerifyUpdate:
    pass

class VerifyByEmail(VerifyBase):
    email: str
    
    class Config:
        from_attributes = True
        
class VerifyByCode(VerifyBase):
    verify_code: str
    
    class Config:
        from_attributes = True
        

        
