/**
 * Increments the timer by one second
 * @param {number} secondsElapsed - The current number of seconds elapsed
 * @returns {number} The incremented seconds value
 */
export function timer(secondsElapsed) {
  if (!secondsElapsed || typeof secondsElapsed !== 'number') return 1;
  return secondsElapsed + 1;
}

/**
 * Formats seconds into MM:SS format
 * @param {number|string} elapsedSeconds - The number of seconds to format, or already formatted string
 * @returns {string} Time formatted as MM:SS
 */
export function formatTime(elapsedSeconds) {
  if (!elapsedSeconds) return '0:00';

  // If already formatted as a string, return as-is
  if (typeof elapsedSeconds === 'string') return elapsedSeconds;

  // If not a valid number, return the value as-is
  if (typeof elapsedSeconds !== 'number' || isNaN(elapsedSeconds)) {
    return String(elapsedSeconds);
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${displaySeconds}`;
}

/**
 * Formats user input into MM:SS time format
 * Removes non-numeric characters and adds colon separator
 * @param {string} inputTime - The raw user input
 * @returns {string} Formatted time as MM:SS
 */
export function formatInputTime(inputTime) {
  if (!inputTime) return '0:00';

  // Remove all non-numeric characters
  const numericOnly = inputTime.replace(/\D/g, '');
  // Remove leading zeros
  const numberString = numericOnly.replace(/^0+/, '') || '0';

  if (numberString.length === 1) {
    return `0:0${numberString}`;
  }
  if (numberString.length === 2) {
    return `0:${numberString}`;
  }

  // Insert colon before the last 2 digits (seconds)
  const timeArray = numberString.split('');
  timeArray.splice(timeArray.length - 2, 0, ':');
  return timeArray.join('');
}

/**
 * Converts formatted time (MM:SS) to total seconds
 * @param {string|number} formattedTime - Time in MM:SS format or raw seconds
 * @returns {number} Total seconds
 */
export function convertToSeconds(formattedTime) {
  if (!formattedTime) return 0;

  // If already a number, return it
  if (typeof formattedTime === 'number') return formattedTime;

  // If not a valid number as string, try to parse as MM:SS
  if (!isNaN(formattedTime)) return Number(formattedTime);

  const parts = String(formattedTime).split(':');
  if (parts.length !== 2) return 0;

  const minutes = Number(parts[0]) || 0;
  const seconds = Number(parts[1]) || 0;

  return minutes * 60 + seconds;
}
