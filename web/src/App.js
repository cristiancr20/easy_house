import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';


import RegisterUsuarioForm from './pages/RegisterUsuarioForm';
import IniciarSesion from './pages/IniciarSesion';
import Home from './pages/Home';
import Arrendador from './pages/Arrendador';
import Arrendatario from './pages/Arrendatario';

import HomeArrendador from './pages/arrendador/HomeArrendador';
import HomeArrendatario from './pages/arrendatario/HomeArrendatario';

import RegistrarArriendo from './pages/arrendador/CrearArriendoForm';
import ListarArriendos from './pages/arrendador/ListaArriendos';
import VerArriendo from './pages/arrendatario/VerArriendo';


function App() {
  return (
    <>
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar/usuarios" element={<RegisterUsuarioForm />} />
          <Route path="/iniciar/sesion" element={<IniciarSesion />} />
          <Route path="/arrendador" element={<Arrendador />}></Route>
          <Route path='/arrendatario' element={<Arrendatario />}></Route>

          {/*Rutas de arrendador*/}
          <Route path="/home/arrendador" element={<HomeArrendador />} />
          <Route path="/registrar/arriendo" element = {<RegistrarArriendo/>} />
          <Route path="/listar/arriendos" element = {<ListarArriendos/>} />

          {/*Rutas de arrendatario*/}
          <Route path='/home' element={<HomeArrendatario />}></Route>
          <Route path='/arriendos/:arriendoId' element={<VerArriendo />}></Route>

          <Route path='*' element="Error 404"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;


