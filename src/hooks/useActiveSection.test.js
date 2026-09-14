import { render, screen, act } from '@testing-library/react';
import useActiveSection from './useActiveSection';

const Probe = ({ ids }) => <span data-testid="active">{useActiveSection(ids)}</span>;

let observerCallback;

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
    observerCallback = cb;
    return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
  });
  document.body.innerHTML = '<div id="one"></div><div id="two"></div>';
});

test('starts on the first id', () => {
  render(<Probe ids={['one', 'two']} />);
  expect(screen.getByTestId('active')).toHaveTextContent('one');
});

test('follows the most visible section', () => {
  render(<Probe ids={['one', 'two']} />);
  act(() => {
    observerCallback([
      { target: document.getElementById('one'), isIntersecting: false, intersectionRatio: 0 },
      { target: document.getElementById('two'), isIntersecting: true, intersectionRatio: 0.9 },
    ]);
  });
  expect(screen.getByTestId('active')).toHaveTextContent('two');
});
