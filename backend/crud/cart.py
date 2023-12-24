from typing import Type
from crud.base import CRUDBase, CartCRUD
from schemas.cart import CartCreate, CartById, CartUpdate
from models.cart import Cart

class CRUDCart(CRUDBase[CartById, CartCreate, CartUpdate]):
    pass

class CRUDCart_Type(CartCRUD):
    pass

cart = CRUDCart(Cart)
cartInteract = CRUDCart_Type(Cart)
