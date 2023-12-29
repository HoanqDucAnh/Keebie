from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ProductBase(BaseModel):
    product_name: str
    brand: str
    content: Optional[str]
    price: float
    stock: int
    category_id: int



class CategoryBase(BaseModel):
    cat_name: str
    cat_detail: str

class ProductImageBase(BaseModel):
    image: bytes
    product_id: int

class ProductImageById(ProductImageBase):
    id: int
    
    class Config:
        from_attributes = True

class ProductImageUpdate:
    pass

class ProductImageCreate(ProductImageBase):
    pass

class ProductById(ProductBase):
    id: int
    
    class Config:
        from_attributes = True

class ProductCreate(ProductBase):
    pass

class CategoryById(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate:
    pass

class ProductUpdate:
    pass

class ProductByHeaderImage(ProductById):
    header_image: bytes
    
    class Config:
        from_attributes = True