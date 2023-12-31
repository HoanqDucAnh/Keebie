from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Verify(Base):
    __tablename__ = "verify"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False, unique=True)
    verify_code = Column(String(6), nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    expired_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    activated = Column(Boolean, nullable=False, default=False)