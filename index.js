require('dotenv').config()
const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');

//
const Routes = require('./routes')
const connectDB = require('./config/dbConfig');

// initialized express
const app = express();
const PORT = process.env.PORT || 3000;

// connect to Db
connectDB();

// setup middleware
app.use(cors());
app.use(express.json());
app.use('/api',Routes);


// server listen 
app.listen(PORT,(err) =>{
    console.log(`SERVER RUNNING ON ${PORT}`);
});