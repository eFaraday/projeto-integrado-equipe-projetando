# Sign Up Feature - Testing Guide

## Overview
A new sign-up page has been created that allows users to register and their credentials are saved to the SQLite database. Users can then log in with their registered credentials.

## What Was Created

### 1. Sign Up Page (`/vite-project/src/pages/signup/`)
- **Signup.jsx**: React component with form validation
  - Username field
  - Email field (with email validation)
  - Password field (minimum 6 characters)
  - Confirm password field
  - Error and success message display
  - Auto-login after successful registration
  - Link to login page for existing users

- **Signup.css**: Styling matching the existing login page design
  - Responsive design
  - Smooth transitions and hover effects
  - Error and success message styling

### 2. Updated Files
- **App.jsx**: Added `/signup` route as a public route
- **Login.jsx**: Added "Cadastre-se" (Sign up) link for new users

## How It Works

### Registration Flow:
1. User navigates to `/signup`
2. Fills in username, email, password, and confirms password
3. Form validates:
   - All fields are required
   - Passwords must match
   - Password must be at least 6 characters
   - Email must be valid format
4. On submit, data is sent to backend API `/api/auth/register`
5. Backend creates user in SQLite database with hashed password
6. User is automatically logged in and redirected to home page

### Login Flow:
1. Registered users can log in at `/login`
2. Credentials are verified against the database
3. JWT token is generated and stored in localStorage
4. User is redirected to home page

## Database Storage

User credentials are stored in the SQLite database (`/server/database.sqlite`) with the following structure:

**Users Table:**
- `id`: Auto-incrementing primary key
- `username`: User's chosen username
- `email`: Unique email address
- `password`: Bcrypt hashed password (never stored in plain text)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Testing the Feature

### 1. Start the Backend Server
```bash
cd /home/guicarmona/projeto-integrado-equipe-projetando-1/server
npm run dev
```
Server will run on http://localhost:5000

### 2. Start the Frontend
```bash
cd /home/guicarmona/projeto-integrado-equipe-projetando-1/vite-project
npm run dev
```
Frontend will run on http://localhost:5173

### 3. Test Sign Up
1. Navigate to http://localhost:5173/signup
2. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Cadastrar"
4. You should be automatically logged in and redirected to the home page

### 4. Test Login with Registered Credentials
1. Log out (if needed)
2. Navigate to http://localhost:5173/login
3. Enter the credentials you just registered
4. Click "Entrar"
5. You should be logged in successfully

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body**: 
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "token": "jwt_token_here"
  }
  ```

### Login User
- **POST** `/api/auth/login`
- **Body**: 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "token": "jwt_token_here"
  }
  ```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt before storing in database
2. **JWT Authentication**: Secure token-based authentication
3. **Email Validation**: Email format is validated on both frontend and backend
4. **Unique Email**: Each email can only be registered once
5. **Protected Routes**: Authenticated routes require valid JWT token

## Navigation

- From Login page → Click "Cadastre-se" to go to Sign Up
- From Sign Up page → Click "Fazer login" to go to Login
- After successful registration → Auto-redirect to Home page
- After successful login → Redirect to Home page

## Troubleshooting

### "User already exists" error
- The email is already registered in the database
- Try a different email or log in with existing credentials

### "As senhas não coincidem" error
- Password and Confirm Password fields don't match
- Re-enter both passwords

### "A senha deve ter pelo menos 6 caracteres" error
- Password is too short
- Use at least 6 characters

### Backend connection error
- Make sure the backend server is running on port 5000
- Check that the database file exists at `/server/database.sqlite`

## Files Modified/Created

**Created:**
- `/vite-project/src/pages/signup/Signup.jsx`
- `/vite-project/src/pages/signup/Signup.css`

**Modified:**
- `/vite-project/src/App.jsx` (added signup route and import)
- `/vite-project/src/pages/login/Login.jsx` (added signup link)

**Backend (Already Existing):**
- `/server/controllers/authController.js` (registerUser function)
- `/server/routes/authRoutes.js` (register endpoint)
- `/server/models/User.js` (User model with password hashing)
