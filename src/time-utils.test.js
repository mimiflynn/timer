import { timer, convertToSeconds, formatTime } from './time-utils';

it('timer increments time', () => {
  expect(timer(12)).toBe(13);
  expect(timer()).toBe(1);
});

it('formats time', () => {
  expect(formatTime()).toBe('0:00');
  expect(formatTime(90)).toBe('1:30');
});

it('converts minutes to seconds', () => {
  expect(convertToSeconds(0)).toBe(0);
  expect(convertToSeconds(1)).toBe(1);
  expect(convertToSeconds('1:30')).toBe(90);
});
