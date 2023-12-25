from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, LargeBinary, Float, UniqueConstraint, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from .user import Base

class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    cat_name = Column(String(255), nullable=False)
    cat_detail = Column(String(255), default=None, nullable=True)
# The `__table_args__` attribute is used to specify additional arguments for the table creation in
# SQLAlchemy. In this case, it is used to define a unique constraint on the `id` column of the
# `Category` table.

    __table_args__ = (
        UniqueConstraint('id', name='unique_id'),
    )
    product = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    product_name = Column(String(255), nullable=False)
    product_image_id = Column(Integer, ForeignKey('product_image.id'), nullable=True, index=True)
    brand = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())
    updated_at = Column(DateTime(timezone=True), default= func.now()) 
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False, index=True)
    content = Column(Text, default=None, nullable=True)
    open_at = Column(DateTime(timezone=True), nullable=True)
    close_at = Column(DateTime(timezone=True), nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)
    
    category = relationship('Category', back_populates='product')
    product_image = relationship("ProductImage", back_populates="product")
    sale_detail = relationship("SaleDetail", back_populates="product")
    review = relationship("Review", back_populates="product")
    order_detail = relationship("OrderDetail", back_populates="product")

class ProductImage(Base):
    __tablename__ = 'product_image'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    image = Column(LargeBinary(length=(2**32)-1), nullable=False)
    
    product = relationship("Product", back_populates="product_image")
    
# class ProductItem(Base):
    






    
