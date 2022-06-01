import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending.js';

function Index() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" exact element={Home} />
                <Route path="/profil" exact element={Profil} />
                <Route path="/trending" exact element={Trending} />
                <Navigate to="/" />
            </Routes>
        </Router>
    </div>
  );
}

export default Index