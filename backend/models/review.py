from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Review(Base):
    __tablename__ = "review"
    
    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_detail_id = Column(Integer, ForeignKey("product_detail.product_detail_id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("customer.customer_id"), nullable=False)
    review_content = Column(String(255), nullable=False)
    review_rating = Column(Integer, nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)
    
    product_detail = relationship("ProductDetail", back_populates="review")
    customer = relationship("Customer", back_populates="review")

