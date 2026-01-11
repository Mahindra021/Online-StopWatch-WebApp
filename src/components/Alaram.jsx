import { useEffect, useRef, useState } from 'react'
import alaram from '../assets/TimerRing.mp3';
import { FaVolumeUp, FaVolumeMute, FaBell } from 'react-icons/fa';

const Alaram = () => {

  const [time, setTime] = useState(new Date());
  let audioRef = useRef(null);

  const[inputMinutes, setInputMinutes] = useState("");
  const[inputHours, setInputHours] = useState("");

  const[isEdited, setIsEdited] = useState(false);
  const[isTurnOn, setIsTurnOn] = useState(false);
  const[isMuted, setIsMuted] = useState(false);
  const[disableTurnOn, setDisableTurnOn] = useState(true);
  const[stopAlaram, setStopAlaram] = useState(false);

  useEffect(() => {

      const interval = setInterval(() => {
      
      setTime(new Date());
      if (isTurnOn)
        checkAlaram();

    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTurnOn])
  
  function checkAlaram(){
    
    const currentTime = new Date();
    const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const totalInputMinutes = Number(inputHours) * 60 + Number(inputMinutes);
    
    if (totalInputMinutes == currentTotalMinutes && audioRef.current.paused){

      audioRef.current.play();
      setStopAlaram(true);
    }
  }
  
  function handleSave(){

    const totalInputMinutes = Number(inputHours) * 60 + Number(inputMinutes);
    if (totalInputMinutes == 0){
      
      setDisableTurnOn(true);
    }else {

      setDisableTurnOn(false);
    }

    setIsEdited(prev => !prev);
  }

  function handleTurnOn(){

    setIsTurnOn(prev => !prev);

    if (isTurnOn){

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setInputMinutes(0);
      setInputHours(0);
      setDisableTurnOn(true);
      setStopAlaram(false);
    }
  }

  return (

    <div className='flex flex-col m-auto mt-10 items-center gap-7 w-[850px]'>
      
      <h1 className='font-bold text-[35px]'>Online Alaram Clock</h1>
      <p className='font-medium text-[17px]'>An easy-to-use alarm clock that lets you set precise alarms and alerts you at the right time. </p>

      <div 
        className = {stopAlaram ? 'flex items-center mt-10 m-auto gap-3 tabular-nums font-mono border-4 border-black w-[850px] h-[400px] p-2 rounded-xl bg-green-700' 
        : 
        'flex flex-col mt-10 place-content-between items-center m-auto gap-3 tabular-nums font-mono border-4 border-black w-[850px] h-[400px] p-2 rounded-xl'}>


        <p className={stopAlaram ? 'hidden' : 'text-[21px] font-mono place-content-center'}>Clock: {time.toLocaleTimeString()}</p>

        <p className={stopAlaram ? 'hidden' : 'text-[21px] font-medium font-mono h-[30px] place-content-center'}>{isTurnOn ? "Alaram is turned On" : " Alaram is turned Off"}</p>
        
        <div className={stopAlaram ? 'hidden' : 'flex gap-3 border-transparent justify-center items-center h-[190px]'}>

          {
            !isEdited ?
            
            <p className='text-[130px] font-semibold font-mono place-content-center'>{String(inputHours).padStart(2, 0)}:</p>
            
            :
            
            <input
            type='number'
            min={0}
            max={24}
            value={inputHours}
            onChange={(e) => {
              const val = e.target.value;
              
              if (val == "" || val >= 0 && val <= 24){
                
                setInputHours(val)}}
              }
              placeholder='HH' 
              className='place-content-center border-2 border-transparent py-2 px-3 no-spinner text-[50px] hover:border-black rounded-lg'
              />
              
            }

            {
              
              !isEdited ?
              
              <p className='text-[130px] place-content-center font-semibold font-mono'>{String(inputMinutes).padStart(2, 0)}</p>
              
              :
              
              <input 
              type='number'
              min={0}
              max={59}
              value={inputMinutes}
              onChange={(e) => {
                const val = e.target.value;
                if (val == "" || val >= 0 && val <= 59){
                  
                  setInputMinutes(val)}}
                }
                placeholder='MM'
                className='border-2 place-content-center border-transparent py-2 px-3 no-spinner text-[50px] hover:border-black rounded-lg'
                />
              }

        </div>

        <div className='flex gap-12 w-[350px] place-content-center'>

          {
            
            isTurnOn ?
            
            <button 
              disabled={true}
              className={ stopAlaram ? 'hidden' : 'place-content-center border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-zinc-500 text-white text-[30px] hover:bg-zinc-600 cursor-not-allowed opacity-70'}
              onClick={handleSave}
            >
              {!isEdited ? "Edit" : "Save"}
            </button>

            :

            <button 
              className={ stopAlaram ? 'hidden' : 'place-content-center border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-zinc-500 text-white text-[30px] hover:bg-zinc-600'}
              onClick={handleSave}
              >
              {!isEdited ? "Edit" : "Save"}
            </button>
          }

          {
            
            !disableTurnOn ?
            
              <button 
                className={stopAlaram ? 'border-2 border-black px-4 py-1 font-semibold bg-green-500 hover:bg-green-600 text-[30px] rounded-[15px] w-[130px] h-[63px] text-white relative top-[145px] left-[210px]'  : 'place-content-center border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-green-500 text-white text-[30px] hover:bg-green-600'}
                onClick={handleTurnOn}
              >
                {stopAlaram ? "Stop" : (isTurnOn == false ? "Turn On" : "Turn Off")}
              </button>

              :

              <button 
                disabled={true}
                className='place-content-center border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-green-500 text-white text-[30px] hover:bg-green-600 cursor-not-allowed opacity-70' 
                onClick={handleTurnOn}
                >
                {isTurnOn == false ? "Turn On" : "Turn Off"}
              </button>
          }

        </div>

          {stopAlaram && <FaBell className="text-5xl text-yellow-300 animate-bell" />}

        <div>

        {

          stopAlaram && (
          <button
          
            className='relative left-[100px] top-[150px]'
            onClick={() => {setIsMuted(!isMuted)}}>
              {isMuted ? <FaVolumeMute className='text-[25px] text-white cursor-pointer'/> : <FaVolumeUp className='text-[25px] text-white cursor-pointer'/>}
          </button>
          )
        } 
          <audio ref={audioRef} src={alaram} muted={isMuted}></audio>

        </div>

      </div>

    </div>
  )
}

export default Alaram