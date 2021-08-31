const express = require('express');
const app = express();
const ejs = require('ejs');
const homeRoute = require('./routers/home');
const expressLayouts = require('express-ejs-layouts');
const dotenv =require('dotenv').config();


app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(homeRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));