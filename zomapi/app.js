import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import {dbConnect,getData} from './controller/dbcontroller';

let app = express();
dotenv.config();
let port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//heartbeat
app.get('/',(req,res) => {
    res.send('ok')
});

//get Cities
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query);
    res.status(200).send(output)
})

//get restaurants
app.get('/restaurants',async(req,res) => {
    let query = {};
    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.status(200).send(output)

})



app.listen(port,() => {
    dbConnect()
    console.log(`Running on port ${port}`)
});