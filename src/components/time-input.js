import { useCallback } from 'react';
import { convertToSeconds, formatTime } from '../lib/time-utils';

export const TimeInput = ({
  ariaLabel,
  ariaDescribedby,
  placeholder,
  onChange,
  value,
}) => {
  const handleChange = useCallback(
    (event) => {
      onChange(convertToSeconds(event.target.value));
    },
    [onChange]
  );

  return (
    <input
      type="text"
      className="form-control"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      placeholder={formatTime(placeholder)}
      onChange={handleChange}
    ></input>
  );
};
