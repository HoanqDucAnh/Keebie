from typing import Type
from crud.base import CRUDBase, UserCRUD
from schemas import VerifyBase, VerifyById, VerifyCreate, VerifyUpdate, VerifyByUserId, VerifyByCode
from models import Verify


class CRUDVerify(CRUDBase[VerifyById, VerifyCreate, VerifyUpdate]):
    pass

class CRUDVerify_Type(UserCRUD):
    pass

verify = CRUDVerify(Verify)
verifyInteract = CRUDVerify_Type(Verify)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           