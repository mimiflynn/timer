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
 * Last 2 digits are treated as seconds, remaining digits as minutes
 * e.g., "130" = "1:30", "800" = "8:00", "90" = "1:30"
 * @param {string} inputTime - The raw user input
 * @returns {string} Formatted time as MM:SS
 */
export function formatInputTime(inputTime) {
  if (!inputTime) return '0:00';

  // Remove all non-numeric characters
  const numericOnly = inputTime.replace(/\D/g, '');
  // Remove leading zeros
  const numberString = numericOnly.replace(/^0+/, '') || '0';

  if (numberString.length === 0) {
    return '0:00';
  }

  if (numberString.length === 1) {
    // Single digit: treat as seconds
    return `0:0${numberString}`;
  }

  if (numberString.length === 2) {
    // Two digits: treat as seconds, convert if >= 60
    const seconds = parseInt(numberString, 10);
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const displaySeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
      return `${minutes}:${displaySeconds}`;
    }
    return `0:${numberString}`;
  }

  // 3+ digits: last 2 are seconds, rest are minutes
  const secondsPart = numberString.slice(-2);
  const minutesPart = numberString.slice(0, -2);

  let minutes = parseInt(minutesPart, 10);
  let seconds = parseInt(secondsPart, 10);

  // If seconds >= 60, convert to minutes
  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
  }

  const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${displaySeconds}`;
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
