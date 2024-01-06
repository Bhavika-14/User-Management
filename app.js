const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadMiddleware = require('./middlewares/uploadMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (profile images)
app.use('/uploads/profile_images', express.static('uploads/profile_images'));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
