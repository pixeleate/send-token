'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import config from '@/lib/wagmi';

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
