import * as React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserEvent, act, render, screen, userEvent, waitFor } from '../test';
import Wallet from '@/components/Wallet';

describe('<Wallet />', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('connects and disconnects wallet', async () => {
    render(<Wallet />);

    // Connect Wallet
    const connectButton = screen.getByRole('button', {
      name: 'Connect Wallet',
    });

    act(() => {
      user.click(connectButton);
    });

    await waitFor(() =>
      expect(
        screen.getByRole('button', {
          name: 'Disconnect Wallet',
        })
      ).toBeInTheDocument()
    );

    // Disconnect Wallet
    const disconnectButton = screen.getByRole('button', {
      name: 'Disconnect Wallet',
    });
    expect(disconnectButton).toHaveTextContent('Disconnect Wallet');
    user.click(disconnectButton);
    expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet');
  });
});
