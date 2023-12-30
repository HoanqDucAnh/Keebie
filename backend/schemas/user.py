from pydantic import BaseModel
from datetime import *

class UserBase(BaseModel):
    username: str
    email: str
    username: str
    profile_pic: str
    activated: bool
    phone_number: str
    fullname: str
    address: str
    

class UserCreate(UserBase):
    password: str

class UserById(UserBase):
    id: int
    
    class Config:
        from_attributes = True

class UserByName(UserBase):
    username: str
    
    class Config:
        from_attributes = True

class UserByRole(BaseModel):
    is_admin: bool
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate:
    pass

class UserByAddress(BaseModel):
    username: str
    address: str
    phone_number: str
    fullname: str
    id: int

class UserPassword(BaseModel):
    password: str

