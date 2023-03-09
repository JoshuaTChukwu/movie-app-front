import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Home/Dashboard';
import Protected from './Protected';
import WithLoginNavigate from './components/Login/Login';
import MovieList from './components/Home/Movielist';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>

                <Route path="/dashboard"  element={<Protected><Dashboard/></Protected>} />
                <Route path="/movies" element={<Protected><MovieList/></Protected>}/>
                 <Route  path='/'  element={<WithLoginNavigate navigate={useNavigate}/>} ></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
