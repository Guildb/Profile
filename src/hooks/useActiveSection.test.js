import { render, screen, act } from '@testing-library/react';
import useActiveSection from './useActiveSection';

const Probe = ({ ids }) => <span data-testid="active">{useActiveSection(ids)}</span>;

let observerCallback;
let observerOptions;

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((cb, options) => {
    observerCallback = cb;
    observerOptions = options;
    return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
  });
  document.body.innerHTML = '<div id="one"></div><div id="two"></div><div id="three"></div>';
});

test('starts on the first id', () => {
  render(<Probe ids={['one', 'two', 'three']} />);
  expect(screen.getByTestId('active')).toHaveTextContent('one');
});

test('observes with a centre-line rootMargin instead of a ratio threshold', () => {
  render(<Probe ids={['one', 'two', 'three']} />);
  expect(observerOptions.rootMargin).toBe('-45% 0px -55% 0px');
});

test('follows the section crossing the centre line', () => {
  render(<Probe ids={['one', 'two', 'three']} />);
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: false },
      { target: document.getElementById('two'), isIntersecting: true },
      { target: document.getElementById('three'), isIntersecting: false },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('two');

  act(() => {
    observerCallback([
      { target: document.getElementById('two'), isIntersecting: false },
      { target: document.getElementById('three'), isIntersecting: true },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('three');
});

test('a short section crossing the line wins over a tall neighbour that merely fills the viewport', () => {
  // Regression for the ratio-based bug: a tall section's max intersection
  // ratio can stay low even while it fills the screen, letting a short
  // neighbour "win" on ratio alone. The centre-line strategy only cares
  // whether the section is the one crossing the line, not its ratio.
  render(<Probe ids={['one', 'two', 'three']} />);
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: true },
      { target: document.getElementById('two'), isIntersecting: false },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('one');
});

test('keeps the previous active section when nothing is currently crossing the line', () => {
  render(<Probe ids={['one', 'two', 'three']} />);
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: false },
      { target: document.getElementById('two'), isIntersecting: true },
      { target: document.getElementById('three'), isIntersecting: false },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('two');

  // A fast scroll skips past the line between observer callbacks; nothing
  // reports intersecting in this batch.
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: false },
      { target: document.getElementById('two'), isIntersecting: false },
      { target: document.getElementById('three'), isIntersecting: false },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('two');
});
