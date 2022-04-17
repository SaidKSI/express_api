import { useState } from "react";
import "./App.css";
import H1 from "./components/H1";
import Todos from "./components/Todos";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TodosPage from "./pages/TodosPage";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import PatientList from "./pages/PatientList";
import Privateroute from "./components/privateroute";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Privateroute><Layout><TodosPage /></Layout></Privateroute> } /> 

      <Route path="/patients" element={<Privateroute><Layout><PatientList /></Layout></Privateroute>} /> 

      <Route path="/login" element={<Login />} /> 
      <Route path="*" exact element={<Navigate to="/"  />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
