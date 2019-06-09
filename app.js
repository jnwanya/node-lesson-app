/*
USING TYPESCRIPT IN NODE.JS
https://scotch.io/tutorials/setting-up-a-node-project-with-typescript
https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
ts-node-dev IS NODEMON alternative for typescript
https://www.npmjs.com/package/sequelize-typescript for ORM
 */
//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const sequilize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
    User.findByPk(1).then(user => {
        request.user = user;
        next();
    }).catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
let currentUser;
sequilize
    //.sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
    }).then(user => {
        if(!user) {
            console.log('NO USER FOUND');
            return User.create({name: 'Justin', email: 'nwanyajustin@gmail.com'});
        }
        return user;
    }).then(user => {
        currentUser = user;
        return user.getCart();
   }).then(cart => {
     console.log('CART', cart);
      if(!cart) {
        console.log('NO CART FOUND');
        currentUser.createCart();
     }
      app.listen(3000);
    }).catch(err => {
     console.log('sequelize error', err);
   })



//const server = http.createServer(app);

//server.listen(3000);
