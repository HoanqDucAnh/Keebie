import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'

const NavigationBar = () => {
    const [nav, setNav] = useState(true)

    const handleNav = () => {
        setNav(!nav)
    }

  return (
    <nav className='flex justify-between items-center h-18 mx-auto px-4 text-black bg-[#F8C70E]'>
        <h1 className='text-3xl font-mono font-bold p-4 text-[#000000]'>
            <a href='#'>Keebi3.</a>
        </h1>

        <div className='hidden md:flex'>
            <ul className='flex font-mono text-xl'>
                <li className='p-4'><a href='#'>Home</a></li>
                <li className='p-4'><a href='#'>About</a></li>
                <li className='p-4'><a href='#'>Product</a></li>
                <li className='p-4'><a href='#'>Contact</a></li>
            </ul>
        </div>

        <div className='hidden md:flex'>
            <ul className='flex text-2xl'>
                <li className='p-2'><a href='#'><AiOutlineSearch /></a></li>
                <li className='p-2'><a href='#'><AiOutlineUser /></a></li>
                <li className='p-2'><a href='#'><AiOutlineShoppingCart /></a></li>
            </ul>
        </div>

        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div className={!nav ? 'fixed left-0 top-0 w-[50%] h-full border-r border-r-white-900 bg-[#FFF5D6] ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <h1 className='text-3xl font-mono font-bold p-4 text-[#000000]'>Keebi3.</h1>
            <ul className='p-2 font-mono'>
                <li className='p-4 border-b border-[#F2D15D]'>Home</li>
                <li className='p-4 border-b border-[#F2D15D]'>About</li>
                <li className='p-4 border-b border-[#F2D15D]'>Product</li>
                <li className='p-4 border-b border-[#F2D15D]'>Contact</li>
                <li className='p-4 border-b border-[#F2D15D]'>Account</li>
                <li className='p-4 border-b border-[#F2D15D]'>Cart</li>
            </ul>
        </div>
    </nav>
  )
}

export default NavigationBar
