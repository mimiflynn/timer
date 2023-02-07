import { useCallback, useState } from 'react';
import {
  convertToSeconds,
  formatInputTime,
  formatTime,
} from '../lib/time-utils';

export const TimeInput = ({
  ariaLabel,
  ariaDescribedby,
  placeholder,
  onChange,
}) => {
  const [value, setValue] = useState(formatTime(placeholder));
  const handleChange = useCallback(
    ({ target }) => {
      onChange(convertToSeconds(target.value));
      setValue(formatInputTime(target.value));
    },
    [onChange]
  );

  return (
    <input
      data-testid="time-input"
      type="text"
      className="form-control"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      placeholder={formatTime(placeholder)}
      onChange={handleChange}
      value={value}
    ></input>
  );
};
