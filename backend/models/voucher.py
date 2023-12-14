from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Voucher(Base):
    __tablename__ = "voucher"
    
    voucher_id = Column(Integer, primary_key=True, autoincrement=True)
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
    admin_id = Column(Integer, ForeignKey("admin.admin_id"), nullable=False)
    
class VoucherCustomer(Base):
    __tablename__ = "voucher_customer"
    
    voucher_customer_id = Column(Integer, primary_key=True, autoincrement=True)
    voucher_id = Column(Integer, ForeignKey("voucher.voucher_id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)
    used_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    
    voucher = relationship("Voucher", back_populates="voucher_using")
    customer = relationship("Customer", back_populates="voucher_customer")