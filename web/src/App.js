import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterUsuarioForm from './pages/RegisterUsuarioForm';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterUsuarioForm />} />


          <Route path='*' element="Error 404"></Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
