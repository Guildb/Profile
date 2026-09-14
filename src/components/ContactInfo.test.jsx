import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import ContactInfo from './ContactInfo';

jest.mock('@emailjs/browser', () => ({ __esModule: true, default: { send: jest.fn() } }));

beforeEach(() => {
  jest.clearAllMocks();
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

const fillForm = async (user) => {
  await user.type(screen.getByLabelText(/name/i), 'Ada');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello there');
};

test('confirms success without reloading the page and clears the form', async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  const user = userEvent.setup();
  render(<ContactInfo />);

  await fillForm(user);
  await user.click(screen.getByRole('button', { name: /send message/i }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/sent/i));
  expect(screen.getByLabelText(/name/i)).toHaveValue('');
});

test('keeps the entered values when sending fails', async () => {
  emailjs.send.mockRejectedValue(new Error('nope'));
  const user = userEvent.setup();
  render(<ContactInfo />);

  await fillForm(user);
  await user.click(screen.getByRole('button', { name: /send message/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByLabelText(/name/i)).toHaveValue('Ada');
});

test('disables the submit button only while a request is in flight', async () => {
  let resolveSend;
  emailjs.send.mockReturnValue(new Promise((resolve) => { resolveSend = resolve; }));
  const user = userEvent.setup();
  render(<ContactInfo />);

  const button = screen.getByRole('button', { name: /send message/i });
  expect(button).toBeEnabled();

  await fillForm(user);
  await user.click(button);
  await waitFor(() => expect(button).toBeDisabled());

  resolveSend({ status: 200 });
  // The status region is always mounted (so its text updates read as live
  // region changes, not pre-filled content), so presence alone would pass
  // before the send even resolves. Assert its content instead.
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/sent/i));
});

test('returns to idle and hides the error alert once the user edits a field', async () => {
  emailjs.send.mockRejectedValue(new Error('nope'));
  const user = userEvent.setup();
  render(<ContactInfo />);

  await fillForm(user);
  await user.click(screen.getByRole('button', { name: /send message/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

  await user.type(screen.getByLabelText(/name/i), ' Lovelace');

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
