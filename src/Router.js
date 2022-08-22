import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Reserve from './pages/Reserve/Reserve';
import Search from './pages/Search/Search';
import Support from './pages/Support/Support';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
