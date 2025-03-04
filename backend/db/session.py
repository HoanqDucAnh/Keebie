from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
import mysql.connector
import pymysql
import models
from models.user import User, Base
from models.product import Base as BaseProduct
from models.order import Base as BaseOrder

load_dotenv()

username = quote_plus(os.getenv("MYSQL_USER", ""))
# username = "root"
password = quote_plus(os.getenv("MYSQL_PASSWORD", ""))
# password = "QuanTnaq_4321"
host = os.getenv("MYSQL_SERVICE_HOST")
# host = "localhost"
port = os.getenv("MYSQL_SERVICE_PORT")
# port = 3307
database = os.getenv("MYSQL_DATABASE")
# database = "keebie4"

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)
print(database_exists(engine.url))


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

try:
    session = SessionLocal()
    # Insert categories
    categoryList = ["Bàn phím cơ", "Bộ nút phím cơ", "Công tắc bàn phím", "Order"]
    for category in categoryList:
        session.add(models.product.Category(cat_name=category))
        session.commit()
        print("Insert category successfully")
    # Insert data into Status table
    statusList = ["Chưa thanh toán", "Đã thanh toán", "Đã huỷ"]
    for status in statusList:
        session.add(models.order.Status(status_name=status))
        session.commit()
    # Insert default admin account
    session.add(models.user.User(username="Admin1", email="admin@gmail.com", password="admin1", profile_pic="", activated=True, phone_number="0123456789", fullname="Admin", address="Admin", is_admin=True))
    session.commit()
    
        
except Exception as e:
    print(e)
finally:
    session.close()
    
    

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

