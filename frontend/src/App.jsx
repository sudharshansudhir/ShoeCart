import React from 'react'
import { Contpro } from './Context'
import HomePage from "./pages/HomePage.jsx"
import { Route, Routes } from 'react-router-dom'
import AllProducts from './pages/AllProducts.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' Component={HomePage}/>
      <Route path='/products' Component={AllProducts}/>
      <Route path='/login' Component={LoginPage}/>
      <Route path='/cart' Component={CartPage}/>
      <Route path='/profile' Component={ProfilePage}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App