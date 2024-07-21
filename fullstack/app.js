let express = require('express');
let app = express();
let port = 9190;


let menu = [
    {link:"/",name:"Home"},
    {link:"/category",name:"Category"},
    {link:"/products",name:"Products"}
]

let categoryRouter = require('./src/controller/categoryRouter')(menu);
let productRouter = require('./src/controller/productsRouter')(menu);

//static file path
app.use(express.static(__dirname+'/public'));
//ejs file path
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

//default Route
app.get('/',(req,res)=>{
    //res.send("<h1>hiii from express</h1>")
    res.render('index',{title:'Home Page'})
});

app.use('/category',categoryRouter);
app.use('/products',productRouter);


app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})