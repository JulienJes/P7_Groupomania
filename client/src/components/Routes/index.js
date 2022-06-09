import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending.js';

function Index() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/profil" exact element={<Profil />} />
      <Route path="/trending" exact element={<Trending />} />
    </Routes>
  );
}

export default Index;