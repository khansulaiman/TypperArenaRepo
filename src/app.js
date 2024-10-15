require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contestRoute = require('./routes/contestRoute');
const childrenRoutes = require('./routes/childrenRoutes');
const authMiddleware = require("./middlewares/authMiddlewares");

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: (86400 * 1000) // 24 hour (adjust as needed)
    }
}));


// Use Helmet to set security-related HTTP headers
// app.use(helmet());

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204
};

// Enable CORS with options
app.use(cors(corsOptions));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/contest',      contestRoute);
app.use('/api/leaderboard', authMiddleware, childrenRoutes);
app.use('/api/result',      authMiddleware, childrenRoutes);
app.use('/api/types',       authMiddleware, childrenRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
