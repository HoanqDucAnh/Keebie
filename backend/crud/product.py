from typing import Type
from crud.base import CRUDBase, ProductCRUD
from schemas import ProductById, ProductCreate, ProductUpdate, CategoryById, CategoryCreate, CategoryUpdate
from models import Product, Category


class CRUDProduct(CRUDBase[ProductById, ProductCreate, ProductUpdate]):
    pass

class CRUDProduct_Type(ProductCRUD):
    pass

class CRUDCategory(CRUDBase[CategoryById, CategoryCreate, CategoryUpdate]):
    pass


product = CRUDProduct(Product)
productInteract = CRUDProduct_Type(ProductCRUD)
category = CRUDCategory(Category)
categoryInteract = CRUDCategory(Category)