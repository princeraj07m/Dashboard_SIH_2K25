@echo off
echo Fixing MongoDB Atlas connection...
echo.

cd Backend\new_sih_2k25-main

echo Creating proper .env file...
(
echo MONGODB_URI=mongodb+srv://singhraunakkumar524_db_user:elvtFtIWJ3C8HokB@cluster0.hdn34vz.mongodb.net/farmer_registration?retryWrites=true^&w=majority
echo JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_12345
echo PORT=5000
echo NODE_ENV=development
echo FRONTEND_URL=http://localhost:4200
) > .env

echo.
echo .env file created successfully!
echo.
echo IMPORTANT: Make sure you have created the database user in MongoDB Atlas:
echo 1. Go to https://cloud.mongodb.com
echo 2. Click "Database Access"
echo 3. Add user: singhraunakkumar524_db_user
echo 4. Password: elvtFtIWJ3C8HokB
echo 5. Set privileges to "Atlas admin"
echo.
echo Starting server...
node server.js

pause
