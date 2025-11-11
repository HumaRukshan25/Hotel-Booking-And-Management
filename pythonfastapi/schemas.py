from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ============== USER =================

class UserCreate(BaseModel):
    username: str
    email: str
    password: str  # <- Add password field

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    password: str

    model_config = {
        "from_attributes": True  # instead of orm_mode=True
    }
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None   # admin can update password also

    class Config:
        orm_mode = True

class HotelCreate(BaseModel):
    name: str
    location: str
    price: str
    rating: str
    imageUrl: str
    description: str  # ✅ NEW FIELD


class HotelResponse(HotelCreate):
    id: int
    class Config:
        from_attributes = True


class BookingCreate(BaseModel):
    user_id: int
    hotel_id: int
    check_in: datetime
    check_out: datetime
    status: str = "booked"

class BookingResponse(BookingCreate):
    id: int
    class Config:
        from_attributes = True
