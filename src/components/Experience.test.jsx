import { render, screen } from '@testing-library/react';
import Experience from './Experience';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders every role in reverse-chronological order', () => {
  render(<Experience />);
  const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(headings).toEqual([
    'Web Support Engineer',
    'Front-End/Vue.js',
    'Undergraduate Degree',
    'DevOps/React',
  ]);
});

test('marks the current role', () => {
  render(<Experience />);
  expect(screen.getByText(/present/i)).toBeInTheDocument();
});
