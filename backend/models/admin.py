from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database.database import Base

class Admin(Base):
    __tablename__ = 'admin'

    admin_id = Column(Integer, primary_key=True, autoincrement=True)
    admin_name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    
    user = relationship('User', back_populates='admins')