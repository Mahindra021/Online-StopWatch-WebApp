import { NavLink } from 'react-router-dom'
import logo from '../assets/Logo.png'
import logoName from '../assets/TimeMaster.png'

const NavBar = () => {

  return (

    <div>

        <div className='flex place-content-between m-1 p-3'>

            <div className='flex'>
                <img className='w-[50px]' src={logo} alt='TimeMaster'/>
                <img className='w-[150px]' src={logoName} alt='TimeMaster'/>
            </div>

            <ul className='flex gap-5 text-[23px] pr-5 font-bold tabular-nums'>
                <li className='place-content-center p-1 hover:bg-slate-300 rounded-md hover:border-black border-transparent border-2 transition duration-300 ease-in-out cursor-pointer'>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                
                <li className='place-content-center p-1 hover:bg-slate-300 rounded-md hover:border-black border-transparent border-2 transition duration-300 ease-in-out cursor-pointer'>
                    <NavLink to={'/stopwatch'}>StopWatch</NavLink>
                </li>

                <li className='place-content-center p-1 hover:bg-slate-300 rounded-md hover:border-black border-transparent border-2 transition duration-300 ease-in-out cursor-pointer'>
                    <NavLink to={'/timer'}>Timer</NavLink>
                </li>

                <li className='place-content-center p-1 hover:bg-slate-300 rounded-md hover:border-black border-transparent border-2 transition duration-300 ease-in-out cursor-pointer'>
                    <NavLink to={'/alaram'}>Alaram</NavLink>
                </li>

                <li className='place-content-center p-1 hover:bg-slate-300 rounded-md hover:border-black border-transparent border-2 transition duration-300 ease-in-out cursor-pointer'>
                    <NavLink to={'/worldclock'}>World Clock</NavLink>
                </li>
            </ul>

        </div>
        
        <div className='border-2 border-black w-full'></div>
    
    </div>
  )
}

export default NavBar