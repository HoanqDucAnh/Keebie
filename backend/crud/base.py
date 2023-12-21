from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Base, User, Product, Category
from models.order import Order, OrderDetail, Status
from models.sale import Sale, SaleDetail
from models.voucher import Voucher, VoucherCustomer
from models.cart import Cart
from models.customer import Customer
from models.review import Review
from models import Base, User, Product, Category, ProductImage, ProductOption, Option
import models
from schemas import user

ModelType = TypeVar("ModelType", bound=Base)
UserType = TypeVar("UserType", bound=User)
ProductType = TypeVar("ProductType", bound=Product)
CategoryType = TypeVar("CategoryType", bound=Category)
OrderType = TypeVar("OrderType", bound=Order)
OrderDetailType = TypeVar("OrderDetailType", bound=OrderDetail)
StatusType = TypeVar("StatusType", bound=Status)
SaleType = TypeVar("SaleType", bound=Sale)
SaleDetailType = TypeVar("SaleDetailType", bound=SaleDetail)
VoucherType = TypeVar("VoucherType", bound=Voucher)
VoucherCustomerType = TypeVar("VoucherCustomerType", bound=VoucherCustomer)
CartType = TypeVar("CartType", bound=Cart)
CustomerType = TypeVar("CustomerType", bound=Customer)
ReviewType = TypeVar("ReviewType", bound=Review)
OptionType = TypeVar("OptionType", bound=Option)
ProductOptionType = TypeVar("ProductOptionType", bound=ProductOption)

CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)
ProductImageType = TypeVar("ProductImageType", bound=ProductImage)




class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id== id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def get_all(self, db: Session) -> List[ModelType]:
        return db.query(self.model).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in, exclude_none=True)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, obj: ModelType) -> bool:
        db.delete(obj)
        db.commit()
        return True

class UserCRUD:
    def __init__(self, model: Type[UserType]):
        self.model = model
    def get_by_username(self, db: Session, username: str) -> Optional[UserType]:
        return db.query(self.model).filter(self.model.username == username).first()
    def get_by_phone_number(self, db: Session, phone_number: str) -> Optional[UserType]:
        return db.query(self.model).filter(self.model.phone_number == phone_number).first()
    def get_by_email(self, db: Session, email: str) -> Optional[UserType]:
        return db.query(self.model).filter(self.model.email == email).first()
    def list_all_user(self, db: Session) -> List[UserType]:
        return db.query(self.model).all()
    
class ProductCRUD:
    def __init__(self, model: Type[ProductType]):
        self.model = model
    def get_by_name(self, db: Session, product_name: str) -> Optional[ProductType]:
        return db.query(self.model).filter(self.model.product_name == product_name).first()
    def list_by_category(self, db: Session, category_id: int) -> List[ProductType]:
        return db.query(self.model).filter(self.model.category_id == category_id).all()
    def list_all_product(self, db: Session) -> List[ProductType]:
        return db.query(self.model).all()
    
class CategoryCRUD:
    def __init__(self, model: Type[CategoryType]):
        self.model = model
    def get_by_name(self, db: Session, cat_name: str) -> Optional[CategoryType]:
        return db.query(self.model).filter(self.model.cat_name == cat_name).first()
    def list_all_category(self, db: Session) -> List[CategoryType]:
        return db.query(self.model).all()

class ProductImageCRUD:
    def __init__(self, model: Type[ProductImageType]):
        self.model = model
    def get_by_product_id(self, db: Session, product_id: int) -> Optional[ProductImageType]:
        return db.query(self.model).filter(self.model.product_id == product_id).first()
    def list_all_product_image(self, db: Session) -> List[ProductImageType]:
        return db.query(self.model).all()
    def list_by_product(self, db: Session, product_id: int) -> List[ProductImageType]:
        return db.query(self.model).filter(self.model.product_id == product_id).all()
class OrderCRUD:
    def __init__(self, model: Type[OrderType]):
        self.model = model
    def get_by_customer(self, db: Session, customer_id: int) -> List[OrderType]:
        return db.query(self.model).filter(self.model.customer_id == customer_id).all()
    def get_by_status(self, db: Session, status_id: int) -> List[OrderType]:
        return db.query(self.model).filter(self.model.order_status_id == status_id).all()
    
class OrderDetailCRUD:
    def __init__(self, model: Type[OrderDetailType]):
        self.model = model
    def get_by_order(self, db: Session, order_id: int) -> List[OrderDetailType]:
        return db.query(self.model).filter(self.model.order_id == order_id).all()
    def get_by_product_detail(self, db: Session, product_detail_id: int) -> List[OrderDetailType]:
        return db.query(self.model).filter(self.model.product_detail_id == product_detail_id).all()
    
    
