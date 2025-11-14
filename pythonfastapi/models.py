from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(255))
#     email = Column(String(255))
#     bookings = relationship("Booking", back_populates="user")
#     password = Column(String, nullable=False)  # <- Add password field

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(128), nullable=False)  # store bcrypt hash
    bookings = relationship("Booking", back_populates="user")

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    location = Column(String(255))
    price = Column(String(50))
    rating = Column(String(20))
    imageUrl = Column(String(500))
    description = Column(String(1000))   # ✅ NEW FIELD
    bookings = relationship("Booking", back_populates="hotel")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    check_in = Column(DateTime)
    check_out = Column(DateTime)
    status = Column(String(50), default="booked")

    user = relationship("User", back_populates="bookings")
    hotel = relationship("Hotel", back_populates="bookings")


class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(200), unique=True, index=True, nullable=False)
    password = Column(String(300), nullable=False)  # hashed password
    username = Column(String(150), nullable=True)