import { render } from '@testing-library/react';
import AuroraBackground from './AuroraBackground';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
  // IntersectionObserver is stubbed globally in src/setupTests.js, and that
  // stub fires isIntersecting: true synchronously so `whileInView` actually
  // reaches its `visible` variant. Do NOT re-mock it here with a no-op —
  // that silently overrides the shared stub and makes reveal assertions
  // pass vacuously.
});

test('is hidden from assistive technology', () => {
  const { container } = render(<AuroraBackground />);
  expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
});

test('does not capture pointer events', () => {
  const { container } = render(<AuroraBackground />);
  expect(container.firstChild.className).toMatch(/pointer-events-none/);
});

test('applies exactly one position utility', () => {
  const { container: scrolling } = render(<AuroraBackground />);
  expect(scrolling.firstChild).toHaveClass('absolute');
  expect(scrolling.firstChild).not.toHaveClass('fixed');

  const { container: pinned } = render(<AuroraBackground fixed />);
  expect(pinned.firstChild).toHaveClass('fixed');
  expect(pinned.firstChild).not.toHaveClass('absolute');
});
