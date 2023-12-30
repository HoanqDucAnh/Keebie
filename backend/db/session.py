from dotenv import load_dotenv
import os
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

username = os.getenv("MYSQL_USER")
password = os.getenv("MYSQL_PASSWORD")
host = os.getenv("MYSQL_SERVICE_HOST")
port = os.getenv("MYSQL_SERVICE_PORT")
database = os.getenv("MYSQL_DATABASE")

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)
print(database_exists(engine.url))


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

