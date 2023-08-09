const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

//para poder hacer peticiones al servidor
app.use(bodyParser.json());
app.use(cors());

//conection bd

const mongoURL = process.env.DATABASE;


mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, directConnection:true
  })
  .then(() => console.log('Conexión exitosa con MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));


const port = process.env.PORT;

app.listen(port, () => {
    console.log('aplicacion ejucatandose', port);
});


const rutas = require("./src/routers/routes");
app.use(rutas);
