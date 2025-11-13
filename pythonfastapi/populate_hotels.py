import json
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Create tables (if not already)
models.Base.metadata.create_all(bind=engine)

# Load JSON data
with open("hotels.json", "r") as f:
    hotels_data = json.load(f)

# Open DB session
db: Session = SessionLocal()

for h in hotels_data:
    hotel = models.Hotel(
        id=h["id"],
        name=h["name"],
        location=h["location"],
        price=h["price"],
        rating=h["rating"],
        imageUrl=h["imageUrl"],
        description=h["description"]
    )
    db.merge(hotel)  # merge avoids duplicate primary keys

db.commit()
db.close()

print("Hotels data populated successfully!")
