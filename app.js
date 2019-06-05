//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminExports = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const expressHanderbars = require('express-handlebars');
const app = express();

app.engine('hbs', expressHanderbars({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((request, response, next) => {
    //console.log('This always run.');
    next();
});

app.use('/admin', adminExports.router);
app.use(shopRoutes);


app.use((request, response, next) => {
    response.render('404', {pageTitle: "Not Found"});
   // response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

//const server = http.createServer(app);

//server.listen(3000);
