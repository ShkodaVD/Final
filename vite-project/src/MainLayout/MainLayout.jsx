import React, { useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { CartContext } from '../stores'


export default function MainLayout() {
  const [cart, setCart] = useState([])
  return (
    <CartContext value={[cart, setCart]}>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </CartContext>
  )
}
