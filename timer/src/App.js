import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './styles/App.css';
import { DEFAULT_LIMIT, DEFAULT_WARNING } from './constants';


function timer(timeElapsed) {
  if (timeElapsed) {
    return timeElapsed + 1;
  } else {
    return 1;
  }
}

function formatTime(elapsedSeconds) {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  return minutes + ':' + ((seconds < 10) ? '0' + seconds.toString() : seconds.toString());
}

function App() {
  const [timeElapsed, setTime] = useState(0);
  const [timerStarted, setTimerStatus] = useState(false);
  let timeLimit = DEFAULT_LIMIT;
  let timeWarning = DEFAULT_WARNING;

  useEffect(() => {
    console.log('timer effect')
    if (timerStarted) {
      const timeout = setTimeout(() => {
        setTime(timer(timeElapsed));
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setTime(timeElapsed)
    }
  });

  return (
    <div>
      <div className={classNames('timer', {
        'warning': timeElapsed > (timeLimit - timeWarning),
        'stop': timeElapsed > timeLimit
      })}>
        {formatTime(timeElapsed)}
        <button onClick={() => setTimerStatus(!timerStarted)}>
          {timerStarted ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div >
  );
}

export default App;
