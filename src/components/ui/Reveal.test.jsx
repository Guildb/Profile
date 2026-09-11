import { render, screen } from '@testing-library/react';
import Reveal from './Reveal';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders its children', () => {
  render(<Reveal>hello</Reveal>);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

test('renders children even when the user prefers reduced motion', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  render(<Reveal>still here</Reveal>);
  expect(screen.getByText('still here')).toBeInTheDocument();
});

test('honours the requested element type', () => {
  render(<Reveal as="section" aria-label="wrapped">content</Reveal>);
  expect(screen.getByLabelText('wrapped').tagName).toBe('SECTION');
});
