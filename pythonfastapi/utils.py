# utils.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
import os
from passlib.context import CryptContext
from database import SessionLocal
from models import Admin

# Load environment variables
load_dotenv()

# Get environment variables
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "development_secret_key_change_in_production")
EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

# Validate email configuration
if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
    print("❌ Email credentials not configured in .env file")
    print("💡 Add EMAIL_ADDRESS and EMAIL_PASSWORD to your .env file")
    print("💡 Using console output mode for password reset links")

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
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Send actual reset link email
def send_reset_email(to_email: str, reset_link: str):
    # Check if email credentials are configured
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        print("=" * 60)
        print("🔐 PASSWORD RESET LINK (Email Not Configured)")
        print("=" * 60)
        print(f"📧 For user: {to_email}")
        print(f"🔗 Reset URL: {reset_link}")
        print("=" * 60)
        print("💡 Configure EMAIL_ADDRESS and EMAIL_PASSWORD in .env to send real emails")
        print("=" * 60)
        return True
    
    # Send actual email
    print(f"📧 Sending reset email to: {to_email}")
    
    subject = "Password Reset Request - Hotel Booking System"
    body = f"""
Hello,

You requested a password reset for your Hotel Booking System account.

Click the link below to reset your password:
{reset_link}

This link will expire in 1 hour.

If you didn't request this reset, please ignore this email.

Best regards,
Hotel Booking System Team
"""
    
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        # Connect to Gmail SMTP server
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Enable security
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        
        print(f"✅ Reset email successfully sent to {to_email}")
        return True
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Email authentication failed: {e}")
        print("💡 Check your Gmail app password in .env file")
        # Fallback to console output
        print(f"🔗 Reset link for {to_email}: {reset_link}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")
        # Fallback to console output
        print(f"🔗 Reset link for {to_email}: {reset_link}")
        return True

# Password hashing utilities
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)

# Create default admin
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
        print("Default admin created")

    db.close()

create_default_admin()