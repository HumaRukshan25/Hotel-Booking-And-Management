# Hotel-Booking-And-Management
Backend:  FastAPI (Python)  SQLAlchemy (ORM)  MySQL / SQLite (Database)  Pydantic (Data validation)  CORS Middleware  Frontend:  React (Vite)  Axios (API calls)  React Router (Navigation)  CSS (Styling)

------------------------------------------------------------------------------------------------------------------------------------------------------->
 **Windows setup for FastAPI backend**
1. Install Python
 Download & install Python 3.x /3.14
  ✅ Check Add Python to PATH  environment variable
2. Verify installation
python --version
3. Create project folder
mkdir pythonfastapi
cd pythonfastapi
4. Create & activate virtual environment
python -m venv venv
venv\Scripts\activate
5. Install dependencies
pip install fastapi uvicorn pydantic sqlalchemy python-multipart requests
6. Run FastAPI server
uvicorn main:app --reload
* `main` = your Python file (`main.py`)
* `app` = FastAPI instance inside `main.py`
* `--reload` = auto-reload on changes

7. Access API
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
------------------------------------------------------------------------------------------------------------------------------------------------------->
 **Windows setup for ReactJs and vite frontend**

 1. Create React Vite project
  npm create vite@latest ReactjsAts
Choose React
Choose JavaScript
 2. Navigate to project folder
   cd learningreact
 3. Install dependencies
      npm install
 4. Install dependencies
    npm install react-router-dom axios
 5. Run development server
    npm run dev
Browser : http://localhost:5173/

   






