import React, { useEffect, useState } from 'react';
import './styles/App.css';


function timer(timeElapsed) {
  if (timeElapsed) {
    return timeElapsed + 1;
  } else {
    return 1;
  }
}

function App() {
  const [timeElapsed, setTime] = useState(timer());

  useEffect(() => {
    setTimeout(() => {
      setTime(timer(timeElapsed));
    }, 1000);
  });

  return (
    <div className="App">
      <header className="App-header">
        {timeElapsed} <br />
        seconds has elapsed
      </header>
    </div>
  );
}

export default App;
