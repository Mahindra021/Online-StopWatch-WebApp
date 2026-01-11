import '../components/Home.css';

const Home = () => {

  return (

    <div className='flex flex-col m-1 p-3 gap-3 home-container'>

        <h1 className="mt-10 font-bold place-content-center m-auto text-[30px]">TimeMaster (Master Your Time, One Second at a Time)</h1>
        <h2 className="mb-5 font-bold place-content-center m-auto text-[25px]">Stopwatch • Timer • Alarm • World Clock — All in One Place</h2>

        <p className="text-[20px]">TimeMaster is a modern and intuitive time management application designed to help you track, measure, and manage time efficiently. Whether you need to measure performance with a stopwatch, stay productive with a countdown timer, or never miss important moments using alarms, TimeMaster provides all essential tools in one simple interface.</p>

        <h2 className="mt-3 font-bold text-[25px]"> Features:-</h2>
        <ul className="flex flex-col gap-5">
            <li>
                <h3 className="font-semibold text-[21px]">⏱️ Stopwatch</h3>
                <p className="text-[17px]"> 
                    Measure time with high precision. Start, pause, reset, and track elapsed time seamlessly — perfect for workouts, coding sessions, or performance tracking.
                </p>

            </li>

            <li>
                <h3 className="font-semibold text-[21px]">⏲️ Timer</h3>
                <p className="text-[17px]">
                    Set custom countdown timers to stay focused and productive. Ideal for study sessions, cooking, workouts, and task management.
                </p>

            </li>
            <li>
                <h3 className="font-semibold text-[21px]">⏰ Alarm</h3>
                <p className="text-[17px]">
                    Schedule alarms to stay on time for important events. Never miss deadlines, meetings, or reminders.
                </p>
            </li>

            <li>
                <h3 className="font-semibold text-[21px]">🕒 World Clock</h3>
                <p className="text-[17px]">
                    Instantly check the current time & date around the world with the world clock.
                </p>
            </li>
        </ul>
    </div>
  )
}

export default Home