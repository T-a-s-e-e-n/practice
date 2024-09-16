import React, { useEffect, useState } from "react";


function Timer () {
const [timer, setTimer ] = useState(0)
const [isActive, setIsActive] = useState(false)

useEffect(() => {
    let interval  = null;

    if (isActive) {
    interval = setInterval(() => {
            setTimer((timer)  => timer + 2)
        }, 2000)
     
    } else if (!isActive && timer !== 0)   {
        clearInterval(interval)
    }

    return () => (clearInterval(interval))

}, [timer, isActive])

const startTime = () => {
    setIsActive(true)
}
const poseTime = () => {
    setIsActive(false)
}
const resetTime = () => {
    setIsActive(false)
    setTimer(0)
}


return( <>
    <div>
<span >Time is :  {timer}s</span>
</div>
<div>
<button type="button" onClick={startTime}>Start</button>
<button type="button" onClick={poseTime}>Stop</button>
<button type="button" onClick={resetTime}>Restart</button>
    </div>
    </>
)











}
export default Timer;