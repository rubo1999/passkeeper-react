import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Claves from './Claves'
import '../public/estilo.css'


const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
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
