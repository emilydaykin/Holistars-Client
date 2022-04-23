import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
import { fetchCities } from './features/cities/citiesSlice';
import './styles/main.scss';
// import './styles/home.scss';
// import './styles/navbar.scss';

// This will make users immediately available throughout the app. Amazing innit? And would save us call to the server for single gets - especially important for the scarping stuff...
store.dispatch(fetchUsers());
store.dispatch(fetchCities());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
