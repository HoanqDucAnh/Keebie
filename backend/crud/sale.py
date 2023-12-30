from typing import Type
from crud.base import CRUDBase, SaleCRUD, SaleDetailCRUD
from schemas.sale import SaleCreate, SaleById, SaleUpdate, SaleBySaleName
from schemas.sale import SaleDetailById, SaleDetailUpdate, SaleDetailCreate, SaleDetailBySaleId, SaleDetailByProductId, SaleDetailByIsPercentage
from models.sale import Sale, SaleDetail

class CRUDSale(CRUDBase[SaleById, SaleCreate, SaleUpdate]):
    pass

class CRUDSale_Type(SaleCRUD):
    pass

class CRUDSaleDetail(CRUDBase[SaleDetailById, SaleDetailCreate, SaleDetailUpdate]):
    pass

class CRUDSaleDetail_Type(SaleDetailCRUD):
    pass

sale = CRUDSale(Sale)
saleInteract = CRUDSale_Type(Sale)
sale_detail = CRUDSaleDetail(SaleDetail)
sale_detailInteract = CRUDSaleDetail_Type(SaleDetail)