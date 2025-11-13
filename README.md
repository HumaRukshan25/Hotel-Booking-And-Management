# Hotel-Booking-And-Management
Backend:  FastAPI (Python),  SQLAlchemy (ORM),  MySQL / SQLite (Database),  Pydantic (Data validation),  CORS Middleware  Frontend:  React (Vite),  Axios (API calls),  React Router (Navigation),  CSS (Styling)

Admin login is    
email: "admin@gmail.com",
password: "admin123"
------------------------------------------------------------------------------------------------------------------------------------------------------->
 **Windows setup for FastAPI backend**
 
1. Install Python
<<<<<<< HEAD
 Download & install Python 3.x /3.14
=======
Download & install Python 3.x /3.14
>>>>>>> 47f9fce (my 2nd commit)
  ✅ Check Add Python to PATH  environment variable

3. Verify installation
python --version

4. Create project folder
mkdir pythonfastapi

5. cd pythonfastapi

6. Create & activate virtual environment
python -m venv venv

venv\Scripts\activate

7. Install dependencies
pip install fastapi uvicorn pydantic sqlalchemy python-multipart requests

8. Run FastAPI server
uvicorn main:app --reload
* `main` = your Python file (`main.py`)
* `app` = FastAPI instance inside `main.py`
* `--reload` = auto-reload on changes
   do this to populate the json data  hotels.json  python populate_hotels.py

9. Access API in browser 
http://127.0.0.1:8000/users/
http://127.0.0.1:8000/hotels/
http://127.0.0.1:8000/bookings/

Users
GET /users/ → Get all users
GET /users/{id} → Get user by ID
POST /users/ → Create a new user
PUT /users/{id} → Update an existing user
DELETE /users/{id} → Delete a user

Hotels
GET /hotels/ → Get all hotels
GET /hotels/{id} → Get hotel by ID
POST /hotels/ → Add a new hotel
PUT /hotels/{id} → Update hotel details
DELETE /hotels/{id} → Delete a hotel

Bookings
GET /bookings/ → Get all bookings
GET /bookings/{id} → Get booking by ID
POST /bookings/ → Create a new booking
PUT /bookings/{id} → Update a booking
DELETE /bookings/{id} → Cancel a booking


10. test api using Postman or Swagger
   * postman app
   * Access Swagger UI Open a browser and go to:
     
http://127.0.0.1:8000/docs
------------------------------------------------------------------------------------------------------------------------------------------------------->

 **Windows setup for ReactJS and Vite frontend**

 1. Create a React Vite project
  npm create vite@latest ReactjsAts
Choose React
Choose JavaScript

 3. Navigate to the project folder
   cd learningreact

 5. Install dependencies
      npm install
    
 7. Install dependencies
    npm install react-router-dom axios
    
 9. Run development server
    npm run dev
    
Browser: http://localhost:5173/

   






