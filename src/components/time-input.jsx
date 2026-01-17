import { useCallback, useState } from 'react';
import {
  convertToSeconds,
  formatInputTime,
  formatTime,
} from '../lib/time-utils';

export const TimeInput = ({
  ariaLabel,
  ariaDescribedby,
  placeholderSec,
  onChange,
}) => {
  const [value, setValue] = useState(formatTime(placeholderSec));
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = useCallback(({ target }) => {
    // While editing, just store the raw value (digits only)
    setValue(target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setIsEditing(true);
    // Clear the formatted value to let user type fresh
    setValue('');
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    // Format the value when done editing
    const formattedValue = formatInputTime(value);
    setValue(formattedValue);
    onChange(convertToSeconds(formattedValue));
  }, [value, onChange]);

  return (
    <input
      data-testid="time-input"
      type="text"
      className="form-control"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      placeholder={formatTime(placeholderSec)}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
    ></input>
  );
};
