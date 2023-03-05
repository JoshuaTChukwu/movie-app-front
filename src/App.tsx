import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
 <Route path='/'  element={<Login onLogin={function (email: string, password: string): void {
          throw new Error('Function not implemented.');
        } }/>} ></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
