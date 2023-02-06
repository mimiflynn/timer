export function timer(secondsElapsed) {
  if (!secondsElapsed) return 1;
  return secondsElapsed + 1;
}

export function formatTime(elapsedSeconds) {
  if (!elapsedSeconds) return '0:00';
  if (isNaN(elapsedSeconds)) return elapsedSeconds;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const displaySeconds =
    seconds < 10 ? `0${seconds.toString()}` : seconds.toString();

  return `${minutes}:${displaySeconds}`;
}

export function formatInputTime(inputTime) {
  if (!inputTime) return '0:00';

  const removeNonnumeric = inputTime.replace(/[^0-9.]/g, '');
  const numberString = removeNonnumeric.replace(/\b0+/g, '');
  const timeArr = String(numberString).split('');

  if (timeArr.length === 1) {
    return `0:0${timeArr[0]}`;
  }
  if (timeArr.length === 2) {
    return `0:${timeArr.join('')}`;
  }

  timeArr.splice(timeArr.length - 2, 0, ':');
  return timeArr.join('');
}

export function convertToSeconds(formattedTime) {
  if (!formattedTime) return 0;
  if (!isNaN(formattedTime)) return formattedTime;
  const value = formattedTime.split(':');
  return Number(value[0]) * 60 + Number(value[1]);
}
