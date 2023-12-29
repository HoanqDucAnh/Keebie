from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

# from .base import Base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(16), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(32), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now())
    updated_at = Column(DateTime(timezone=True), default= None)
    profile_pic = Column(String(255), nullable=False)
    activated = Column(Boolean, nullable=False, default=False)
    phone_number = Column(String(12), nullable=False, unique=True)
    fullname = Column(String(12), nullable=False, unique=False)
    address = Column(String(255), nullable=False, unique=False)
    # role = Column(String(12), nullable=False, unique=True, default="customer")
    is_admin = Column(Boolean, nullable=False, default=True)
    # admins = relationship('Admin', back_populates='user')
    # customers = relationship('Customer', back_populates='user')
    order = relationship('Order', back_populates='user')


