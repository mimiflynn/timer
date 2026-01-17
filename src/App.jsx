import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import './styles/App.css';
import { DEFAULT_LIMIT_SEC, DEFAULT_WARNING_SEC } from './constants';
import { TimeInput } from './components/time-input';
import { timer, formatTime } from './lib/time-utils';

const App = () => {
  const [timeElapsed, setTime] = useState(0);
  const [timerStarted, setTimerStatus] = useState(false);
  const [timeLimit, setTimeLimit] = useState(DEFAULT_LIMIT_SEC);
  const [timeWarning, setTimeWarning] = useState(DEFAULT_WARNING_SEC);

  useEffect(() => {
    if (!timerStarted) return;

    const timeout = setTimeout(() => {
      setTime(timer(timeElapsed));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeElapsed, timerStarted]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setTimerStatus((prev) => !prev);
      } else if (event.code === 'KeyR') {
        event.preventDefault();
        setTime(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLimitUpdate = useCallback((value) => {
    setTimeLimit(value);
  }, []);

  const handleWarningUpdate = useCallback((value) => {
    setTimeWarning(value);
  }, []);

  const handleReset = useCallback(() => {
    setTime(0);
  }, []);

  const handleToggleTimer = useCallback(() => {
    setTimerStatus((prev) => !prev);
  }, []);

  const isWarning = timeElapsed > timeLimit - timeWarning;
  const isOverLimit = timeElapsed > timeLimit;

  return (
    <div className="position-relative">
      <div
        className={classNames('timer', {
          warning: isWarning && !isOverLimit,
          stop: isOverLimit,
        })}
      >
        <div className="time" role="timer" aria-live="polite">
          {formatTime(timeElapsed)}
        </div>

        <div>
          <button
            type="button"
            className={classNames('btn', {
              'btn-primary': !timerStarted,
              'btn-danger': timerStarted,
            })}
            onClick={handleToggleTimer}
            aria-label={timerStarted ? 'Stop timer' : 'Start timer'}
          >
            {timerStarted ? 'Stop' : 'Start'}
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleReset}
            aria-label="Reset timer to zero"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <label className="input-group-text" htmlFor="time-limit-input">
                Limit
              </label>
              <TimeInput
                id="time-limit-input"
                ariaLabel="Set time limit in minutes and seconds"
                ariaDescribedby="time-limit-help"
                placeholderSec={timeLimit}
                onChange={handleLimitUpdate}
              />
            </div>
            <small id="time-limit-help" className="form-text text-muted">
              Timer stops when limit is reached
            </small>
          </div>
          <div className="col">
            <div className="input-group">
              <TimeInput
                id="time-warning-input"
                ariaLabel="Set warning time in minutes and seconds"
                ariaDescribedby="time-warning-help"
                placeholderSec={timeWarning}
                onChange={handleWarningUpdate}
              />
              <label className="input-group-text" htmlFor="time-warning-input">
                Warning
              </label>
            </div>
            <small id="time-warning-help" className="form-text text-muted">
              Warning shown before time limit
            </small>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <small className="text-muted">
              Keyboard shortcuts: Space to start/stop, R to reset
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
