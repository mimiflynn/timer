import { fireEvent, render, screen } from '@testing-library/react';

import { TimeInput } from './time-input';

const setup = () => {
  const utils = render(
    <TimeInput
      ariaLabel="time"
      ariaDescribedby="time-limit"
      placeholder="2:30"
      onChange={(event) => console.log('change', event)}
      value={90}
    ></TimeInput>,
  );
  const input = screen.getByLabelText('time');
  return {
    input,
    ...utils,
  };
};

test('Input should set display value', () => {
  const { input } = setup();

  // Focus, type, then blur to trigger formatting
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '23' } });
  fireEvent.blur(input);
  expect(input.value).toBe('0:23');

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'y15efg' } });
  fireEvent.blur(input);
  expect(input.value).toBe('0:15');

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '800' } });
  fireEvent.blur(input);
  expect(input.value).toBe('8:00');

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '90' } });
  fireEvent.blur(input);
  expect(input.value).toBe('1:30');
});
