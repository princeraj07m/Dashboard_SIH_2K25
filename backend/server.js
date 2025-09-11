const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;


// CORS configuration - fully open
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Handle preflight requests
app.options('*', cors());

// Debug middleware for CORS
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.use(express.json({ limit: '1mb' }));

// Simple healthcheck for uptime checks and debugging
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development', time: new Date().toISOString() });
});

// Routes
app.use('/api', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Farmer Registration API is running!' });
});

// Serve Angular app in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'frontend', 'dist', 'Dashboard', 'browser');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// MongoDB connection
// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set. JWT operations may fail. Set JWT_SECRET in .env');
}
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not set. Set MONGODB_URI in .env');
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = app;