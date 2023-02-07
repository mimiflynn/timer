import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import './styles/App.css';
import { DEFAULT_LIMIT, DEFAULT_WARNING } from './constants';
import { TimeInput } from './components/time-input';
import { timer, formatTime } from './lib/time-utils';

const App = () => {
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
      setTime(timeElapsed);
    }
  }, [setTime, timeElapsed, timerStarted]);

  const handleLimitUpdate = useCallback((value) => {
    setTimeLimit(value);
  }, []);

  const handleWarningUpdate = useCallback((value) => {
    setTimeWarning(value);
  }, []);

  const renderControls = useMemo(() => {
    return (
      <div>
        <button
          type="button"
          className={classNames('btn', {
            'btn-primary': !timerStarted,
            'btn-danger': timerStarted,
          })}
          onClick={() => setTimerStatus(!timerStarted)}
        >
          {timerStarted ? 'Stop' : 'Start'}
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setTime(0)}
        >
          Reset
        </button>
      </div>
    );
  }, [timerStarted]);

  const renderSettings = useMemo(() => {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <label className="input-group-text">Limit</label>
              <TimeInput
                ariaLabel="Set Time Limit"
                ariaDescribedby="time-limit"
                placeholder={timeLimit}
                onChange={handleLimitUpdate}
              ></TimeInput>
            </div>
          </div>
          <div className="col">
            <div className="input-group">
              <TimeInput
                ariaLabel="Set Time Limit"
                ariaDescribedby="time-limit"
                placeholder={timeWarning}
                onChange={handleWarningUpdate}
              ></TimeInput>
              <label className="input-group-text">Warning</label>
            </div>
          </div>
        </div>
      </div>
    );
  }, [handleLimitUpdate, handleWarningUpdate, timeLimit, timeWarning]);

  return (
    <div className="position-relative">
      <div
        className={classNames('timer', {
          warning: timeElapsed > timeLimit - timeWarning,
          stop: timeElapsed > timeLimit,
        })}
      >
        <div className="time">{formatTime(timeElapsed)}</div>
        {renderControls}
      </div>
      {renderSettings}
    </div>
  );
};

export default App;
