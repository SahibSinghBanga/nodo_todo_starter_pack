const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route Files
const todos = require("./routes/todoRoutes");

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use("/api/v1/todos", todos);

// Custom error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections 
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});