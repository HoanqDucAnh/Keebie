from pydantic import BaseModel

class ProductBase(BaseModel):
    product_name: str
    product_image: str
    content: str
    category_id: int


class CategoryBase(BaseModel):
    cat_name: str
    cat_detail: str

class ProductDetailBase(BaseModel):
    pdetail_name: str
    pdetail_image: str
    pdetail_price: float
    pdetail_instock: int
    product_id: int
    is_public: bool

class ProductById(ProductBase):
    id: int
    
    class Config:
        from_attributes = True

class ProductCreate(ProductBase):
    pass

class ProductDetailsById(ProductDetailBase):
    id: int
    
    class Config:
        from_attributes = True

class ProductDetailsCreate(ProductDetailBase):
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

class ProductDetailsUpdate:
    pass