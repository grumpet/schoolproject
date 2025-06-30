const express=require('express');
const app=express();
const productsRoutes=require('./routes/products')
const session = require('express-session');
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
