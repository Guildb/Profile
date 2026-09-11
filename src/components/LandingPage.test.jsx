import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

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

test('renders the name as the page heading', () => {
  render(<LandingPage />);
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('offers the CV download and both social links', () => {
  render(<LandingPage />);
  expect(screen.getByLabelText(/download cv/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
});
