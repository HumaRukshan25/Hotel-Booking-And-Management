# crud.py
from sqlalchemy.orm import Session
from models import User

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def save_reset_token(db: Session, user: User, token: str):
    user.reset_token = token
    db.commit()

def update_password(db: Session, user: User, new_password: str):
    user.password = new_password
    user.reset_token = None
    db.commit()
