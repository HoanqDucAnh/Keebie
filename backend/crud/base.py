from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Base, User, product, Product, Category
import models
from schemas import user

ModelType = TypeVar("ModelType", bound=Base)
UserType = TypeVar("UserType", bound=User)
ProductType = TypeVar("ProductType", bound=Product)
CategoryType = TypeVar("CategoryType", bound=Category)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


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
    
class ProductCRUD:
    def __init__(self, model: Type[ProductType]):
        self.model = model
    def get_by_name(self, db: Session, product_name: str) -> Optional[ProductType]:
        return db.query(self.model).filter(self.model.product_name == product_name).first()
    def get_by_category_id(self, db: Session, id: int) -> Optional[ProductType]:
        return db.query(self.model).filter(self.model.category_id == id).first()
    
class CategoryCRUD:
    def __init__(self, model: Type[CategoryType]):
        self.model = model
    def get_by_name(self, db: Session, cat_name: str) -> Optional[CategoryType]:
        return db.query(self.model).filter(self.model.cat_name == cat_name).first()

    
    