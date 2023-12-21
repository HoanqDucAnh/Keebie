from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, LargeBinary, Float, UniqueConstraint, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Option(Base):
    __tablename__ = 'option'
    
    category = relationship('Category', back_populates='option')

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False, index=True, unique=True)
    category_type = Column(String(255), nullable=False)
    option_name = Column(String(255), nullable=False)
    
    
class ProductOption(Base):
    __tablename__ = 'product_option'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'), nullable=False, index=True)
    option_id = Column(Integer, ForeignKey('product_option.id'), nullable=False, index=True)
    addition_price = Column(Float, nullable=False)
    in_stock = Column(Integer, nullable=False)
    enable = Column(Boolean, nullable=False, default=True)
    
    product = relationship('Product', back_populates='product_option')
    option = relationship('Option', back_populates='product_option')