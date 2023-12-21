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
    product_image_id: int

class CategoryBase(BaseModel):
    cat_name: str
    cat_detail: str

class ProductImageBase(BaseModel):
    image: bytes

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

class OptionBase(BaseModel):
    category_id: int
    category_type: str
    option_name: str
    in_stock: int
    
class OptionById(OptionBase):
    id: int
    
    class Config:
        from_attributes = True
        
class OptionCreate(OptionBase):
    pass

class OptionUpdate:
    pass

class ProductOptionBase(BaseModel):
    product_id: int
    option_id: int
    addition_price: float
    
class ProductOptionById(ProductOptionBase):
    id: int
    
    class Config:
        from_attributes = True
        
class ProductOptionCreate(ProductOptionBase):
    pass

class ProductOptionUpdate:
    pass




