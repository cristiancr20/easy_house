import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterUsuarioForm from './pages/RegisterUsuarioForm';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registrar/usuarios" element={<RegisterUsuarioForm />} />

          <Route path='*' element="Error 404"></Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
