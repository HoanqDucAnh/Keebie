from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text, LargeBinary, Float, UniqueConstraint
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
    product_image = Column(String(225), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())
    updated_at = Column(DateTime(timezone=True), default= None)
    # admin_id = Column(Integer, ForeignKey('admin.admin_id'), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False, index=True)
    content = Column(Text, default=None, nullable=True)

    # admin = relationship('Admin', back_populates='products')
    category = relationship('Category', back_populates='product')
    product_detail = relationship('ProductDetail', back_populates='product')

class ProductDetail(BaseProduct):
    __tablename__ = 'product_detail'

    pdetail_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    pdetail_name = Column(String(255), nullable=False)
    pdetail_image = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())
    updated_at = Column(DateTime(timezone=True), default= None)
    pdetail_price = Column(Float, nullable=False)
    pdetail_instock = Column(Integer, nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'), nullable=False, index=True)
    is_public = Column(Boolean, nullable=False, default=0)
    published_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())

    product = relationship('Product', back_populates='product_detail')




    
