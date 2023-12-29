from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Sale(Base):
    __tablename__ = "sale"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    sale_name = Column(String(255), nullable=False, unique=True)
    started_at = Column(DateTime(timezone=True), nullable=False)
    ended_at = Column(DateTime(timezone=True), nullable=False)
    sale_limit = Column(Integer, nullable=False, unique=True)
    
    sale_detail = relationship("SaleDetail", back_populates="sale")
    user = relationship("User", back_populates="sale")
    
class SaleDetail(Base):
    __tablename__ = "sale_detail"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    sale_id = Column(Integer, ForeignKey("sale.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    is_percentage = Column(Boolean, nullable=False)
    discount_amount = Column(Integer, nullable=False, unique=True)
    
    product = relationship("Product", back_populates="sale_detail")
    sale = relationship("Sale", back_populates="sale_detail")
    user = relationship("User", back_populates="sale_detail")