from typing import Type
from crud.base import CRUDBase, OptionCRUD, ProductOptionCRUD
from schemas import OptionBase, OptionCreate, OptionUpdate, OptionById, ProductOptionBase, ProductOptionCreate, ProductOptionUpdate, ProductOptionById
from models import Option, ProductOption

class CRUDOption(CRUDBase[OptionById, OptionCreate, OptionUpdate]):
    pass

class CRUDOption_Type(OptionCRUD):
    pass

class CRUDProductOption(CRUDBase[ProductOptionById, ProductOptionCreate, ProductOptionUpdate]):
    pass

class CRUDProductOption_Type(ProductOptionCRUD):
    pass

option = CRUDOption(Option)
optionInteract = CRUDOption_Type(Option)
product_option = CRUDProductOption(ProductOption)
product_optionInteract = CRUDProductOption_Type(ProductOption)
