# crud.py (FINAL VERSION)
from sqlalchemy.orm import Session
from models import User
from utils import hash_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def save_reset_token(db: Session, user: User, token: str):
    user.reset_token = token
    db.commit()

def update_password(db: Session, user: User, new_plain_password: str):
    # Hash the plain text password before storing
    hashed_password = hash_password(new_plain_password)
    user.password = hashed_password
    user.reset_token = None
    db.commit()