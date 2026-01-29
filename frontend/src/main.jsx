import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './Home/HomePage.jsx'
import AllProducts from './AllProducts/AllProducts.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Contpro } from './Context'
import NextPage from './AllProducts/NextPage.jsx'

const router=createBrowserRouter([{
  path:"/",
  element:<HomePage/>
},
{
  path:"/products",
  element:<AllProducts/>
},
{
  path:"/mycart",
  element:<NextPage/>
}
])

createRoot(document.getElementById('root')).render(
  <Contpro>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </Contpro>
)
