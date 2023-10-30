# Pydantic model

from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    username: str
    # created_at: str
    # updated_at: str
    profile_pic: str
    activated: bool
    phone_number: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True

class AdminBase(BaseModel):
    admin_name: str
    user_id: int

class AdminCreate(AdminBase):
    password: str

class Admin(AdminBase):
    admin_id: str
    
    class Config:
        orm_mode = True

class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    # created_at: str 
    # updated_at: str  
    user_id: int

class CustomerCreate(CustomerBase):
    password: str

class Customer(CustomerBase):
    customer_id: int
    
    class Config:
        orm_mode = True

    

