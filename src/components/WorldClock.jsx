import { useState, useEffect } from "react"

const WorldClock = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    const formattedDate = `${currentTime.toLocaleString("en-US", { weekday: "long" })} 
        ${currentTime.getDate()} 
        ${currentTime.toLocaleString("en-US", { month: "long" })}, 
        ${currentTime.getFullYear()}`;


    useEffect(() => {
        
        const interval = setInterval(() => {

            setCurrentTime(new Date());
        }, 1000)
      return () => clearInterval(interval);
    }, [])
    

  return (

    <div className='flex flex-col m-auto mt-10 items-center gap-7 w-[850px]'>

        <h1 className='font-bold text-[35px]'> World Clock</h1>

        <p className='font-medium text-[17px]'>Current time and date around the globe instantly with real-time World Clock.</p>

        <div className='flex flex-col mt-10 place-content-evenly items-center m-auto gap-3 tabular-nums font-mono border-4 border-black w-[850px] h-[400px] p-2 rounded-xl'>

            <p className="text-[100px]">{currentTime.toLocaleTimeString()}</p>

            <div style={{ fontSize: "45px", }}>
                {formattedDate}
            </div>

        </div>
    </div>
  )
}

export default WorldClock