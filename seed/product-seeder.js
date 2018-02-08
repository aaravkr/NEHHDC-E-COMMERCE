var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop');

var products =[
    new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'learn',
    description:'hardwork',
    price:10
}),
    
     new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'here will be the title',
    description:'this is the description part',
    price:20
}),
    
     new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'here will be the title',
    description:'this is the description part',
    price:30
}),
    
     new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'here will be the title',
    description:'this is the description part',
    price:40
}),
     new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'here will be the title',
    description:'this is the description part',
    price:50
}),
     new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'here will be the title',
    description:'this is the description part',
    price:60
}),
];

var done=0;

for(var i=0;i<products.length;i++){
    products[i].save(()=>{
        done++;
        if(done === products.length){
            exit();
        }
        
    }, (err) =>{
        console.log('error in product seeding');
    });
}

function exit(){
 mongoose.disconnect();   
}
