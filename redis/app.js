import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
let port = 9122
let app = express();

let client = createClient({
    host:'localhost',
    port:6379
})

client.on('error', err => console.log(`Redis client error`,err));

app.get('/data',async(req,res) => {
    await client.connect();
    let userInput = req.query.country.trim();
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    // checking in redis
    let result = await client.get(userInput)
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        let apiResponse = await axios.get(url);
        let output = apiResponse.data;
        await client.set(userInput,JSON.stringify({source:'Redis Cache',output}),{EX:5000,NX:true})
        res.send({source:'Api Response',output})
    }

    await client.disconnect()
} )


app.listen(port,() => {
    console.log(`Running on port ${port}`)
})