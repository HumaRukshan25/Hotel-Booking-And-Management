# test_email_fixed.py
from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Load environment variables
load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def test_email():
    print("🧪 Testing email configuration...")
    print(f"EMAIL_ADDRESS: {EMAIL_ADDRESS}")
    print(f"EMAIL_PASSWORD: {'✅ Set' if EMAIL_PASSWORD else '❌ Missing'}")
    
    if not all([EMAIL_ADDRESS, EMAIL_PASSWORD]):
        print("❌ Email credentials missing from .env file")
        return False

    print(f"📧 Attempting to send test email to: {EMAIL_ADDRESS}")
    
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Subject"] = "Test Email from Hotel Booking System"
        msg.attach(MIMEText("This is a test email from your application.", "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        
        print("✅ Test email sent successfully!")
        print("📩 Check your inbox at hrukshan135@gmail.com")
        return True
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Authentication failed: {e}")
        print("💡 Check your Gmail app password")
        return False
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")
        return False

if __name__ == "__main__":
    test_email()