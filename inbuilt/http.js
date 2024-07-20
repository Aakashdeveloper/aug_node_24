let http = require('http');

//req> what we send to server(body,params,queryParams)
//res > waht we get from server

let server = http.createServer(function(req,res){
    res.write('<h1>Hii From Nodejs Server first</h1>')
    res.end()
})

server.listen(8771)