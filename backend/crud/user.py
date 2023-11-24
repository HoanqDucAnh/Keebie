from typing import Type
from crud.base import CRUDBase, UserCRUD
from schemas import UserByName, UserById, UserCreate, UserUpdate, UserLogin
from models import User


class CRUDUser(CRUDBase[UserById, UserCreate, UserUpdate]):
    pass

class CRUDUser_Type(UserCRUD):
    pass


user = CRUDUser(User)
userInteract = CRUDUser_Type(User)