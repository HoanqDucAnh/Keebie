from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
import mysql.connector
import pymysql
import models
from models.user import User, Base



SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:4444@localhost:3306/keebie"
# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://fall2324w20g1:4444@10.110.77.167:3306/fall2324w20g1"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(bind=engine)


print(database_exists(engine.url))


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

