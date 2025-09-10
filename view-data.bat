@echo off
echo ========================================
echo    VIEW YOUR APP DATA
echo ========================================
echo.

echo 1. Backend Server Status:
echo    - Backend should be running on port 5000
echo    - Check: http://localhost:5000/
echo.

echo 2. View All User Data:
echo    - API Endpoint: http://localhost:5000/api/app-data
echo    - All Users: http://localhost:5000/api/admin/users
echo.

echo 3. Frontend Dashboard:
echo    - Analytics: http://localhost:4200/pages/analytics
echo    - Users: http://localhost:4200/pages/users
echo.

echo 4. Test Registration:
echo    - Register: http://localhost:4200/auth/register
echo    - Login: http://localhost:4200/auth/login
echo.

echo ========================================
echo    QUICK TEST
echo ========================================
echo.

echo Testing backend connection...
curl -s http://localhost:5000/ || echo "Backend not running - start it with: cd Backend/new_sih_2k25-main && node server.js"

echo.
echo Testing API data...
curl -s http://localhost:5000/api/app-data || echo "API not responding"

echo.
echo ========================================
echo    NEXT STEPS
echo ========================================
echo.
echo 1. Make sure backend is running: cd Backend/new_sih_2k25-main && node server.js
echo 2. Make sure frontend is running: cd Dashboard && ng serve
echo 3. Register a user at: http://localhost:4200/auth/register
echo 4. View data at: http://localhost:5000/api/app-data
echo.

pause

