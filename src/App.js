import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Cities from './components/Cities';
import SingleCity from './components/SingleCity';
import AddNewCity from './components/AddNewCity';
import CreateHoliday from './components/CreateHoliday';
import Users from './features/users/pages/Users';
import SingleUser from './features/users/pages/SingleUser';
import Register from './features/users/pages/Register';
import Login from './features/users/pages/Login';

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
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
