const http = require("http");
const port = 3002;
const server = http.createServer((req,res)=>{
    console.log("request received",req.url);
    if(req.url === "/posts" && req.method === "GET"){
        res.write("posts request received");
    }else if(req.url === "/users" && req.method === "GET"){
        res.write("users request received");
    }else{
        res.write("invalid request received");
    }

    res.end();
});
server.listen(port);
