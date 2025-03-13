const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const reviewRoutes = require('./routes/reviewRoutes')

dotenv.config()

const app = express()

// Basic middleware
app.use(cors({
    origin: 'https://client-review-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Database connection middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({ 
            error: 'Database connection failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Routes
app.use('/api/reviews', reviewRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000

// Always listen for connections
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app; // Export for serverless use
