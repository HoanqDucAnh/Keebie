from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base

# from .base import Base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(16), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(32), nullable=False)
    created_at = Column(String(45), nullable=False)
    updated_at = Column(String(45), nullable=False)
    profile_pic = Column(String(45), nullable=False)
    activated = Column(Boolean, nullable=False)
    phone_number = Column(String(12), nullable=False, unique=True)
    fullname = Column(String(12), nullable=False, unique=False)
    # role = Column(String(12), nullable=False, unique=True, default="customer")
    # admins = relationship('Admin', back_populates='user')
    # customers = relationship('Customer', back_populates='user')


