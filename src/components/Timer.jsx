import { useRef, useState } from 'react';
import '../components/Timer.css';
import timerAlaram from '../assets/TimerRing.mp3'
import { FaVolumeUp, FaVolumeMute, FaBell } from "react-icons/fa";

const Timer = () => {

  const [time, setTime] = useState(0);
  let interval = useRef(null);

  const audioRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [initStartDisable, setInitStartDisable] = useState(true)
  const [isMuted, setIsMuted] = useState(false);

  const [isOk, setIsOk] = useState(false);

  const [inputSeconds, setInputSeconds] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputHours, setInputHours] = useState("")

  function handleTimer(){

    if (isOk){

      setIsOk(false);
      audioRef.current.pause();
    }else {

      if (!isPaused)
        startTimer();
      else 
        stopTimer();
      
      setIsPaused(!isPaused);
      setIsDisable(true);
    }
  }

  function startTimer(){

    if (time <= 0)
      return;

    interval.current = setInterval(() => {
        
      setTime(prev => {

        if (prev <= 1){

          audioRef.current.play();
          clearInterval(interval.current);
          setIsPaused(false);

          setIsDisable(false);
          setInitStartDisable(true);
          setIsEdited(false);

          setIsOk(true);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer(){

    clearInterval(interval.current);
    interval.current = null;
  }

  function resetTimer(){

    setIsDisable(false);
    setInitStartDisable(true);
    stopTimer();
    setIsPaused(false);
    setTime(0);
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  
  function handleSave(){

    const totalSeconds = Number(inputHours) * 3600 + Number(inputMinutes) * 60 + Number(inputSeconds);
    
    if (totalSeconds === 0){

      setInitStartDisable(true);
    }else {

      setInitStartDisable(false);
    }
    
    setTime(totalSeconds);
    setIsEdited(false);
  }

  return (

    <div className='flex flex-col m-auto mt-10 items-center gap-7'>
      
      <h1 className='font-bold text-[35px]'>Online Timer & Countdown</h1>
      <p className='font-medium text-[17px]'>Hours can be entered only from 0 – 24, and minutes and seconds only from 0 – 59. Values outside these limits are not allowed.</p>

      <div className='flex flex-col mt-10 justify-center items-center m-auto gap-5 tabular-nums font-mono'>

        
        <div 
          className={ isOk ? 'flex flex-col w-[280px] h-[280px] rounded-full border-4 border-black items-center justify-center bg-green-700'
            : 'flex flex-col w-[280px] h-[280px] rounded-full border-4 border-black items-center justify-center'}
            >

          {isOk && (<FaBell className="text-5xl text-white animate-bell" />)}
          
          <div className={ isOk == false ? 'flex gap-3 border-transparent justify-center items-center text-[19px]' : 'hidden'}>

            {
              isEdited ?

                <input type='number' min={0} max={24} value={inputHours} 
                  onChange={(e) => {
                    {
                      const val = e.target.value;

                      if (val === "" || (Number(val) >= 0 && Number(val) <= 24)){

                        setInputHours(val)}} 
                      }
                    }
                  placeholder='HH' 
                  className='border-2 border-transparent py-2 px-3 no-spinner w-[50px] hover:border-black rounded-lg'/>

                :

                <p> {String(hours).padStart(2, '0')} : </p>
            }

            {
              isEdited ?  

                <input type='number' min={0} max={59} value={inputMinutes} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || (Number(val) >= 0 && Number(val) <= 59)){

                      setInputMinutes(val)}
                    } 
                  }

                  placeholder='MM' 
                  className='border-2 border-transparent py-2 px-3 no-spinner w-[50px] hover:border-black rounded-lg'/>

                :

                <p> {String(minutes).padStart(2, '0')} :</p>
            }
            
            {
              isEdited ?

                <input type='number' min={0} max={59} step={1} value={inputSeconds} 

                  onChange={(e) => { {
                    const val = e.target.value; 

                    if (val === "" || (Number(val) >= 0 && Number(val) <= 59)){

                      setInputSeconds(val)}} 
                    }
                  }

                  placeholder='SS' 
                  className='border-2 border-transparent py-2 px-3 no-spinner w-[50px] hover:border-black rounded-lg'/>

                :

                <p> {String(seconds).padStart(2, '0')}</p>
            }

          </div>

            <div className='absolute flex justify-end items-end place-content-end top-[500px]'>

              <button
                className="cursor-pointer text-2xl  text-gray-700 hover:text-black"
                onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <FaVolumeMute className={isOk ? 'text-white' : 'text-black'}/> : <FaVolumeUp className={isOk ? 'text-white' : 'text-black'}/>}
              </button>

              <audio ref={audioRef} src={timerAlaram} muted={isMuted}></audio>

            </div>
        
        </div>

        <div className='mt-8 flex flex-row justify-center items-center place-content-evenly gap-10'>

          {

            !isDisable && isOk == false?

              <button className='border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-zinc-500 text-white text-[30px] hover:bg-zinc-600' onClick={isEdited ? handleSave : () => setIsEdited(true)}>
              {isEdited ? "Save" : "Edit"} 
              </button>

            :

              <button disabled={true} className='border-2 border-black rounded-[30px] px-4 py-1 font-semibold bg-zinc-500 text-white text-[30px] hover:bg-zinc-600 cursor-not-allowed opacity-70' onClick={isEdited ? handleSave : () => setIsEdited(true)}>
              {isEdited ? "Save" : "Edit"} 
              </button>
          }

          {
            (isEdited == true || initStartDisable == true) && isOk == false ?

              <button disabled={true} className='border-2 border-black w-[120px] h-[120px] rounded-full px-4 py-9 font-semibold bg-green-500 text-white text-[30px] hover:bg-green-600 cursor-not-allowed opacity-70' 
                onClick={handleTimer}>
                  {!isPaused ? "Start" : "Pause"}
              </button>

            :

              <button className='border-2 border-black w-[120px] h-[120px] rounded-full px-4 py-9 font-semibold bg-green-500 text-white text-[30px] hover:bg-green-600' 
                onClick={handleTimer}>
                { isOk ? "Ok" : (!isPaused ? "Start" : "Pause")}
              </button>
          }

          { 
            isDisable? 

              <button className='border-2 border-black rounded-[30px] px-3 py-1 font-semibold bg-orange-500 text-white text-[30px] hover:bg-orange-600' 
                onClick={resetTimer} 
                >Reset
              </button> 

            : 

              <button disabled={true} className='border-2 border-black rounded-[30px] px-3 py-1 font-semibold bg-orange-500 text-white text-[30px] hover:bg-orange-600 cursor-not-allowed opacity-70' 
                onClick={resetTimer} 
                >Reset
              </button>
          }

        </div>

      </div>

    </div>
  )
}

export default Timer