const db=require('../util/database');
module.exports=class Products{
    constructor(name, code, price){
        this.name = name;
        this.code = code;
        this.price = price;
    }
    save(){
        return db.execute('INSERT INTO products (`name`, `code`, `price`) VALUES (?, ?, ?)',
            [this.name, this.code, this.price]); 
    }
}
