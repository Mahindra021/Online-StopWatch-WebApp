import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import StopWatch from './components/StopWatch'
import Timer from './components/Timer'
import Alaram from './components/Alaram'
import WorldClock from './components/WorldClock'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <div>
          <NavBar/>
          <Home/>
        </div>
    },
    {
      path: '/stopwatch',
      element:
        <div>
          <NavBar/>
          <StopWatch/>
        </div>
    },
    {
      path: '/timer',
      element:
        <div>
          <NavBar/>
          <Timer/>
        </div>
    },
    {
      path: '/alaram',
      element: 
        <div>
          <NavBar/>
          <Alaram/>
        </div>
    }, 
    {
      path: '/worldclock',
      element:
        <div>
          <NavBar/>
          <WorldClock/>
        </div>
    }
  ]
)

function App() {
  
  return (
    <div>
      <RouterProvider router={router} />      
    </div>
  )
}

export default App