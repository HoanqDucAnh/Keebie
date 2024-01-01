from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Base, User, Product, Category, ProductImage, Verify
from models.order import Order, OrderDetail, Status
import models, datetime
from schemas import user

ModelType = TypeVar("ModelType", bound=Base)
UserType = TypeVar("UserType", bound=User)
ProductType = TypeVar("ProductType", bound=Product)
CategoryType = TypeVar("CategoryType", bound=Category)
OrderType = TypeVar("OrderType", bound=Order)
OrderDetailType = TypeVar("OrderDetailType", bound=OrderDetail)
StatusType = TypeVar("StatusType", bound=Status)
VerifyType = TypeVar("VerifyType", bound=models.Verify)
# OptionType = TypeVar("OptionType", bound=Option)
# ProductOptionType = TypeVar("ProductOptionType", bound=ProductOption)

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
    def update_user_password(self, db: Session, id: int, password: str) -> UserType:
        user = db.query(self.model).filter(self.model.id == id).first()
        user.password = password
        db.commit()
        db.refresh(user)
        return user
    
class ProductCRUD:
    def __init__(self, model: Type[ProductType]):
        self.model = model
    def get_by_name(self, db: Session, product_name: str) -> Optional[ProductType]:
        return db.query(self.model).filter(self.model.product_name == product_name).first()
    def list_by_category(self, db: Session, category_id: int) -> List[ProductType]:
        return db.query(self.model).filter(self.model.category_id == category_id).all()
    def list_all_product(self, db: Session) -> List[ProductType]:
        return db.query(self.model).all()
    def list_by_category_name(self, db: Session, category_name: str) -> List[ProductType]:
        return db.query(self.model).join(Category).filter(Category.cat_name == category_name).all()
    def update_open_close_date(self, db: Session, id: int, open_at: datetime, close_at: datetime) -> ProductType:
        product = db.query(self.model).filter(self.model.id == id).first()
        product.open_at = open_at
        product.close_at = close_at
        db.commit()
        db.refresh(product)
        return product
    
    def update_updated_at(self, db: Session, id: int) -> ProductType:
        product = db.query(self.model).filter(self.model.id == id).first()
        product.updated_at = datetime.datetime.now()
        db.commit()
        db.refresh(product)
        return product
    
    def get_stock_by_id(self, db: Session, id: int) -> int:
        product = db.query(self.model).filter(self.model.id == id).first()
        return product.stock
    
    def update_stock_by_id(self, db: Session, id: int, stock: int) -> ProductType:
        product = db.query(self.model).filter(self.model.id == id).first()
        product.stock = stock
        db.commit()
        db.refresh(product)
        return product
    
    def get_purchase_by_id(self, db: Session, id: int) -> int:
        product = db.query(self.model).filter(self.model.id == id).first()
        return product.purchase
    
    def update_purchase_by_id(self, db: Session, id: int, purchase: int) -> ProductType:
        product = db.query(self.model).filter(self.model.id == id).first()
        product.purchase = purchase
        db.commit()
        db.refresh(product)
        return product
    
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
    def get_by_customer(self, db: Session, user_id: int) -> List[OrderType]:
        return db.query(self.model).filter(self.model.user_id == user_id).all()
    def get_by_status(self, db: Session, status_id: int) -> List[OrderType]:
        return db.query(self.model).filter(self.model.status_id == status_id).all()
    def update_status(self, db: Session, id: int, status_id: int) -> OrderType:
        order = db.query(self.model).filter(self.model.id == id).first()
        order.status_id = status_id
        db.commit()
        db.refresh(order)
        return order
    
class OrderDetailCRUD:
    def __init__(self, model: Type[OrderDetailType]):
        self.model = model
    def get_by_order(self, db: Session, order_id: int) -> List[OrderDetailType]:
        return db.query(self.model).filter(self.model.order_id == order_id).all()
    def get_by_product(self, db: Session, product_id: int) -> List[OrderDetailType]:
        return db.query(self.model).filter(self.model.product_id == product_id).all()
    
class StatusCRUD:
    def __init__(self, model: Type[StatusType]):
        self.model = model
    def get_by_name(self, db: Session, status_name: str) -> Optional[StatusType]:
        return db.query(self.model).filter(self.model.status_name == status_name).first()
    
class VerifyCRUD:
    def __init__(self, model: Type[models.Verify]):
        self.model = model
    def get_by_email(self, db: Session, email: str) -> Optional[models.Verify]:
        return db.query(self.model).filter(self.model.email == email).last()
    def get_by_code(self, db: Session, code: str) -> Optional[models.Verify]:
        return db.query(self.model).filter(self.model.verify_code == code).first()
    def update_expired_at(self, db: Session, id: int) -> Optional[models.Verify]:
        verify = db.query(self.model).filter(self.model.id == id).first()
        verify.expired_at = datetime.datetime.now() + datetime.timedelta(minutes=5)
        db.commit()
        db.refresh(verify)
        return verify
    def update_activated(self, db: Session, id: int) -> Optional[models.Verify]:
        verify = db.query(self.model).filter(self.model.id == id).first()
        verify.activated = True
        db.commit()
        db.refresh(verify)
        return verify
    
    def delete_all_expired(self, db: Session) -> bool:
        db.query(self.model).filter(self.model.expired_at < datetime.datetime.now()).delete()
        db.commit()
        return True
    
    def delete_all_by_email(self, db: Session, email: str) -> bool:
        db.query(self.model).filter(self.model.email == email).delete()
        db.commit()
        return True
    