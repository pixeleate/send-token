import { RenderOptions, render } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import * as React from 'react';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mock } from 'wagmi/connectors';

import { avalancheFuji } from 'viem/chains';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const mockConfig = createConfig({
  chains: [avalancheFuji],
  connectors: [
    mock({
      accounts: [
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      ],
    }),
  ],
  transports: {
    [avalancheFuji.id]: http(),
  },
});

type ProvidersProps = {
  children: React.ReactNode;
  config?: typeof mockConfig;
};
export function Providers({ children, config = mockConfig }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };

export type UserEvent = ReturnType<typeof userEvent.setup>;
export { default as userEvent } from '@testing-library/user-event';
