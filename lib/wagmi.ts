import { http, createConfig } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const config = createConfig({
  chains: [avalancheFuji],
  connectors: [injected()],
  transports: {
    [avalancheFuji.id]: http(),
  },
  ssr: true,
});

export default config;
