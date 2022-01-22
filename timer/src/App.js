import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './styles/App.css';


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
  const [timeElapsed, setTime] = useState(timer());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(timer(timeElapsed));
    }, 1000);
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      <div className={classNames('timer', {
        'warning': timeElapsed > 90,
        'stop': timeElapsed > 120
      })}>
        {formatTime(timeElapsed)}
        <button onClick={() => setTime(timer())}>Reset</button>
      </div>
    </div>
  );
}

export default App;
