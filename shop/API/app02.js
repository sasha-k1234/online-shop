const express = require("express");
const fs = require('fs');
const app = express();

app.use(express.static(__dirname+"/public"));
app.use((req, resp, next)=>{
    // resp.send({id:10, name:"Tom"});
    //resp.sendFile(__dirname+"/index.html");
    //resp.sendStatus(200);
    //resp.status(500).send("<h1>API!</h1>");

     next()
});

app.get('/Users',(req,res)=>{
     res.send([{name:'Tom',age:20},{name:'Bob',age:23}]);
})

app.get('/DateTime',(req,res)=>{
     res.send(Date.now());
})

app.get("/", (_, response)=>{
     response.send("<h1>API!</h1>");
});


app.listen(3005);