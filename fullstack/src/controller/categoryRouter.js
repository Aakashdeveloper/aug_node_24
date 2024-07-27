let express = require('express');
let categoryRouter = express.Router();
let {getData} = require('./dbController')


function router(menu){
    
    categoryRouter.route('/')
    .get(async (req,res) => {
        let query = {};
        let data = await getData('category',query)
        res.render('category',{title:'Category Page',category:data,menu})
    })

    categoryRouter.route('/details')
    .get((req,res) => {
        res.send('Details of category')
    })

    return categoryRouter
}




module.exports = router