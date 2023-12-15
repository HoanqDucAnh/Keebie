from typing import Type
from crud.base import CRUDBase, ProductCRUD, ProductImageCRUD
from schemas import ProductById, ProductCreate, ProductUpdate, CategoryById, CategoryCreate, CategoryUpdate, ProductImageById, ProductImageCreate, ProductImageUpdate
from models import Product, Category, ProductImage


class CRUDProduct(CRUDBase[ProductById, ProductCreate, ProductUpdate]):
    pass

class CRUDProduct_Type(ProductCRUD):
    pass

class CRUDCategory(CRUDBase[CategoryById, CategoryCreate, CategoryUpdate]):
    pass

class CRUDProductImage(CRUDBase[ProductImageById, ProductImageCreate, ProductUpdate]):
    pass

class CRUDProductImage_Type(ProductImageCRUD):
    pass

product = CRUDProduct(Product)
productInteract = CRUDProduct_Type(Product)
category = CRUDCategory(Category)
categoryInteract = CRUDCategory(Category)
productImage = CRUDProductImage(ProductImage)
productImageInteract = CRUDProductImage(ProductImage)