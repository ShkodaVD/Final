import React, { useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../stores'

export default function Header() {

  const [cart, setCart] = useContext(CartContext);
  
  return (
 
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

          <img src="/logo (1).svg" alt="logo" className="w-17 h-17" />
          <nav className="flex gap-10 text-[20px] text-black">
            <NavLink to="/">
              Main Page
            </NavLink>

            <NavLink to="/categories/all">
              Categories
            </NavLink>

            <NavLink to="/products/all">
              All products
            </NavLink>

            <NavLink to="/">
              All sales
            </NavLink>

          </nav>
          <NavLink to='/cart' className="relative inline-block">
            <img src="/icon (1).svg" alt="cart" className="w-10 h-10" />
            <div className='absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-[10px] bg-green-500 w-4 h-4 flex items-center justify-center text-white rounded-full'>{cart.reduce((total, item) => total + item.quantity, 0)}</div>
          </NavLink>
        </div>
      </header>
  
  )
}
