from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Cart(Base):
    __tablename__ = "cart"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("customer.id"), nullable=False)
    quantity = Column(Integer, nullable=False, unique=True)
    
    customer = relationship("Customer", back_populates="cart")