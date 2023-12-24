from typing import Type
from crud.base import CRUDBase, OrderCRUD, OrderDetailCRUD, StatusCRUD
from schemas.order import OrderById, OrderCreate, OrderUpdate, OrderDetailById, OrderDetailCreate, OrderDetailUpdate, StatusById, StatusCreate, StatusUpdate
from models.order import Order, OrderDetail, Status

class CRUDOrder(CRUDBase[OrderById, OrderCreate, OrderUpdate]):
    pass

class CRUDOrder_Type(OrderCRUD):
    pass

class CRUDOrderDetail(CRUDBase[OrderDetailById, OrderDetailCreate, OrderDetailUpdate]):
    pass

class CRUDOrderDetail_Type(OrderDetailCRUD):
    pass

class CRUDStatus(CRUDBase[StatusById, StatusCreate, StatusUpdate]):
    pass

class CRUDStatus_Type(StatusCRUD):
    pass

order = CRUDOrder(Order)
orderInteract = CRUDOrder_Type(Order)
order_detail = CRUDOrderDetail(OrderDetail)
order_detailInteract = CRUDOrderDetail_Type(OrderDetail)
status = CRUDStatus(Status)
statusInteract = CRUDStatus_Type(Status)
