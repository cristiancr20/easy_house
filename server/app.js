const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();


//para poder hacer peticiones al servidor
app.use(bodyParser.json());
app.use(cors());

//conection bd
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log("aplicacion ejucatandose", port);
});

const rutas = require("./src/routers/routes");
app.use(rutas);
