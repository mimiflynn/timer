import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start time on init', async () => {
  render(<App />);

  const timeElement = await screen.findAllByText(/0:00/i);
  expect(timeElement[0]).toBeTruthy();
});
