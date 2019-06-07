/*
USING TYPESCRIPT IN NODE.JS
https://scotch.io/tutorials/setting-up-a-node-project-with-typescript
https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
ts-node-dev IS NODEMON alternative for typescript
 */
//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const dbConn = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

/*dbConn.execute('SELECT * FROM product').then((result) => {
   console.log('database result', result[0], result[1]);
}).catch(err => {
    console.log('database', err);
});*/

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
