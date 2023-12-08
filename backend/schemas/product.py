from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    product_image: str
    price: float
    description: str
    image: str
    category_id: int