import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./componentes/Home/Home";
import Form from "./componentes/Form/Form";
import Garage from "./componentes/Garage/Garage";
import Maps from "./componentes/maps/maps";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />   
        <Route path="/home" element={<Home />} /> 
        <Route path="/garage" element={<Garage />} /> 
        <Route path="/maps" element={<Maps />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
