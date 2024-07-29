import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/Error';
import Root from './Root';
import Home from './routes/Home';
import './index.css';
import Search from './routes/Search';
import { PlayerProvider } from './contexts/PlayerContext';
import { SongProvider } from './contexts/SongContext';
import RegisterPage from './routes/Register';
import LoginPage from './routes/Login';
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
