const express = require("express");
const fs = require("fs");
const app = express();

// app.get("/hello", (_, response)=>{
//     response.send("<h1>Hello API!</h1>");
// });

// app.get("/About",(_,res)=>{
//     res.send('<h1>About Page</h1>');
// });

// app.get("/Contact",(_,res)=>{
//     res.send("Contact Page");
// });

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  fs.appendFile("node.txt", Date.now() + "\n", (err) => console.log(err));
  next();
});

app.get("/", (_, response) => {
  response.send("<h1>API!</h1>");
});

app.listen(3005);
