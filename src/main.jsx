import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/Error';
import Root from './Root';
import Contact from './routes/Contact';
import Home from './routes/Home';
import './index.css';
import Search from './routes/Search';

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
        path: 'contacts/:contactId',
        element: <Contact />
      },
      {
        path: 'search',
        element: <Search />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
