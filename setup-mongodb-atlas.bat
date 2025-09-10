@echo off
echo Setting up MongoDB Atlas connection...
echo.

cd Backend\new_sih_2k25-main

echo Creating .env file with MongoDB Atlas connection...
echo # Database Configuration - MongoDB Atlas > .env
echo MONGODB_URI=mongodb+srv://singhraunakkumar524_db_user:elvtFtIWJ3C8HokB@cluster0.hdn34vz.mongodb.net/farmer_registration?retryWrites=true^&w=majority >> .env
echo. >> .env
echo # JWT Configuration >> .env
echo JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_12345 >> .env
echo. >> .env
echo # Server Configuration >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo. >> .env
echo # Frontend Configuration >> .env
echo FRONTEND_URL=http://localhost:4200 >> .env

echo.
echo .env file created successfully!
echo.
echo Starting backend server with MongoDB Atlas...
node server.js

pause
