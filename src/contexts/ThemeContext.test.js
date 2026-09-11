import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const Probe = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
};

const renderProbe = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('defaults to dark when the system prefers dark', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(document.documentElement).toHaveClass('dark');
});

test('defaults to light when the system prefers light', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('light');
  expect(document.documentElement).not.toHaveClass('dark');
});

test('a stored preference beats the system preference', () => {
  window.localStorage.setItem('theme', 'light');
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('light');
  expect(document.documentElement).not.toHaveClass('dark');
});

test('falls back to the system preference when localStorage throws', () => {
  const getItem = jest
    .spyOn(Storage.prototype, 'getItem')
    .mockImplementation(() => {
      throw new Error('private browsing');
    });
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });

  renderProbe();

  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(document.documentElement).toHaveClass('dark');
  getItem.mockRestore();
});

test('an unrecognised stored value falls back to the system preference', () => {
  window.localStorage.setItem('theme', 'chartreuse');
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  expect(screen.getByRole('button')).toHaveTextContent('dark');
});

test('toggling flips the theme, the class and the stored value', () => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  renderProbe();
  act(() => {
    screen.getByRole('button').click();
  });
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(document.documentElement).toHaveClass('dark');
  expect(window.localStorage.getItem('theme')).toBe('dark');
});
