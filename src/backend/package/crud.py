from sqlalchemy.orm import Session

from . import models, schemas

#read a single user
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    email = user.email
    password = user.password
    username = user.username
    phone_number = user.phone_number
    activated = user.activated
    profile_pic = user.profile_pic
    # updated_at = user.updated_at
    # created_at = user.created_at
    db_user = models.User(email = email, username = username, profile_pic = profile_pic, activated = activated, phone_number = phone_number, password = password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()