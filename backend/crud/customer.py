from typing import Type
from crud.base import CRUDBase, CustomerCRUD
from schemas.customer import CustomerCreate, CustomerById, CustomerUpdate
from models.customer import Customer

class CRUDCustomer(CRUDBase[CustomerById, CustomerCreate, CustomerUpdate]):
    pass

class CRUDCustomer_Type(CustomerCRUD):
    pass

customer = CRUDCustomer(Customer)
customerInteract = CRUDCustomer_Type(Customer)