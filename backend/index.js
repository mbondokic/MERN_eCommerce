const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConfig');
const {errorHandler} = require('./middleware/errorMiddleware');

// Connection
const port = process.env.PORT || 4000;
connectDB();

// Routes
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
})