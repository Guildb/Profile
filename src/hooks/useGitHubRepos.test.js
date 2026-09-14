import { render, screen, waitFor } from '@testing-library/react';
import useGitHubRepos from './useGitHubRepos';

const Probe = ({ slugs }) => {
  const { data, status } = useGitHubRepos(slugs);
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="langs">
        {(data['owner/repo']?.languages ?? []).map((l) => l.name).join(',')}
      </span>
    </div>
  );
};

beforeEach(() => {
  window.sessionStorage.clear();
  jest.restoreAllMocks();
});

test('reports failed and empty data when the API is unreachable', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
  expect(screen.getByTestId('langs')).toHaveTextContent('');
});

test('reports failed when the API returns a rate-limit error', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 403 });
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
});

test('converts language byte counts into descending percentages', async () => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (String(url).endsWith('/languages')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ Python: 7500, CSS: 2500 }) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ pushed_at: '2025-01-01T00:00:00Z' }) });
  });

  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  expect(screen.getByTestId('langs')).toHaveTextContent('Python,CSS');
});

test('serves a second render from sessionStorage without refetching', async () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (String(url).endsWith('/languages')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ Python: 100 }) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ pushed_at: '2025-01-01T00:00:00Z' }) });
  });

  const { unmount } = render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  const callsAfterFirst = fetchSpy.mock.calls.length;

  unmount();
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ready'));
  expect(fetchSpy.mock.calls.length).toBe(callsAfterFirst);
});

test('caches a failure so a reload within the TTL window does not refetch', async () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));

  const { unmount } = render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
  const callsAfterFirst = fetchSpy.mock.calls.length;
  expect(callsAfterFirst).toBeGreaterThan(0);

  unmount();
  render(<Probe slugs={['owner/repo']} />);
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('failed'));
  expect(fetchSpy.mock.calls.length).toBe(callsAfterFirst);
});
