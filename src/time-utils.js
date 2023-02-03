export function timer(secondsElapsed) {
  if (!secondsElapsed) return 1;
  return secondsElapsed + 1;
}

export function formatTime(elapsedSeconds) {
  if (!elapsedSeconds) return '0:00';
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  return (
    minutes +
    ':' +
    (seconds < 10 ? '0' + seconds.toString() : seconds.toString())
  );
}

export function convertToSeconds(formattedTime) {
  if (!formattedTime) return 0;
  if (!isNaN(formattedTime)) return formattedTime;
  const value = formattedTime.split(':');
  return Number(value[0]) * 60 + Number(value[1]);
}
