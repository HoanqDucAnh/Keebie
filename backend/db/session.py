from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
import mysql.connector
import pymysql
import models
from models.user import User, Base
from models.product import Product, BaseProduct


# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:QuanTnaq_4321@localhost:3307/keebie"
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://fall2324w20g1:4444@10.110.77.167:3306/fall2324w20g1"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)

BaseProduct.metadata.create_all(engine)
Base.metadata.create_all(engine)


print(database_exists(engine.url))


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

