from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Order(Base):
    __tablename__ = "order"
    
    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_code = Column(String(255), nullable=False, unique=True)
    order_status_id = Column(Integer, ForeignKey("status.status_id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    order_estimated_delivery = Column(String(45), nullable=False)
    address = Column(String(255), nullable=False, unique=True)
    # customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)
    
    status = relationship("Status", back_populates="order")
    order_detail = relationship("OrderDetail", back_populates="order")
    
class Status(Base):
    __tablename__ = "status"
    
    status_id = Column(Integer, primary_key=True, autoincrement=True)
    status_name = Column(String(255), nullable=False)
    
    order = relationship("Order", back_populates="status")
    
class OrderDetail(Base):
    __tablename__ = "order_detail"
    
    order_detail_id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    # order_detail_total = Column(Integer, nullable=False)
    order_id = Column(Integer, ForeignKey("order.order_id"), nullable=False)
    
    order = relationship("Order", back_populates="order_detail")
    