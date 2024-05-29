import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(0);
  const [inputValue, setInputValue] = useState('0');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setInputValue(value);
      const newTime = parseInt(value, 10);
      if (!isNaN(newTime) && newTime >= 0) {
        setTime(newTime);
      } else if (value === '') {
        setTime(0);
      }
    }
  };

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <div>
        <div className="countdowndiv">
      <div>Countdown Time:
        </div>
        <div>
             {formattedTime}</div>
             </div>
             <div className="bttn">
      <input
        type="text"
        value={inputValue}
        onChange={handleTimeChange}
      />
      <button className="start" onClick={startTimer} disabled={isRunning || time <= 0}>
        Start
      </button>
      <button className='stop' onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
