from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session
import models, schemas
from database import Base, engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware


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


@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=user.password  # store plain text password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user



@app.get("/users/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# @app.put("/users/{user_id}", response_model=schemas.UserResponse)
# def update_user(user_id: int, data: schemas.UserCreate, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     user.username = data.username
#     user.email = data.email
#     user.password = data.password  # update plain text password
#     db.commit()
#     db.refresh(user)
#     return user

@app.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(user_id: int, data: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.username:
        user.username = data.username
    if data.email:
        user.email = data.email
    if data.password:
        user.password = data.password  # if hashing required, apply hash function here

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

