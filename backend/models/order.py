from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .user import Base


class Order(Base):
    __tablename__ = "order"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    payment_image = Column(String(800), nullable=True)
    payment_method = Column(String(255), nullable=False)
    shipment_method = Column(String(255), nullable=False)
    note = Column(String(800), nullable=True)
    address = Column(String(255), nullable=False)
    phone_number = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    total_price = Column(Float, nullable=False)  
    status_id = Column(Integer, ForeignKey("status.id"), nullable=False)
    status = relationship("Status", back_populates="order")
    order_detail = relationship("OrderDetail", back_populates="order", cascade="all, delete-orphan", single_parent=True)
    user = relationship("User", back_populates="order")
    
class Status(Base):
    __tablename__ = "status"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    status_name = Column(String(255), nullable=False, default="Pending", unique=True)
    
    order = relationship("Order", back_populates="status")
    
class OrderDetail(Base):
    __tablename__ = "order_detail"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Integer, nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    
    order = relationship("Order", back_populates="order_detail")
    product = relationship("Product", back_populates="order_detail")
    