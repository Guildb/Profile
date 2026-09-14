import { render, screen } from '@testing-library/react';
import TiltCard from './TiltCard';

const setReducedMotion = (matches) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

test('renders its children', () => {
  setReducedMotion(false);
  render(<TiltCard>card body</TiltCard>);
  expect(screen.getByText('card body')).toBeInTheDocument();
});

test('still renders content when the user prefers reduced motion', () => {
  setReducedMotion(true);
  render(<TiltCard>card body</TiltCard>);
  expect(screen.getByText('card body')).toBeInTheDocument();
});
