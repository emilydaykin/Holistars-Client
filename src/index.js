import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
import { fetchCities } from './features/cities/citiesSlice';
import './styles/main.scss';

// This will make users immediately available throughout the app. Amazing innit? And would save us call to the server for single gets - especially important for the scraping stuff...
store.dispatch(fetchUsers());
store.dispatch(fetchCities());

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
