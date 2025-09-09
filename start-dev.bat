@echo off
echo Starting Development Environment...
echo.

echo Starting Backend Server...
cd Backend\new_sih_2k25-main
start "Backend Server" cmd /k "npm start"
cd ..\..

echo.
echo Starting Frontend Development Server...
cd Dashboard
start "Frontend Server" cmd /k "npm start"
cd ..

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4200
echo.
echo Press any key to exit...
pause > nul
