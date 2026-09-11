import { render, screen, act } from '@testing-library/react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

const Probe = () => <span>{usePrefersReducedMotion() ? 'reduced' : 'full'}</span>;

const mockMatchMedia = (matches) => {
  const listeners = new Set();
  const mql = {
    matches,
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
    dispatch(next) {
      mql.matches = next;
      listeners.forEach((fn) => fn({ matches: next }));
    },
  };
  window.matchMedia = jest.fn().mockReturnValue(mql);
  return mql;
};

test('reports false when the user has expressed no preference', () => {
  mockMatchMedia(false);
  render(<Probe />);
  expect(screen.getByText('full')).toBeInTheDocument();
});

test('reports true when the user prefers reduced motion', () => {
  mockMatchMedia(true);
  render(<Probe />);
  expect(screen.getByText('reduced')).toBeInTheDocument();
});

test('reacts when the preference changes while the page is open', () => {
  const mql = mockMatchMedia(false);
  render(<Probe />);
  act(() => mql.dispatch(true));
  expect(screen.getByText('reduced')).toBeInTheDocument();
});
