const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const textPropValidatorMiddleware = (req, res, next) => {
  if (!req.body.text) {
    res.status(400).end();
  } else next();
};

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.post("/messages", textPropValidatorMiddleware, (req, res, next) => {
  console.log(req.body.text);
  res.send({ message: "Message received loud and clear" });
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port :${port}!`));
