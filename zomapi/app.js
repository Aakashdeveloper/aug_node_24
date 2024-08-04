import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import { ObjectId } from 'mongodb';
import {dbConnect,getData,getDataSort,
    getDataSortLimit,postData, updateData,
    deleteData} from './controller/dbcontroller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

let app = express();
dotenv.config();
let port = process.env.PORT;
let key = process.env.key
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json())
app.use(express.json())

//heartbeat
app.get('/',(req,res) => {
    res.send('ok')
});

//get Cities
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let authKey = req.headers['x-auth-token']
    if(authKey == key){
        let output = await getData(collection,query);
        res.status(200).send(output)
    }else{
        res.status(401).send(`Unauthorised`)
    }
    
})

//get restaurants
app.get('/restaurants',async(req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId)
    if(stateId){
        query = {
            "state_id":stateId
        }
    }

    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.status(200).send(output)

})


//get meal type
app.get('/mealType',async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query);
    res.status(200).send(output)
})


//filters
app.get('/filters/:mealId',async(req,res) => {
    let query = {};
    let collection = "restaurants";
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let hcost = Number(req.query.hcost)
    let lcost = Number(req.query.lcost)
    let sort = {cost:1}
    let skip = 0;
    let limit = 10000000000000000;

    if(req.query.sort){
        sort={cost:req.query.sort}
    }

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }


    if(cuisineId){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(hcost && lcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else{
        query={
            "mealTypes.mealtype_id":mealId
        }
    }

    let output = await getDataSortLimit(collection,query,sort,skip,limit)
    res.status(200).send(output)

})


//restaurant details
app.get('/details/:id',async(req,res) => {
     //query = {restaurant_id:Number(req.params.id)}
    let query = {};
    let collection = 'restaurants';
    const validObjId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/
        return idPattern.test(id)
    }
    if(validObjId(req.params.id)){
        query = {_id:new ObjectId(req.params.id)}
        let output = await getData(collection,query);
        res.status(200).send(output)
    }else{
        res.send("Invalid Object Id")
    }
})


// Menu
app.get('/menu/:id',async(req,res) => {
   let collection = 'menu';
   let query = {restaurant_id:Number(req.params.id)};
   let output = await getData(collection,query);
   res.status(200).send(output)
})


//menu Details {"id":[1,2,3]}
app.post('/menuDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}}
        let collection = 'menu';
        let output = await getData(collection,query);
        res.status(200).send(output)
    }else{
        res.send(`Please pass data in format of {"id:[1,2,3]}`)
    }
})

//get Orders
app.get('/orders',async(req,res) => {
    let query = {};
    let collection = 'orders';
    if(req.query.email){
        query = {email:req.query.email}
    }
    let output = await getData(collection,query);
    res.status(200).send(output)
})


//place Orders
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(data)
    let collection = 'orders';
    let output = await postData(collection,data);
    res.status(200).send(`Order Placed ${output}`)
})



// update order
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {_id:new ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data);
    res.status(200).send(output)
 })
 
// delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {_id:new ObjectId(req.body._id)}
    let row = await getData(collection,condition)
    if(row.length > 0){
        await deleteData(collection,condition)
        res.status(200).send('Data Deleted')
    }else{
        res.status(200).send('No Record Found')
    }
   
 
 })
 



app.listen(port,() => {
    dbConnect()
    console.log(`Running on port ${port}`)
});