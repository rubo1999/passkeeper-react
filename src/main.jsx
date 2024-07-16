import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Claves from './Claves'
import '../public/estilo.css'
import Error from './Error'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />,
    errorElement : <Error />
  },
  {
    path : "/claves/tipo/:tipo_id" ,
    element : <Claves />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)