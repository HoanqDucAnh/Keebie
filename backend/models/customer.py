from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Customer(Base):
    __tablename__ = "customer"
    
    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_first_name = Column(String(255), nullable=False)
    customer_last_name = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    user = relationship("User", back_populates="customer")