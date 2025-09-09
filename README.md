# Frontend-Backend Integration Guide

This document explains how the Angular frontend has been integrated with the Node.js backend for the SIH 2K25 Dashboard project.

## 🏗️ Architecture Overview

- **Frontend**: Angular 20.2.0 (Dashboard folder)
- **Backend**: Node.js with Express (Backend/new_sih_2k25-main folder)
- **Database**: MongoDB
- **Authentication**: JWT tokens

## 📁 Project Structure

```
Dashboard_SIH_2K25/
├── Backend/
│   └── new_sih_2k25-main/
│       ├── server.js              # Main server file
│       ├── routes/authRoutes.js   # Authentication routes
│       ├── models/User.js         # User model
│       ├── middleware/authMiddleware.js
│       └── package.json
├── Dashboard/
│   └── src/
│       ├── app/
│       │   ├── services/
│       │   │   ├── api.service.ts     # HTTP API service
│       │   │   └── auth.service.ts    # Authentication service
│       │   ├── auth/
│       │   │   ├── login/login.ts     # Updated login component
│       │   │   └── register/register.ts # Updated register component
│       │   └── ...
│       └── environments/
│           ├── environment.ts         # Development config
│           └── environment.prod.ts    # Production config
├── start-dev.bat                     # Windows startup script
├── start-dev.sh                      # Linux/Mac startup script
└── INTEGRATION_README.md             # This file
```

## 🔧 Integration Details

### 1. Services Created

#### ApiService (`Dashboard/src/app/services/api.service.ts`)
- Handles all HTTP communication with the backend
- Provides methods for login, register, profile, and user management
- Includes error handling and token management
- Uses Angular HttpClient for API calls

#### AuthService (`Dashboard/src/app/services/auth.service.ts`)
- Manages authentication state
- Provides login/register methods
- Handles token storage and user session
- Includes navigation helpers

### 2. Components Updated

#### Login Component (`Dashboard/src/app/auth/login/login.ts`)
- Integrated with AuthService
- Added loading states and error handling
- Automatic navigation to dashboard on successful login

#### Register Component (`Dashboard/src/app/auth/register/register.ts`)
- Integrated with AuthService
- Added loading states and error handling
- Automatic navigation to dashboard on successful registration

### 3. Environment Configuration

#### Development (`Dashboard/src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  backendUrl: 'http://localhost:5000'
};
```

#### Production (`Dashboard/src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api-url.com/api',
  backendUrl: 'https://your-production-api-url.com'
};
```

## 🚀 How to Run

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd Backend/new_sih_2k25-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/farmer_registration
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:4200
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Quick Start (Both Servers)
Use the provided startup scripts:

**Windows:**
```bash
start-dev.bat
```

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

## 🔗 API Endpoints

The backend provides the following endpoints:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get current user profile (protected)
- `GET /api/users` - Get all users (protected)

## 🔐 Authentication Flow

1. User submits login/register form
2. Frontend sends request to backend API
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Subsequent requests include token in Authorization header
6. Backend validates token for protected routes

## 🛠️ Key Features

### Error Handling
- Comprehensive error handling in both services
- User-friendly error messages
- Network error detection

### Loading States
- Loading indicators during API calls
- Disabled forms during submission

### Form Validation
- Client-side validation with Angular reactive forms
- Server-side validation with proper error messages

### Token Management
- Automatic token storage and retrieval
- Token expiration handling
- Secure logout functionality

## 🔧 Configuration

### CORS Configuration
The backend is configured to accept requests from `http://localhost:4200` in development.

### Database Connection
Ensure MongoDB is running and accessible at the URI specified in your `.env` file.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check CORS configuration in server.js

2. **Connection Refused**
   - Verify backend server is running
   - Check if port 5000 is available

3. **Authentication Errors**
   - Verify JWT_SECRET is set in .env
   - Check token expiration (default: 1 hour)

4. **Database Connection**
   - Ensure MongoDB is running
   - Verify MONGODB_URI in .env file

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your backend .env file.

## 📝 Next Steps

1. **Add Route Guards**: Implement Angular route guards for protected pages
2. **Add Interceptors**: Create HTTP interceptors for automatic token handling
3. **Add User Profile**: Implement user profile management
4. **Add Logout**: Implement logout functionality in header component
5. **Add Error Pages**: Create custom error pages for better UX

## 🤝 Contributing

When making changes:
1. Test both frontend and backend integration
2. Update this README if needed
3. Ensure environment variables are properly configured
4. Test error scenarios

## 📞 Support

For issues or questions about the integration, check:
1. Console logs in browser developer tools
2. Backend server logs
3. Network tab in browser for API calls
4. MongoDB connection status
