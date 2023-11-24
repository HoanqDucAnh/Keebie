# Pydantic model

from pydantic import BaseModel

class UserBase(BaseModel):
    password: str
    username: str
    email: str
    username: str
    created_at: str
    updated_at: str
    profile_pic: str
    activated: bool
    phone_number: str

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

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate:
    pass


