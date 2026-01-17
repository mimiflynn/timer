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
 * Plain numbers are treated as minutes (e.g., "5" = "5:00")
 * Colons can be used for MM:SS format (e.g., "5:30" = "5:30")
 * @param {string} inputTime - The raw user input
 * @returns {string} Formatted time as MM:SS
 */
export function formatInputTime(inputTime) {
  if (!inputTime) return '0:00';

  // If input already contains a colon, treat as MM:SS format
  if (inputTime.includes(':')) {
    const parts = inputTime.split(':');
    const minutes = parts[0].replace(/\D/g, '') || '0';
    const seconds = parts[1] ? parts[1].replace(/\D/g, '') : '0';

    const mins = parseInt(minutes, 10);
    const secs = parseInt(seconds, 10);

    // Clamp seconds to 0-59
    const displaySeconds = Math.min(secs, 59);
    const displaySecondsPadded =
      displaySeconds < 10 ? `0${displaySeconds}` : `${displaySeconds}`;

    return `${mins}:${displaySecondsPadded}`;
  }

  // Remove all non-numeric characters
  const numericOnly = inputTime.replace(/\D/g, '');
  // Remove leading zeros
  const numberString = numericOnly.replace(/^0+/, '') || '0';

  if (numberString.length === 0) {
    return '0:00';
  }

  // Treat plain numbers as minutes (not seconds)
  const minutes = parseInt(numberString, 10);
  return `${minutes}:00`;
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
