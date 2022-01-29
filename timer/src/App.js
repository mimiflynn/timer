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

function convertToSeconds(time) {
  const value = time.split(':');
  return (Number(value[0]) * 60) + Number(value[1]);
}

function App() {
  const [timeElapsed, setTime] = useState(0);
  const [timerStarted, setTimerStatus] = useState(false);
  const [timeLimit, setTimeLimit] = useState(DEFAULT_LIMIT);
  const [timeWarning, setTimeWarning] = useState(DEFAULT_WARNING);

  useEffect(() => {
    if (timerStarted) {
      const timeout = setTimeout(() => {
        setTime(timer(timeElapsed));
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setTime(timeElapsed)
    }
  });

  function handleLimitUpdate(event) {
    setTimeLimit(convertToSeconds(event.target.value));
  }

  function handleWarningUpdate(event) {
    setTimeWarning(convertToSeconds(event.target.value));
  }

  function renderControls() {
    return (
      <div className="">
        <button
          type="button"
          className={classNames('btn', {
            'btn-primary': !timerStarted,
            'btn-danger': timerStarted
          })}
          onClick={() => setTimerStatus(!timerStarted)}>
          {timerStarted ? 'Stop' : 'Start'}
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setTime(0)}>Reset</button>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <span className="input-group-text"
                id="time-limit">Limit</span>
              <input
                type="text"
                className="form-control"
                aria-label="Set Time Limit"
                aria-describedby="time-limit"
                placeholder={formatTime(timeLimit)}
                onChange={handleLimitUpdate}></input>
            </div>
          </div>
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-label="Set Time Warning"
                aria-describedby="time-warning"
                placeholder={formatTime(timeWarning)}
                onChange={handleWarningUpdate}></input>
              <span className="input-group-text"
                id="time-limit">Warning</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative">
      <div className={classNames('timer', {
        'warning': timeElapsed > (timeLimit - timeWarning),
        'stop': timeElapsed > timeLimit
      })}>
        <div className="time">
          {formatTime(timeElapsed)}
        </div>
        {renderControls()}
      </div>
      {renderSettings()}
    </div >
  );
}

export default App;
