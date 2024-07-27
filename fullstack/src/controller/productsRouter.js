let express = require('express');
let productRouter = express.Router();
let {getData} = require('./dbController')

function router(menu){
    productRouter.route('/')
    .get(async(req,res) => {
        let query = {};
        let product = await getData('products',query)
        res.render('products',{title:'Products Page',Products:product,menu})
    })

    productRouter.route('/list/:id')
        .get(async(req,res) => {
            let id = req.params.id;
            let query = {"category_id":Number(id)}
            let product = await getData('products',query)
            res.render('products',{title:'Products Page',Products:product,menu})
        })

    productRouter.route('/details')
    .get((req,res) => {
        res.send('Details of product')
    })

    return productRouter
}


module.exports = router;