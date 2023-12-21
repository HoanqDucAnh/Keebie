from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Sale(Base):
    __tablename__ = "sale"
    
    sale_id = Column(Integer, primary_key=True, autoincrement=True)
    admin_id = Column(Integer, ForeignKey("admin.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    sale_name = Column(String(255), nullable=False, unique=True)
    started_at = Column(DateTime(timezone=True), nullable=False)
    ended_at = Column(DateTime(timezone=True), nullable=False)
    sale_limit = Column(Integer, nullable=False, unique=True)
    
    admin = relationship("Admin", back_populates="sale")
    
class SaleDetail(Base):
    __tablename__ = "sale_detail"
    
    sale_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    sale_id = Column(Integer, ForeignKey("sale.sale_id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    is_percentage = Column(Boolean, nullable=False)
    discount_amount = Column(Integer, nullable=False, unique=True)
    
    sale = relationship("Sale", back_populates="sale_detail")