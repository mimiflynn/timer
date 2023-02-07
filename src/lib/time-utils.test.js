import {
  timer,
  convertToSeconds,
  formatInputTime,
  formatTime,
} from './time-utils';

it('timer increments time', () => {
  expect(timer(12)).toBe(13);
  expect(timer()).toBe(1);
});

it('formats time', () => {
  expect(formatTime()).toBe('0:00');
  expect(formatTime(15)).toBe('0:15');
  expect(formatTime(90)).toBe('1:30');
  expect(formatTime('1:30')).toBe('1:30');
});

it('formats input time', () => {
  expect(formatInputTime()).toBe('0:00');
  expect(formatInputTime('3')).toBe('0:03');
  expect(formatInputTime('30')).toBe('0:30');
  expect(formatInputTime('130')).toBe('1:30');
});

it('converts minutes to seconds', () => {
  expect(convertToSeconds(0)).toBe(0);
  expect(convertToSeconds(1)).toBe(1);
  expect(convertToSeconds('1:30')).toBe(90);
});
