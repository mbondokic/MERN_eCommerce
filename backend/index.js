const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const {errorHandler} = require('./middleware/errorMiddleware');

// Connection
const port = process.env.PORT || 4000;
connectDB();

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// API calls and resource sharing
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
})