import React, { useState, useEffect, useRef } from 'react'

const StopWatch = () => {

  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  let interval = useRef(null);

  function handleStartWatch(){

    setIsPaused(prev => !prev);
  }

  useEffect(() => {

    if (!isPaused){

      interval.current = setInterval(() => {
        
        setTime(prev => prev + 10)
      }, 10);
    }else {

      stopWatch();
    }

    return () => stopWatch();

  }, [isPaused])


  function stopWatch(){

    clearInterval(interval.current);
    interval.current = null;
  }

  function resetWatch(){

    stopWatch();
    setIsPaused(true);
    setTime(0);
  }

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliSeconds = Math.floor((time % 1000) / 10);

  return (

    <div className='flex flex-col m-auto mt-10 items-center gap-7'>

      <h1 className='font-bold text-[35px]'>Online StopWatch</h1>
      <p className='font-medium text-[17px]'>Enjoy a free online stopwatch that is quick, easy to use! Also a countdown timer, alarm and world clock!</p>

      <div className='flex flex-col mt-16 place-content-center m-auto gap-5 tabular-nums font-mono'>

        <h2 className='font-bold text-[51px]'>
          {String(hours).padStart(2, '0')}<span className='text-[30px]'>H</span> : {String(minutes).padStart(2, '0')}<span className='text-[30px]'>M</span> : {String(seconds).padStart(2, '0')}<span className='text-[30px]'>S</span> : {String(milliSeconds).padStart(2, '0')}<span className='text-[30px]'>Ms</span> 
        </h2>

        <div className='mt-10 flex flex-row place-content-evenly'>

          <button className='border-2 border-black rounded-[100%] px-4 py-9 font-semibold bg-green-500 text-white text-[30px] hover:bg-green-600' onClick={handleStartWatch}>
            {isPaused? "Start":"Pause"}
          </button>
          <button className='border-2 border-black rounded-[100%] px-4 py-9 font-semibold bg-orange-500 text-white text-[30px] hover:bg-orange-600' onClick={resetWatch}>Reset</button>

        </div>
      </div>

    </div>
  )
}

export default StopWatch