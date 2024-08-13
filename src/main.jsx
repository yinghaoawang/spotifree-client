import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/Error';
import Root from './Root';
import Home from './routes/Home';
import RegisterPage from './routes/Register';
import LoginPage from './routes/Login';
import Search from './routes/Search';
import SearchRaw from './routes/SearchRaw';
import { PlayerProvider } from './contexts/PlayerContext';
import { SongProvider } from './contexts/SongContext';
import { UserProvider } from './contexts/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'search_raw',
        element: <SearchRaw />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <PlayerProvider>
        <SongProvider>
          <RouterProvider router={router} />
        </SongProvider>
      </PlayerProvider>
    </UserProvider>
  </React.StrictMode>
);
