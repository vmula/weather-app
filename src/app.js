const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// use express static to set the absolute path 
const staticPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// use handlebars templates we need to set hbs view engine
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

// static path is need to load styles and js from public folder
app.use(express.static(staticPath));

// app routing
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/weather', (req, res) => {
    res.render('weather');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('*', (req, res) => {
    res.render('404Error');
});

// server listener
app.listen(port, () => {
    console.log('Server is up and running');
})