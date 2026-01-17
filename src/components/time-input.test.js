import { fireEvent, render, screen } from '@testing-library/react';

import { TimeInput } from './time-input';

const setup = () => {
  const utils = render(
    <TimeInput
      ariaLabel="time"
      ariaDescribedby="time-limit"
      placeholder="0:30"
      onChange={(event) => console.log('change', event)}
      value={90}
    ></TimeInput>
  );
  const input = screen.getByLabelText('time');
  return {
    input,
    ...utils,
  };
};

test('Input should set display value', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '23' } });
  expect(input.value).toBe('0:23');

  fireEvent.change(input, { target: { value: 'y15efg' } });
  expect(input.value).toBe('0:15');

  fireEvent.change(input, { target: { value: '8' } });
  fireEvent.change(input, { target: { value: '80' } });
  fireEvent.change(input, { target: { value: '800' } });
  expect(input.value).toBe('8:00');

  fireEvent.change(input, { target: { value: '9' } });
  fireEvent.change(input, { target: { value: '90' } });
  expect(input.value).toBe('1:30');
});
