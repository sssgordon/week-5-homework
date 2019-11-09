const express = require("express");
const bodyParser = require("body-parser");
const db = require("./sequelize-rest");
const app = express();

//Middleware declarations
const textPropValidatorMiddleware = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).end();
  } else next();
};

let requests = 0;
const requestCounterMiddleware = (req, res, next) => {
  if (requests >= 5) {
    res.status(429).end();
  } else {
    next();
  }
};

//Middleware
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(requestCounterMiddleware);

//CRUD
app.post("/messages", textPropValidatorMiddleware, (req, res, next) => {
  console.log(req.body.text);
  requests++;
  res.send({ message: "Message received loud and clear" });
});

//Port
const port = 3000;
app.listen(port, () => console.log(`Listening on port :${port}!`));
