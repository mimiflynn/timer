import React, { useEffect, useState } from 'react';
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
    setTimeout(() => {
      setTime(timer(timeElapsed));
    }, 1000);
  });

  return (
    <div className="timer">
      {formatTime(timeElapsed)}
    </div>
  );
}

export default App;
