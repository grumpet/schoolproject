const express=require('express');
const path=require('path');
const app=express();
const productsRoutes=require('./routes/products')
const session = require('express-session');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'iloveexpressandwebdevelopment',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res,next)=>{
    next();
})
app.use(productsRoutes);


app.listen(3000);
