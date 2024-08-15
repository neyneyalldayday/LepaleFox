import React from 'react'
import { Link } from 'react-router-dom';
import './nav.css'
const Nav = () => {
  return (
    <>
    <ul className='nav'>
      <li><Link className="nav-item" to='/'>Home</Link></li>
      <li><Link className="nav-item" to='/blog'>Blog</Link></li>
      <li><Link className="nav-item" to='/contact'>Contact</Link></li>
    </ul>
    
    </>
  )
}

export default Nav