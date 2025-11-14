# utils.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
import os
from passlib.context import CryptContext
# 
from database import SessionLocal
from models import Admin


load_dotenv()
SECRET_KEY = os.environ.get("JWT_SECRET_KEY")

# SECRET_KEY = "your_secret_key_here"  # replace with a secure key
EMAIL_ADDRESS = ""
EMAIL_PASSWORD = ""  # your Gmail App Password

# Generate JWT token for reset link
def generate_reset_token(user_id: int):
    payload = {"user_id": user_id, "exp": datetime.utcnow() + timedelta(hours=1)}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

# Verify JWT token
def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload.get("user_id")
    except:
        return None

# Send reset link email
def send_reset_email(to_email: str, reset_link: str):
    subject = "Password Reset Request"
    body = f"""
Hi,

Click the link below to reset your password:

{reset_link}

This link will expire in 1 hour.

If you did not request a password reset, please ignore this email.
"""
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)




# 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Truncate password to 72 chars to satisfy bcrypt
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)

    # 

def create_default_admin():
    db = SessionLocal()
    existing = db.query(Admin).filter(Admin.email == "admin@gmail.com").first()

    if not existing:
        hashed = hash_password("admin123")
        admin = Admin(
            email="admin@gmail.com",
            password=hashed,
            username="Super Admin"
        )
        db.add(admin)
        db.commit()

    db.close()

create_default_admin()





    

