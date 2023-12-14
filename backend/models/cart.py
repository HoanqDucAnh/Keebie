from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

CartBase = declarative_base()

class Cart(CartBase):
    __tablename__ = "cart"
    
    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    product_detail_id = Column(Integer, ForeignKey("product_detail.product_detail_id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)
    quantity = Column(Integer, nullable=False, unique=True)
    
    product_detail = relationship("ProductDetail", back_populates="cart")
    customer = relationship("Customer", back_populates="cart")