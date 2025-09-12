#!/bin/bash

echo "Starting Development Environment..."
echo

echo "Starting Backend Server..."
cd Backend/new_sih_2k25-main
npm start &
BACKEND_PID=$!
cd ../..

echo
echo "Starting Frontend Development Server..."
cd Dashboard
npm start &
FRONTEND_PID=$!
cd ..

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:4200"
echo
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
