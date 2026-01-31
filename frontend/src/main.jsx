import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import HomePage from './pages/HomePage.jsx'
// import AllProducts from './pages/AllProducts.jsx'
// import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Contpro } from './Context'
import { BrowserRouter } from 'react-router-dom'
// import NextPage from './components/NextPage.jsx'
// import Login from './components/Login.jsx'



createRoot(document.getElementById('root')).render(
  <Contpro>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Contpro>
)
