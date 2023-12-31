from typing import Type
from crud.base import CRUDBase, VerifyCRUD
from schemas import VerifyBase, VerifyById, VerifyCreate, VerifyUpdate, VerifyByCode, VerifyByEmail
from models import Verify


class CRUDVerify(CRUDBase[VerifyById, VerifyCreate, VerifyUpdate]):
    pass

class CRUDVerify_Type(VerifyCRUD):
    pass

verify = CRUDVerify(Verify)
verifyInteract = CRUDVerify_Type(Verify)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           