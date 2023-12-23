from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base


class Voucher(Base):
    __tablename__ = "voucher"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    voucher_name = Column(String(255), nullable=False, unique=True)
    voucher_code = Column(String(255), nullable=False, unique=True)
    is_percentage = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default= None)
    voucher_discount = Column(Integer, nullable=False, unique=True)
    voucher_expired_date = Column(DateTime(timezone=True), nullable=False)
    voucher_status = Column(Boolean, nullable=False)
    discount_limit = Column(Integer, nullable=False, unique=True)
    discount_left = Column(Integer, nullable=False, unique=True)
    admin_id = Column(Integer, ForeignKey("admin.id"), nullable=False)
    
    voucher_customer = relationship("VoucherCustomer", back_populates="voucher")
    
class VoucherCustomer(Base):
    __tablename__ = "voucher_customer"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    voucher_id = Column(Integer, ForeignKey("voucher.id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customer.id"), nullable=False)
    used_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    
    voucher = relationship("Voucher", back_populates="voucher_customer")
    customer = relationship("Customer", back_populates="voucher_customer")