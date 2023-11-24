from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .base import Base

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
    # role = Column(String(12), nullable=False, unique=True, default="customer")
    # admins = relationship('Admin', back_populates='user')
    # customers = relationship('Customer', back_populates='user')


