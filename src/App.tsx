import React from "react";
import "./App.css";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Table from "./pages/Table";
// contexts
import AuthProvider from "./contexts/AuthContext";
import Graph from "./pages/Graph";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Graph />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
