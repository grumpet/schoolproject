const express=require('express');
const app=express();
const productsRoutes=require('./routes/products')

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
app.use(productsRoutes);


app.listen(3000);
