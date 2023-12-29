from typing import Type
from crud.base import CRUDBase, VoucherCRUD, VoucherCustomerCRUD
from schemas.voucher import VoucherById, VoucherCreate, VoucherUpdate, VoucherCustomerCreate, VoucherCustomerUpdate, VoucherCustomerById, VoucherCustomerByUserId, VoucherCustomerByVoucherId
from models.voucher import Voucher, VoucherCustomer

class CRUDVoucher(CRUDBase[VoucherById, VoucherCreate, VoucherUpdate]):
    pass

class CRUDVoucher_Type(VoucherCRUD):
    pass

class CRUDVoucherCustomer(CRUDBase[VoucherCustomerById, VoucherCustomerCreate, VoucherCustomerUpdate]):
    pass

class CRUDVoucherCustomer_Type(VoucherCustomerCRUD):
    pass

voucher = CRUDVoucher(Voucher)
voucherInteract = CRUDVoucher_Type(Voucher)
voucher_customer = CRUDVoucherCustomer(VoucherCustomer)
voucher_customerInteract = CRUDVoucherCustomer_Type(VoucherCustomer)
