import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
});

test('renders the name in the page heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('renders every section landmark with an accessible name from its heading', () => {
  render(<App />);
  [
    'About Me',
    'Skills',
    'My Projects',
    'Experience',
    'Interests',
    'Contact Me',
  ].forEach((name) => {
    expect(screen.getByRole('region', { name })).toBeInTheDocument();
  });
});
