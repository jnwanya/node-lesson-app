//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    //console.log('This always run.');
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

app.listen(3000);

//const server = http.createServer(app);

//server.listen(3000);
