import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TruckEdit from './pages/TruckEdit';
import DefaultLayout from './layouts/DefaultLayout';
import CadastrarCaminhao from './pages/TruckCreate';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/truck-edit/:id" element={<TruckEdit />} />
          <Route path="/truck-create" element={<CadastrarCaminhao />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default Router;
