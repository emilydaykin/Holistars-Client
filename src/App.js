import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feed from './components/Feed';
import About from './components/About';
import Cities from './components/Cities';
import SingleCity from './components/SingleCity';
import AddNewCity from './components/AddNewCity';
import CreateHoliday from './components/CreateHoliday';
import Profile from './components/Profile';
import Users from './features/users/pages/Users';
import SingleUser from './features/users/pages/SingleUser';
import Register from './features/users/pages/Register';
import Login from './features/users/pages/Login';
import AddReview from './features/reviews/pages/AddReview';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/about' element={<About />} />
        <Route path='/destinations' element={<Cities />} />
        <Route path='/destinations/:id' element={<SingleCity />} />
        <Route path='/create-holiday/' element={<CreateHoliday />} />
        <Route path='/add-new-city-TEMP' element={<AddNewCity />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<SingleUser />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/review/:cityId' element={<AddReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
