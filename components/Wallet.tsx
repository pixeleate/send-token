'use client';

import * as React from 'react';

import { useAccount } from 'wagmi';
import ConnectButton from '@/components/ConnectButton';
import DisconnectButton from '@/components/DisconnectButton';

const Wallet = () => {
  const { isConnected, isConnecting } = useAccount();

  // if (isConnecting) {
  //   return <div>Connecting...</div>;
  // }

  return <div>{isConnected ? <DisconnectButton /> : <ConnectButton />}</div>;
};

export default Wallet;
