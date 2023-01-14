import { render, screen } from '@testing-library/react';
import App from './App';

test('renders flip a coin h1', () => {
  render(<App />);
  const h1 = screen.getByText("Let's flip a coin!");
  expect(h1).toBeInTheDocument();
});
