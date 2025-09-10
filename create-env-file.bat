@echo off
echo Creating proper .env file...

cd Backend\new_sih_2k25-main

echo MONGODB_URI=mongodb+srv://singhraunakkumar524_db_user:elvtFtIWJ3C8HokB@cluster0.hdn34vz.mongodb.net/farmer_registration?retryWrites=true^&w=majority > .env
echo JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_12345 >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo FRONTEND_URL=http://localhost:4200 >> .env

echo.
echo .env file created successfully!
echo.
echo Contents of .env file:
type .env
echo.
echo Starting server...
node server.js

pause
