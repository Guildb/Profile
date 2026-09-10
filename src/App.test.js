import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
});

test('renders the name in the page heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('renders every section landmark', () => {
  render(<App />);
  ['about', 'skills', 'projects', 'experience', 'interests', 'contact-info'].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});
