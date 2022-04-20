import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Cities from './components/Cities';
import SingleCity from './components/SingleCity';
import AddNewCity from './components/AddNewCity';
import CreateHoliday from './components/CreateHoliday';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/destinations' element={<Cities />} />
        <Route path='/destinations/:id' element={<SingleCity />} />
        <Route path='/create-holiday/' element={<CreateHoliday />} />
        <Route path='/add-new-city-TEMP' element={<AddNewCity />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
