from typing import Type
from crud.base import CRUDBase, ProductCRUD, ProductDetailCRUD
from schemas import ProductById, ProductCreate, ProductUpdate, CategoryById, CategoryCreate, CategoryUpdate, ProductDetailsById, ProductDetailsCreate, ProductDetailsUpdate
from models import Product, Category, Product, ProductDetail


class CRUDProduct(CRUDBase[ProductById, ProductCreate, ProductUpdate]):
    pass

class CRUDProduct_Type(ProductCRUD):
    pass

class CRUDCategory(CRUDBase[CategoryById, CategoryCreate, CategoryUpdate]):
    pass

class CRUDProduct_details(CRUDBase[ProductDetailsById, ProductDetailsCreate, ProductDetailsUpdate]):
    pass

class CRUDProduct_details_Type(ProductDetailCRUD):
    pass

product = CRUDProduct(Product)
productInteract = CRUDProduct_Type(Product)
product_details = CRUDProduct_details(ProductDetail)
product_detailsInteract = CRUDProduct_details_Type(ProductDetail)
category = CRUDCategory(Category)
categoryInteract = CRUDCategory(Category)