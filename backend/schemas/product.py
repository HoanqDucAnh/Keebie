from pydantic import BaseModel

class ProductBase(BaseModel):
    product_name: str
    product_image: str
    content: str
    category_id: int

class ProductDetailBase(BaseModel):
    pdetail_name: str
    pdetail_image: str
    pdetail_price: float
    pdetail_instock: int
    # product_id: int
    is_public: bool