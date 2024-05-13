'use client';

import * as React from 'react';

import { useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';

const DisconnectButton = () => {
  const { disconnect } = useDisconnect();

  const onClickHandler = () => {
    disconnect();
  };

  return (
    <Button
      name='disconnect'
      role='button'
      className='button'
      onClick={onClickHandler}
      type='button'
    >
      Disconnect Wallet
    </Button>
  );
};

export default DisconnectButton;
