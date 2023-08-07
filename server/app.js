const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Para poder hacer peticiones al servidor
app.use(bodyParser.json());
app.use(cors());

// Connection to MongoDB
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/easyhouse";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa con MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Aplicación ejecutándose en el puerto:", port);
});

const rutas = require("./src/routers/routes");
app.use(rutas);
