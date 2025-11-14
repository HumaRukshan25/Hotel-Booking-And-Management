from fastapi import FastAPI, Depends, HTTPException, Body

from sqlalchemy.orm import Session
import models, schemas
from database import Base, engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

# 
from fastapi import BackgroundTasks
from pydantic import BaseModel
from models import User, Admin
from utils import generate_reset_token, send_reset_email, verify_reset_token
from crud import get_user_by_email, save_reset_token, update_password

from utils import verify_password
from utils import hash_password
from schemas import UserCreate, UserResponse, UserUpdate, UserLogin
from schemas import AdminLogin



Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# ======================================================
# USERS CRUD
# ======================================================


# @app.post("/users/", response_model=schemas.UserResponse)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     new_user = models.User(
#         username=user.username,
#         email=user.email,
#         password=user.password  # store plain text password
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user

@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user




@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(user_id: int, data: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.username:
        user.username = data.username
    if data.email:
        user.email = data.email
    # if data.password:
    #     user.password = data.password  # if hashing required, apply hash function here
    if data.password:
        user.password = hash_password(data.password)  # HASH HERE


    db.commit()
    db.refresh(user)
    return user


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}


# ======================================================
# HOTELS CRUD
# ======================================================

@app.post("/hotels/", response_model=schemas.HotelResponse)
def add_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    new_hotel = models.Hotel(**hotel.dict())
    db.add(new_hotel)
    db.commit()
    db.refresh(new_hotel)
    return new_hotel


@app.get("/hotels/", response_model=list[schemas.HotelResponse])
def get_hotels(db: Session = Depends(get_db)):
    return db.query(models.Hotel).all()


@app.get("/hotels/{hotel_id}", response_model=schemas.HotelResponse)
def get_hotel_by_id(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel


@app.put("/hotels/{hotel_id}", response_model=schemas.HotelResponse)
def update_hotel(hotel_id: int, data: schemas.HotelCreate, db: Session = Depends(get_db)):
    hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    for key, value in data.dict().items():
        setattr(hotel, key, value)

    db.commit()
    db.refresh(hotel)
    return hotel


@app.delete("/hotels/{hotel_id}")
def delete_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    db.delete(hotel)
    db.commit()
    return {"message": "Hotel deleted successfully"}


# ======================================================
# CART ITEMS CRUD
# ======================================================
# ======================================================
# BOOK HOTELS CRUD (instead of cart items)
# ======================================================

@app.post("/bookings/", response_model=schemas.BookingResponse)
def book_hotel(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    """
    User books a hotel.
    booking data should include: user_id, hotel_id, check_in, check_out, status (optional)
    """
    new_booking = models.Booking(**booking.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@app.get("/bookings/", response_model=list[schemas.BookingResponse])
def get_all_bookings(db: Session = Depends(get_db)):
    """
    Admin can view all bookings
    """
    return db.query(models.Booking).all()


@app.get("/bookings/user/{user_id}", response_model=list[schemas.BookingResponse])
def get_user_bookings(user_id: int, db: Session = Depends(get_db)):
    """
    Get bookings for a specific user
    """
    return db.query(models.Booking).filter(models.Booking.user_id == user_id).all()


@app.get("/bookings/{booking_id}", response_model=schemas.BookingResponse)
def get_booking_by_id(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@app.put("/bookings/{booking_id}", response_model=schemas.BookingResponse)
def update_booking(booking_id: int, data: schemas.BookingCreate, db: Session = Depends(get_db)):
    """
    Update booking details (dates, status)
    """
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    for key, value in data.dict().items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking


@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted successfully"}



@app.post("/users/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"message": "Login successful", "user": {"id": db_user.id, "username": db_user.username}}

@app.post("/admin/login")
def admin_login(data: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == data.email).first()

    if not admin:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(data.password, admin.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"message": "Login successful"}










# Pydantic request models
class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    password: str

# Endpoint to send reset link
@app.post("/users/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, request.email)
    
    # Always respond success for security
    if not user:
        return {"success": True, "message": "If this email exists, a reset link has been sent."}

    token = generate_reset_token(user.id)
    save_reset_token(db, user, token)
    reset_link = f"http://localhost:5173/reset-password/{token}"

    background_tasks.add_task(send_reset_email, user.email, reset_link)

    return {"success": True, "message": "If this email exists, a reset link has been sent."}

# Endpoint to reset password
@app.post("/users/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    user_id = verify_reset_token(request.token)
    if not user_id:
        return {"success": False, "message": "Invalid or expired token"}

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"success": False, "message": "User not found"}

    update_password(db, user, request.password)
    return {"success": True, "message": "Password updated successfully"}
