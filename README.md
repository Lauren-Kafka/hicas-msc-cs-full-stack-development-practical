# MERN Authentication System - College Practical

A production-grade MERN (MongoDB, Express, React, Node.js) authentication system built for educational purposes.

## 📁 Project Structure

```
program1/
├── client/                 # React Frontend
│   ├── src/
│   │   └── App.jsx        # Main application component
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── validators/    # Input validation
│   ├── logs/              # Application logs
│   ├── server.js          # Entry point
│   └── package.json
│
├── docs/                   # Documentation
│   ├── SETUP.md           # Setup instructions
│   ├── API.md             # API documentation
│   └── ENV_TEMPLATE.md    # Environment variables guide
│
└── README.md              # This file
```

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Production-Grade Security**: 
  - Helmet.js for HTTP headers
  - Express Rate Limiting
  - MongoDB sanitization
  - HPP protection
  - CORS configuration
- **MVC Architecture**: Clean separation of concerns
- **Error Handling**: Centralized error handling with Winston logging
- **Input Validation**: Joi-based request validation
- **Offline Mode**: Works without MongoDB for testing
- **Modern UI**: React with Framer Motion animations and React Hot Toast

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) - Optional for offline mode
- npm or yarn

## 🔧 Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd program1

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# Server configuration
cd server
cp .env.example .env
# Edit .env with your settings (see docs/ENV_TEMPLATE.md)

# No client .env needed - uses default configuration
```

### 3. Run the Application

```bash
# Terminal 1 - Start server (from server directory)
npm run dev

# Terminal 2 - Start client (from client directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 📚 Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Environment Variables](docs/ENV_TEMPLATE.md)** - Configuration options

## 🎓 For College Practical

This project is designed for educational purposes and includes:

1. **Complete MERN Stack Implementation**
2. **Production-Ready Code Structure**
3. **Security Best Practices**
4. **Comprehensive Documentation**
5. **Offline Mode for Easy Demonstration**

### Running Without MongoDB

The server automatically runs in **offline mode** if MongoDB is not available:
- User data stored in memory
- Perfect for demonstrations
- No database setup required

### Demo Credentials

In offline mode, you can register any user. Example:
- Name: `John Doe`
- Email: `john@example.com`
- Password: `Test123!@#` (min 6 characters)

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling (via utility classes)
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express 4** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Winston** - Logging
- **Joi** - Validation
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### Health Check
- `GET /api/v1/health` - Server health status

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Minimum 6 characters validation

2. **HTTP Security**
   - Helmet.js for secure headers
   - CORS configuration
   - XSS protection
   - HPP (HTTP Parameter Pollution) protection

3. **Rate Limiting**
   - 100 requests per 15 minutes (configurable)
   - Separate limits for auth endpoints

4. **Input Validation**
   - Joi schema validation
   - MongoDB query sanitization
   - Request body size limits

## 📊 Logging

Logs are stored in `server/logs/`:
- `combined.log` - All logs
- `error.log` - Error logs only

## 🧪 Testing

```bash
# Server tests (when implemented)
cd server
npm test

# Client tests (when implemented)
cd client
npm test
```

## 📦 Building for Production

```bash
# Build client
cd client
npm run build

# The build output will be in client/dist/
# Serve with any static file server
```

## 🤝 Contributing

This is an educational project. Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for educational purposes.

## 👨‍🎓 Author

Created for college practical demonstration.

## 🙏 Acknowledgments

- Built with modern MERN stack best practices
- Follows industry-standard security guidelines
- Implements clean code architecture

---

**Note**: This project is designed for educational purposes. For production deployment, additional considerations like:
- Environment-specific configurations
- Database backups
- SSL/TLS certificates
- Load balancing
- Monitoring and alerting
- CI/CD pipelines

should be implemented.
