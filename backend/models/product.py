from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, LargeBinary, Float, UniqueConstraint, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
# from .base import Base

BaseProduct = declarative_base()

class Category(BaseProduct):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    cat_name = Column(String(255), nullable=False)
    cat_detail = Column(String(255), default=None, nullable=True)

    __table_args__ = (
        UniqueConstraint('id', name='unique_id'),
    )
    product = relationship("Product", back_populates="category")

class Product(BaseProduct):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    product_name = Column(String(255), nullable=False)
    product_image_id = Column(Integer, ForeignKey('product_image.id'), nullable=True, index=True)
    brand = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())
    updated_at = Column(DateTime(timezone=True), default= None) 
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False, index=True)
    content = Column(Text, default=None, nullable=True)
    open_at = Column(DateTime(timezone=True), nullable=True)
    close_at = Column(DateTime(timezone=True), nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)
    category = relationship('Category', back_populates='product')
    product_image = relationship("ProductImage", back_populates="product")

class ProductImage(BaseProduct):
    __tablename__ = 'product_image'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    image = Column(LargeBinary(length=(2**32)-1), nullable=False)
    product = relationship("Product", back_populates="product_image")


class Option(BaseProduct):
    __tablename__ = 'option'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False, index=True)
    category_type = Column(String(255), nullable=False)
    option_name = Column(String(255), nullable=False)
    
class ProductOption(BaseProduct):
    __tablename__ = 'product_option'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'), nullable=False, index=True)
    option_id = Column(Integer, ForeignKey('product_option.id'), nullable=False, index=True)
    adđition_price = Column(Float, nullable=False)
    
    product = relationship('Product', back_populates='product_option')
    option = relationship('Option', back_populates='product_option')




    
