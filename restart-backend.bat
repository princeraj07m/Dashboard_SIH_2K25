@echo off
echo Stopping any existing Node.js processes...
taskkill /f /im node.exe 2>nul

echo.
echo Starting Backend Server...
cd Backend\new_sih_2k25-main
echo Current directory: %CD%
echo.
echo Starting Node.js server with updated model...
node server.js