class StatusCRUD:
    def __init__(self, model: Type[StatusType]):
        self.model = model
    def get_by_name(self, db: Session, status_name: str) -> Optional[StatusType]:
        return db.query(self.model).filter(self.model.status_name == status_name).first()
    
class SaleCRUD:
    def __init__(self, model: Type[SaleType]):
        self.model = model
    def get_by_admin(self, db: Session, admin_id: int) -> List[SaleType]:
        return db.query(self.model).filter(self.model.admin_id == admin_id).all()
    def get_by_name(self, db: Session, sale_name: str) -> Optional[SaleType]:
        return db.query(self.model).filter(self.model.sale_name == sale_name).first()
    
class SaleDetailCRUD:
    def __init__(self, model: Type[SaleDetailType]):
        self.model = model
    def get_by_sale(self, db: Session, sale_id: int) -> List[SaleDetailType]:
        return db.query(self.model).filter(self.model.sale_id == sale_id).all()
    def get_by_product_detail(self, db: Session, product_detail_id: int) -> List[SaleDetailType]:
        return db.query(self.model).filter(self.model.product_detail_id == product_detail_id).all()
    def get_by_is_percent(self, db: Session, is_percent: bool) -> List[SaleDetailType]:
        return db.query(self.model).filter(self.model.is_percentage == is_percent).all()
    
class VoucherCRUD:
    def __init__(self, model: Type[VoucherType]):
        self.model = model
    def get_by_name(self, db: Session, voucher_name: str) -> Optional[VoucherType]:
        return db.query(self.model).filter(self.model.voucher_name == voucher_name).first()
    def get_by_code(self, db: Session, voucher_code: str) -> Optional[VoucherType]:
        return db.query(self.model).filter(self.model.voucher_code == voucher_code).first()
    
class VoucherCustomerCRUD:
    def __init__(self, model: Type[VoucherCustomerType]):
        self.model = model
    def get_by_customer(self, db: Session, customer_id: int) -> List[VoucherCustomerType]:
        return db.query(self.model).filter(self.model.voucher_customer_id == customer_id).all()
    def get_by_voucher(self, db: Session, voucher_id: int) -> List[VoucherCustomerType]:
        return db.query(self.model).filter(self.model.voucher_id == voucher_id).all()
    
class CartCRUD:
    def __init__(self, model: Type[CartType]):
        self.model = model
    def get_by_customer(self, db: Session, customer_id: int) -> List[CartType]:
        return db.query(self.model).filter(self.model.customer_id == customer_id).all()
    def get_by_product_detail(self, db: Session, product_detail_id: int) -> List[CartType]:
        return db.query(self.model).filter(self.model.product_detail_id == product_detail_id).all()
    
    def get_by_pdetail_and_customer(self, db: Session, product_detail_id: int, customer_id: int) -> Optional[CartType]:
        return db.query(self.model).filter(self.model.product_detail_id == product_detail_id, self.model.customer_id == customer_id).first()
    
class CustomerCRUD:
    def __init__(self, model: Type[CustomerType]):
        self.model = model
    def get_by_user(self, db: Session, user_id: int) -> Optional[CustomerType]:
        return db.query(self.model).filter(self.model.user_id == user_id).first()
    
class ReviewCRUD:
    def __init__(self, model: Type[ReviewType]):
        self.model = model
    def get_by_customer(self, db: Session, customer_id: int) -> List[ReviewType]:
        return db.query(self.model).filter(self.model.customer_id == customer_id).all()
    def get_by_product_detail(self, db: Session, product_detail_id: int) -> List[ReviewType]:
        return db.query(self.model).filter(self.model.product_detail_id == product_detail_id).all()
    
class OptionCRUD:
    def __init__(self, model: Type[OptionType]):
        self.model = model
    def get_by_name(self, db: Session, option_name: str) -> Optional[OptionType]:
        return db.query(self.model).filter(self.model.option_name == option_name).first()
    
class ProductOptionCRUD:
    def __init__(self, model: Type[ProductOptionType]):
        self.model = model
    def get_by_product(self, db: Session, product_id: int) -> List[ProductOptionType]:
        return db.query(self.model).filter(self.model.product_id == product_id).all()
    def get_by_option(self, db: Session, option_id: int) -> List[ProductOptionType]:
        return db.query(self.model).filter(self.model.option_id == option_id).all()
    def get_by_product_and_option(self, db: Session, product_id: int, option_id: int) -> Optional[ProductOptionType]:
        return db.query(self.model).filter(self.model.product_id == product_id, self.model.option_id == option_id).first()
    
    

