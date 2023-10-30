from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(16), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(32), nullable=False)
    # created_at = Column(String(45), nullable=False)
    # updated_at = Column(String(45), nullable=False)
    profile_pic = Column(String(45), nullable=False)
    activated = Column(Boolean, nullable=False)
    phone_number = Column(String(12), nullable=False, unique=True)

    admins = relationship('Admin', back_populates='user')
    customers = relationship('Customer', back_populates='user')


class Admin(Base):
    __tablename__ = 'admin'

    admin_id = Column(Integer, primary_key=True, autoincrement=True)
    admin_name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    
    user = relationship('User', back_populates='admins')

class Customer(Base):
    __tablename__ = 'customer'

    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(32), nullable=False)
    last_name = Column(String(32), nullable=False)
    # created_at = Column(String(45), nullable=False)
    # updated_at = Column(String(45), nullable=False)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    user = relationship('User', back_populates='customers')