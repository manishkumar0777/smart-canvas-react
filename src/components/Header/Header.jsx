import React from 'react'
import {useNavigate} from 'react-router-dom'

const navItems = [
  {name : "Home" , path : '/'},
  {name : "History" , path : '/history'},
]

function Header() {

  const navigate = useNavigate();
  return (
    <div className="top-0 left-0 w-full h-14 bg-transparent flex items-center justify-between px-4 shadow-md">
      <nav className='flex items-center justify-between w-full'>
        <div className='text-2xl font-bold'>Smart-canvas</div>
        <ul className='flex items-center gap-4'>
          {navItems.map((item) => (
            <li 
              key={item.name} 
              className='text-lg font-semibold hover:bg-green-600 hover:text-white hover:border border-gray-300  cursor-pointer rounded-lg px-2 py-1' 
              onClick={() => navigate(item.path)}
            >{item.name}</li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Header