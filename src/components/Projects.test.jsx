import { render, screen, waitFor } from '@testing-library/react';
import Projects from './Projects';

beforeEach(() => {
  window.sessionStorage.clear();
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('renders every project even when GitHub is unreachable', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Projects />);

  expect(screen.getByText(/Matching Project Allocation System/i)).toBeInTheDocument();
  expect(screen.getByText(/3DPrinting/i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getAllByRole('link', { name: /view .* on github/i })).toHaveLength(2)
  );
});

test('never renders a star count', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Projects />);
  await waitFor(() => expect(screen.queryByText('★')).not.toBeInTheDocument());
});
