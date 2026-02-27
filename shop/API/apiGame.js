const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   //   let random = Math.floor(Math.random()) * 10;
//   //   if (req.query !== random) {
//   //     res.redirect("/err");
//   //   } else {
//   //     res.redirect("/game");
//   //     next();
//   //   }
// });

let rand;
let id;
let db = [];

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

app.get("/guess_num", (_, res) => {
  id = uuidv4();
  rand = Math.floor(Math.random() * 10);
  db.push({ id: id, num: rand });
  res.send(`id:${id}`);
});
app.get("/unguess_num", (req, res) => {
  const usersChoice = req.query.usersNum;
  let userId = req.query.id;
  let user = db.find((obj) => obj.id === userId);
  // let err = db.find((obj) => obj.id !== userId);
  
  
  
  if (user === undefined) {
    res.status(401).send(`Invalid Id`);
    return;
  } else if (usersChoice == user.num) {
    res.send(`You guessed num right!`);
  } else if (usersChoice > user.num) {
    res.send(`Your num is bigger`);
  } else if (usersChoice < user.num) {
    res.send(`Your num is smaller`);
  } else if (!usersChoice || isNaN(usersChoice) || usersChoice !== user.num) {
    res.send("thats not a num !");
  }
});

app.get("/return_num", (req, res) => {
  let userId = req.query.id;
  let returnUser = db.find((obj) => obj.id === userId);
  res.send(`your num is ${returnUser.num}`);
});

app.listen(3005);
