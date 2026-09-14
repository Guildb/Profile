import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { ThemeProvider } from '../contexts/ThemeContext';

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

// LandingPage reads the site theme (to pick the matching hero photo), so it
// must render inside the same ThemeProvider App.js supplies.
const renderLandingPage = () => render(<LandingPage />, { wrapper: ThemeProvider });

test('renders the name as the page heading', () => {
  renderLandingPage();
  expect(
    screen.getByRole('heading', { level: 1, name: /renato cardoso/i })
  ).toBeInTheDocument();
});

test('offers the CV download and both social links', () => {
  renderLandingPage();
  expect(screen.getByLabelText(/download cv/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
});
