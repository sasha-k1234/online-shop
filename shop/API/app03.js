const express = require("express");
const app = express();
{
//get
//post
//put
//delete

// app.get("/", (_, response)=>{
//     response.send("<h1>API!</h1>");
// });

// app.get("/about", (_, response)=>{
//     response.send("<h1>About!</h1>");
// });
// app.get("/about/info", (_, response)=>{
//     // response.send("<h1>About! // info </h1>");
//     // response.redirect(".");
//     response.redirect(301, "/about");
// });
// app.get("/google", (_, response)=>{
//     response.redirect("https://www.google.com");
// });
}
let tokenStorage = [];

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

app.use((req,res,next)=>{
    
    let paths = ['/home','/about','/contact','/','/Authentication','/login'];
    if (paths.includes(req.path)) {
        next();
    }
    else{
        res.status(404).send('Not Found')
    }
})

app.use((req,res,next)=>{

    if ( req.session?.token && !tokenStorage.includes(req.query.token)&&req.path!=='/Authentication') {
        res.redirect('/Authentication');
    }
    else{
        req.session = {token: req.query.token};
        next();
    }
})



app.get('/login',(_,res)=>{
    const token = {token:uuidv4()};
    tokenStorage.push(token.token);
    res.send(token);
})

app.get('/Authentication',(_,res)=>{
    res.send('<h1>Invalid Token</h1>');
})

app.get('/home',(_,res)=>{
    res.send('<h1>HOme</h1>');
})

app.get('/about',(_,res)=>{
    res.send('<h1>About</h1>')
});

app.get('/contact',(_,res)=>{
    res.send('<h1>Contact</h1>')
})

app.get('/',(req,res)=>{
    res.redirect(`/home?token=${req.session.token}`);
})



//query
// app.get("/", (req, resp)=>{
//     resp.send(`<h1>Main</h1>\npar1 = ${req.query.par1}`);



    //req.body
// })
app.listen(3005);