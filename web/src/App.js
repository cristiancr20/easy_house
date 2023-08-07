import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterUsuarioForm from './pages/RegisterUsuarioForm';
import IniciarSesion from './pages/IniciarSesion';
import Home from './pages/Home';
import Arrendador from './pages/Arrendador';
import Arrendatario from './pages/Arrendatario';

import RegistrarArriendosForm from './pages/CrearArriendoForm';
import ListarArriendo from './pages/Listar';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registrar/usuarios" element={<RegisterUsuarioForm />} />
          <Route path="/iniciar/sesion" element={<IniciarSesion />} />
          <Route path ="/arrendador" element={<Arrendador/>}></Route>
          <Route path='/arrendatario' element={<Arrendatario/>}></Route>

          <Route path='/obtener/arriendo' element = {<ListarArriendo/>}/>
          <Route path="/registrar/arriendo" element={<RegistrarArriendosForm/>} />
          

          <Route path='*' element="Error 404"></Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
