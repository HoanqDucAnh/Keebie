from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Order(Base):
    __tablename__ = "order"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_code = Column(String(255), nullable=False, unique=True)
    order_status_id = Column(Integer, ForeignKey("status.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    order_estimated_delivery = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    address = Column(String(255), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    status = relationship("Status", back_populates="order")
    order_detail = relationship("OrderDetail", back_populates="order")
    user = relationship("User", back_populates="order")
    
class Status(Base):
    __tablename__ = "status"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    status_name = Column(String(255), nullable=False)
    
    order = relationship("Order", back_populates="status")
    
class OrderDetail(Base):
    __tablename__ = "order_detail"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    
    order = relationship("Order", back_populates="order_detail")
    product = relationship("Product", back_populates="order_detail")
    